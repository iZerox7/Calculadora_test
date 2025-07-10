// questionnaires/commonAnamnesis.js

// Este archivo contiene las preguntas de anamnesis detalladas para ser reutilizadas.
export const detailedAnamnesisQuestions = [
  { 
    id: "fecha_inicio_dolor", 
    text: "Fecha de inicio del dolor", 
    type: "date", 
    group: "anamnesis" 
  },
  { 
    id: "actividad_dolor", 
    text: "Describa la actividad durante el inicio del dolor", 
    type: "textarea", 
    group: "anamnesis" 
  },
  { 
    id: "caracteristicas_objeto", 
    text: "Características del objeto movilizado", 
    type: "textarea", 
    group: "anamnesis" 
  },
  { 
    id: "forma_agarre", 
    text: "Forma de agarre (sin ayuda mecánica)", 
    type: "textarea", 
    group: "anamnesis" 
  },
  { 
    id: "incidente_durante_tarea", 
    text: "Describa si hubo algún incidente", 
    type: "textarea", 
    group: "anamnesis" 
  },
  { 
    id: "banderas_rojas", 
    text: "Indique banderas rojas si corresponde", 
    type: "textarea", 
    group: "anamnesis" 
  },
];
