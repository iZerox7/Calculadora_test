export const lumbagoQuestions = [
  {
    id: 'l1',
    text: '¿El paciente tiene menos de 18 años?',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
    ],
    next: {
      si: 'result_no_ley',
      no: 'l2',
    },
  },
  {
    id: 'l2',
    text: '¿El paciente es mujer?',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
    ],
    next: {
      si: 'l3',
      no: 'l4',
    },
  },
  {
    id: 'l3',
    text: '¿La paciente está embarazada?',
    options: [
      { value: 'si', label: 'Sí' },
      { value: 'no', label: 'No' },
    ],
    next: {
      si: 'l4',
      no: 'l4',
    },
  },
  {
    id: 'l4',
    text: '¿Cuánto fue el peso movilizado?',
    options: [
      { value: 'p10', label: 'Hasta 10kg' },
      { value: 'p10_15', label: 'Entre 10 y 15kg' },
      { value: 'p15_20', label: 'Entre 15 y 20kg' },
      { value: 'p20_25', label: 'Entre 20 y 25kg' },
      { value: 'p25', label: 'Más de 25kg' },
    ],
    next: {
      p10: 'result_bajo',
      p10_15: 'result_bajo',
      p15_20: 'l5',
      p20_25: 'l5',
      p25: 'result_alto',
    },
  },
  {
    id: 'l5',
    text: 'Frecuencia de la carga',
    options: [
      { value: 'unico', label: 'Único' },
      { value: 'menos_12', label: 'Menos de 12 veces por hora' },
      { value: 'mas_12', label: 'Más de 12 veces por hora' },
    ],
    next: {
      unico: 'result_medio',
      menos_12: 'result_medio',
      mas_12: 'l6',
    },
  },
  {
    id: 'l6',
    text: 'Distancia de carga',
    options: [
      { value: 'd1', label: 'Hasta 4 metros' },
      { value: 'd2', label: '4 a 10 metros' },
      { value: 'd3', label: '10 o más metros' },
    ],
    next: {
      d1: 'l7',
      d2: 'l7',
      d3: 'l7',
    },
  },
  {
    id: 'l7',
    text: 'Características de la carga',
    options: [
      { value: 'simetrica', label: 'Simétrica con ambas manos' },
      { value: 'torso_lateral', label: 'Torso simétrico pero carga hacia un lado' },
      { value: 'asimetrica', label: 'Carga asimétrica' },
      { value: 'transporte_lateral', label: 'Transporte lateral con 2 manos o sobre un hombro' },
    ],
    next: {
      simetrica: 'result_bajo',
      torso_lateral: 'result_alto',
      asimetrica: 'result_alto',
      transporte_lateral: 'result_alto',
    },
  },
];
