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

  let report = `INFORME DE EVALUACIÓN DE RIESGO - EMPUJE Y TRACCIÓN (CON RUEDAS)\n`;
  report += `==================================================\n\n`;
  report += `CASO ID: ${caseId}\n`;
  report += `Fecha de Evaluación: ${new Date().toLocaleDateString('es-CL')}\n\n`;
  
  report += `I. DATOS DE LA TAREA:\n`;
  report += `- Tipo de equipo: ${findAnswerLabel('tipo_equipo_ruedas', answers.tipo_equipo_ruedas) || 'N/A'}\n`;
  report += `- Peso de la carga: ${answers.peso_carga_ruedas || 'N/A'} kg\n\n`;

  report += `II. FACTORES DE RIESGO IDENTIFICADOS:\n`;
  report += `- Factores seleccionados: ${findAnswerLabel('factores_riesgo_ruedas', answers.factores_riesgo_ruedas) || 'Ninguno'}\n\n`;
  
  report += `III. ANAMNESIS ADICIONAL:\n`;
  report += `- Fecha de inicio del dolor: ${answers.fecha_inicio_dolor || 'No reportado'}\n`;
  report += `- Actividad durante inicio del dolor: ${answers.actividad_dolor || 'No reportado'}\n`;
  report += `- Características del objeto: ${answers.caracteristicas_objeto || 'No reportado'}\n`;
  report += `- Forma de agarre: ${answers.forma_agarre || 'No reportado'}\n`;
  report += `- Incidentes: ${answers.incidente_durante_tarea || 'No reportado'}\n`;
  report += `- Banderas Rojas: ${answers.banderas_rojas || 'No reportado'}\n\n`;

  report += `IV. CONCLUSIÓN:\n`;
  report += `${resultQuestion.text}\n`;

  return report;
};

// --- Lógica de Evaluación de Riesgo ---
const evaluateRisk = (answers, isFinalEvaluation = false) => {
  if (!isFinalEvaluation) return null;

  const tipoEquipo = answers.tipo_equipo_ruedas;
  const peso = parseFloat(answers.peso_carga_ruedas);
  const factores = answers.factores_riesgo_ruedas || [];

  let score = 0;
  factores.forEach(factor => {
      switch(factor) {
          case 'mal_estado': score += 1; break;
          case 'sin_manillas': score += 1; break;
          case 'piso_malo': score += 2; break;
          case 'carga_inestable': score += 1; break;
          case 'obstruye_vision': score += 1; break;
          case 'carga_peligrosa': score += 1; break;
          case 'distancia_10_30': score += 1; break;
          case 'distancia_mas_30': score += 2; break;
          case 'ninguno': score += 0; break;
          default: break;
      }
  });

  if (tipoEquipo === 'pequeno') {
    if (peso > 50) return "result_alto_ruedas";
    return score >= 2 ? "result_alto_ruedas" : "result_bajo_ruedas";
  }
  if (tipoEquipo === 'mediano') {
    if (peso > 250) return "result_alto_ruedas";
    return score >= 2 ? "result_alto_ruedas" : "result_bajo_ruedas";
  }
  if (tipoEquipo === 'grande') {
    if (peso > 600) return "result_alto_ruedas";
    return score >= 2 ? "result_alto_ruedas" : "result_bajo_ruedas";
  }

  return "result_bajo_ruedas";
};

// --- Definición de Preguntas ---
const questions = [
  // --- Factores de Riesgo (Columna Izquierda) ---
  { id: "tipo_equipo_ruedas", text: "Tipo de equipo con ruedas", type: "options", group: "risk", options: [
      { value: "pequeno", label: "Pequeño (1-2 ruedas)" }, 
      { value: "mediano", label: "Mediano (3+ ruedas)" }, 
      { value: "grande", label: "Grande (dirigible/rieles)" }
  ]},
  { id: "peso_carga_ruedas", text: "¿Cuál es el peso de la carga? (kg)", type: "number", group: "risk", placeholder: "Ej: 100" },
  { id: "factores_riesgo_ruedas", text: "Factores de riesgo adicionales (Puedes seleccionar más de una opción)", type: "multi", group: "risk", options: [
      { value: "mal_estado", label: "Equipo en mal estado (+1)" },
      { value: "sin_manillas", label: "Sin manillas / Contacto incómodo (+1)" },
      { value: "piso_malo", label: "Superficie de piso en mal estado (+2)" },
      { value: "carga_inestable", label: "Carga inestable (+1)" },
      { value: "obstruye_vision", label: "Carga obstruye la visión (+1)" },
      { value: "carga_peligrosa", label: "Carga peligrosa al tacto (+1)" },
      { value: "distancia_10_30", label: "Distancia 10-30 metros (+1)" },
      { value: "distancia_mas_30", label: "Distancia > 30 metros (+2)" },
      { value: "ninguno", label: "Sin Factores de Riesgo" },
  ]},

  // --- Anamnesis (Columna Derecha) ---
  ...detailedAnamnesisQuestions,

  // --- Resultados ---
  { id: "result_alto_ruedas", text: "Riesgo Alto: La combinación de peso, equipo y factores de riesgo supera los límites recomendados.", type: "result", color: "red" },
  { id: "result_bajo_ruedas", text: "Riesgo Bajo: La tarea se encuentra dentro de los límites aceptables.", type: "result", color: "green" },
];

const pushPullWheelsModule = {
  questions,
  generateClinicalReport,
  evaluateRisk,
  // Nueva propiedad para la imagen de guía
  guideImage: 'Memoria_ruedas.png', // Usa la ruta a tu imagen. Ej: '/images/lumbago_guide.png'  
};

export default pushPullWheelsModule;
