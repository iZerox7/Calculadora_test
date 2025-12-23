import React, { useState, useEffect, useMemo } from 'react';
import { categoriesConfig } from './config/categories';
import { supabase } from './supabaseClient';

// NOTA: Para que este código funcione, asegúrate de que tu proyecto esté configurado para usar Tailwind CSS.

// --- Componente ImageModal ---
const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-white p-2 rounded-lg shadow-xl max-w-7xl max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center text-2xl font-bold shadow-lg hover:bg-gray-200 transition-colors z-10"
        >
          &times;
        </button>
        <img src={imageSrc} alt="Imagen de Guía" className="object-contain w-full h-full max-h-[90vh] rounded" />
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
        <button key={option.value} type="button" onClick={() => handleSelect(option.value)} className={`p-3 rounded-lg text-left transition-colors duration-200 border ${selected.includes(option.value) ? "bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500" : "bg-gray-100 hover:bg-gray-200 border-gray-300"}`}>
          {option.label}
        </button>
      ))}
    </div>
  );
};

// --- Componente para renderizar una sola pregunta ---
const QuestionRenderer = ({ question, value, onChange }) => {
    if (!question) return null;

    const commonInputClass = "mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm";

    switch (question.type) {
        case 'options':
        case 'boolean':
            return (
                <div className="flex flex-col space-y-2">
                    {question.options.map(opt => (
                        <button key={opt.value} type="button" onClick={() => onChange(question.id, opt.value)} className={`p-3 rounded-lg text-left transition-colors duration-200 border ${value === opt.value ? 'bg-blue-700 text-white border-blue-800 ring-2 ring-blue-500' : 'bg-gray-100 hover:bg-gray-200 border-gray-300'}`}>
                            {opt.label}
                        </button>
                    ))}
                </div>
            );
        case 'multi':
            return <MultiSelect question={question} value={value} onChange={onChange} />;
        case 'textarea':
             return <textarea name={question.id} value={value || ''} onChange={(e) => onChange(question.id, e.target.value)} placeholder={question.placeholder || ''} className={`${commonInputClass} h-24`} />;
        case 'number':
        case 'text':
        case 'date':
            return <input type={question.type} name={question.id} value={value || ''} onChange={(e) => onChange(question.id, e.target.value)} placeholder={question.placeholder || ''} className={commonInputClass} />;
        default:
            return null;
    }
};


