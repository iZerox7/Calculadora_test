// questionnaires/ortejosQuestions.js

// ─────────────────────────────────────────────
// GENERADORES DE PROTOCOLO DINÁMICOS
// ─────────────────────────────────────────────

export const getProtocoloEsguince1Ortejos = (answers) => {
  const carga = Number(answers?.carga_laboral);
  const esSTP = carga === 1;

  const pasosBase = [
    "Realizar actividades habituales",
    "Realizar ejercicios indicados en pauta",
    "Reposo deportivo por 7-10 días",
    ...(!esSTP
      ? [
          "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad",
        ]
      : []),
    "En caso de dolor invalidante, aumento de volumen o cambio de coloración del sitio lesionado acudir a agencia ACHS más cercana",
    "Inmovilización: vendaje solidario con suela rígida por 3 días",
    "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 3 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 3 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días.",
  ];

  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DE LOS ORTEJOS Y ANTEPIÉ GRADO I",
    pasos: pasosBase,
  };
};

export const getProtocoloEsguince2Ortejos = (answers) => {
  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO II",
    pasos: [
      "Reposo laboral",
      "Reposo deportivo",
      "Realizar ejercicios indicados en pauta",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad",
      "Descansar con extremidad en alto",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
      "Inmovilización: vendaje solidario con suela rígida por 5 días",
      "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días",
      "Control con médico AP en agencia en 5 a 7 días",
    ],
  };
};

export const getProtocoloEsguince3Ortejos = (answers) => {
  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO III",
    pasos: [
      "Reposo laboral",
      "Reposo deportivo",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad",
      "Descansar con extremidad en alto",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
      "Inmovilización: suela rígida o bota entre 7-10 días",
      "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 5 días. Ajustar según respuesta. En caso de no respuesta a los 7-10 días, considerar escalar a tramadol/paracetamol 37,5 mg/ 325 mg vo c/8-12 h. No extender uso de AINES por más de 7 días",
      "Control con médico AP en agencia en 5 a 7 días",
    ],
  };
};

export const getProtocoloFxDerivacionSUOrtejos = (answers) => {
  const esExpuestaPrimerOrtejo =
    answers?.clasificacion_abierta_ortejos === "abierta_primer_ortj";
  const esExpuestaNoPrimerOrtejo =
    answers?.clasificacion_abierta_ortejos === "abierta_ex_primer_ortj";
  const esCerradaPrimerOrtejo =
    answers?.clasificacion_cerrada_ortejos === "cerrada_primer_ortj";
  const esCerradaNoPrimerOrtejo =
    answers?.clasificacion_cerrada_ortejos === "cerrada_ex_primer_ortj";
  const hayCompromisoArticular = answers?.compromiso_articular === "si";
  const esFracturaCerrada = esCerradaPrimerOrtejo || esCerradaNoPrimerOrtejo;

  let nombreFractura = "";
  if (esExpuestaPrimerOrtejo) {
    nombreFractura = "FRACTURA PRIMER ORTEJO ABIERTA";
  } else if (esExpuestaNoPrimerOrtejo) {
    nombreFractura = "FRACTURA ORTEJOS ABIERTA (EXCEPTO PRIMER ORTEJO)";
  } else if (esCerradaPrimerOrtejo) {
    nombreFractura = "FRACTURA PRIMER ORTEJO CERRADA";
  } else if (esCerradaNoPrimerOrtejo) {
    nombreFractura = "FRACTURA ORTEJOS CERRADA (EXCEPTO PRIMER ORTEJO)";
  }

  let textoDerivacion = "🚨 Derivación inmediata a HT SU";
  if (esFracturaCerrada && hayCompromisoArticular) {
    textoDerivacion = "🚨 Derivación inmediata a HT TyP";
  }

  return {
    titulo: `PROTOCOLO DE MANEJO - ${nombreFractura}`,
    pasos: [
      `${textoDerivacion} o centro hospitalario con capacidad resolutiva 🚨`,
      "Inmovilización con valva de la ambulancia",
      "Aplicar frío local",
      "Medicamentos: Analgesia EV y profilaxis tromboembólica con aspirina o dabigatrán una vez inmovilizada",
      "Vacunación antitetánica (en caso de fractura expuesta)",
    ],
  };
};

