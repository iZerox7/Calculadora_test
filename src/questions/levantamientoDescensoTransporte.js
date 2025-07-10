export const levantamientoQuestions = [
  // --- Preguntas clave iniciales ---
  {
    id: "sexo_paciente",
    text: "Sexo del paciente",
    type: "options",
    options: [
      { value: "hombre", label: "Hombre" },
      { value: "mujer", label: "Mujer" }
    ],
    next: (answers) => {
      if (answers["sexo_paciente"] === "mujer") return "embarazada";
      return "edad";
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
    next: "edad"
  },
  {
    id: "edad",
    text: "Edad del paciente",
    type: "number",
    next: "fecha_inicio_dolor"
  },
  {
    id: "fecha_inicio_dolor",
    text: "Fecha de inicio de los síntomas",
    type: "date",
    next: "actividad_dolor"
  },

  // --- Interrogatorio específico ---
  {
    id: "actividad_dolor",
    text: "Describa la actividad durante la cual experimentó el inicio del dolor",
    type: "text",
    next: "frecuencia_duracion_levantamiento"
  },
  {
    id: "frecuencia_duracion_levantamiento",
    text: "Frecuencia y duración de las actividades de manejo manual de carga (indicar si levanta peso habitualmente, aproximar veces por hora o si es levantamiento único)",
    type: "text",
    next: "peso_movilizado_valor"
  },
  {
    id: "peso_movilizado_valor",
    text: "Peso estimado de la carga (si es variable considerar la mayor) (kg)",
    type: "number",
    next: "caracteristicas_objeto"
  },
  {
    id: "caracteristicas_objeto",
    text: "Características del objeto movilizado (caja, bolsas, sacos o describir ej: “sillón de 2 cuerpos”)",
    type: "text",
    next: "uso_ayudas"
  },
  {
    id: "uso_ayudas",
    text: "Uso de ayudas mecánicas para el manejo de carga (yegua, transpaleta, etc)",
    type: "text",
    next: "forma_agarre"
  },
  {
    id: "forma_agarre",
    text: "Si no utiliza ayuda mecánica, moviliza la carga con ambas manos frente a su tronco o lateralizada a un costado o sobre un hombro",
    type: "text",
    next: "levantamiento_equipo"
  },
  {
    id: "levantamiento_equipo",
    text: "Si la carga fue repartida entre varias personas indicar número",
    type: "text",
    next: "incidente_durante_tarea"
  },
  {
    id: "incidente_durante_tarea",
    text: "Si corresponde describir incidente durante la tarea (“mi compañero soltó la carga”, “el piso estaba en mal estado”, “había un obstáculo” o cualquier otro)",
    type: "text",
    next: "distancia_transporte"
  },
  {
    id: "distancia_transporte",
    text: "Distancia de traslado de carga (estimar distancia en metros)",
    type: "number",
    next: "repetitividad"
  },

  // --- Preguntas clásicas para decisión ---
  {
    id: "repetitividad",
    text: "¿Cuál es la repetitividad del levantamiento?",
    type: "options",
    options: [
      { value: "unico", label: "Levantamiento único" },
      { value: "menos_12", label: "Menos de 12 levantamientos por hora" },
      { value: "mas_12", label: "12 o más levantamientos por hora" }
    ],
    next: "tipo_carga"
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
    next: (answers) => {
      const peso = parseFloat(answers["peso_movilizado_valor"]);
      const distancia = parseFloat(answers["distancia_transporte"]);
      const factores = answers["factores_postura"] || [];
      const tipoCarga = answers["tipo_carga"];
      const cuentaFactores = Array.isArray(factores)
        ? factores.filter(f => f !== "ninguno").length
        : 0;

      const esMujer = answers["sexo_paciente"] === "mujer";
      const edad = parseInt(answers["edad"]);
      const embarazada = answers["embarazada"] === "si";

      if (peso > 25) return "result_alto";
      if (peso > 20 && (esMujer || edad < 18)) return "result_alto";
      if (embarazada) return "result_alto";

      if (tipoCarga === "simetrica") {
        if (distancia < 4) return cuentaFactores >= 2 ? "result_alto" : "result_bajo";
        if (distancia >= 4 && distancia <= 10) return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
        if (distancia > 10) return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
      } else if (tipoCarga === "asimetrica") {
        if (distancia < 4) return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
        if (distancia >= 4 && distancia <= 10) return cuentaFactores >= 1 ? "result_alto" : "result_bajo";
        if (distancia > 10) return "result_alto";
      }

      return "result_evaluacion_adicional";
    }
  },

  // --- Resultados ---
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
