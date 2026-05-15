import React, { useState, useEffect, useRef } from 'react';
import { categoriesConfig } from './config/categories';
import { supabase } from './supabaseClient';
// import { OccupationSelect } from './OccupationSelect';
import MultiSelect from './components/MultiSelect';

// Añade un set de IDs que disparan el autosave
const RX_CHECKPOINT_IDS = new Set([
  // Tobillo
  'rx_deformidad',
  'rx_tolera_carga',
  'rx_no_tolera_carga',
  'rx_dolor_difuso',
  'rx_dolor_local',

  // MetaTarso / Pie
  'rx_deformidad_pie',
  'rx_no_tolera_carga_pie',
  'rx_tolera_carga_pie', ]);


// ─── Helper: true si el cuestionario activo pertenece a tobillo_pie ───────────
// Cubre tanto torsion_tobillo como ortejos (y futuros mecanismos del mismo grupo)
const esTobilloPie = (category) => category === 'tobillo_pie';

// ─── Helper: true solo para el mecanismo de tobillo (no ortejos) ─────────────
// Usado para lógica exclusiva de tobillo (TF, control, transporte, Ottawa, etc.)
const esTobilloMecanismo = (questionnaireKey) => questionnaireKey === 'torsion_tobillo';

const esMetaTarso = (questionnaireKey) =>  questionnaireKey === 'metaTarso';

const extractSection = (text, header, stopHeaders) => {
  const start = text.indexOf(header);
  if (start === -1) return null;
  let end = text.length;
  for (const h of stopHeaders) {
    const pos = text.indexOf(h, start + header.length);
    if (pos !== -1 && pos < end) end = pos;
  }
  const footerPos = text.indexOf('===', start + header.length);
  if (footerPos !== -1 && footerPos < end) end = footerPos;
  return text.slice(start, end).trim();
};

// --- Componente ImageModal ---
const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="relative bg-white p-2 rounded-lg shadow-xl max-w-7xl max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-gray-200 z-10">&times;</button>
        <img src={imageSrc} alt="Guía Clínica" className="object-contain w-full h-full max-h-[90vh] rounded" />
      </div>
    </div>
  );
};