// ─────────────────────────────────────────────
// LABELS FRACTURA DE PIE (reutilizado en preguntas, evaluateRisk e informe)
// ─────────────────────────────────────────────

const FRACTURA_PIE_LABELS = {
  fractura_astragalo_abierta:          "Fractura Astragalo Abierta",
  fractura_astragalo_cerrada:          "Fractura Astragalo Cerrada",
  fractura_calcaneo_abierta:           "Fractura Calcáneo Abierta",
  fractura_calcaneo_cerrada:           "Fractura Calcáneo Cerrada",
  fractura_cuello_talo_cerrada:        "Fractura Cuello Talo Cerrada",
  fractura_cuerpo_talo_cerrada:        "Fractura Cuerpo Talo Cerrada",
  fractura_escafoides_tarso_cerrada:   "Fractura Escafoides Tarso del Pie Cerrada",
  fractura_huesos_tarso_cerrada:       "Fractura Huesos del Tarso (excepto Escafoides) Cerrada",
  fractura_metatarsiano_abierta:       "Fractura Metatarsiano Abierta",
  fractura_metatarsiano_cerrada:       "Fractura Metatarsiano Cerrada",
  fracturas_perifericas_talo_abiertas: "Fracturas Periféricas Talo Abiertas",
  fracturas_perifericas_talo_cerradas: "Fracturas Periféricas Talo Cerradas",
  luxafractura_lisfranc_abierta:       "Luxafractura de Lisfranc Abierta",
  luxofractura_chopart_cerrada:        "Luxofractura de Chopart Cerrada",
  luxofractura_lisfranc_cerrada:       "Luxofractura de Lisfranc Cerrada",
  luxofractura_pie_abierta:            "Luxofractura del Pie Abierta",
  luxofractura_pie_cerrada:            "Luxofractura del Pie Cerrada",
};

// ─────────────────────────────────────────────
// PROTOCOLOS ESTÁTICOS
// ─────────────────────────────────────────────

export const protocols = {
  protocolo_esguince_1_ortj: {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO I",
    pasos: [], // se sobreescribe dinámicamente con getProtocoloEsguince1Ortejos
  },
  protocolo_esguince_2_ortj: {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO II",
    pasos: [], // se sobreescribe dinámicamente con getProtocoloEsguince2Ortejos
  },
  protocolo_esguince_3_ortj: {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO III",
    pasos: [], // se sobreescribe dinámicamente con getProtocoloEsguince3Ortejos
  },
  protocolo_fx_cerrada_ortejos: {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA ORTEJOS CERRADA",
    pasos: [
      "Reposo",
      "Pie en alto",
      "Evitar carga hasta evidencia de consolidación",
      "Frío local por 15 minutos 3 veces al día por 48 hrs luego calor local por 15 minutos, 3 veces al día hasta control",
      "Analgesia según EVA",
      "Medicamentos: Analgesia y profilaxis tromboembólica con aspirina. Iniciar con Paracetamol 1gr cada 8hrs VO y ketoprofeno 50mg o ibuprofeno 400mg cada 8hrs por 5-7 días VO. Ajustar según respuesta",
      "Inmovilización: vendaje solidario con zapato POP y bastones",
      "Control con médico AP al día 7",
      "Control SOS",
    ],
  },
  protocolo_fx_derivacion_su_ortejos: {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA ORTEJOS CON DERIVACIÓN",
    pasos: [], // se sobreescribe dinámicamente con getProtocoloFxDerivacionSUOrtejos
  },
  protocolo_fractura_pie: {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA DE PIE",
    pasos: ["Pendiente de integración"],
  },
};

// ─────────────────────────────────────────────
// PREGUNTAS
// ─────────────────────────────────────────────

