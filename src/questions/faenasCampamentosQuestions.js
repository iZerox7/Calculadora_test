// src/questions/faenasCampamentosQuestions.js

export const faenasCampamentosQuestions = [
  {
    id: 'p1',
    text: '¿Qué estaba haciendo el paciente?',
    options: [
      { value: 'trabajando_faena', label: 'Trabajando en Faena' },
      { value: 'desplazandose', label: 'Desplazándose' },
      { value: 'otros', label: 'Otros' },
    ],
    next: {
      trabajando_faena: 'p2a',
      desplazandose: 'p2b',
      otros: 'p2c',
    },
  },
  {
    id: 'p2a',
    text: '¿Cómo ocurrió el accidente?',
    options: [
      { value: 'relacion_directa', label: 'Relación directa con la faena' },
      { value: 'relacion_indirecta', label: 'Relación indirecta con la faena' },
      { value: 'sin_relacion', label: 'Sin relación con el trabajo' },
    ],
    next: {
      relacion_directa: 'result_trabajo',
      relacion_indirecta: 'result_trabajo',
      sin_relacion: 'result_no_trabajo',
    },
  },
  {
    id: 'p2b',
    text: '¿Dónde se estaba desplazando el paciente?',
    options: [
      { value: 'dentro_faena', label: 'Dentro de la Faena' },
      { value: 'faena_campamento', label: 'Movilizándose desde/hacia Faena al campamento o viceversa' },
      { value: 'dentro_campamento', label: 'Dentro del Campamento' },
    ],
    next: {
      dentro_faena: 'p2b_a',
      faena_campamento: 'p2b_b',
      dentro_campamento: 'p2b_c',
    },
  },
  {
    id: 'p2b_a',
    text: '¿Cómo ocurrió el accidente?',
    options: [
      { value: 'relacion_directa', label: 'Relación directa con la faena' },
      { value: 'relacion_indirecta', label: 'Relación indirecta con la faena' },
      { value: 'sin_relacion', label: 'Sin relación con el trabajo' },
    ],
    next: {
      relacion_directa: 'result_trabajo',
      relacion_indirecta: 'result_trabajo',
      sin_relacion: 'result_no_trabajo',
    },
  },
  {
    id: 'p2b_b',
    text: '¿El desplazamiento fue directo, racional e ininterrumpido?',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
    ],
    next: {
      si: 'result_trayecto',
      no: 'result_no_trayecto',
    },
  },
  {
    id: 'p2b_c',
    text: '¿El accidente tiene como razón alguna inseguridad del complejo?',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
    ],
    next: {
      si: 'result_trabajo',
      no: 'result_no_trabajo',
    },
  },
  {
    id: 'p2c',
    text: '¿El accidente tiene como razón alguna inseguridad del complejo?',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
    ],
    next: {
      si: 'result_trabajo',
      no: 'result_no_trabajo',
    },
  },
];
