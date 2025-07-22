import { detailedAnamnesisQuestions } from './commonAnamnesis.js';

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
  report += `- Número de personas: ${answers.numero_personas || 'N/A'}\n`;
  report += `- Peso de la carga: ${answers.peso_carga_equipo || 'N/A'} kg\n\n`;

  report += `II. FACTORES DE RIESGO IDENTIFICADOS:\n`;
  report += `- Factores seleccionados: ${findAnswerLabel('factores_riesgo_equipo', answers.factores_riesgo_equipo) || 'Ninguno'}\n\n`;
  
  report += `III. ANAMNESIS ADICIONAL:\n`;
  report += `- Fecha de inicio del dolor: ${answers.fecha_inicio_dolor || 'No reportado'}\n`;
  report += `- Actividad durante inicio del dolor: ${answers.actividad_dolor || 'No reportado'}\n`;
  report += `- Características del objeto: ${answers.caracteristicas_objeto || 'No reportado'}\n`;
  report += `- Forma de agarre: ${answers.forma_agarre || 'No reportado'}\n`;
  report += `- Incidentes: ${answers.incidente_durante_tarea || 'No reportado'}\n`;
  report += `- Banderas Rojas: ${answers.banderas_rojas || 'No reportado'}\n\n`;

  report += `IV. GRADO DE EXPOSICIÓN:\n`;
  report += `- ${resultQuestion.text}\n`;

  return report;
};

// --- Lógica de Evaluación de Riesgo ---
const evaluateRisk = (answers, isFinalEvaluation = false) => {
  if (!isFinalEvaluation) return null; // Solo evaluar al final

  const numPersonas = parseInt(answers.numero_personas, 10);
  const peso = parseFloat(answers.peso_carga_equipo);
  const factores = answers.factores_riesgo_equipo || [];

  let score = 0;
  factores.forEach(factor => {
      switch(factor) {
          case 'postura_restringida': score += 1; break;
          case 'obstaculos': score += 1; break;
          case 'sin_sujecion': score += 1; break;
          case 'control_deficiente': score += 2; break;
          case 'distancia_4_10': score += 1; break;
          case 'distancia_mas_10': score += 2; break;
          case 'ninguno': score += 0; break;
          default: break;
      }
  });

  if (numPersonas === 2) {
    if (peso > 35) return "result_alto_equipo";
    return score >= 2 ? "result_alto_equipo" : "result_bajo_equipo";
  }
  if (numPersonas === 3) {
    if (peso > 55) return "result_alto_equipo";
    return score >= 2 ? "result_alto_equipo" : "result_bajo_equipo";
  }
  if (numPersonas === 4) {
    if (peso > 75) return "result_alto_equipo";
    return score >= 2 ? "result_alto_equipo" : "result_bajo_equipo";
  }

  return "result_bajo_equipo";
};


// --- Definición de Preguntas ---
const questions = [
  // --- Factores de Riesgo (Columna Izquierda) ---
  { id: "numero_personas", text: "Número de personas involucradas", type: "options", group: "risk", options: [{ value: "2", label: "2 Personas" }, { value: "3", label: "3 Personas" }, { value: "4", label: "4 Personas" }] },
  { id: "peso_carga_equipo", text: "¿Cuál es el peso de la carga? (kg)", type: "number", group: "risk", placeholder: "Ej: 40" },
  { id: "factores_riesgo_equipo", text: "Factores de riesgo adicionales (Puedes seleccionar más de una opción)", type: "multi", group: "risk", options: [
      { value: "postura_restringida", label: "Postura severamente restringida (+1)" },
      { value: "obstaculos", label: "Hay rampas, escaleras u obstáculos (+1)" },
      { value: "sin_sujecion", label: "Materiales sin sistema de sujeción (+1)" },
      { value: "control_deficiente", label: "Control deficiente de la carga (+2)" },
      { value: "distancia_4_10", label: "Distancia 4-10 metros (+1)" },
      { value: "distancia_mas_10", label: "Distancia > 10 metros (+2)" },
      { value: "ninguno", label: "Sin Factores de Riesgo" },
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
  // Nueva propiedad para la imagen de guía
  guideImage: 'Memoria_teamwork.png', // Usa la ruta a tu imagen. Ej: '/images/lumbago_guide.png'  
};

export default teamTasksModule;