// --- Componente ProgressBar ---
const ProgressBar = ({ current, total }) => {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-blue-800">
          Progreso: {current}/{total}
        </span>
        <span className="text-[10px] text-blue-600 font-bold">{pct}%</span>
      </div>
      <div className="w-full h-2 bg-blue-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// --- Componente QuestionRenderer ---
const QuestionRenderer = ({ question, value, onChange, answers, onVoiceUsed }) => {
  if (!question) return null;
  const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm";

  // --- Filtrado dinámico para 'escenario_fractura' y 'weber' ---
  let optionsToRender = question.options || [];
  if (question.type === 'options' || question.type === 'boolean' || question.type === 'button-group') {
    if (question.id === 'escenario_fractura') {
      const allowed = allowedScenariosFor(answers);
      optionsToRender = filterOptions(question.options || [], allowed);
    }
    if (question.id === 'weber') {
      const allowed = allowedWeberFor(answers);
      optionsToRender = filterOptions(question.options || [], allowed);
    }
  }

  switch (question.type) {
    case 'occupation':
      return (
        <OccupationSelect
          label={question.label || 'Ocupación'}
          initialValue={value ? { ocupacion: value } : null}
          onSelect={(occ) => {
            onChange('ocupacion', occ.ocupacion);
            onChange('ocupacion_id', occ.id);
            onChange('carga_laboral', occ.carga_laboral);
          }}
        />
      );

    case 'options':
    case 'boolean':
      return (
        <div className="flex flex-col space-y-2">
          {optionsToRender.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(question.id, opt.value)}
              className={`p-3 rounded-lg text-left transition-colors border ${value === opt.value ? 'bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}
            >
              {opt.label}
            </button>
          ))}
          {optionsToRender.length === 0 && (
            <div className="text-xs text-gray-500 italic">No hay opciones disponibles para la combinación seleccionada.</div>
          )}
        </div>
      );

    case 'button-group': {
      const isCarga = question.id === 'carga_laboral';
      return (
        <div className="grid grid-cols-1 gap-2 mt-2">
          {optionsToRender.map((opt) => {
            const isActive = value === opt.value;
            const baseBtn =
              `py-2 px-3 text-sm rounded-lg border text-left ` +
              (isActive
                ? 'bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500'
                : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200');

            if (isCarga) {
              const title = opt.labelBold ?? opt.label ?? '';
              const desc  = opt.labelDesc ?? '';
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onChange(question.id, opt.value)}
                  className={baseBtn}
                >
                  <div className="font-bold">{title}</div>
                  {desc && <div className="text-sm font-normal">{desc}</div>}
                </button>
              );
            }

            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange(question.id, opt.value)}
                className={baseBtn}
              >
                {opt.label}
              </button>
            );
          })}

          {optionsToRender.length === 0 && (
            <div className="col-span-2 text-xs text-gray-500 italic">
              No hay opciones disponibles.
            </div>
          )}
        </div>
      );
    }

    case 'slider': {
      const val = value || 0;
      const getColor = (v) => {
        if (v <= 3) return '#6abf69';
        if (v <= 6) return '#f0a500';
        return '#e05c5c';
      };
      const color = getColor(val);
      const trackGradient = `linear-gradient(to right, 
        #6abf69 0%, #6abf69 35%, 
        #f0a500 35%, #f0a500 65%, 
        #e05c5c 65%, #e05c5c 100%)`;

      return (
        <div className="space-y-2 mt-2">
          <style>{`
            .eva-slider {
              -webkit-appearance: none;
              appearance: none;
              width: 100%;
              height: 6px;
              border-radius: 3px;
              outline: none;
              background: ${trackGradient};
              cursor: pointer;
            }
            .eva-slider::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${color};
              border: 3px solid white;
              box-shadow: 0 1px 4px rgba(0,0,0,0.25);
              transition: background 0.2s;
            }
            .eva-slider::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: ${color};
              border: 3px solid white;
              box-shadow: 0 1px 4px rgba(0,0,0,0.25);
              transition: background 0.2s;
            }
          `}</style>
          <input
            type="range"
            min={question.min || 0}
            max={question.max || 10}
            value={val}
            onChange={(e) => onChange(question.id, parseInt(e.target.value))}
            className="eva-slider"
          />
          <div className="flex justify-between px-0.5">
            {Array.from({ length: 11 }, (_, i) => (
              <span
                key={i}
                className="text-[11px] font-bold w-4 text-center"
                style={{ color: i === val ? color : '#9ca3af' }}
              >
                {i}
              </span>
            ))}
          </div>
        </div>
      );
    }

    case 'multi':
      return <MultiSelect question={question} value={value} onChange={onChange} />;

    case 'textarea': {
      const [isListening, setIsListening] = React.useState(false);
      const recognitionRef = React.useRef(null);

      const toggleSpeech = () => {
        if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
          alert('Tu navegador no soporta reconocimiento de voz');
          return;
        }
        if (isListening && recognitionRef.current) {
          recognitionRef.current.stop();
          recognitionRef.current = null;
          setIsListening(false);
          return;
        }
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CL';
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.onresult = (event) => {
          const transcript = Array.from(event.results)
            .map(r => r[0].transcript)
            .join(' ');
          onChange(question.id, (value ? value + ' ' : '') + transcript);
        };
        recognition.onend = () => {
          recognitionRef.current = null;
          setIsListening(false);
        };
        recognition.onerror = () => {
          recognitionRef.current = null;
          setIsListening(false);
        };
        recognitionRef.current = recognition;
        recognition.start();
        setIsListening(true);
        onVoiceUsed?.();
      };

      return (
        <div className="relative">
          <textarea
            value={value || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            placeholder={question.placeholder || ''}
            className={`${commonInputClass} h-35 pr-12`}
          />
          <button
            type="button"
            onClick={toggleSpeech}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isListening
                ? 'bg-red-100 text-red-600 animate-pulse'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
            title={isListening ? 'Detener dictado' : 'Iniciar dictado por voz'}
          >
            {isListening ? '⏹️' : '🎤'}
          </button>
          {isListening && (
            <p className="text-xs text-red-500 mt-1 font-medium animate-pulse">
              🔴 Escuchando... presiona ⏹️ para detener
            </p>
          )}
        </div>
      );
    }

    case 'number':
    case 'text':
    case 'date':
      return (
        <input
          type={question.type}
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder || ''}
          className={commonInputClass}
        />
      );

    case 'select':
      return (
        <div className="space-y-2">
          <select
            value={value || ''}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          >
            <option value="" disabled>Seleccione una opción...</option>
            {(question.options || []).map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );

    default:
      return null;
  }
};

// --- Reglas de compatibilidad (escenarios y Weber) ---

const CLOSED_SC3_ALLOWED = new Set([
  'bimaleolar_cerrada',
  'pilon_tibial_cerrada',
  'maleolo_tibial_cerrada',
  'maleolo_perone_cerrada',
  'trimaleolar_cerrada',
]);

function allowedScenariosFor(ans) {
  const tipo = ans.hay_fractura;
  if (tipo !== 'si_abierta' && tipo !== 'si_cerrada') return [];
  const always = ['escenario_4'];
  if (tipo === 'si_abierta') return always;

  const clasVal = ans.clasificacion_especifica_cerrada;
  if (!clasVal) return always;

  const allowed = new Set(always);
  if (['pilon_tibial_cerrada', 'maleolo_perone_cerrada'].includes(clasVal)) allowed.add('escenario_1');
  if (clasVal === 'bimaleolar_cerrada') allowed.add('escenario_2');
  if (CLOSED_SC3_ALLOWED.has(clasVal)) allowed.add('escenario_3');

  return Array.from(allowed);
}

function allowedWeberFor(ans) {
  if (ans.escenario_fractura !== 'escenario_1') return [];
  const clasVal = ans.clasificacion_especifica_cerrada;
  if (clasVal === 'pilon_tibial_cerrada')   return ['weber_a'];
  if (clasVal === 'maleolo_perone_cerrada') return ['weber_a', 'weber_b_c'];
  return [];
}

function filterOptions(options, allowedValues) {
  const allow = new Set(allowedValues);
  return options.filter(o => allow.has(o.value));
}

const SelectableSteps = ({ steps, onConfirm }) => {
  const [selected, setSelected] = React.useState(() => new Set(steps.map((_, i) => i)));

  const toggle = (i) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-blue-600 font-medium mb-2">
        Puede quitar las indicaciones que <span className="font-bold">no</span> desea incluir en el informe.
      </p>
      {steps.map((paso, i) => (
        <button
          key={i}
          type="button"
          onClick={() => toggle(i)}
          className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
            selected.has(i)
              ? 'bg-blue-100 border-blue-400'
              : 'bg-white border-gray-200 opacity-50'
          }`}
        >
          <div className={`mt-0.5 w-5 h-5 flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors ${
            selected.has(i) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'
          }`}>
            {selected.has(i) && <span className="text-white text-xs font-bold">✓</span>}
          </div>
          <span className="text-sm text-blue-800">{paso}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => onConfirm(steps.filter((_, i) => selected.has(i)))}
        className="w-full mt-4 bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 shadow-md transition-all"
      >
        Confirmar indicaciones →
      </button>
    </div>
  );
};

const StepBar = ({ step, tab }) => {
  const steps = [
    { key: "inicio",     label: "Inicio" },
    { key: "anamnesis",  label: "Examen físico" },
    { key: "evaluation", label: "Evaluación clínica" },
    { key: "result",     label: "Recomendaciones" },
  ];

  const activeIndex =
    step === "selection"    ? 0 :
    step === "questionnaire" && tab === "anamnesis"  ? 1 :
    step === "questionnaire" && tab === "evaluation" ? 2 : 3;

  return (
    <div className="flex items-center justify-center mb-8 gap-0">
      {steps.map((s, i) => {
        const isDone   = i < activeIndex;
        const isActive = i === activeIndex;
        const isLast   = i === steps.length - 1;

        return (
          <React.Fragment key={s.key}>
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                ${isDone   ? 'bg-blue-700 text-white' :
                  isActive ? 'bg-blue-700 text-white ring-4 ring-blue-200' :
                             'bg-gray-200 text-gray-400'}`}>
                {isDone ? '✓' : i + 1}
              </div>
              <span className={`text-[10px] mt-1 font-semibold text-center w-16
                ${isActive ? 'text-blue-700' : isDone ? 'text-blue-500' : 'text-gray-400'}`}>
                {s.label}
              </span>
            </div>
            {!isLast && (
              <div className={`h-0.5 w-24 mb-4 mx-2 transition-all
                ${i < activeIndex ? 'bg-blue-700' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// ─── Helper: resuelve el protocolo dinámico según protocolId y módulo ─────────
// Centraliza la lógica que antes estaba duplicada en handleEvaluate y step=result
const resolveProtocol = (protocolId, questionnaireModule, answers) => {
  // Tobillo
  if (protocolId === 'protocolo_esguince_1')
    return questionnaireModule.getProtocoloEsguince1?.(answers) ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_esguince_2')
    return questionnaireModule.getProtocoloEsguince2?.(answers) ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_esguince_3')
    return questionnaireModule.getProtocoloEsguince3?.(answers) ?? questionnaireModule.protocols[protocolId];

  // Ortejos
  if (protocolId === 'protocolo_esguince_1_ortj')
    return questionnaireModule.getProtocoloEsguince1Ortejos?.(answers) ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_esguince_2_ortj')
    return questionnaireModule.getProtocoloEsguince2Ortejos?.(answers) ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_esguince_3_ortj')
    return questionnaireModule.getProtocoloEsguince3Ortejos?.(answers) ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_fx_derivacion_su_ortejos')
    return questionnaireModule.getProtocoloFxDerivacionSUOrtejos?.(answers) ?? questionnaireModule.protocols[protocolId];

  // MetaTarso
  if (protocolId === 'getProtocoloEsguincePie1')
    return questionnaireModule.getProtocoloEsguincePie1?.(answers)
      ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'getProtocoloEsguincePie2')
    return questionnaireModule.getProtocoloEsguincePie2?.(answers)
      ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'getProtocoloEsguincePie3')
    return questionnaireModule.getProtocoloEsguincePie3?.(answers)
      ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_fx_derivacion')
    return questionnaireModule.protocolo_fx_derivacion?.(answers)
      ?? questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_fx_cerrada_conservador_metatarso')
    return questionnaireModule.protocols[protocolId];
  if (protocolId === 'protocolo_fx_cerrada_conservador_tarso')
    return questionnaireModule.protocolo_fx_cerrada_conservador_tarso?.(answers)
      ?? questionnaireModule.protocols[protocolId];

  // Cualquier otro (estático)
  return questionnaireModule.protocols[protocolId];
};

function App() {
  const [step, setStep] = useState("selection");
  const [caseId, setCaseId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestionnaireKey, setSelectedQuestionnaireKey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [questionnaireModule, setQuestionnaireModule] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [riskHistory, setRiskHistory] = useState([]);
  const [currentRiskQuestionId, setCurrentRiskQuestionId] = useState(null);
  const [wizardFinished, setWizardFinished] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draftModal, setDraftModal] = useState({ open: false, draft: null });
  const [tab, setTab] = useState("anamnesis");
  const [backWarningModal, setBackWarningModal] = useState(false);
  const [indicacionesSeleccionadas, setIndicacionesSeleccionadas] = useState(null);
  const [usoDictadoVoz, setUsoDictadoVoz] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState(null);
  const copiedTimerRef = useRef(null);

  const [rxModal, setRxModal] = useState({
    open: false,
    checkpointId: null,
    showInfo: false,
    rxText: ''
  });

  const saveDraft = React.useCallback(
    async (checkpointId, nextAnswers) => {
      if (!caseId || !selectedQuestionnaireKey) {
        console.warn('saveDraft: faltan caseId o selectedQuestionnaireKey');
        return { data: null, error: new Error('Missing keys') };
      }
      const answersSnapshot = nextAnswers ?? answers;
      const payload = {
        id_caso: caseId,
        cuestionario: selectedQuestionnaireKey,
        respuestas: answersSnapshot,
        current_risk_question_id: currentRiskQuestionId,
        wizard_finished: wizardFinished,
        last_checkpoint: checkpointId || null,
        updated_at: new Date().toISOString(),
      };
      const { data, error, status, statusText } = await supabase
        .from('respuestas_draft')
        .upsert(payload, { onConflict: 'id_caso,cuestionario' })
        .select()
        .single();
      if (error) {
        console.error('saveDraft error:', { error, status, statusText, payload });
      } else {
        console.log('saveDraft OK:', data);
      }
      return { data, error };
    },
    [caseId, selectedQuestionnaireKey, answers, currentRiskQuestionId, wizardFinished]
  );

  const loadDraftIfExists = React.useCallback(async () => {
    if (!caseId || !selectedQuestionnaireKey) return null;
    const { data, error } = await supabase
      .from('respuestas_draft')
      .select('*')
      .eq('id_caso', caseId)
      .eq('cuestionario', selectedQuestionnaireKey)
      .maybeSingle();
    if (error) {
      console.error('Error cargando draft:', error);
      return null;
    }
    return data;
  }, [caseId, selectedQuestionnaireKey]);

  useEffect(() => {
    if (selectedCategory && selectedQuestionnaireKey) {
      const qInfo = categoriesConfig[selectedCategory]?.questionnaires[selectedQuestionnaireKey];
      if (qInfo?.getQuestionsModule) {
        qInfo.getQuestionsModule().then(module => {
          setQuestionnaireModule({ ...qInfo, ...(module.default || module) });
        });
      }
    }
  }, [selectedCategory, selectedQuestionnaireKey]);

  const handleDraftResume = () => {
    const { draft } = draftModal;
    const firstRisk = questionnaireModule.questions.find(q => q.group === 'risk');
    setAnswers(draft.respuestas || {});
    setWizardFinished(!!draft.wizard_finished);
    setCurrentRiskQuestionId(draft.current_risk_question_id || firstRisk.id);
    setDraftModal({ open: false, draft: null });
    setTab("evaluation");
    setStep("questionnaire");
  };

  const handleDraftDiscard = async () => {
    await supabase
      .from('respuestas_draft')
      .delete()
      .eq('id_caso', caseId)
      .eq('cuestionario', selectedQuestionnaireKey);
    setDraftModal({ open: false, draft: null });
    setAnswers({});
    setFinalResult(null);
    setRiskHistory([]);
    setWizardFinished(false);
    const firstRisk = questionnaireModule.questions.find(q => q.group === 'risk');
    setCurrentRiskQuestionId(firstRisk.id);
    setStep("questionnaire");
  };

  const handleStart = async () => {
    if (!caseId || !selectedQuestionnaireKey) return alert("Complete los campos");
    if (!questionnaireModule?.questions?.length) return alert("Cargando cuestionario, inténtalo de nuevo...");
    const draft = await loadDraftIfExists();
    if (draft) {
      setDraftModal({ open: true, draft });
      return;
    }
    const firstRisk = questionnaireModule.questions.find(q => q.group === 'risk');
    setAnswers({});
    setFinalResult(null);
    setRiskHistory([]);
    setWizardFinished(false);
    setCurrentRiskQuestionId(firstRisk.id);
    setStep("questionnaire");
  };

  const openCheckpointModal = async (checkpointId) => {
    const snapshot = { ...answers };
    await saveDraft(checkpointId, snapshot);
    const question = questionnaireModule?.questions?.find(q => q.id === checkpointId);
    const qText = question?.textFn
      ? question.textFn(snapshot)
      : (question?.text || '');
    setRxModal({ open: true, checkpointId, showInfo: false, rxText: qText });
  };

  const handleRxRealizada = () => {
    if (!rxModal.checkpointId) return;
    handleFormChange(rxModal.checkpointId, 'listo');
    setRxModal({ open: false, checkpointId: null, showInfo: false });
  };

  const handleRxOk = async () => {
    if (!rxModal.checkpointId) return;
    await saveDraft(rxModal.checkpointId, { ...answers });
    setRxModal(prev => ({ ...prev, showInfo: true }));
  };

  const handleCloseRxInfoAndExit = () => {
    setRxModal({ open: false, checkpointId: null, showInfo: false });
    setStep('selection');
  };

  const handleFormChange = (id, val) => {
    setAnswers(prev => {
      let next = { ...prev, [id]: val };

      if (id === 'hay_fractura') {
        next.escenario_fractura = undefined;
        next.weber = undefined;
        if (val === 'si_abierta') {
          next.clasificacion_especifica_cerrada = undefined;
        } else if (val === 'si_cerrada') {
          next.clasificacion_especifica_abierta = undefined;
        } else {
          next.clasificacion_especifica_cerrada = undefined;
          next.clasificacion_especifica_abierta = undefined;
        }
      }

      if (id === 'clasificacion_especifica_cerrada' || id === 'clasificacion_especifica_abierta') {
        const allowedSc = allowedScenariosFor(next);
        if (next.escenario_fractura && !allowedSc.includes(next.escenario_fractura)) {
          next.escenario_fractura = undefined;
          next.weber = undefined;
        } else if (next.escenario_fractura === 'escenario_1') {
          const allowedW = allowedWeberFor(next);
          if (next.weber && !allowedW.includes(next.weber)) {
            next.weber = undefined;
          }
        }
      }

      if (id === 'escenario_fractura') {
        if (val !== 'escenario_1') {
          next.weber = undefined;
        } else {
          const allowedSc = allowedScenariosFor(next);
          if (!allowedSc.includes('escenario_1')) {
            next.escenario_fractura = undefined;
          }
        }
      }

      if (id === 'weber') {
        const allowedW = allowedWeberFor(next);
        if (!allowedW.includes(val)) {
          next.weber = undefined;
        }
      }

      if (RX_CHECKPOINT_IDS.has(id)) {
        saveDraft(id, next);
      }

      return next;
    });
  };

  const handleWizardNext = async () => {
    const allRisk = questionnaireModule.questions.filter(q => q.group === 'risk');
    const currentIndex = allRisk.findIndex(q => q.id === currentRiskQuestionId);

    if (currentRiskQuestionId === 'fractura_pie_tipo' && answers.fractura_pie_tipo && answers.fractura_pie_tipo !== 'otra') {
      setWizardFinished(true);
      return;
    }
    if (currentRiskQuestionId === 'fractura_pie_otra') {
      setWizardFinished(true);
      return;
    }

    let nextIndex = currentIndex + 1;
    while (nextIndex < allRisk.length) {
      const nextQ = allRisk[nextIndex];
      if (!nextQ.showIf || nextQ.showIf(answers)) {
        setRiskHistory(prev => [...prev, currentRiskQuestionId]);
        setCurrentRiskQuestionId(nextQ.id);
        if (RX_CHECKPOINT_IDS.has(nextQ.id)) {
          await openCheckpointModal(nextQ.id);
        }
        return;
      }
      nextIndex++;
    }
    setWizardFinished(true);
  };

  useEffect(() => {
    const run = async () => {
      if (
        step === 'questionnaire' &&
        currentRiskQuestionId &&
        RX_CHECKPOINT_IDS.has(currentRiskQuestionId) &&
        !rxModal.open
      ) {
        await openCheckpointModal(currentRiskQuestionId);
      }
    };
    run();
  }, [step, currentRiskQuestionId]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEvaluate = async () => {
    const evaluation = questionnaireModule.evaluateRisk(answers, true);
    setFinalResult(evaluation);

    // ── Indicaciones para tobillo_pie (tobillo y ortejos) ────────────────────
    let indicacionesTexto = null;

  if (esTobilloPie(selectedCategory)) {
    // Solo tobillo y ortejos
    if (!esMetaTarso(selectedQuestionnaireKey)) {
      const currentProtocol = resolveProtocol(evaluation.protocolId, questionnaireModule, answers);
      const reposoDinamico = questionnaireModule?.restTextPorCarga?.(answers, evaluation.protocolId) ?? null;
      const displayedSteps = [
        ...(reposoDinamico ? [reposoDinamico] : []),
        ...((currentProtocol?.pasos ?? [])),
      ];
      indicacionesTexto = displayedSteps.join('\n');
    }

    
    // MetaTarso: también mostrar indicaciones, pero sin lógica extra
      if (esMetaTarso(selectedQuestionnaireKey)) {
        const currentProtocol = resolveProtocol(evaluation.protocolId, questionnaireModule, answers);
        const reposoDinamico =
          questionnaireModule?.restTextPorCarga?.(answers, evaluation.protocolId) ?? null;

        const displayedSteps = [
          ...(reposoDinamico ? [reposoDinamico] : []),
          ...(currentProtocol?.pasos ?? []),
        ];

        indicacionesTexto = displayedSteps.join('\n');
      }
    }


    // ── Mensajes de agendamiento: solo aplican a torsion_tobillo ─────────────
    let mensajeTFGuardar = null;
    let mensajeControlGuardar = null;
    let transporteGuardar = null;

    if (esTobilloMecanismo(selectedQuestionnaireKey)) {
      const esGrado1 = evaluation.protocolId === 'protocolo_esguince_1';
      const esGrado2 = evaluation.protocolId === 'protocolo_esguince_2';
      const esGrado3 = evaluation.protocolId === 'protocolo_esguince_3';
      const vol = answers.aumento_volumen;
      const eva = answers.eva;
      const carg = Number(answers.carga_laboral);

      if (esGrado3) mensajeTFGuardar = 'Agendar primera TF al día 3';
      else if (esGrado2) {
        if ((vol === 'moderado' || vol === 'severo') && eva >= 6) mensajeTFGuardar = 'Agendar primera TF al día 3';
        else if (vol === 'leve' && eva >= 6) mensajeTFGuardar = 'Agendar primera TF al día 5';
        else mensajeTFGuardar = 'A partir de las condiciones del paciente, no requiere terapia física';
      }

      if (esGrado3) mensajeControlGuardar = 'Agendar primer control al día 7';
      else if (esGrado2 && (carg === 2 || carg === 3)) mensajeControlGuardar = 'Agendar primer control al día 5';
      else if (esGrado1) mensajeControlGuardar = 'Este diagnóstico no requiere de control a excepción SOS';


      // if (evaluation.protocolId === 'protocolo_esguince_1') transporteGuardar = 'No requiere transporte';
      // else if (evaluation.protocolId === 'protocolo_esguince_2') transporteGuardar = 'Furgón hasta retiro de ayudas técnicas u órtesis';
      // else if (evaluation.protocolId === 'protocolo_esguince_3') transporteGuardar = 'Furgón hasta retiro de ayudas técnicas u órtesis';
      // else if (['protocolo_weber_a', 'protocolo_weber_b_c', 'protocolo_escenario_2',
      //   'protocolo_escenario_3', 'protocolo_escenario_4', 'protocolo_fractura_pie'].includes(evaluation.protocolId)) {
      //   transporteGuardar = 'Requiere transporte';
      // }
    }

    if (esTobilloPie(selectedCategory) && !esTobilloMecanismo(selectedQuestionnaireKey)) {
      const pid = evaluation.protocolId;
      if (['protocolo_esguince_2_ortj', 'protocolo_esguince_3_ortj',
           'protocolo_fx_cerrada_ortejos', 'getProtocoloEsguincePie2',
           'getProtocoloEsguincePie3'].includes(pid)) {
        mensajeTFGuardar = 'Agendar primera TF al día 3';
      }
      if (['protocolo_esguince_2_ortj', 'protocolo_esguince_3_ortj',
           'getProtocoloEsguincePie2', 'getProtocoloEsguincePie3'].includes(pid)) {
        mensajeControlGuardar = 'Agendar primer control al día 7';
      } else if (pid === 'protocolo_fx_metatarsiano_cerrada_conservador') {
        mensajeControlGuardar = 'Agendar primer control al día 7 con Rx Ap-Lat';
      } else if (pid === 'protocolo_fx_cerrada_conservador_tarso') {
        mensajeControlGuardar = 'Agendar primer control en dos semanas con Rx Ap-Lat';
      }
      else if (pid === 'protocolo_esguince_1_ortj' || pid === 'getProtocoloEsguincePie1') {
        mensajeControlGuardar = 'Este diagnóstico no requiere de control a excepción SOS';
      }
    }

    const resultData = {
      id_caso: caseId,
      cuestionario: selectedQuestionnaireKey,
      respuestas: answers,
      resultado: evaluation.text,
      timestamp: new Date().toLocaleString("sv-SE", { timeZone: "America/Santiago" }),
      uso_dictado_voz: usoDictadoVoz,
      ...(indicacionesTexto !== null && { indicaciones: indicacionesTexto }),
      ...(mensajeTFGuardar !== null && { mensaje_tf: mensajeTFGuardar }),
      ...(mensajeControlGuardar !== null && { mensaje_control: mensajeControlGuardar }),
      ...(transporteGuardar !== null && { transporte: transporteGuardar }),
    };

    try {
      const { error } = await supabase.from('respuestas').insert([resultData]);
      if (error) console.error(error);
      await supabase
        .from('respuestas_draft')
        .delete()
        .eq('id_caso', caseId)
        .eq('cuestionario', selectedQuestionnaireKey);
    } catch (e) {
      console.error(e);
    }

    setStep('result');
  };

  const handleRestart = () => {
    setStep("selection"); setCaseId(""); setAnswers({}); setWizardFinished(false);
    setSelectedCategory(null); setSelectedQuestionnaireKey(null);
    setIndicacionesSeleccionadas(null);
    setTab("anamnesis");
    setUsoDictadoVoz(false);
  };

  const handleTabBack = () => {
    const hasEvaluationAnswers = riskHistory.length > 0 ||
      (currentRiskQuestionId && answers[currentRiskQuestionId] !== undefined);
    if (hasEvaluationAnswers) {
      setBackWarningModal(true);
    } else {
      setTab("anamnesis");
    }
  };

  const confirmTabBack = () => {
    setRiskHistory([]);
    setWizardFinished(false);
    const firstRisk = questionnaireModule.questions.find(q => q.group === 'risk');
    setCurrentRiskQuestionId(firstRisk?.id);
    setAnswers(prev => {
      const next = { ...prev };
      questionnaireModule.questions
        .filter(q => q.group === 'risk')
        .forEach(q => { delete next[q.id]; });
      return next;
    });
    setBackWarningModal(false);
    setTab("anamnesis");
  };

  const renderContent = () => {
    if (step === "selection") {
      return (
        <div className="space-y-5 text-center">
          <img src="logo_normal.png" alt="Logo" className="w-40 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-blue-900">Asistente Médico Virtual</h2>

          <div className="text-left space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID Siniestro</label>
              <input type="number" value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Ej: 0008123456" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Zona Lesional</label>
              <select value={selectedCategory || ""} onChange={(e) => { setSelectedCategory(e.target.value); setSelectedQuestionnaireKey(null); }} className="mt-1 block w-full py-2 border-gray-300 rounded-md">
                <option value="" disabled>Seleccione...</option>
                {Object.keys(categoriesConfig).map(k => <option key={k} value={k}>{categoriesConfig[k].name}</option>)}
              </select>
            </div>
            {selectedCategory && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Mecanismo </label>
                <select value={selectedQuestionnaireKey || ""} onChange={(e) => setSelectedQuestionnaireKey(e.target.value)} className="mt-1 block w-full py-2 border-gray-300 rounded-md">
                  <option value="" disabled>Seleccione...</option>
                  {Object.keys(categoriesConfig[selectedCategory].questionnaires).map(k => <option key={k} value={k}>{categoriesConfig[selectedCategory].questionnaires[k].name}</option>)}
                </select>
              </div>
            )}
            <button onClick={handleStart} disabled={!caseId || !selectedQuestionnaireKey || isNaN(Number(caseId))} className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 disabled:bg-gray-400">COMENZAR</button>
          </div>
        </div>
      );
    }

    if (step === "questionnaire") {
      // Usa el helper: true para tobillo_pie (tobillo y ortejos), false para lumbago
      const usaTabLayout = esTobilloPie(selectedCategory);
      const anamnesis = questionnaireModule.questions.filter(q => q.group === 'anamnesis');
      const currentRisk = questionnaireModule.questions.find(q => q.id === currentRiskQuestionId);

      const requiresAnamnesis = questionnaireModule?.requiresAnamnesis ?? false;
      const anamnesisComplete = !requiresAnamnesis || anamnesis.every(q => {
        if (q.type === 'textarea') return true;
        return answers[q.id] !== undefined && answers[q.id] !== '';
      });

      const allRiskQuestions = questionnaireModule.questions.filter(q => q.group === 'risk');
      const totalRisk = allRiskQuestions.length;
      const answeredRisk = allRiskQuestions.filter(q => answers[q.id] !== undefined).length;
      const progressCount = wizardFinished ? totalRisk : answeredRisk;

      // ─── Layout original: lumbago y otros sin pestañas ───────────────────────
      if (!usaTabLayout) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold border-b border-slate-300 pb-2 mb-4">Examen físico</h3>
              {anamnesis.map(q => (
                <div key={q.id} className="pb-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">{q.text}</label>
                  <QuestionRenderer question={q} value={answers[q.id]} onChange={handleFormChange} answers={answers} />
                </div>
              ))}
            </div>
            <div className="space-y-4 flex flex-col">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex-grow flex flex-col">
                <h3 className="text-xl font-semibold border-b border-slate-300 pb-2 mb-6">Evaluación Clínica</h3>
                <ProgressBar current={progressCount} total={totalRisk} />
                {!wizardFinished ? (
                  <div className="flex-grow animate-in fade-in slide-in-from-right-4">
                    <label className="block text-base font-bold text-gray-800 mb-4">{currentRisk?.text}</label>
                    <QuestionRenderer question={currentRisk} value={answers[currentRisk?.id]} onChange={handleFormChange} answers={answers} />
                    <div className="flex justify-between mt-8">
                      <button
                        disabled={riskHistory.length === 0}
                        onClick={() => {
                          const last = riskHistory[riskHistory.length - 1];
                          setRiskHistory(prev => prev.slice(0, -1));
                          setCurrentRiskQuestionId(last);
                        }}
                        className="text-gray-400 font-bold hover:text-gray-600 disabled:opacity-30"
                      >← VOLVER</button>
                      <button
                        onClick={handleWizardNext}
                        disabled={
                          answers[currentRiskQuestionId] === undefined ||
                          (currentRiskQuestionId === 'fractura_pie_otra' && !answers.fractura_pie_otra?.trim())
                        }
                        className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 shadow-md disabled:bg-gray-400"
                      >SIGUIENTE</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 text-3xl">✓</div>
                    <p className="text-lg font-bold text-green-800">Evaluación completa</p>
                    <p className="text-sm text-gray-500 mb-6">Revise los datos y genere el diagnóstico.</p>
                    <button onClick={handleEvaluate} className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-green-700 hover:-translate-y-1 transition-all">GENERAR RESULTADO</button>
                  </div>
                )}
              </div>
              {questionnaireModule.guideImage && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <img src={questionnaireModule.guideImage} onClick={() => setIsModalOpen(true)} className="w-full rounded-lg cursor-pointer border hover:ring-4 transition-all" alt="Guía" />
                </div>
              )}
            </div>
          </div>
        );
      }

      // ─── Layout con pestañas: tobillo_pie (tobillo y ortejos) ────────────────

      // PESTAÑA EXAMEN FÍSICO
      if (tab === "anamnesis") {
        return (
          <div>
            <StepBar step={step} tab={tab} />
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h3 className="text-xl font-semibold border-b border-slate-300 pb-2 mb-4">Examen físico</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {anamnesis.slice(0, 4).map(q => (
                    <div key={q.id} className="pb-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">{q.text}</label>
                      <QuestionRenderer question={q} value={answers[q.id]} onChange={handleFormChange} answers={answers} onVoiceUsed={() => setUsoDictadoVoz(true)} />
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  {anamnesis.slice(4).map(q => (
                    <div key={q.id} className="pb-2">
                      <label className="block text-sm font-bold text-gray-700 mb-1">{q.text}</label>
                      <QuestionRenderer question={q} value={answers[q.id]} onChange={handleFormChange} answers={answers} onVoiceUsed={() => setUsoDictadoVoz(true)} />
                    </div>
                  ))}
                </div>
              </div>

              {!anamnesisComplete && (
                <p className="text-red-500 text-xs font-semibold text-right mt-4">
                  ⚠️ Complete todos los campos para continuar
                </p>
              )}
              <div className="flex justify-end pt-2 mt-2">
                <button
                  onClick={() => setTab("evaluation")}
                  disabled={!anamnesisComplete}
                  className="bg-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 shadow-md disabled:bg-gray-300 disabled:cursor-not-allowed transition-all"
                >
                  Siguiente →
                </button>
              </div>
            </div>
          </div>
        );
      }

      // PESTAÑA EVALUACIÓN CLÍNICA
      return (
        <div>
          <StepBar step={step} tab={tab} />
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[350px] flex flex-col">
            <h3 className="text-xl font-semibold border-b border-slate-300 pb-2 mb-6">Evaluación Clínica</h3>
            <ProgressBar current={progressCount} total={totalRisk} />
            {!wizardFinished ? (
              <div className="flex-grow animate-in fade-in slide-in-from-right-4">
                <label className="block text-base font-bold text-gray-800 mb-4">
                  {currentRisk?.textFn
                    ? currentRisk.textFn(answers).split('\n').map((line, i) => (
                        <span key={i} className={`block ${i > 0 ? 'mt-2 text-blue-700' : ''}`}>{line}</span>
                      ))
                    : currentRisk?.text
                  }
                </label>
                <QuestionRenderer question={currentRisk} value={answers[currentRisk?.id]} onChange={handleFormChange} answers={answers} />

                <div className="flex justify-between items-center mt-8">
                  <button
                    disabled={riskHistory.length === 0}
                    onClick={() => {
                      const last = riskHistory[riskHistory.length - 1];
                      setRiskHistory(prev => prev.slice(0, -1));
                      setCurrentRiskQuestionId(last);
                    }}
                    className="text-gray-400 font-bold hover:text-gray-600 disabled:opacity-30"
                  >← Volver</button>
                  <button
                    onClick={handleWizardNext}
                    disabled={answers[currentRiskQuestionId] === undefined}
                    className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 shadow-md disabled:bg-gray-400"
                  >SIGUIENTE</button>
                </div>

                <div className="mt-4 flex justify-start">
                  <button
                    onClick={handleTabBack}
                    className="text-sm text-gray-400 hover:text-gray-600 underline underline-offset-2"
                  >← Volver a Examen físico</button>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mb-4 text-3xl">✓</div>
                <p className="text-lg font-bold text-green-800">Evaluación completa</p>
                <p className="text-sm text-gray-500 mb-6">Revise los datos y genere el diagnóstico.</p>
                <div className="flex justify-between w-full gap-4">
                  <button
                    onClick={handleTabBack}
                    className="text-gray-500 font-bold hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-all"
                  >← Volver a Examen físico</button>
                  <button
                    onClick={handleEvaluate}
                    className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl shadow-xl hover:bg-green-700 hover:-translate-y-1 transition-all"
                  >GENERAR RESULTADO</button>
                </div>
              </div>
            )}
          </div>
          {questionnaireModule.guideImage && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mt-4">
              <img src={questionnaireModule.guideImage} onClick={() => setIsModalOpen(true)} className="w-full rounded-lg cursor-pointer border hover:ring-4 transition-all" alt="Guía" />
            </div>
          )}
        </div>
      );
    }

    if (step === "result" && finalResult) {
      const usaTabLayout = esTobilloPie(selectedCategory);

      // Solo tobillo tiene metatarsiano, TF, control y transporte
      const soloTobillo = esTobilloMecanismo(selectedQuestionnaireKey);

      const tieneMetatarsiano = soloTobillo &&
        Array.isArray(answers.criterios_ottawa2) &&
        answers.criterios_ottawa2.includes("dolor_metatarsiano") &&
        answers.hay_fractura === "no";

      const currentProtocol = resolveProtocol(finalResult.protocolId, questionnaireModule, answers);

      const reposoDinamico = questionnaireModule?.restTextPorCarga?.(answers, finalResult.protocolId) ?? null;
      const displayedSteps = [
        ...(reposoDinamico ? [reposoDinamico] : []),
        ...((currentProtocol?.pasos ?? [])),
      ];

      const stepsParaInforme = indicacionesSeleccionadas !== null ? indicacionesSeleccionadas : displayedSteps;

      const reportText = questionnaireModule.generateClinicalReport({
        caseId,
        answers,
        resultQuestion: finalResult,
        protocols: questionnaireModule.protocols,
        allQuestions: questionnaireModule.questions,
        stepsOverride: stepsParaInforme,
      });

      // Mensajes de agendamiento: solo tobillo
      const esGrado1 = soloTobillo && finalResult.protocolId === 'protocolo_esguince_1';
      const esGrado2 = soloTobillo && finalResult.protocolId === 'protocolo_esguince_2';
      const esGrado3 = soloTobillo && finalResult.protocolId === 'protocolo_esguince_3';
      const volumen = answers.aumento_volumen;
      const eva = answers.eva;
      const carga = Number(answers.carga_laboral);

      const mensajeTF = (() => {
        if (!soloTobillo) return null;
        if (esGrado3) return 'Agendar primera TF al día 3';
        if (esGrado2) {
          if ((volumen === 'moderado' || volumen === 'severo') && eva >= 6) return 'Agendar primera TF al día 3';
          if (volumen === 'leve' && eva >= 6) return 'Agendar primera TF al día 5';
          return 'A partir de las condiciones del paciente, no requiere terapia física';
        }
        return null;
      })();

      const mensajeControl = (() => {
        if (!soloTobillo) return null;
        if (esGrado3) return 'Agendar primer control al día 7';
        if (esGrado2 && (carga === 2 || carga === 3)) return 'Agendar primer control al día 5';
        if (esGrado1) return 'Este diagnóstico no requiere de control a excepción SOS';
        return null;
      })();

      // const transporteTexto = (() => {
      //   if (!soloTobillo) return null;
      //   if (finalResult.protocolId === 'protocolo_esguince_1') return 'No requiere transporte';
      //   if (finalResult.protocolId === 'protocolo_esguince_2') return 'Furgón hasta retiro de ayudas técnicas u órtesis';
      //   if (finalResult.protocolId === 'protocolo_esguince_3') return 'Furgón hasta retiro de ayudas técnicas u órtesis';
      //   const esFractura = ['protocolo_weber_a', 'protocolo_weber_b_c', 'protocolo_escenario_2',
      //     'protocolo_escenario_3', 'protocolo_escenario_4', 'protocolo_fractura_pie'].includes(finalResult.protocolId);
      //   if (esFractura) return 'Requiere transporte';
      //   return null;
      // })();

      const esOrtjOMetaTarso = esTobilloPie(selectedCategory) && !soloTobillo;

      const mensajeTFOrtj = (() => {
        if (!esOrtjOMetaTarso) return null;
        const pid = finalResult.protocolId;
        if (['protocolo_esguince_2_ortj', 'protocolo_esguince_3_ortj',
             'protocolo_fx_cerrada_ortejos', 'getProtocoloEsguincePie2',
             'getProtocoloEsguincePie3'].includes(pid)) {
          return 'Agendar primera TF al día 3';
        }
        return null;
      })();

      const mensajeControlOrtj = (() => {
        if (!esOrtjOMetaTarso) return null;
        const pid = finalResult.protocolId;
        if (['protocolo_esguince_2_ortj', 'protocolo_esguince_3_ortj',
             'getProtocoloEsguincePie2', 'getProtocoloEsguincePie3'].includes(pid)) {
          return 'Agendar primer control al día 7';
        }
        if (pid === 'protocolo_fx_metatarsiano_cerrada_conservador') return 'Agendar primer control al día 7 con Rx Ap-Lat';
        if (pid === 'protocolo_fx_cerrada_conservador_tarso') return 'Agendar primer control en dos semanas con Rx Ap-Lat';
        if (pid === 'protocolo_esguince_1_ortj' || pid === 'getProtocoloEsguincePie1') return 'Este diagnóstico no requiere de control a excepción SOS';
        return null;
      })();

      return (
        <div className="space-y-6">
          {usaTabLayout && <StepBar step="result" tab="result" />}
          <div className={`p-6 border-l-8 rounded-lg shadow-sm ${finalResult.color === 'red' ? 'bg-red-50 border-red-500 text-red-900' : 'bg-green-50 border-green-500 text-green-900'}`}>
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">Diagnóstico Sugerido</p>
            <h2 className="text-3xl font-black uppercase tracking-tighter">{finalResult.text}</h2>
          </div>

          {tieneMetatarsiano && (
            <div className="p-4 bg-orange-50 border-l-4 border-orange-400 rounded-lg">
              <p className="text-orange-800 text-sm font-semibold">
                ⚠️ Dado que presenta dolor en metatarso, ver protocolo de esguince de pie previo a determinar diagnóstico final.
              </p>
            </div>
          )}

          {mensajeTF && (
            <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
              <p className="text-purple-800 text-sm font-semibold">🗓️ {mensajeTF}</p>
            </div>
          )}

          {mensajeControl && (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <p className="text-yellow-800 text-sm font-semibold">📅 {mensajeControl}</p>
            </div>
          )}

          {mensajeTFOrtj && (
            <div className="p-4 bg-purple-50 border-l-4 border-purple-400 rounded-lg">
              <p className="text-purple-800 text-sm font-semibold">🗓️ {mensajeTFOrtj}</p>
            </div>
          )}

          {mensajeControlOrtj && (
            <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
              <p className="text-yellow-800 text-sm font-semibold">📅 {mensajeControlOrtj}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-blue-800 font-bold text-lg mb-4 flex items-center">
              <span className="mr-2">📋</span> Protocolo de Manejo Sugerido:
            </h3>
            <div className="space-y-3">
              <p className="font-bold text-blue-900 text-sm">{currentProtocol?.titulo}</p>

              {usaTabLayout ? (
                indicacionesSeleccionadas === null ? (
                  <SelectableSteps
                    steps={displayedSteps}
                    onConfirm={(seleccionadas) => setIndicacionesSeleccionadas(seleccionadas)}
                  />
                ) : (
                  <ul className="space-y-2">
                    {indicacionesSeleccionadas.map((paso, i) => (
                      <li key={i} className="flex items-start text-sm text-blue-800">
                        <span className="font-bold mr-2 text-blue-400">{i + 1}.</span>
                        {paso}
                      </li>
                    ))}
                  </ul>
                )
              ) : (
                <ul className="space-y-2">
                  {displayedSteps.map((paso, i) => (
                    <li key={i} className="flex items-start text-sm text-blue-800">
                      <span className="font-bold mr-2 text-blue-400">{i + 1}.</span>
                      {paso}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {esTobilloPie(selectedCategory) && (() => {
            const sections = [
              { label: 'Examen Físico',         text: extractSection(reportText, 'EXAMEN FÍSICO',         ['IMAGENOLOGÍA', 'DIAGNÓSTICO SUGERIDO', 'INDICACIONES SUGERIDAS']) },
              { label: 'Imagenología',           text: extractSection(reportText, 'IMAGENOLOGÍA',           ['DIAGNÓSTICO SUGERIDO', 'INDICACIONES SUGERIDAS']) },
              { label: 'Indicaciones Sugeridas', text: extractSection(reportText, 'INDICACIONES SUGERIDAS', []) },
            ].filter(s => s.text !== null);
            const copy = (text, label) => {
              navigator.clipboard.writeText(text);
              if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
              setCopiedLabel(label);
              copiedTimerRef.current = setTimeout(() => setCopiedLabel(null), 2000);
            };
            return sections.length > 0 ? (
              <div className="space-y-3">
                <div className="flex justify-between items-end">
                  <h3 className="font-bold text-gray-700">Copiar por Campo de ISH</h3>
                  <span className="text-[10px] text-gray-400 font-mono">TOBILLO Y PIE</span>
                </div>
                <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))` }}>
                  {sections.map(({ label, text }) => (
                    <div key={label} className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
                      <textarea readOnly value={text} className="w-full h-56 p-2 bg-slate-900 text-green-400 font-mono text-xs rounded-lg border-2 border-slate-800 shadow-inner" />
                      <button
                        onClick={() => copy(text, label)}
                        className="w-full bg-slate-700 text-white py-2 rounded-xl font-bold hover:bg-slate-900 transition-all shadow flex items-center justify-center text-sm"
                      >
                        <span className="mr-2">📋</span> COPIAR
                      </button>
                      <p className={`text-xs text-center text-green-600 font-medium transition-opacity duration-500 ${copiedLabel === label ? 'opacity-100' : 'opacity-0'}`}>
                        Copiado al portapapeles
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}

          {/* INFORME COMPLETO — oculto temporalmente, restaurar si se necesita
          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-gray-700">Informe Clínico Completo para Ficha</h3>
              <span className="text-[10px] text-gray-400 font-mono">FORMATO ESTÁNDAR ACHS</span>
            </div>
            <textarea readOnly value={reportText} className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-xs rounded-lg border-2 border-slate-800 shadow-inner" />
            <button
              onClick={() => {
                navigator.clipboard.writeText(reportText);
                if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
                setCopiedLabel('__full__');
                copiedTimerRef.current = setTimeout(() => setCopiedLabel(null), 2000);
              }}
              className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center"
            >
              <span className="mr-2">📄</span> COPIAR INFORME COMPLETO
            </button>
            <p className={`text-xs text-center text-green-600 font-medium transition-opacity duration-500 ${copiedLabel === '__full__' ? 'opacity-100' : 'opacity-0'}`}>
              Copiado al portapapeles
            </p>
          </div>
          */}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center p-4">
      <ImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} imageSrc={questionnaireModule?.guideImage} />

      {/* Modal Checkpoint Radiografía */}
      {rxModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4" onClick={() => {}}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-5 relative">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Radiografía requerida</h3>
            {!rxModal.showInfo ? (
              <>
                <div className="text-sm text-gray-700 mb-4">
                  <p className="mb-1">Debe realizar la radiografía correspondiente antes de continuar.</p>
                  {rxModal.rxText && (
                    <div className="mt-2 p-2 rounded-md bg-blue-50 border border-blue-100 text-blue-800">
                      <span className="font-semibold">Orden:</span> {rxModal.rxText}
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <button onClick={handleRxOk} className="flex-1 bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800">OK</button>
                  <button onClick={handleRxRealizada} className="flex-1 bg-gray-100 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-200 border">Realizada</button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm text-gray-700 mb-4">
                  <span className="font-semibold">Sus cambios serán guardados.</span><br />
                  Una vez tenga el resultado de la radiografía ingrese nuevamente el siniestro para continuar con el formulario.
                </p>
                <div className="flex gap-3">
                  <button onClick={handleCloseRxInfoAndExit} className="flex-1 bg-slate-800 text-white font-bold py-2 rounded-lg hover:bg-black">Volver al inicio</button>
                  <button onClick={() => setRxModal({ open: false, checkpointId: null, showInfo: false })} className="flex-1 bg-gray-100 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-200 border">Cancelar</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {draftModal.open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Borrador encontrado</h3>
            <p className="text-sm text-gray-700 mb-6">
              Se encontró un borrador para este siniestro. <br />
              Seleccione Reanudar para continuar con la atención
            </p>
            <div className="flex gap-3">
              <button onClick={handleDraftResume} className="flex-1 bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800">Reanudar</button>
            </div>
          </div>
        </div>
      )}

      {backWarningModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">¿Volver al examen físico?</h3>
            <p className="text-sm text-gray-700 mb-6">
              Al devolverse, sus respuestas de la evaluación clínica serán reiniciadas.<br />
              ¿Desea volver de todas formas?
            </p>
            <div className="flex gap-3">
              <button onClick={confirmTabBack} className="flex-1 bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700">Sí, volver</button>
              <button onClick={() => setBackWarningModal(false)} className="flex-1 bg-gray-100 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-200 border">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-white/20">
        <div className="min-h-[500px]">
          {renderContent()}
        </div>
        <div className="mt-8 border-t pt-6 flex justify-between items-center">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">ACHS Salud • v2.0</p>
          <button onClick={handleRestart} className="bg-red-50 text-red-600 font-bold py-2 px-6 rounded-full hover:bg-red-100 transition-colors text-xs">
            {step === 'result' ? 'NUEVA EVALUACIÓN' : 'REINICIAR'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;