export const questions = [
  {
    id: "pie",
    text: "Pie",
    type: "options",
    group: "anamnesis",
    options: [
      { value: "Izquierdo", label: "Izquierdo" },
      { value: "Derecho",   label: "Derecho" },
      { value: "Bilateral", label: "Bilateral" },
    ],
  },
  {
    id: "carga_laboral",
    text: "Carga laboral habitual",
    type: "button-group",
    group: "anamnesis",
    options: [
      { value: 1, labelBold: "Liviana", labelDesc: "sedentario/escritorio" },
      { value: 2, labelBold: "Mediana", labelDesc: "de pie y en movimiento" },
      { value: 3, labelBold: "Pesada",  labelDesc: "levanta peso/maquinaria" },
    ],
  },
  {
    id: "eva",
    text: "Dolor (EVA)",
    type: "slider",
    group: "anamnesis",
    min: 0,
    max: 10,
  },
  {
    id: "aumento_volumen",
    text: "Aumento de volumen (Edema)",
    type: "options",
    group: "anamnesis",
    options: [
      { value: "ninguno",  label: "Sin aumento de volumen" },
      { value: "leve",     label: "Leve (+)" },
      { value: "moderado", label: "Moderado (++)" },
      { value: "severo",   label: "Severo (+++)" },
    ],
  },
  {
    id: "inestabilidad",
    text: "Inestabilidad",
    type: "options",
    group: "anamnesis",
    options: [
      { value: "sin_inestabilidad", label: "Sin inestabilidad" },
      { value: "con_inestabilidad", label: "Con inestabilidad" },
    ],
  },
  {
    id: "hallazgos_fisicos",
    text: "Examen Físico: Marcha / Heridas / Maniobras",
    type: "textarea",
    group: "anamnesis",
    placeholder: "Describa presencia de heridas, tipo de marcha...",
  },
  {
    id: "tipo_dolor",
    text: "¿Cómo se presenta el dolor?",
    type: "options",
    group: "risk",
    options: [
      { value: "difuso", label: "Difuso" },
      { value: "local",  label: "Local" },
    ],
  },

  // ── GRUPO RIESGO ──────────────────────────────

  // RX 1: dolor difuso + AVO moderado o severo
  {
    id: "rx_dolor_difuso",
    text: "Realizar Radiografía Pie Ap-Lat-Obl del dedo afectado (con carga si tolera)",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.tipo_dolor === "difuso" &&
      (ans.aumento_volumen === "moderado" || ans.aumento_volumen === "severo"),
    options: [{ value: "listo", label: "✅ Realizada" }],
  },

  // RX 2: dolor local + AVO moderado o severo
  {
    id: "rx_dolor_local",
    text: "Realizar Radiografía Ap-Lat-Obl del dedo afectado",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.tipo_dolor === "local" &&
      (ans.aumento_volumen === "moderado" || ans.aumento_volumen === "severo"),
    options: [{ value: "listo", label: "✅ Realizada" }],
  },

  // ¿Hay fractura? — solo si se realizó alguna RX
  {
    id: "hay_fractura",
    text: "¿Se detectó una fractura?",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.rx_dolor_difuso === "listo" || ans.rx_dolor_local === "listo",
    options: [
      { value: "no",         label: "No" },
      { value: "si_cerrada", label: "Sí, cerrada" },
      { value: "si_abierta", label: "Sí, abierta" },
      { value: "si_otra",    label: "Sí, pero no en ortejos" },
    ],
  },

  // Fractura de pie: lista desplegable
  {
    id: "fractura_pie_tipo",
    text: "Seleccione la fractura detectada:",
    type: "select",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_otra",
    options: Object.entries(FRACTURA_PIE_LABELS).map(([value, label]) => ({
      value,
      label,
    })).concat([{ value: "otra", label: "Otra" }]),
  },

  // Fractura de pie: texto libre si seleccionó "Otra"
  {
    id: "fractura_pie_otra",
    text: "Especifique la fractura:",
    type: "textarea",
    group: "risk",
    showIf: (ans) =>
      ans.hay_fractura === "si_otra" && ans.fractura_pie_tipo === "otra",
    placeholder: "Describa la fractura detectada...",
  },

  // Clasificación fractura cerrada de ortejos
  {
    id: "clasificacion_cerrada_ortejos",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_cerrada",
    options: [
      { value: "cerrada_primer_ortj",    label: "Primer ortejo" },
      { value: "cerrada_ex_primer_ortj", label: "Ortejos excepto primer ortejo" },
    ],
  },

  // Compromiso articular — solo fractura cerrada de primer ortejo
  {
    id: "compromiso_articular",
    text: "¿Hay compromiso articular?",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.clasificacion_cerrada_ortejos === "cerrada_primer_ortj",
    options: [
      { value: "no", label: "No" },
      { value: "si", label: "Sí" },
    ],
  },

  // Clasificación fractura abierta de ortejos
  {
    id: "clasificacion_abierta_ortejos",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_abierta",
    options: [
      { value: "abierta_primer_ortj",    label: "Primer ortejo" },
      { value: "abierta_ex_primer_ortj", label: "Ortejos excepto primer ortejo" },
    ],
  },
];

