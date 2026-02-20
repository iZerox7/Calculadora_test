import React, { useState, useEffect } from 'react';
import { categoriesConfig } from './config/categories';
import { supabase } from './supabaseClient';
import { OccupationSelect } from './OccupationSelect';

// Añade un set de IDs que disparan el autosave
const RX_CHECKPOINT_IDS = new Set(['rx_deformidad', 'rx_ottawa', 'rx_no_tolera_carga', 'rx_varias']);
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

// --- Componente MultiSelect ---
const MultiSelect = ({ question, value, onChange }) => {
  const [selected, setSelected] = useState(value || []);
  const handleSelect = (optionValue) => {
    let newSelected;
    if (optionValue === "ninguno") {
      newSelected = selected.includes("ninguno") ? [] : ["ninguno"];
    } else {
      if (selected.includes(optionValue)) {
        newSelected = selected.filter((v) => v !== optionValue && v !== "ninguno");
      } else {
        newSelected = [...selected.filter((v) => v !== "ninguno"), optionValue];
      }
    }
    setSelected(newSelected);
    onChange(question.id, newSelected);
  };

  return (
    <div className="flex flex-col space-y-2">
      {question.options.map((option) => (
        <button key={option.value} type="button" onClick={() => handleSelect(option.value)} className={`p-3 rounded-lg text-left transition-colors border ${selected.includes(option.value) ? "bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500" : "bg-gray-100 hover:bg-gray-200 border-gray-300"}`}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

// --- Componente QuestionRenderer ---
const QuestionRenderer = ({ question, value, onChange, answers }) => {
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
            // Guarda ocupación y CARGA en answers
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
          {/* Si no hay opciones válidas, muestra un aviso sutil */}
          {optionsToRender.length === 0 && (
            <div className="text-xs text-gray-500 italic">No hay opciones disponibles para la combinación seleccionada.</div>
          )}
        </div>
      );

    case 'button-group':
      return (
        <div className="grid grid-cols-2 gap-2 mt-2">
          {optionsToRender.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(question.id, opt.value)}
              className={`py-2 px-3 text-sm font-bold rounded-lg border ${value === opt.value ? 'bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
            >
              {opt.label}
            </button>
          ))}
          {optionsToRender.length === 0 && (
            <div className="col-span-2 text-xs text-gray-500 italic">No hay opciones disponibles.</div>
          )}
        </div>
      );

    case 'slider':
      return (
        <div className="space-y-3 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="range"
            min={question.min || 0}
            max={question.max || 10}
            value={value || 0}
            onChange={(e) => onChange(question.id, parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
          />
          <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
            <span>Sin dolor (0)</span><span>Máximo (10)</span>
          </div>
          <div className={`p-2 text-center rounded-md font-bold text-lg ${(value || 0) <= 3 ? 'bg-green-100 text-green-800' : (value || 0) <= 6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
            EVA: {value || 0}
          </div>
        </div>
      );

    case 'multi':
      return <MultiSelect question={question} value={value} onChange={onChange} />;

    case 'textarea':
      return (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(question.id, e.target.value)}
          placeholder={question.placeholder || ''}
          className={`${commonInputClass} h-24`}
        />
      );

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

/**
 * Retorna los escenarios permitidos para la fractura elegida.
 * - Para abiertas: sólo 'escenario_4'.
 * - Para cerradas: según tu tabla de restricciones.
 * - Si no hay clasificación aún: permite 'escenario_4' (válido para cualquier fractura).
 */
function allowedScenariosFor(ans) {
  const tipo = ans.hay_fractura; // 'si_abierta' | 'si_cerrada' | 'no' | undefined
  if (tipo !== 'si_abierta' && tipo !== 'si_cerrada') return [];

  // Escenario 4 puede ser cualquier fractura
  const always = ['escenario_4'];

  if (tipo === 'si_abierta') {
    // Abiertas: sólo Escenario 4
    return always;
  }

  // Cerradas
  const clasVal = ans.clasificacion_especifica_cerrada;
  if (!clasVal) return always; // aún no sabemos, dejamos solo 4

  const allowed = new Set(always);

  // Escenario 1:
  // - Permitido si la clasificación es Pilón tibial cerrada o Maléolo peroné cerrada.
  if (['pilon_tibial_cerrada', 'maleolo_perone_cerrada'].includes(clasVal)) {
    allowed.add('escenario_1');
  }

  // Escenario 2:
  // - Permitido si la clasificación es Bimaleolar cerrada
  if (clasVal === 'bimaleolar_cerrada') {
    allowed.add('escenario_2');
  }

  // Escenario 3:
  // - Permitido si la clasificación está en el set de SC3
  if (CLOSED_SC3_ALLOWED.has(clasVal)) {
    allowed.add('escenario_3');
  }

  return Array.from(allowed);
}

/**
 * Retorna Weber permitido dado Escenario 1 y la clasificación cerrada.
 * - Pilón tibial cerrada -> Sólo Weber A
 * - Maléolo peroné cerrada -> Weber A, B, C
 * - Otras -> ninguna (escenario 1 no debería ser elegible)
 */
function allowedWeberFor(ans) {
  if (ans.escenario_fractura !== 'escenario_1') return [];
  const clasVal = ans.clasificacion_especifica_cerrada;
  if (clasVal === 'pilon_tibial_cerrada')       return ['weber_a'];
  if (clasVal === 'maleolo_perone_cerrada')     return ['weber_a', 'weber_b_c']; // <-- aquí el cambio clave
  return [];
}


/**
 * Dada una lista de opciones [{value, label}], la filtra por valores permitidos.
 */
function filterOptions(options, allowedValues) {
  const allow = new Set(allowedValues);
  return options.filter(o => allow.has(o.value));
}

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

 
  // Modal pequeño para RX Checkpoint
  const [rxModal, setRxModal] = useState({
    open: false,
    checkpointId: null,   // 'rx_deformidad' | 'rx_ottawa' | ...
    showInfo: false,       // para mostrar el mensaje tras pulsar "OK"
    rxText: ''
  });
  
  const saveDraft = React.useCallback(
  async (checkpointId, nextAnswers) => {
    // No grabes si faltan estas llaves
    if (!caseId || !selectedQuestionnaireKey) {
      console.warn('saveDraft: faltan caseId o selectedQuestionnaireKey');
      return { data: null, error: new Error('Missing keys') };
    }

    // Usa el snapshot más reciente de answers
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
      .select()            // <<-- importante para ver respuesta y depurar
      .single();           // devuelve solo la fila afectada

    if (error) {
      console.error('saveDraft error:', { error, status, statusText, payload });
    } else {
      // Puedes descomentar si quieres ver que guardó:
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

const handleStart = async () => {
  if (!caseId || !selectedQuestionnaireKey) return alert("Complete los campos");
  if (!questionnaireModule?.questions?.length) return alert("Cargando cuestionario, inténtalo de nuevo...");

  const firstRisk = questionnaireModule.questions.find(q => q.group === 'risk');

  // Busca si hay draft
  const draft = await loadDraftIfExists();
  if (draft) {
    const reanudar = window.confirm("Se encontró un borrador para este caso. ¿Deseas reanudar?");
    if (reanudar) {
      // Reanudar
      setAnswers(draft.respuestas || {});
      setWizardFinished(!!draft.wizard_finished);
      setCurrentRiskQuestionId(draft.current_risk_question_id || firstRisk.id);
      setStep("questionnaire");
      return;
    } else {
      // Borrar draft y empezar de cero
      await supabase
        .from('respuestas_draft')
        .delete()
        .eq('id_caso', caseId)
        .eq('cuestionario', selectedQuestionnaireKey);
    }
  }

  // Flujo desde cero
  setAnswers({});
  setFinalResult(null);
  setRiskHistory([]);
  setWizardFinished(false);
  setCurrentRiskQuestionId(firstRisk.id);
  setStep("questionnaire");
};

const openCheckpointModal = async (checkpointId) => {
  // snapshot de respuestas al momento de abrir el modal
  const snapshot = { ...answers };
  await saveDraft(checkpointId, snapshot);   // <<-- espera el guardado
  
   // Obtiene el texto de la pregunta checkpoint para mostrarlo en el modal
  const qText = questionnaireModule?.questions?.find(q => q.id === checkpointId)?.text || '';

  setRxModal({ open: true, checkpointId, showInfo: false, rxText: qText });
};

const handleRxRealizada = () => {
  if (!rxModal.checkpointId) return;
  // Marca la pregunta checkpoint como respondida "listo"
  handleFormChange(rxModal.checkpointId, 'listo');
  // Cierra modal para permitir seguir completando
  setRxModal({ open: false, checkpointId: null, showInfo: false });
};

const handleRxOk = async () => {
  if (!rxModal.checkpointId) return;
  // Reintenta guardar (por si hubo cambios adicionales) y espera
  await saveDraft(rxModal.checkpointId, { ...answers });
  setRxModal(prev => ({ ...prev, showInfo: true }));
};
const handleCloseRxInfoAndExit = () => {
  // Cierra modal y vuelve a la pantalla inicial (para reingresar luego con el mismo caseId)
  setRxModal({ open: false, checkpointId: null, showInfo: false });
  setStep('selection');
};

const handleFormChange = (id, val) => {
  setAnswers(prev => {
    let next = { ...prev, [id]: val };

    // --- Normalización / limpieza en cascada ---

    // Si cambia hay_fractura:
    if (id === 'hay_fractura') {
      // Limpiar todo lo que depende de esto
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

    // Si cambió la clasificación cerrada o abierta, limpiar escenarios/Weber si quedaron inválidos
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

    // Si cambió escenario, limpiar Weber cuando corresponda
    if (id === 'escenario_fractura') {
      if (val !== 'escenario_1') {
        next.weber = undefined;
      } else {
        // Si es escenario 1, valida que sea elegible según la clasificación actual
        const allowedSc = allowedScenariosFor(next);
        if (!allowedSc.includes('escenario_1')) {
          // No permitido -> limpiar y salir
          next.escenario_fractura = undefined;
        }
      }
    }

    // Si cambió Weber, validar contra la clasificación
    if (id === 'weber') {
      const allowedW = allowedWeberFor(next);
      if (!allowedW.includes(val)) {
        next.weber = undefined;
      }
    }

    // --- Guardado intermedio en checkpoints (mantén tu lógica) ---
    if (RX_CHECKPOINT_IDS.has(id)) {
      saveDraft(id, next);
    }

    return next;
  });
};
``

const handleWizardNext = async  () => {
  const allRisk = questionnaireModule.questions.filter(q => q.group === 'risk');
  const currentIndex = allRisk.findIndex(q => q.id === currentRiskQuestionId);

  let nextIndex = currentIndex + 1;
  while (nextIndex < allRisk.length) {
    const nextQ = allRisk[nextIndex];
    if (!nextQ.showIf || nextQ.showIf(answers)) {
      setRiskHistory(prev => [...prev, currentRiskQuestionId]);
      setCurrentRiskQuestionId(nextQ.id);

      // Si llegamos a un checkpoint → guardar

    if (RX_CHECKPOINT_IDS.has(nextQ.id)) {
      await openCheckpointModal(nextQ.id);  // <<-- espera antes de seguir
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

  const resultData = {
    id_caso: caseId,
    cuestionario: selectedQuestionnaireKey,
    respuestas: answers,
    resultado: evaluation.text,
    timestamp: new Date().toISOString(),
  };

  try {
    const { error } = await supabase.from('respuestas').insert([resultData]);
    if (error) console.error(error);

    // Limpia el draft al finalizar
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
    setStep("selection"); setCaseId(""); setAnswers({}); setWizardFinished(false); setSelectedCategory(null); setSelectedQuestionnaireKey(null);
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
              <input type="text" value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Ej: 8123456" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
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
                <label className="block text-sm font-medium text-gray-700">Mecanismo</label>
                <select value={selectedQuestionnaireKey || ""} onChange={(e) => setSelectedQuestionnaireKey(e.target.value)} className="mt-1 block w-full py-2 border-gray-300 rounded-md">
                  <option value="" disabled>Seleccione...</option>
                  {Object.keys(categoriesConfig[selectedCategory].questionnaires).map(k => <option key={k} value={k}>{categoriesConfig[selectedCategory].questionnaires[k].name}</option>)}
                </select>
              </div>
            )}
            <button onClick={handleStart} disabled={!caseId || !selectedQuestionnaireKey} className="w-full bg-blue-700 text-white font-bold py-3 rounded-lg hover:bg-blue-800 disabled:bg-gray-400">COMENZAR</button>
          </div>
        </div>
      );
    }

    if (step === "questionnaire") {
        const anamnesis = questionnaireModule.questions.filter(q => q.group === 'anamnesis');
        const currentRisk = questionnaireModule.questions.find(q => q.id === currentRiskQuestionId);

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

                <div className="space-y-4">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[350px] flex flex-col">
                        <h3 className="text-xl font-semibold border-b border-slate-300 pb-2 mb-6">Evaluación Clínica</h3>
                        {!wizardFinished ? (
                            <div className="flex-grow animate-in fade-in slide-in-from-right-4">
                                <label className="block text-base font-bold text-gray-800 mb-4">{currentRisk.text}</label>
                                <QuestionRenderer question={currentRisk} value={answers[currentRisk.id]} onChange={handleFormChange} answers={answers} />
                                <div className="flex justify-between mt-8">
                                    <button disabled={riskHistory.length === 0} onClick={() => {
                                        const last = riskHistory.pop();
                                        setRiskHistory([...riskHistory]);
                                        setCurrentRiskQuestionId(last);
                                    }} className="text-gray-400 font-bold hover:text-gray-600">← VOLVER</button>
                                    <button onClick={handleWizardNext} disabled={answers[currentRiskQuestionId] === undefined} className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 shadow-md">SIGUIENTE</button>
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

    if (step === "result" && finalResult) {
      const reportText = questionnaireModule.generateClinicalReport({ 
          caseId, 
          answers, 
          resultQuestion: finalResult, 
          protocols: questionnaireModule.protocols,
          allQuestions: questionnaireModule.questions // AGREGADO PARA LUMBAGO
      });
      const currentProtocol = questionnaireModule.protocols[finalResult.protocolId];

      return (
        <div className="space-y-6">
          <div className={`p-6 border-l-8 rounded-lg shadow-sm ${finalResult.color === 'red' ? 'bg-red-50 border-red-500 text-red-900' : 'bg-green-50 border-green-500 text-green-900'}`}>
            <p className="text-sm font-bold uppercase tracking-widest opacity-60">Diagnóstico Sugerido</p>
            <h2 className="text-3xl font-black uppercase tracking-tighter">{finalResult.text}</h2>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-blue-800 font-bold text-lg mb-4 flex items-center">
              <span className="mr-2">📋</span> Protocolo de Manejo Sugerido:
            </h3>
            <div className="space-y-3">
              <p className="font-bold text-blue-900 text-sm">{currentProtocol?.titulo}</p>
              <ul className="space-y-2">
                {currentProtocol?.pasos.map((paso, i) => (
                  <li key={i} className="flex items-start text-sm text-blue-800">
                    <span className="font-bold mr-2 text-blue-400">{i + 1}.</span>
                    {paso}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-gray-700">Informe Clínico para Ficha</h3>
              <span className="text-[10px] text-gray-400 font-mono">FORMATO ESTÁNDAR ACHS</span>
            </div>
            <textarea readOnly value={reportText} className="w-full h-64 p-4 bg-slate-900 text-green-400 font-mono text-xs rounded-lg border-2 border-slate-800 shadow-inner" />
            <button onClick={() => { navigator.clipboard.writeText(reportText); alert("Informe copiado al portapapeles"); }} className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg flex items-center justify-center">
              <span className="mr-2">📄</span> COPIAR INFORME COMPLETO
            </button>
          </div>
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

            <button
             onClick={handleRxOk}
             className="flex-1 bg-blue-700 text-white font-bold py-2 rounded-lg hover:bg-blue-800"
           >
             OK
           </button>
           <button
             onClick={handleRxRealizada}
             className="flex-1 bg-gray-100 text-gray-800 font-bold py-2 rounded-lg hover:bg-gray-200 border"
           >
             Realizada
           </button>

          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-700 mb-4">
            <span className="font-semibold">Sus cambios serán guardados.</span><br />
            Una vez tenga el resultado de la radiografía ingrese nuevamente el siniestro para continuar con el formulario.
          </p>
          <button
            onClick={handleCloseRxInfoAndExit}
            className="w-full bg-slate-800 text-white font-bold py-2 rounded-lg hover:bg-black"
          >
            Volver al inicio
          </button>
        </>
      )}
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