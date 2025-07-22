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

  let report = `INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - LEVANTAMIENTO INDIVIDUAL\n`;
  report += `==================================================\n\n`;
  report += `SINIESTRO ID: ${caseId}\n`;
  report += `Fecha de Evaluación: ${new Date().toLocaleDateString('es-CL')}\n\n`;
  
  report += `I. ANAMNESIS:\n`;
  report += `- Fecha de inicio del dolor: ${answers.fecha_inicio_dolor || 'No reportado'}\n`;
  report += `- Actividad durante inicio del dolor: ${answers.actividad_dolor || 'No reportado'}\n`;
  report += `- Características del objeto: ${answers.caracteristicas_objeto || 'No reportado'}\n`;
  report += `- Forma de agarre: ${answers.forma_agarre || 'No reportado'}\n`;
  report += `- Incidentes: ${answers.incidente_durante_tarea || 'No reportado'}\n`;
  report += `- Banderas Rojas: ${answers.banderas_rojas || 'No reportado'}\n\n`;

  report += `II. FACTORES DE RIESGO IDENTIFICADOS:\n`;
  report += `- Sexo del paciente: ${findAnswerLabel('sexo_paciente', answers.sexo_paciente)}\n`;
  if(answers.sexo_paciente === 'mujer') report += `- Embarazo: ${findAnswerLabel('embarazada', answers.embarazada)}\n`;
  report += `- Edad del paciente: ${answers.edad} años\n`;
  report += `- Peso movilizado: ${answers.peso_movilizado_valor || 'N/A'} kg\n`;
  report += `- Repetitividad / Frecuencia: ${findAnswerLabel('repetitividad', answers.repetitividad)}\n`;
  report += `- Tipo de carga: ${findAnswerLabel('tipo_carga', answers.tipo_carga)}\n`;
  report += `- Factores de postura: ${(answers.factores_postura || []).map(val => findAnswerLabel('factores_postura', val)).join(', ') || 'Ninguno'}\n`;
  report += `- Distancia de transporte: ${findAnswerLabel('distancia_transporte', answers.distancia_transporte)}\n\n`;
  
  report += `III. GRADO DE EXPOSICIÓN:\n`;
  report += `- ${resultQuestion.text}\n`;

  return report;
};

// --- Lógica de Evaluación de Riesgo ---
const evaluateRisk = (answers, isFinalEvaluation = false) => {
  const peso = parseFloat(answers["peso_movilizado_valor"]);
  const edad = parseInt(answers["edad"]);
  const esMujer = answers["sexo_paciente"] === "mujer";
  const embarazada = answers["embarazada"] === "si";
  const repetitividad = answers["repetitividad"];
  const tipoCarga = answers["tipo_carga"];
  const distancia = answers["distancia_transporte"];
  const factores = answers["factores_postura"] || [];
  const cuentaFactores = factores.filter(f => f !== "ninguno").length;

  // --- Chequeos de alto riesgo inmediato ---
  if (embarazada) return "result_alto";
  if (peso > 25) return "result_alto";
  if (peso > 20 && peso <= 25 && (esMujer || edad < 18)) return "result_alto";
  if (repetitividad === 'menos_12' && peso > 20 && peso <= 25) return "result_alto";
  if (repetitividad === 'mas_12' && peso > 15 && peso <= 25) return "result_alto";
  
  // --- Si es la evaluación final, se revisan los factores de postura ---
  if (isFinalEvaluation) {
    if (tipoCarga === 'simetrica') {
      if (distancia === 'menos_4' && cuentaFactores >= 2) return "result_alto";
      if (distancia === 'entre_4_10' && cuentaFactores >= 1) return "result_alto";
      if (distancia === 'mas_10' && cuentaFactores >= 1) return "result_alto";
    } else if (tipoCarga === 'asimetrica') {
      if (distancia === 'menos_4' && cuentaFactores >= 1) return "result_alto";
      if (distancia === 'entre_4_10' && cuentaFactores >= 1) return "result_alto";
      if (distancia === 'mas_10') return "result_alto";
    }
    // Si se llega al final y no hay riesgo alto, es bajo.
    return "result_bajo";
  }

  // Si no es la evaluación final y no hay riesgo alto inmediato, no devuelve nada para continuar.
  return null;
};


// --- Definición de Preguntas ---
const questions = [
  // --- Factores de Riesgo (Columna Izquierda) ---
  { id: "sexo_paciente", text: "Sexo del paciente", type: "options", group: "risk", options: [{ value: "hombre", label: "Hombre" }, { value: "mujer", label: "Mujer" }] },
  { id: "embarazada", text: "¿Está embarazada?", type: "boolean", group: "risk", options: [{ value: "si", label: "Sí" }, { value: "no", label: "No" }], showIf: (answers) => answers["sexo_paciente"] === "mujer" },
  { id: "edad", text: "Edad del paciente", type: "number", group: "risk", placeholder: "Ej: 35" },
  { id: "peso_movilizado_valor", text: "¿Cuánto peso movilizó? (kg)", type: "number", group: "risk", placeholder: "Ej: 15" },
  { id: "repetitividad", text: "Repetitividad / Frecuencia", type: "options", group: "risk", options: [{ value: "unico", label: "Levantamiento único" }, { value: "menos_12", label: "Menos de 12/hora" }, { value: "mas_12", label: "12 o más/hora" }] },
  { id: "tipo_carga", text: "Tipo de carga", type: "options", group: "risk", options: [{ value: "simetrica", label: "Carga simétrica" }, { value: "asimetrica", label: "Carga asimétrica" }] },
  { id: "factores_postura", text: "Factores de postura (Puedes seleccionar más de una opción)", type: "multi", group: "risk", options: [{ value: "postura_restringida", label: "Postura restringida" }, { value: "atravesar_rampa", label: "Atraviesa obstáculos" }, { value: "subir_escaleras", label: "Sube escaleras" }, { value: "materiales_sin_sujecion", label: "Sujeción inadecuada" }, { value: "ninguno", label: "Ninguno" }] },
  { id: "distancia_transporte", text: "Distancia de transporte", type: "options", group: "risk", options: [{ value: "menos_4", label: "< 4 metros" }, { value: "entre_4_10", label: "4 a 10 metros" }, { value: "mas_10", label: "> 10 metros" }] },

  // --- Anamnesis (Columna Derecha) ---
  ...detailedAnamnesisQuestions,

  // --- Resultados ---
  { id: "result_alto", text: "Riesgo Alto", type: "result", color: "red" },
  { id: "result_bajo", text: "Riesgo Bajo", type: "result", color: "green" },
];

// Exportamos el módulo del cuestionario
const lumbagoQuestionModule = {
  questions,
  generateClinicalReport,
  evaluateRisk,
  // Nueva propiedad para la imagen de guía
  guideImage: 'Memoria_levantamiento.png', // Usa la ruta a tu imagen. Ej: '/images/lumbago_guide.png'  
};

export default lumbagoQuestionModule;
