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

  let report = `INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - EMPUJE Y TRACCIÓN (SIN RUEDAS)\n`;
  report += `==================================================\n\n`;
  report += `SINIESTRO ID: ${caseId}\n`;
  report += `Fecha de Evaluación: ${new Date().toLocaleDateString('es-CL')}\n\n`;
  
  report += `I. DATOS DE LA TAREA:\n`;
  report += `- Tipo de empuje/tracción: ${findAnswerLabel('tipo_empuje_sin_ruedas', answers.tipo_empuje_sin_ruedas) || 'N/A'}\n`;
  report += `- Peso de la carga: ${answers.peso_carga_sin_ruedas || 'N/A'} kg\n\n`;

  report += `II. FACTORES DE RIESGO IDENTIFICADOS:\n`;
  report += `- Factores seleccionados: ${findAnswerLabel('factores_riesgo_sin_ruedas', answers.factores_riesgo_sin_ruedas) || 'Ninguno'}\n\n`;

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
  const tipoEmpuje = answers.tipo_empuje_sin_ruedas;
  const peso = parseFloat(answers.peso_carga_sin_ruedas);
  const factores = answers.factores_riesgo_sin_ruedas || [];

  // Chequeos de riesgo alto inmediato por peso
  if (tipoEmpuje === 'rodado' && peso > 400) return "result_alto_sin_ruedas";
  if (tipoEmpuje === 'pivoteo' && peso > 80) return "result_alto_sin_ruedas";
  if (tipoEmpuje === 'arrastrar' && peso > 25) return "result_alto_sin_ruedas";

  // Si no es la evaluación final, no continuar con el cálculo de puntaje
  if (!isFinalEvaluation) return null;

  // Si es la evaluación final, calcular puntaje y determinar resultado
  let score = 0;
  factores.forEach(factor => {
      switch(factor) {
          case 'obstaculos': score += 1; break;
          case 'sin_manillas': score += 1; break;
          case 'piso_malo': score += 2; break;
          case 'carga_inestable': score += 1; break;
          case 'obstruye_vision': score += 1; break;
          case 'carga_peligrosa': score += 1; break;
          case 'distancia_2_10': score += 1; break;
          case 'distancia_mas_10': score += 2; break;
          case 'ninguno': score += 0; break;
          default: break;
      }
  });

  if (tipoEmpuje === 'rodado') {
    return score >= 2 ? "result_alto_sin_ruedas" : "result_bajo_sin_ruedas";
  }
  if (tipoEmpuje === 'pivoteo') {
    return score >= 2 ? "result_alto_sin_ruedas" : "result_bajo_sin_ruedas";
  }
  if (tipoEmpuje === 'arrastrar') {
    return score >= 2 ? "result_alto_sin_ruedas" : "result_bajo_sin_ruedas";
  }

  return "result_bajo_sin_ruedas";
};

// --- Definición de Preguntas ---
const questions = [
  // --- Factores de Riesgo (Columna Izquierda) ---
  { id: "tipo_empuje_sin_ruedas", text: "Tipo de empuje / tracción", type: "options", group: "risk", options: [
      { value: "rodado", label: "Rodado" }, 
      { value: "pivoteo", label: "Pivoteo y rodado" }, 
      { value: "arrastrar", label: "Arrastrar / Halar / Deslizar" }
  ]},
  { id: "peso_carga_sin_ruedas", text: "¿Cuál es el peso de la carga? (kg)", type: "number", group: "risk", placeholder: "Ej: 50" },
  { id: "factores_riesgo_sin_ruedas", text: "Factores de riesgo adicionales (Puedes seleccionar más de una opción)", type: "multi", group: "risk", options: [
      { value: "obstaculos", label: "Existen obstáculos o escalones (+1)" },
      { value: "sin_manillas", label: "Sin manillas / Contacto incómodo (+1)" },
      { value: "piso_malo", label: "Superficie de piso en mal estado (+2)" },
      { value: "carga_inestable", label: "Carga inestable (+1)" },
      { value: "obstruye_vision", label: "Carga obstruye la visión (+1)" },
      { value: "carga_peligrosa", label: "Carga peligrosa al tacto (+1)" },
      { value: "distancia_2_10", label: "Distancia 2-10 metros (+1)" },
      { value: "distancia_mas_10", label: "Distancia > 10 metros (+2)" },
      { value: "ninguno", label: "Sin Factores de Riesgo" },
  ]},

  // --- Anamnesis (Columna Derecha) ---
  ...detailedAnamnesisQuestions,

  // --- Resultados ---
  { id: "result_alto_sin_ruedas", text: "Riesgo Alto", type: "result", color: "red" },
  { id: "result_bajo_sin_ruedas", text: "Riesgo Bajo", type: "result", color: "green" },
];

const pushPullNoWheelsModule = {
  questions,
  generateClinicalReport,
  evaluateRisk,
  // Nueva propiedad para la imagen de guía
  guideImage: 'Memoria_ruedant.png', // Usa la ruta a tu imagen. Ej: '/images/lumbago_guide.png'  
};

export default pushPullNoWheelsModule;