// ─────────────────────────────────────────────
// REPOSO DINÁMICO POR CARGA
// ─────────────────────────────────────────────

export const restTextPorCarga = (answers, protocolId) => {
  const carga = Number(answers?.carga_laboral);
  if (!carga || ![1, 2, 3].includes(carga)) return null;

  const reposoPorProtocolo = {
    protocolo_esguince_1_ortj: {
      1: "Sin reposo",
      2: "hasta 5 días",
      3: "hasta 5 días",
    },
    protocolo_esguince_2_ortj: {
      1: "hasta 5 días",
      2: "hasta 10 días",
      3: "hasta 10 días",
    },
    protocolo_esguince_3_ortj: {
      1: "hasta 7 días",
      2: "hasta 14 días",
      3: "hasta 14 días",
    },
  };

  const map = reposoPorProtocolo[protocolId];
  const indicacion = map?.[carga];
  return indicacion ? `Reposo según carga laboral: ${indicacion}` : null;
};

// ─────────────────────────────────────────────
// EVALUACIÓN DE RIESGO / DIAGNÓSTICO SUGERIDO
// ─────────────────────────────────────────────

export const evaluateRisk = (answers) => {
  const volumen = answers.aumento_volumen;
  const hayFractura = answers.hay_fractura;
  const inestabilidad = answers.inestabilidad;
  const huboRx =
    answers.rx_dolor_difuso === "listo" || answers.rx_dolor_local === "listo";

  // ── 1. FRACTURA DE PIE (no de ortejo) ────────

  if (hayFractura === "si_otra") {
    const opcion = answers.fractura_pie_tipo;
    if (!opcion) return null; // aún no respondió

    const diagText =
      opcion === "otra"
        ? answers.fractura_pie_otra?.trim() || "Fractura de Pie - Sin especificar"
        : FRACTURA_PIE_LABELS[opcion] || opcion;

    return {
      id: "fractura_pie",
      text: diagText,
      color: "red",
      protocolId: "protocolo_fractura_pie",
    };
  }

  // ── 2. FRACTURA ABIERTA DE ORTEJO ────────────

  if (hayFractura === "si_abierta") {
    const clasVal = answers.clasificacion_abierta_ortejos;
    const LABELS_ABIERTA = {
      abierta_primer_ortj:    "Fractura Primer Ortejo Abierta",
      abierta_ex_primer_ortj: "Fractura Ortejos Abierta (excepto primer ortejo)",
    };
    return {
      id: `fx_abierta_${clasVal || "sin_clasificar"}`,
      text: LABELS_ABIERTA[clasVal] || "Fractura de Ortejo Abierta: No especificada",
      color: "red",
      protocolId: "protocolo_fx_derivacion_su_ortejos",
    };
  }

  // ── 3. FRACTURA CERRADA DE ORTEJO ────────────

  if (hayFractura === "si_cerrada") {
    const clasVal = answers.clasificacion_cerrada_ortejos;
    const compromisoArticular = answers.compromiso_articular;

    if (clasVal === "cerrada_primer_ortj") {
      return {
        id: "fx_cerrada_primer_ortj",
        text:
          compromisoArticular === "si"
            ? "Fractura Primer Ortejo Cerrada con Compromiso Articular"
            : "Fractura Primer Ortejo Cerrada",
        color: "red",
        protocolId: "protocolo_fx_derivacion_su_ortejos",
      };
    }

    if (clasVal === "cerrada_ex_primer_ortj") {
      return {
        id: "fx_cerrada_ex_primer_ortj",
        text: "Fractura Ortejos Cerrada (excepto primer ortejo)",
        color: "red",
        protocolId: "protocolo_fx_cerrada_ortejos",
      };
    }

    // Cerrada sin clasificar aún
    return {
      id: "fx_cerrada_sin_clasificar",
      text: "Fractura Ortejo Cerrada: No especificada",
      color: "red",
      protocolId: "protocolo_fx_derivacion_su_ortejos",
    };
  }

  // ── 4. ESGUINCE ──────────────────────────────

  // Grado I: AVO ninguno o leve → nunca llega a RX
  if (volumen === "ninguno" || volumen === "leve") {
    return {
      id: "e1_ortj",
      text: "Esguince de Ortejos Grado I",
      color: "green",
      protocolId: "protocolo_esguince_1_ortj",
    };
  }

  // Grado II o III: RX realizada y sin fractura
  if (huboRx && hayFractura === "no") {
    if (inestabilidad === "con_inestabilidad") {
      return {
        id: "e3_ortj",
        text: "Esguince de Ortejos Grado III",
        color: "red",
        protocolId: "protocolo_esguince_3_ortj",
      };
    }
    return {
      id: "e2_ortj",
      text: "Esguince de Ortejos Grado II",
      color: "green",
      protocolId: "protocolo_esguince_2_ortj",
    };
  }

  // Fallback: AVO moderado/severo pero RX aún no realizada o sin resultado
  return {
    id: "e1_ortj",
    text: "Esguince de Ortejos Grado I",
    color: "green",
    protocolId: "protocolo_esguince_1_ortj",
  };
};

