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
  violencia_y_trauma: {
    name: "Violencia y Trauma",
    questionnaires: {
      consulta_vyt: {
        name: "(Piloto) Consulta por Violencia y Trauma",
        getQuestionsModule: () => import('../questionnaires/VyTQuestions.js'),
      },
    },
  },
  tobillo_pie: {
    name: "Tobillo y Pie",
    questionnaires: {
      torsion_tobillo: {
        name: "(Piloto) Consulta de torsión de tobillo",
        getQuestionsModule: () => import('../questionnaires/tobilloQuestions.js'),
      },
      ortejos: {
        name: "(Piloto) Consulta por torsión de ortejos",
        getQuestionsModule: () => import('../questionnaires/ortejosQuestions.js'),
      },
      metaTarso: {
        name: "(Piloto) Consulta por torsión de pie",
        getQuestionsModule: () => import('../questionnaires/MetaTarsoQuestions.js'),
      },
    },
  },
};