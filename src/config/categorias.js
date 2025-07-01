import { faenasCampamentosQuestions } from '../questions/faenasCampamentosQuestions';
import { lumbagoQuestions } from '../questions/lumbagoQuestions';

export const categorias = {
  cobertura: {
    label: 'Cobertura',
    cuestionarios: {
      // faenas: {
      //   label: 'Faenas y Campamentos',
      //   preguntas: faenasCampamentosQuestions,
      // },
      lumbago: {
        label: 'Lumbago',
        preguntas: lumbagoQuestions,
      },
    },
  },
  seguimiento: {
    label: 'Score seguimiento del tratamiento',
    cuestionarios: {
        gas_saludmental: {
            label: 'GAF Salud Mental',
            preguntas: faenasCampamentosQuestions,
        },
        fracturas: {
            label: 'Fracturas',
            preguntas: faenasCampamentosQuestions,
       },
    },
  },
  licencias: {
    label: 'Licencias Médicas derivación',
    cuestionarios: {},
  },
};
