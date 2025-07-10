export const levantamientoQuestions = [
  {
    id: "menor_18",
    text: "¿Paciente es menor de 18 años?",
    type: "boolean",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" }
    ],
    next: {
      si: "es_mujer",
      no: "es_mujer",
    }
  },
  {
    id: "es_mujer",
    text: "¿Paciente es mujer?",
    type: "boolean",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" }
    ],
    next: {
      si: "embarazada",
      no: "peso_movilizado",
    }
  },
  {
    id: "embarazada",
    text: "¿Está embarazada?",
    type: "boolean",
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" }
    ],
    next: (answers) => {
      if (answers["embarazada"] === "si") return "result_alto";
      return "peso_movilizado";
    }
  },
  {
    id: "peso_movilizado",
    text: "¿Cuál es el peso movilizado?",
    type: "options",
    options: [
      { value: "hasta_10", label: "Hasta 10 kg" },
      { value: "entre_10_20", label: "Entre 10 y 20 kg" },
      { value: "entre_20_25", label: "Entre 20 y 25 kg" },
      { value: "mayor_25", label: "Mayor a 25 kg" }
    ],
    next: (answers) => {
      const esMujer = answers["es_mujer"] === "si";
      const menor18 = answers["menor_18"] === "si";
      const peso = answers["peso_movilizado"];

      if (peso === "hasta_10") return "result_bajo";

      if (peso === "entre_10_20") {
        return "repetitividad";
      }

      if (peso === "entre_20_25") {
        if (esMujer || menor18) return "result_alto";
        return "repetitividad";
      }

      if (peso === "mayor_25") {
        return "result_alto";
      }

      return "result_evaluacion_adicional";
        }
  },
  {
    id: "repetitividad",
    text: "¿Cuál es la repetitividad del levantamiento?",
    type: "options",
    options: [
      { value: "unico", label: "Levantamiento único" },
      { value: "menos_12", label: "Menos de 12 levantamientos por hora" },
      { value: "mas_12", label: "12 o más levantamientos por hora" }
    ],
    next: (answers) => {
      const peso = answers["peso_movilizado"];
      const rep = answers["repetitividad"];
      const esMujer = answers["es_mujer"] === "si";
      const menor18 = answers["menor_18"] === "si";

      if (rep === "unico") {
        if (peso === "entre_10_20") return "result_bajo";
        if ((peso === "entre_20_25") && (esMujer || menor18)) return "result_alto";
        if ((peso === "entre_20_25") && !esMujer && !menor18) return "tipo_carga";
        return "tipo_carga";
      }
      if (rep === "menos_12") {
        if (peso === "hasta_10" || peso === "entre_10_20") return "tipo_carga";
        if (peso === "entre_20_25") return "result_alto";
      }
      if (rep === "mas_12") {
        if (peso === "hasta_10") return "tipo_carga";
        if (peso === "entre_10_20") return "result_alto";
        if (peso === "entre_20_25") return "result_alto";
      }

      return null;
    }
  },
  {
    id: "factores_postura",
    text: "Selecciona los factores de postura (puede seleccionar más de uno)",
    type: "multi",
    options: [
      { value: "postura_restringida", label: "Postura severamente restringida" },
      { value: "atravesar_rampa", label: "Debe atravesar rampa, terraplén, puertas cerradas u obstáculos" },
      { value: "subir_escaleras", label: "Debe subir escaleras o sortear obstáculos" },
      { value: "materiales_sin_sujecion", label: "Materiales sin sistema de sujeción" },
      { value: "ninguno", label: "Ningún factor adicional" }
    ],
    next: "distancia_transporte"
  },
  {
    id: "tipo_carga",
    text: "Tipo de carga",
    type: "options",
    options: [
      { value: "simetrica", label: "Carga simétrica con ambas manos" },
      { value: "asimetrica", label: "Carga asimétrica, una mano o lateral" }
    ],
    next: "factores_postura"
  },
  {
    id: "distancia_transporte",
    text: "Distancia de transporte",
    type: "options",
    options: [
      { value: "menos_4", label: "Menor a 4 metros" },
      { value: "entre_4_10", label: "Entre 4 y 10 metros" },
      { value: "mas_10", label: "10 o más metros" }
    ],
    next: (answers) => {
      const factores = answers["factores_postura"] || [];
      const tipoCarga = answers["tipo_carga"];
      const distancia = answers["distancia_transporte"];

      const cuentaFactores = Array.isArray(factores)
        ? factores.filter(f => f !== "ninguno").length
        : 0;

      if (tipoCarga === "simetrica") {
        if (distancia === "menos_4") return cuentaFactores >= 2 ? "result_alto" : "result_bajo";
        if (distancia === "entre_4_10") return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
        if (distancia === "mas_10") return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
      } else if (tipoCarga === "asimetrica") {
        if (distancia === "menos_4") return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
        if (distancia === "entre_4_10") return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
        if (distancia === "mas_10") return "result_alto";
      }
      return "result_evaluacion_adicional";
    }
  },
  // Resultados
  {
    id: "result_alto",
    text: "Riesgo Alto: Mecanismo suficiente para generar lesión lumbar",
    type: "info",
    options: []
  },
  {
    id: "result_bajo",
    text: "Riesgo Bajo: Mecanismo insuficiente para generar lesión aguda lumbar",
    type: "info",
    options: []
  },
  {
    id: "result_evaluacion_adicional",
    text: "Requiere una evaluación adicional",
    type: "info",
    options: []
  }
];
