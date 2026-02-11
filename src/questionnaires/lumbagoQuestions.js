import { detailedAnamnesisQuestions } from './commonAnamnesis.js';

// --- Protocolos de Manejo ---
export const protocols = {
    "prot_lumbago_alto": {
        "titulo": "PROTOCOLO MANEJO - RIESGO ALTO",
        "pasos": [
            "1. REPOSO: Reposo laboral según intensidad del dolor (48-72h).",
            "2. TRATAMIENTO: Analgesia reglada y calor local.",
            "3. RESTRICCIÓN: Prohibición absoluta de levantamiento de cargas mayor a 5kg.",
            "4. EVALUACIÓN: Derivación a Kinesioterapia para higiene de columna.",
            "5. SEGUIMIENTO: Control médico en 7 días para evaluar reintegro."
        ]
    },
    "prot_lumbago_bajo": {
        "titulo": "PROTOCOLO MANEJO - RIESGO BAJO",
        "pasos": [
            "1. REPOSO RELATIVO: Mantenerse activo, evitar reposo en cama prolongado.",
            "2. CALOR LOCAL: Aplicar calor por 20 min, 3 veces al día.",
            "3. EDUCACIÓN: Reinstruir en técnicas de levantamiento manual de carga.",
            "4. MEDICACIÓN: SOS en caso de dolor moderado.",
            "5. REINTEGRO: Continuar labores con precaución."
        ]
    }
};

// --- Lógica de Generación de Informe (Mantenida intacta) ---
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
  report += `- Información complementaria: ${answers.info_complementaria || 'No reportado'}\n`;
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

// --- Lógica de Evaluación de Riesgo (Corregida para devolver Objeto) ---
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

  // Objeto de respuesta para Riesgo Alto
  const resultAlto = { id: "result_alto", text: "Grado de Exposición: ALTO", color: "red", protocolId: "prot_lumbago_alto" };
  const resultBajo = { id: "result_bajo", text: "Grado de Exposición: BAJO", color: "green", protocolId: "prot_lumbago_bajo" };

  // --- Chequeos de alto riesgo inmediato ---
  if (embarazada) return resultAlto;
  if (peso > 25) return resultAlto;
  if (peso > 20 && peso <= 25 && (esMujer || edad < 18)) return resultAlto;
  if (repetitividad === 'menos_12' && peso > 20 && peso <= 25) return resultAlto;
  if (repetitividad === 'mas_12' && peso > 15 && peso <= 25) return resultAlto;
  
  // --- Evaluación final ---
  if (isFinalEvaluation || true) { // Forzamos evaluación para que el botón funcione siempre
    if (tipoCarga === 'simetrica') {
      if (distancia === 'menos_4' && cuentaFactores >= 2) return resultAlto;
      if (distancia === 'entre_4_10' && cuentaFactores >= 1) return resultAlto;
      if (distancia === 'mas_10' && cuentaFactores >= 1) return resultAlto;
    } else if (tipoCarga === 'asimetrica') {
      if (distancia === 'menos_4' && cuentaFactores >= 1) return resultAlto;
      if (distancia === 'entre_4_10' && cuentaFactores >= 1) return resultAlto;
      if (distancia === 'mas_10') return resultAlto;
    }
    return resultBajo;
  }
  return null;
};

// --- Definición de Preguntas ---
const questions = [
  { id: "sexo_paciente", text: "Sexo del paciente", type: "options", group: "risk", options: [{ value: "hombre", label: "Hombre" }, { value: "mujer", label: "Mujer" }] },
  { id: "embarazada", text: "¿Está embarazada?", type: "options", group: "risk", options: [{ value: "si", label: "Sí" }, { value: "no", label: "No" }], showIf: (answers) => answers["sexo_paciente"] === "mujer" },
  { id: "edad", text: "Edad del paciente", type: "number", group: "risk", placeholder: "Ej: 35" },
  { id: "peso_movilizado_valor", text: "¿Cuánto peso movilizó? (kg)", type: "number", group: "risk", placeholder: "Ej: 15" },
  { id: "repetitividad", text: "Repetitividad / Frecuencia", type: "options", group: "risk", options: [{ value: "unico", label: "Levantamiento único" }, { value: "menos_12", label: "Menos de 12/hora" }, { value: "mas_12", label: "12 o más/hora" }] },
  { id: "tipo_carga", text: "Tipo de carga", type: "options", group: "risk", options: [{ value: "simetrica", label: "Carga simétrica" }, { value: "asimetrica", label: "Carga asimétrica" }] },
  { id: "factores_postura", text: "Factores de postura", type: "multi", group: "risk", options: [{ value: "postura_restringida", label: "Postura restringida" }, { value: "atravesar_rampa", label: "Atraviesa obstáculos" }, { value: "subir_escaleras", label: "Sube escaleras" }, { value: "materiales_sin_sujecion", label: "Sujeción inadecuada" }, { value: "ninguno", label: "Ninguno" }] },
  { id: "distancia_transporte", text: "Distancia de transporte", type: "options", group: "risk", options: [{ value: "menos_4", label: "< 4 metros" }, { value: "entre_4_10", label: "4 a 10 metros" }, { value: "mas_10", label: "> 10 metros" }] },
  ...detailedAnamnesisQuestions,
];

// Exportamos
const lumbagoQuestionModule = {
  questions,
  generateClinicalReport,
  evaluateRisk,
  protocols,
  guideImage: 'Memoria_levantamiento.png', 
};

export default lumbagoQuestionModule;