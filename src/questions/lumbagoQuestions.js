export const lumbagoQuestions = [
  {
    id: "menor_18",
    text: "¿El paciente tiene menos de 18 años?",
    type: "boolean",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    next: {
      si: "es_mujer",
      no: "es_mujer",
    },
  },
  {
    id: "es_mujer",
    text: "¿El paciente es mujer?",
    type: "boolean",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    next: {
      si: "embarazada",
      no: "consulta_dolor_lumbar",
    },
  },
  {
    id: "embarazada",
    text: "¿La paciente está embarazada?",
    type: "boolean",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" },
    ],
    next: {
      si: "result_alto",
      no: "consulta_dolor_lumbar",
    },
  },
  {
    id: "consulta_dolor_lumbar",
    text: "¿El dolor lumbar está asociado a MMC (manejo manual de carga)?",
    type: "boolean",
    options: [
      { value: "no", label: "No asociado a MMC" },
      { value: "si", label: "Asociado a MMC" },
    ],
    next: {
      no: "antecedentes_trauma",
      si: "peso_asociado",
    },
  },
  {
    id: "antecedentes_trauma",
    text: "¿Tiene antecedentes de trauma (por ejemplo: contusión, fractura)?",
    type: "boolean",
    options: [
      { value: "no", label: "Sin antecedentes de trauma" },
      { value: "si", label: "Con antecedentes de trauma" },
    ],
    next: {
      no: "result_medio", // Aquí corregido para que sea "Definir calificación médica..." = result_medio
      si: "result_alto",
    },
  },
  {
    id: "peso_asociado",
    text: "¿Cuál fue el peso movilizado?",
    type: "options",
    options: [
      { value: "menor_igual_10", label: "≤10 Kg" },
      { value: "entre_10_1_y_20", label: "10.1 a 20.0 Kg" },
      { value: "entre_20_1_y_25", label: "20.1 a 25.0 Kg" },
      { value: "mayor_25", label: ">25.0 Kg" },
    ],
    next: (answers) => {
      const esMujer = answers["es_mujer"] === "si";
      const menor18 = answers["menor_18"] === "si";
      const embarazada = answers["embarazada"] === "si";

      if (embarazada) return "result_alto";

      const mayorCarga = ["entre_20_1_y_25", "mayor_25"].includes(answers["peso_asociado"]);

      if (mayorCarga) {
        if (esMujer || menor18) {
          if (
            answers["peso_asociado"] === "entre_20_1_y_25" ||
            answers["peso_asociado"] === "mayor_25"
          ) {
            return "result_alto";
          }
        } else {
          if (answers["peso_asociado"] === "mayor_25") {
            return "result_alto";
          }
        }
      }

      if (answers["peso_asociado"] === "menor_igual_10") return "result_no_trabajo";

      if (
        answers["peso_asociado"] === "entre_10_1_y_20" ||
        answers["peso_asociado"] === "entre_20_1_y_25"
      )
        return "expuesto_a_mmc";

      return "result_no_trabajo";
    },
  },
  {
    id: "expuesto_a_mmc",
    text: "¿El trabajador está expuesto a MMC habitualmente? (ej: bodeguero, peoneta)",
    type: "boolean",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
    next: {
      no: "levantamiento_unico",
      si: "frecuencia_levantamiento",
    },
  },
  {
    id: "levantamiento_unico",
    text: "¿Cuál fue el peso del levantamiento único?",
    type: "options",
    options: [
      { value: "menor_igual_15", label: "≤15 Kg" },
      { value: "mayor_15", label: ">15 Kg" },
    ],
    next: (answers) => {
      if (answers["levantamiento_unico"] === "mayor_15") {
        // Caso: No expuesto y peso >15 → evaluación adicional
        return "result_evaluacion_adicional";
      }
      return "result_no_trabajo";
    },
  },
  {
    id: "frecuencia_levantamiento",
    text: "¿Cuál es la frecuencia de levantamientos por hora?",
    type: "options",
    options: [
      { value: "mayor_igual_12", label: "≥12 levantamientos/hora" },
      { value: "menor_12", label: "<12 levantamientos/hora" },
    ],
    next: {
      mayor_igual_12: "peso_habitual_mmc",
      menor_12: "peso_bajo_12_mmc",
    },
  },
  {
    id: "peso_habitual_mmc",
    text: "¿Cuál es el peso que levanta habitualmente?",
    type: "options",
    options: [
      { value: "menor_igual_15", label: "≤15 Kg" },
      { value: "mayor_15", label: ">15 Kg" },
    ],
    next: (answers) => {
      // Caso: Expuesto, frecuencia ≥12, peso habitual ≤15 → evaluación adicional
      if (
        answers["frecuencia_levantamiento"] === "mayor_igual_12" &&
        answers["peso_habitual_mmc"] === "menor_igual_15"
      ) {
        return "result_evaluacion_adicional";
      }
      return "result_trabajo";
    },
  },
  {
    id: "peso_bajo_12_mmc",
    text: "¿Cuál es el peso que levanta habitualmente?",
    type: "options",
    options: [
      { value: "menor_igual_20", label: "≤20 Kg" },
      { value: "mayor_20", label: ">20 Kg" },
    ],
    next: (answers) => {
      // Caso: Expuesto, frecuencia <12, peso habitual >20 → evaluación adicional
      if (
        answers["frecuencia_levantamiento"] === "menor_12" &&
        answers["peso_bajo_12_mmc"] === "mayor_20"
      ) {
        return "result_evaluacion_adicional";
      }
      return answers["peso_bajo_12_mmc"] === "menor_igual_20"
        ? "result_medio"
        : "result_trabajo";
    },
  },

  // Resultados finales
  {
    id: "result_no_ley",
    type: "result",
    next: { default: "result_no_ley" },
  },
  {
    id: "result_alto",
    type: "result",
    next: { default: "result_alto" },
  },
  {
    id: "result_no_trabajo",
    type: "result",
    next: { default: "result_no_trabajo" },
  },
  {
    id: "result_medio",
    type: "result",
    next: { default: "result_medio" },
  },
  {
    id: "result_trabajo",
    type: "result",
    next: { default: "result_trabajo" },
  },
  {
    id: "result_evaluacion_adicional",
    type: "result",
    next: { default: "result_evaluacion_adicional" },
  },
];
