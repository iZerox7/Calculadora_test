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
};