// --- COMPONENTE PRINCIPAL ---
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
      const questionnaireInfo = categoriesConfig[selectedCategory]?.questionnaires[selectedQuestionnaireKey];
      if (questionnaireInfo && typeof questionnaireInfo.getQuestionsModule === 'function') {
        questionnaireInfo.getQuestionsModule().then(module => {
          setQuestionnaireModule({ ...questionnaireInfo, ...(module.default || module) });
        });
      }
    } else {
      setQuestionnaireModule(null);
    }
  }, [selectedCategory, selectedQuestionnaireKey]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const saveToSupabase = async (data) => {
    try {
      const { error } = await supabase.from('respuestas').insert([data]);
      if (error) throw error;
    } catch (error) {
      console.error("Error guardando en Supabase:", error);
      alert(`Error al guardar: ${error.message}`);
    }
  };

  const handleStart = () => {
    if (!caseId || !selectedCategory || !questionnaireModule) {
      alert("Por favor, complete todos los campos para comenzar.");
      return;
    }
    setAnswers({});
    setFinalResult(null);
    setRiskHistory([]);
    setWizardFinished(false);
    const firstRiskQuestion = questionnaireModule.questions.find(q => q.group === 'risk');
    setCurrentRiskQuestionId(firstRiskQuestion.id);
    setStep("questionnaire");
  };

  const handleFormChange = (questionId, value) => {
      const newAnswers = {...answers, [questionId]: value};
      if (questionId === 'sexo_paciente' && value === 'hombre') {
          delete newAnswers.embarazada;
      }
      setAnswers(newAnswers);
  };

  const handleWizardNext = () => {
    const currentQuestion = questionnaireModule.questions.find(q => q.id === currentRiskQuestionId);
    if (!currentQuestion || answers[currentRiskQuestionId] === undefined) return;

    const allRiskQuestions = questionnaireModule.questions.filter(q => q.group === 'risk');
    const currentIndex = allRiskQuestions.findIndex(q => q.id === currentRiskQuestionId);
    
    let nextIndex = currentIndex + 1;
    while(nextIndex < allRiskQuestions.length) {
        const nextQuestion = allRiskQuestions[nextIndex];
        if(!nextQuestion.showIf || nextQuestion.showIf(answers)) {
            setRiskHistory(prev => [...prev, currentRiskQuestionId]);
            setCurrentRiskQuestionId(nextQuestion.id);
            return;
        }
        nextIndex++;
    }
    
    setWizardFinished(true);
  };

  const handleEvaluate = () => {
      const finalResultId = questionnaireModule.evaluateRisk(answers, true);
      const finalResultQuestion = questionnaireModule.questions.find(q => q.id === finalResultId);
      setFinalResult(finalResultQuestion);
      
      const riskQuestionIds = questionnaireModule.questions
        .filter(q => q.group === 'risk')
        .map(q => q.id);
      
      const riskAnswersOnly = Object.fromEntries(
        Object.entries(answers).filter(([key]) => riskQuestionIds.includes(key))
      );

      const resultData = {
        id_caso: caseId,
        cuestionario: selectedQuestionnaireKey,
        respuestas: riskAnswersOnly,
        resultado: finalResultQuestion.text,
        timestamp: new Date().toISOString(),
      };
      saveToSupabase(resultData);
      setStep('result');
  };

  const handleBack = () => {
      if(riskHistory.length > 0) {
          const lastId = riskHistory.pop();
          setRiskHistory([...riskHistory]);
          setCurrentRiskQuestionId(lastId);
          setWizardFinished(false);
      }
  };

  const handleRestart = () => {
    setStep("selection");
    setCaseId("");
    setSelectedCategory(null);
    setSelectedQuestionnaireKey(null);
    setAnswers({});
    setFinalResult(null);
    setQuestionnaireModule(null);
    setRiskHistory([]);
    setCurrentRiskQuestionId(null);
    setWizardFinished(false);
  };

  const renderContent = () => {
    if (step === "selection") {
      return (
        <div className="space-y-5 text-center">
          <img src="logo_normal.png" alt="Logo de la Calculadora Médica" className="w-40 h-auto mx-auto mb-4" />
          <h2 className="text-3xl font-bold" style={{color: '#002a6c'}}>Asistente médico virtual</h2>
          <div className="text-left">
            <label htmlFor="caseId" className="block text-sm font-medium text-gray-700">ID del Siniestro</label>
            <input type="text" id="caseId" value={caseId} onChange={(e) => setCaseId(e.target.value)} placeholder="Ej: 8123456" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm" />
          </div>
          <div className="text-left">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Zona Lesional</label>
            <select id="category" value={selectedCategory || ""} onChange={(e) => { setSelectedCategory(e.target.value); setSelectedQuestionnaireKey(null); }} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
              <option value="" disabled>Seleccione una categoría</option>
              {Object.keys(categoriesConfig).map(key => (<option key={key} value={key}>{categoriesConfig[key].name}</option>))}
            </select>
          </div>
          {selectedCategory && (
            <div className="text-left">
              <label htmlFor="questionnaire" className="block text-sm font-medium text-gray-700">Mecanismo</label>
              <select id="questionnaire" value={selectedQuestionnaireKey || ""} onChange={(e) => setSelectedQuestionnaireKey(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option value="" disabled>Seleccione un mecanismo</option>
                {Object.keys(categoriesConfig[selectedCategory].questionnaires).map(key => (<option key={key} value={key}>{categoriesConfig[selectedCategory].questionnaires[key].name}</option>))}
              </select>
            </div>
          )}
          <button type="button" onClick={handleStart} disabled={!caseId || !selectedQuestionnaireKey || !questionnaireModule} className="w-full bg-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
            Comenzar
          </button>
        </div>
      );
    }

    if (step === "questionnaire" && questionnaireModule) {
        const anamnesisQuestions = questionnaireModule.questions.filter(q => q.group === 'anamnesis');
        const currentRiskQuestion = questionnaireModule.questions.find(q => q.id === currentRiskQuestionId);

        return (
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-8 gap-y-6 md:gap-y-0">
                    {/* Columna Izquierda: Anamnesis */}
                    <div className="space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                        <h3 className="text-xl font-semibold text-gray-800 border-b border-slate-300 pb-2 mb-6">Anamnesis</h3>
                        {anamnesisQuestions.map(q => (
                            <div key={q.id}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{q.text}</label>
                                <QuestionRenderer question={q} value={answers[q.id]} onChange={handleFormChange} />
                            </div>
                        ))}
                    </div>

                    {/* Columna Derecha: Wizard y Resultado Preliminar */}
                    <div className="flex flex-col space-y-4">
                        <div className="flex-grow space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
                            <h3 className="text-xl font-semibold text-gray-800 border-b border-slate-300 pb-2 mb-6">Factores de Riesgo</h3>
                            {currentRiskQuestion && !wizardFinished && (
                                <div key={currentRiskQuestion.id}>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{currentRiskQuestion.text}</label>
                                    <QuestionRenderer question={currentRiskQuestion} value={answers[currentRiskQuestion.id]} onChange={handleFormChange} />
                                    <div className="flex justify-between items-center pt-4">
                                        {riskHistory.length > 0 ? (
                                            <button type="button" onClick={handleBack} className="text-gray-600 hover:text-gray-900 transition-colors font-medium">&larr; Volver</button>
                                        ) : <div />}
                                        <button type="button" onClick={handleWizardNext} disabled={answers[currentRiskQuestionId] === undefined} className="bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors disabled:bg-gray-400">
                                            Siguiente
                                        </button>
                                    </div>
                                </div>
                            )}
                            {wizardFinished && (
                                <div className="flex flex-col items-center justify-center text-center p-4 bg-green-50 rounded-lg">
                                    <p className="text-lg font-medium text-green-800">Sección completada.</p>
                                    <p className="text-sm text-gray-600 mt-2">Complete la anamnesis para luego generar el resultado final.</p>
                                </div>
                            )}
                        </div>
                        
                        {questionnaireModule.guideImage && (
                            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                                <h3 className="text-xl font-semibold text-gray-800 border-b border-slate-300 pb-2 mb-6">Guía Calculadora</h3>
                                <img 
                                    src={questionnaireModule.guideImage} 
                                    alt="Imagen de Guía" 
                                    className="w-full h-auto rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => openModal()}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {wizardFinished && (
                    <button type="button" onClick={handleEvaluate} className="mt-8 w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 transition-colors">
                        Obtener Resultado Final
                    </button>
                )}
            </div>
        );
    }

    if (step === "result" && finalResult) {
      const resultColorClass = finalResult.color === 'red' ? 'bg-red-100 border-red-500 text-red-800' : 'bg-green-100 border-green-500 text-green-800';
      const reportText = questionnaireModule.generateClinicalReport({ caseId, answers, resultQuestion: finalResult, allQuestions: questionnaireModule.questions });
      return (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Resultado de la Evaluación</h2>
          <div className={`p-4 border-l-4 rounded-lg ${resultColorClass}`}><p className="font-bold text-center text-xl">{finalResult.text}</p></div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Resumen de Respuestas</h3>
            <div className="p-4 bg-gray-50 rounded-lg border max-h-60 overflow-y-auto">
              <ul className="list-disc list-inside space-y-1 text-sm">
                {Object.entries(answers).map(([qId, ans]) => {
                  const question = questionnaireModule.questions.find(q => q.id === qId);
                  if (!question) return null;
                  let answerDisplay = Array.isArray(ans) ? ans.join(', ') : ans;
                  const optionLabel = question.options?.find(o => o.value === ans)?.label;
                  if (optionLabel) answerDisplay = optionLabel;
                  return (<li key={qId}><strong className="font-semibold">{question.text}:</strong> {answerDisplay}</li>)
                })}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Plantilla de Informe Clínico</h3>
            <textarea readOnly value={reportText} className="w-full h-64 p-2 border border-gray-300 rounded-md bg-gray-50 font-mono text-xs" />
            <button type="button" onClick={() => { navigator.clipboard.writeText(reportText).then(() => alert('Informe copiado al portapapeles')).catch(err => console.error('Error al copiar: ', err)); }} className="w-full bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">Copiar Informe</button>
          </div>
        </div>
      );
    }
    return <p className="text-center text-gray-500 animate-pulse">Cargando...</p>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-500 font-sans flex items-center justify-center p-4">
      <ImageModal isOpen={isModalOpen} onClose={closeModal} imageSrc={questionnaireModule?.guideImage} />
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="min-h-[500px] flex flex-col justify-center">
          {renderContent()}
        </div>
        <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end items-center">
          <button type="button" onClick={handleRestart} className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
            {step === 'result' ? 'Nueva Evaluación' : 'Reiniciar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
