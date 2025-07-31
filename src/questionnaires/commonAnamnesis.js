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
    group: "anamnesis",
    placeholder: "Ej: Estaba levantando una caja desde el suelo..."
  },
  { 
    id: "info_complementaria", 
    text: "Información complementaria a la anamnesis", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Características del dolor / Compromiso neurológico / Otros síntomas Asociados / Antecedentes mórbidos alergias quirúrgicos y deportes   "
  },
  { 
    id: "caracteristicas_objeto", 
    text: "Características del objeto movilizado", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Ej: Caja, bolsas, sacos o describir ej: “sillón de 2 cuerpos”)"
  },
  { 
    id: "forma_agarre", 
    text: "Forma de agarre (sin ayuda mecánica)", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Ej: Moviliza la carga con ambas manos frente a su tronco o lateralizada a un costado o sobre un hombro"
  },
  { 
    id: "incidente_durante_tarea", 
    text: "Describa si hubo algún incidente", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Ej: “mi compañero soltó la carga”, “el piso estaba en mal estado”, “había un obstáculo” o cualquier otro)"
  },
  { 
    id: "banderas_rojas", 
    text: "Indique banderas rojas si corresponde", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Ej: Traumas; Presencia de signos neurológicos/cauda equina; Pérdida de peso inexplicable y/o fiebre; Uso de corticoides sistémicos o abuso de drogas; Antecedente de tumores malignos, inmunosupresión; Historia de dolor constante, progresivo, no mecánico."
  },
];
