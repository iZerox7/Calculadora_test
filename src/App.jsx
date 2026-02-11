import React, { useState, useEffect } from 'react';
import { categoriesConfig } from './config/categories';
import { supabase } from './supabaseClient';

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
const QuestionRenderer = ({ question, value, onChange }) => {
    if (!question) return null;
    const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm";

    switch (question.type) {
        case 'options':
        case 'boolean':
            return (
                <div className="flex flex-col space-y-2">
                    {question.options.map(opt => (
                        <button key={opt.value} type="button" onClick={() => onChange(question.id, opt.value)} className={`p-3 rounded-lg text-left transition-colors border ${value === opt.value ? 'bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            );
        case 'button-group':
            return (
                <div className="grid grid-cols-2 gap-2 mt-2">
                    {question.options.map((opt) => (
                        <button key={opt.value} type="button" onClick={() => onChange(question.id, opt.value)} className={`py-2 px-3 text-sm font-bold rounded-lg border ${value === opt.value ? 'bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500' : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            );
        case 'slider':
            return (
                <div className="space-y-3 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <input type="range" min={question.min || 0} max={question.max || 10} value={value || 0} onChange={(e) => onChange(question.id, parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-700" />
                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase"><span>Sin dolor (0)</span><span>Máximo (10)</span></div>
                    <div className={`p-2 text-center rounded-md font-bold text-lg ${(value || 0) <= 3 ? 'bg-green-100 text-green-800' : (value || 0) <= 6 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                        EVA: {value || 0}
                    </div>
                </div>
            );
        case 'multi': return <MultiSelect question={question} value={value} onChange={onChange} />;
        case 'textarea': return <textarea value={value || ''} onChange={(e) => onChange(question.id, e.target.value)} placeholder={question.placeholder || ''} className={`${commonInputClass} h-24`} />;
        case 'number':
        case 'text':
        case 'date': return <input type={question.type} value={value || ''} onChange={(e) => onChange(question.id, e.target.value)} placeholder={question.placeholder || ''} className={commonInputClass} />;
        default: return null;
    }
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

  const handleStart = () => {
    if (!caseId || !selectedQuestionnaireKey) return alert("Complete los campos");
    setAnswers({}); setFinalResult(null); setRiskHistory([]); setWizardFinished(false);
    const firstRisk = questionnaireModule.questions.find(q => q.group === 'risk');
    setCurrentRiskQuestionId(firstRisk.id);
    setStep("questionnaire");
  };

  const handleFormChange = (id, val) => {
    setAnswers(prev => ({...prev, [id]: val}));
  };

  const handleWizardNext = () => {
    const allRisk = questionnaireModule.questions.filter(q => q.group === 'risk');
    const currentIndex = allRisk.findIndex(q => q.id === currentRiskQuestionId);
    
    let nextIndex = currentIndex + 1;
    while(nextIndex < allRisk.length) {
        const nextQ = allRisk[nextIndex];
        if(!nextQ.showIf || nextQ.showIf(answers)) {
            setRiskHistory(prev => [...prev, currentRiskQuestionId]);
            setCurrentRiskQuestionId(nextQ.id);
            return;
        }
        nextIndex++;
    }
    setWizardFinished(true);
  };

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
          await supabase.from('respuestas').insert([resultData]);
      } catch (e) { console.error(e); }
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
                    <h3 className="text-xl font-semibold border-b border-slate-300 pb-2 mb-4">Anamnesis y Examen</h3>
                    {anamnesis.map(q => (
                        <div key={q.id} className="pb-2">
                            <label className="block text-sm font-bold text-gray-700 mb-1">{q.text}</label>
                            <QuestionRenderer question={q} value={answers[q.id]} onChange={handleFormChange} />
                        </div>
                    ))}
                </div>

                <div className="space-y-4">
                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 min-h-[350px] flex flex-col">
                        <h3 className="text-xl font-semibold border-b border-slate-300 pb-2 mb-6">Evaluación Clínica</h3>
                        {!wizardFinished ? (
                            <div className="flex-grow animate-in fade-in slide-in-from-right-4">
                                <label className="block text-base font-bold text-gray-800 mb-4">{currentRisk.text}</label>
                                <QuestionRenderer question={currentRisk} value={answers[currentRisk.id]} onChange={handleFormChange} />
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