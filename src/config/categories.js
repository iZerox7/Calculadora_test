// Este archivo define la estructura de las categorías y los cuestionarios disponibles.

export const categoriesConfig = {
  lumbago: {
    name: "Lumbago Ocupacional",
    questionnaires: {
      levantamiento: {
        name: "Levantamiento Manual de Carga (Individual)",
        getQuestionsModule: () => import('../questionnaires/lumbagoQuestions.js'),
      },
      tareas_equipo: {
        name: "Tareas en Equipo",
        getQuestionsModule: () => import('../questionnaires/teamTasks.js'),
      },
      empuje_ruedas: {
        name: "Empuje y Tracción (con ruedas)",
        getQuestionsModule: () => import('../questionnaires/pushPullWheels.js'),
      },
      empuje_sin_ruedas: {
        name: "Empuje y Tracción (sin ruedas)",
        getQuestionsModule: () => import('../questionnaires/pushPullNoWheels.js'),
      },
    },
  },
  tobillo_pie: {
    name: "Tobillo y Pie",
    questionnaires: {
      torsion: {
        name: "Torsión de Tobillo",
        getQuestionsModule: () => import('../questionnaires/pushPullNoWheels.js'),
      },
      fractura: {
        name: "Fractura Tobillo",
        getQuestionsModule: () => import('../questionnaires/pushPullNoWheels.js'),
      },
      tbd: {
        name: "TBD",
        getQuestionsModule: () => import('../questionnaires/pushPullNoWheels.js'),
      },
    },
  },
  mano_muneca: {
    name: "Mano y Muñeca",
    questionnaires: {
      tunel_carpiano: {
        name: "Síndrome del Túnel Carpiano",
        getQuestionsModule: () => import('../questionnaires/pushPullNoWheels.js'),
      },
      tendinitis: {
        name: "Tendinitis",
        getQuestionsModule: () => import('../questionnaires/pushPullNoWheels.js'),
      },
      tbd: {
        name: "TBD",
        getQuestionsModule: () => import('../questionnaires/pushPullNoWheels.js'),
      },
    },
  },
};