// ─────────────────────────────────────────────
// GENERACIÓN DE INFORME CLÍNICO
// ─────────────────────────────────────────────

export const generateClinicalReport = ({
  caseId,
  answers,
  resultQuestion,
  protocols,
  stepsOverride,
}) => {
  const resolveProtocol = () => {
    switch (resultQuestion.protocolId) {
      case "protocolo_esguince_1_ortj":
        return getProtocoloEsguince1Ortejos(answers);
      case "protocolo_esguince_2_ortj":
        return getProtocoloEsguince2Ortejos(answers);
      case "protocolo_esguince_3_ortj":
        return getProtocoloEsguince3Ortejos(answers);
      case "protocolo_fx_derivacion_su_ortejos":
        return getProtocoloFxDerivacionSUOrtejos(answers);
      default:
        return protocols[resultQuestion.protocolId];
    }
  };

  const prot = resolveProtocol();
  const reposoDinamico = restTextPorCarga(answers, resultQuestion.protocolId);
  const pasosBase = Array.isArray(prot?.pasos) ? [...prot.pasos] : [];
  if (reposoDinamico) pasosBase.unshift(reposoDinamico);

  const pasos = stepsOverride ?? pasosBase;

  // Mapeos auxiliares
  const edemaTexto = {
    ninguno:  "Sin aumento de volumen",
    leve:     "Leve (+/+++)",
    moderado: "Moderado (++/+++)",
    severo:   "Severo (+++/+++)",
  };

  const cargaTexto = {
    1: "Liviana (sedentario/escritorio)",
    2: "Mediana (de pie y en movimiento; esfuerzos ocasionales)",
    3: "Pesada (levanta peso/maquinaria)",
  };

  const inestabilidadTexto = {
    sin_inestabilidad: "Sin inestabilidad",
    con_inestabilidad: "Con inestabilidad",
  };

  const line = (label, value) => (value ? `- ${label}: ${value}` : null);

  // Sección I — Examen físico
  const seccionI = [
    line("Carga Laboral", cargaTexto[Number(answers.carga_laboral)]),
    answers.eva !== undefined ? `- Dolor (EVA): ${answers.eva}/10` : null,
    line("Aumento de volumen (AVO)", edemaTexto[answers.aumento_volumen]),
    line("Inestabilidad", inestabilidadTexto[answers.inestabilidad]),
    answers.tipo_dolor ? `- Tipo de Dolor: ${answers.tipo_dolor}` : null,
    answers.hallazgos_fisicos
      ? `- Hallazgos Físicos: ${answers.hallazgos_fisicos}`
      : null,
  ]
    .filter(Boolean)
    .join("\n");

  // Sección II — Imagenología
  const rxSolicitadas = [];
  if (answers.rx_dolor_difuso === "listo")
    rxSolicitadas.push("Rx Pie Ap-Lat-Obl dedo afectado (dolor difuso, con carga si tolera)");
  if (answers.rx_dolor_local === "listo")
    rxSolicitadas.push("Rx Ap-Lat-Obl dedo afectado (dolor local)");

  const rxTexto = rxSolicitadas.length > 0 ? rxSolicitadas.join(" | ") : null;

  const fracturaTexto =
    answers.hay_fractura === "si_cerrada" ? "FRACTURA CERRADA DETECTADA"
    : answers.hay_fractura === "si_abierta" ? "FRACTURA ABIERTA DETECTADA"
    : answers.hay_fractura === "si_otra"    ? "FRACTURA DE PIE DETECTADA"
    : answers.hay_fractura === "no"         ? "Sin fractura en radiografía"
    : null;

  const LABELS_CERRADA_ORTJ = {
    cerrada_primer_ortj:    "Primer Ortejo Cerrada",
    cerrada_ex_primer_ortj: "Ortejos excepto primer ortejo Cerrada",
  };
  const LABELS_ABIERTA_ORTJ = {
    abierta_primer_ortj:    "Primer Ortejo Abierta",
    abierta_ex_primer_ortj: "Ortejos excepto primer ortejo Abierta",
  };

  const clasificacionLinea = (() => {
    const val =
      answers.clasificacion_cerrada_ortejos ||
      answers.clasificacion_abierta_ortejos;
    const label = LABELS_CERRADA_ORTJ[val] || LABELS_ABIERTA_ORTJ[val] || null;
    return val ? `- Clasificación: ${label || val}` : null;
  })();

  const compromisoLinea = answers.compromiso_articular
    ? `- Compromiso articular: ${answers.compromiso_articular === "si" ? "Sí" : "No"}`
    : null;

  const fracturaPieLinea = (() => {
    if (answers.hay_fractura !== "si_otra" || !answers.fractura_pie_tipo) return null;
    if (answers.fractura_pie_tipo === "otra") {
      return `- Fractura de pie: ${answers.fractura_pie_otra?.trim() || "Sin especificar"}`;
    }
    return `- Fractura de pie: ${FRACTURA_PIE_LABELS[answers.fractura_pie_tipo] || answers.fractura_pie_tipo}`;
  })();

  const seccionII_lineas = [
    rxTexto ? `- Radiografía solicitada: ${rxTexto}` : null,
    fracturaTexto ? `- Resultado: ${fracturaTexto}` : null,
    clasificacionLinea,
    compromisoLinea,
    fracturaPieLinea,
  ].filter(Boolean);

  const seccionII =
    seccionII_lineas.length > 0
      ? `IMAGENOLOGÍA\n${seccionII_lineas.join("\n")}`
      : null;

  // Sección indicaciones
  const seccionIV = pasos.map((s) => `- ${s}`).join("\n");

  // Informe final
  const secciones = [
    `=========================================`,
    `    INFORME MÉDICO: ORTEJOS Y ANTEPIÉ`,
    `=========================================`,
    `ID CASO: ${caseId}`,
    `FECHA: ${new Date().toLocaleDateString()}`,
    `PIE: ${answers.pie}`,
    `DIAGNÓSTICO SUGERIDO: ${resultQuestion.text}`,
    ``,
    `EXAMEN FÍSICO`,
    seccionI,
    ``,
    seccionII,
    seccionII ? `` : null,
    `DIAGNÓSTICO SUGERIDO`,
    resultQuestion.text,
    ``,
    `INDICACIONES SUGERIDAS`,
    seccionIV,
    ``,
    `=========================================`,
    `Sistema de Apoyo al Diagnóstico - ACHS`,
    `=========================================`,
  ]
    .filter((s) => s !== null)
    .join("\n");

  return secciones.trim();
};

// ─────────────────────────────────────────────
// EXPORT DEFAULT
// ─────────────────────────────────────────────

const questionnaireModule = {
  questions,
  protocols,
  evaluateRisk,
  generateClinicalReport,
  restTextPorCarga,
  getProtocoloEsguince1Ortejos,
  getProtocoloEsguince2Ortejos,
  getProtocoloEsguince3Ortejos,
  getProtocoloFxDerivacionSUOrtejos,
  requiresAnamnesis: true,
};

export default questionnaireModule;