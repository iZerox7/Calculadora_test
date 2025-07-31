// questionnaires/commonDemographics.js

// Este archivo contiene preguntas demográficas comunes para ser reutilizadas.
export const commonDemographicQuestions = [
  { 
    id: "sexo_paciente", 
    text: "Sexo del paciente", 
    type: "options", 
    group: "risk", 
    options: [
      { value: "hombre", label: "Hombre" }, 
      { value: "mujer", label: "Mujer" }
    ] 
  },
  { 
    id: "edad_paciente", 
    text: "Edad del paciente", 
    type: "number", 
    group: "risk", 
    placeholder: "Ej: 35" 
  },
];
