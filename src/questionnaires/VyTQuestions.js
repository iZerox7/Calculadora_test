// questionnaires/VyTQuestions.js

export const protocols = {};

export const questions = [
  // ── ANAMNESIS ──────────────────────────────────────────────────────────────
  {
    id: "ley_karin",
    text: "¿Corresponde a evento Ley Karin?",
    type: "options",
    group: "anamnesis",
    options: [
      { value: "acoso_laboral",        label: "Acoso laboral" },
      { value: "acoso_sexual",         label: "Acoso sexual" },
      { value: "violencia_prestacion", label: "Violencia en contexto de prestación de servicios" },
      { value: "violencia_interna",    label: "Violencia por personas que trabajan para el mismo empleador" },
      { value: "no_corresponde",       label: "No corresponde a Ley Karin" },
    ],
  },

  {
    id: "fecha_accidente",
    text: "Fecha del accidente",
    type: "date",
    group: "anamnesis",
  },

  {
    id: "tipo_evento",
    text: "Seleccione a cuál tipo de evento corresponde:",
    type: "options",
    group: "anamnesis",
    options: [
      // Clasificación: Eventos estresantes
      { value: "acoso_sexual",          label: "Acoso sexual" },
      { value: "agresion_fisica",       label: "Agresión o amenaza de agresión física" },
      { value: "asalto",                label: "Asalto con uso de fuerza sin armas" },
      { value: "agresion_verbal",       label: "Agresión verbal" },
      // Clasificación: Evento potencialmente traumático
      { value: "exposicion_muerte",     label: "Exposición a muerte o amenaza de muerte violenta propia o de otra persona (no incluye amenazas verbales)" },
      { value: "exposicion_lesiones",   label: "Exposición a lesiones graves propias o de otra persona" },
      { value: "violencia_sexual",      label: "Violencia sexual (violación o intento de violación o abuso sexual)" },
      { value: "secuestro",             label: "Secuestro" },
      { value: "exposicion_repulsiva",  label: "Exposición repetida o extrema a detalles repulsivos de sucesos traumáticos" },
    ],
  },

  {
    id: "sintomatologia",
    text: "Seleccione los síntomas presentados",
    type: "multi",
    group: "anamnesis",
    options: [
      // Reacción al estrés agudo
      { value: "sintomas_evitativos",         label: "Síntomas evitativos" },
      { value: "recuerdos_vividos",           label: "Recuerdos vívidos" },
      { value: "pesadillas",                  label: "Pesadillas relacionadas con el evento" },
      { value: "sintomas_neurovegetativos",   label: "Síntomas neurovegetativos" },
      { value: "sintomas_disociativos",       label: "Síntomas disociativos" },
      // Reacción de ajuste o reacción vivencial esperable
      { value: "tristeza",                    label: "Tristeza" },
      { value: "rabia",                       label: "Rabia" },
      { value: "preocupacion",                label: "Preocupación" },
      { value: "miedo",                       label: "Miedo" },
      { value: "frustracion",                 label: "Frustración" },
      { value: "liabilidad_emocional",        label: "Liabilidad emocional" },
      { value: "insomnio_leve",               label: "Insomnio leve" },
      { value: "ansiedad_autoregulable",      label: "Ansiedad autoregulable" },
      // Reacción adaptativa al estrés
      { value: "ansiedad_moderada_severa",    label: "Ansiedad moderada a severa" },
      { value: "insomnio_moderado_severo",    label: "Insomnio moderado a severo" },
      { value: "alteraciones_memoria_atencion", label: "Alteraciones de memoria y atención" },
      { value: "animo_bajo",                  label: "Ánimo bajo" },
      { value: "sintomas_intrusivos",         label: "Síntomas intrusivos" },
    ],
  },

  {
    id: "descripcion_evento",
    text: "Descripción del evento",
    type: "textarea",
    group: "anamnesis",
    placeholder: "Describa detalles del evento...",
  },

  // ── RIESGO (pendiente de implementación) ───────────────────────────────────
  {
    id: "evaluacion_pendiente",
    text: "Evaluación clínica en desarrollo — próximamente disponible",
    type: "options",
    group: "risk",
    options: [{ value: "ok", label: "Continuar" }],
  },
];

export const evaluateRisk = () => ({
  id: "pendiente",
  text: "Evaluación en desarrollo",
  color: "green",
  protocolId: "pendiente",
});

export const generateClinicalReport = ({ caseId }) =>
  `INFORME MÉDICO: VIOLENCIA Y TRAUMA\nID CASO: ${caseId}\nEn desarrollo.`;

const questionnaireModule = {
  questions,
  protocols,
  evaluateRisk,
  generateClinicalReport,
  requiresAnamnesis: true,
  anamnesisLeftCount: 3,
};

export default questionnaireModule;
