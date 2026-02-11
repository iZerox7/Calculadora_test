import { detailedAnamnesisQuestions } from './commonAnamnesis.js';
import { commonDemographicQuestions } from './commonDemographics.js';

// --- Lógica de Generación de Informe ---
const generateClinicalReport = ({ caseId, answers, resultQuestion, allQuestions }) => {
  if (!resultQuestion) return "Generando informe...";

  const findAnswerLabel = (qId, val) => {
    const q = allQuestions.find(q => q.id === qId);
    if (!q || !q.options) return val;
    if (Array.isArray(val)) {
        return val.map(v => q.options.find(opt => opt.value === v)?.label || v).join(', ');
    }
    return q.options.find(opt => opt.value === val)?.label || val;
  };

  let report = `INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - TAREAS EN EQUIPO\n`;
  report += `==================================================\n\n`;
  report += `SINIESTRO ID: ${caseId}\n`;
  report += `Fecha de Evaluación: ${new Date().toLocaleDateString('es-CL')}\n\n`;
  
  report += `I. DATOS DE LA TAREA:\n`;
  report += `- Sexo del paciente: ${findAnswerLabel('sexo_paciente', answers.sexo_paciente) || 'N/A'}\n`;
  report += `- Edad del paciente: ${answers.edad_paciente || 'N/A'} años\n`;
  report += `- Número de personas: ${answers.numero_personas || 'N/A'}\n`;
  report += `- Peso de la carga: ${answers.peso_carga_equipo || 'N/A'} kg\n\n`;

  report += `II. FACTORES DE RIESGO IDENTIFICADOS:\n`;
  report += `- Factores seleccionados: ${findAnswerLabel('factores_riesgo_equipo', answers.factores_riesgo_equipo) || 'Ninguno'}\n\n`;
  
  report += `III. ANAMNESIS ADICIONAL:\n`;
  report += `- Fecha de inicio del dolor: ${answers.fecha_inicio_dolor || 'No reportado'}\n`;
  report += `- Actividad durante inicio del dolor: ${answers.actividad_dolor || 'No reportado'}\n`;
  report += `- Información complementaria a la anamnesis: ${answers.info_complementaria || 'No reportado'}\n`;
  report += `- Características del objeto: ${answers.caracteristicas_objeto || 'No reportado'}\n`;
  report += `- Forma de agarre: ${answers.forma_agarre || 'No reportado'}\n`;
  report += `- Incidentes: ${answers.incidente_durante_tarea || 'No reportado'}\n`;
  report += `- Banderas Rojas: ${answers.banderas_rojas || 'No reportado'}\n\n`;

  report += `IV. GRADO DE EXPOSICIÓN:\n`;
  report += `- ${resultQuestion.text}\n`;

  return report;
};

// --- Protocolos ---
const protocols = {
    "prot_lumbago_equipo_alto": {
        "titulo": "PROTOCOLO MANEJO - EQUIPO RIESGO ALTO",
        "pasos": ["1. REPOSO: Reposo según EVA (48-72h).", "2. TRATAMIENTO: Calor y analgesia.", "3. COORDINACIÓN: Evaluar sincronía del equipo de trabajo.", "4. RESTRICCIÓN: Limitar peso compartido a < 15kg por persona.", "5. CONTROL: En 7 días."]
    },
    "prot_lumbago_equipo_bajo": {
        "titulo": "PROTOCOLO MANEJO - EQUIPO RIESGO BAJO",
        "pasos": ["1. REPOSO RELATIVO.", "2. CALOR LOCAL.", "3. EDUCACIÓN: Entrenamiento en comunicación y agarre simultáneo.", "4. REINTEGRO: Normal."]
    }
};

// --- Lógica de Evaluación de Riesgo Corregida ---
const evaluateRisk = (answers, isFinalEvaluation = false) => {
  if (!isFinalEvaluation) return null;

  const numPersonas = parseInt(answers.numero_personas, 10);
  const peso = parseFloat(answers.peso_carga_equipo);
  const factores = answers.factores_riesgo_equipo || [];

  const resultAlto = { id: "result_alto_equipo", text: "Riesgo Alto", color: "red", protocolId: "prot_lumbago_equipo_alto" };
  const resultBajo = { id: "result_bajo_equipo", text: "Riesgo Bajo", color: "green", protocolId: "prot_lumbago_equipo_bajo" };

  let score = 0;
  factores.forEach(factor => {
      switch(factor) {
          case 'postura_restringida': score += 1; break;
          case 'obstaculos': score += 1; break;
          case 'sin_sujecion': score += 1; break;
          case 'control_deficiente': score += 2; break;
          case 'distancia_4_10': score += 1; break;
          case 'distancia_mas_10': score += 2; break;
          default: break;
      }
  });

  if (numPersonas === 2 && (peso > 35 || score >= 2)) return resultAlto;
  if (numPersonas === 3 && (peso > 55 || score >= 2)) return resultAlto;
  if (numPersonas === 4 && (peso > 75 || score >= 2)) return resultAlto;

  return resultBajo;
};

// --- Definición de Preguntas ---
const questions = [
  // --- Factores de Riesgo (Columna Izquierda) ---
  ...commonDemographicQuestions,
  { id: "numero_personas", text: "Número de personas involucradas", type: "options", group: "risk", options: [{ value: "2", label: "2 Personas" }, { value: "3", label: "3 Personas" }, { value: "4", label: "4 Personas" }] },
  { id: "peso_carga_equipo", text: "¿Cuál es el peso de la carga? (kg)", type: "number", group: "risk", placeholder: "Ej: 40" },
  { id: "factores_riesgo_equipo", text: "Factores de riesgo adicionales", type: "multi", group: "risk", options: [
      { value: "postura_restringida", label: "Postura severamente restringida (+1)" },
      { value: "obstaculos", label: "Hay rampas, escaleras u obstáculos (+1)" },
      { value: "sin_sujecion", label: "Materiales sin sistema de sujeción (+1)" },
      { value: "control_deficiente", label: "Control deficiente de la carga (+2)" },
      { value: "distancia_4_10", label: "Distancia 4-10 metros (+1)" },
      { value: "distancia_mas_10", label: "Distancia > 10 metros (+2)" },
  ]},

  // --- Anamnesis (Columna Derecha) ---
  ...detailedAnamnesisQuestions,

  // --- Resultados ---
  { id: "result_alto_equipo", text: "Riesgo Alto", type: "result", color: "red" },
  { id: "result_bajo_equipo", text: "Riesgo Bajo", type: "result", color: "green" },
];

// Exportamos el módulo del cuestionario
const teamTasksModule = {
  questions,
  generateClinicalReport,
  evaluateRisk,
  protocols,
  // Nueva propiedad para la imagen de guía
  guideImage: 'Memoria_teamwork.png', // Usa la ruta a tu imagen. Ej: '/images/lumbago_guide.png'  
};

export default teamTasksModule;
