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
    ...(!esSTP
      ? ["Inmovilización: vendaje solidario con suela rígida por 3 días"]
      : ["Inmovilización: vendaje solidario por 3 días"]),
    "Medicamentos sugeridos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 3 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 3 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días.",
    "Medicamentos según receta",
    "En caso de dolor invalidante, aumento de volumen o cambio de coloración del sitio lesionado acudir a agencia ACHS más cercana",
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
      "Inmovilización: vendaje solidario con suela rígida por 5 días",
      "Medicamentos sugeridos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días",
      "Medicamentos según receta",
      "Control con médico AP en agencia en 5 a 7 días",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
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
      "Inmovilización: suela rígida o bota entre 7-10 días",
      "Medicamentos sugeridos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 5 días. Ajustar según respuesta. En caso de no respuesta a los 7-10 días, considerar escalar a tramadol/paracetamol 37,5 mg/ 325 mg vo c/8-12 h. No extender uso de AINES por más de 7 días",
      "Medicamentos según receta",
      "Control con médico AP en agencia en 5 a 7 días",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
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
  const hayCompromisoArticular = answers?.compromiso_derivación === "compromiso_articular"; 
  const hayCompromisoBlandas = answers?.compromiso_derivación === "compromiso_blandas";
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
  else if (esFracturaCerrada && hayCompromisoBlandas) {
    textoDerivacion = "🚨 Derivación inmediata a HT SU";
  }

  return {
    titulo: `PROTOCOLO DE MANEJO - ${nombreFractura}`,
    pasos: [
      `${textoDerivacion} o centro hospitalario con capacidad resolutiva según indicación del especialista 🚨`,
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
  fractura_metatarsiano_abierta:       "Fractura Metatarsiano Abierta",
  fractura_metatarsiano_cerrada:       "Fractura Metatarsiano Cerrada",
  luxofractura_lisfranc_abierta:       "Luxofractura de Lisfranc Abierta",
  luxofractura_lisfranc_cerrada:       "Luxofractura de Lisfranc Cerrada"
};

// ─────────────────────────────────────────────
// PROTOCOLOS ESTÁTICOS
// ─────────────────────────────────────────────


export const protocolo_fx_derivacion_pie = (answers) => {
  const criterios = answers?.hay_derivacion_metatarso_cerrada || [];
  const esMetatarsianoCerradaConDerivacion = 
    Array.isArray(criterios) && !criterios.includes("no_cumple");
    
  const esMetatarsianoAbierta =
    answers?.fractura_pie_tipo === "fractura_metatarsiano_abierta";
  const esLuxoLisfrancAbierta =
    answers?.fractura_pie_tipo === "luxofractura_lisfranc_abierta";
  const esLuxoLisfrancCerrada  =
    answers?.fractura_pie_tipo === "luxofractura_lisfranc_cerrada";

  let nombreFractura = "";
  if (esLuxoLisfrancAbierta) {
    nombreFractura = "LUXOFRACTURA DE LISFRANC ABIERTA";
  } else if (esMetatarsianoAbierta) {
    nombreFractura = "FRACTURA METATARSIANO ABIERTA";
  } else if (esLuxoLisfrancCerrada) {
    nombreFractura = "LUXOFRACTURA DE LISFRANC CERRADA";
  } else if (esMetatarsianoCerradaConDerivacion) {
    nombreFractura = "FRACTURA METATARSIANO CERRADA";
  } 

  return {
    titulo: `PROTOCOLO DE MANEJO - ${nombreFractura}`,
    pasos: [
      "🚨 Derivación inmediata a HT TyP o centro hospitalario con capacidad resolutiva según indicación del especialista 🚨",
      "Inmovilización con valva de la ambulancia",
      "Aplicar frío local",
      "Medicamentos: Analgesia EV y profilaxis tromboembólica con aspirina o dabigatrán una vez inmovilizada",
      "Vacunación antitetánica (en caso de fractura expuesta)",
    ],
  };
};


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

  protocolo_fx_derivacion_pie: {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA DE PIE",
    pasos: ["Pendiente de integración"],
  },

  protocolo_fx_metatarsiano_cerrada_conservador: {
        "titulo": "INDICACIONES AL PACIENTE - FRACTURA METATARSIANO CERRADA",
        "pasos": [
      "Reposo",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
      "Inmovilización: Zapato pop",
      "Analgesia VO",
      "Medicamentos: tromboprofilaxis según protocolo, sólo si no tolera carga",
      "Control con médico AP a la semana",
      "Control SOS"
        ]
    },  

  "protocolo_fractura_pie": {
  "titulo": "PROTOCOLO DE MANEJO - FRACTURA DE PIE",
  "pasos": ["Pendiente de integración"]
    }
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
    id: "equimosis_ortj", 
    text: "Equimosis", 
    type: "options", 
    group: "anamnesis",
    options: [
      { value: "ninguno", label: "Sin equimosis" },
      { value: "localizada", label: "Localizada" },
      { value: "difusa", label: "Difusa"}
    ]
  },

  {
    id: "inestabilidad",
    text: "Inestabilidad (1° ortejo :Test de movilidad MTF (hallux rigidus), Test de Lachman del dedo. Todos los ortejos: cajón MTF específico)",
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
    id: "tipo_dolor_ortj",
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
    text: "Realizar Radiografía Pie Ap-Lat-Obl y del ortejo afectado (con carga si tolera monopodal)",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.tipo_dolor_ortj === "difuso" &&
      (
        ans.inestabilidad === "con_inestabilidad" ||
        ans.aumento_volumen === "moderado" ||
        ans.aumento_volumen === "severo" ||
        (ans.aumento_volumen === "leve" && ans.equimosis_ortj !== "ninguno")
      ),
    options: [{ value: "listo", label: "✅ Realizada" }],
  },

  // RX 2: dolor local + AVO moderado o severo
  {
    id: "rx_dolor_local",
    text: "Realizar Radiografía Ap-Lat-Obl del dedo afectado",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.tipo_dolor_ortj === "local" &&
      (
        ans.inestabilidad === "con_inestabilidad" ||
        ans.aumento_volumen === "moderado" ||
        ans.aumento_volumen === "severo" ||
        (ans.aumento_volumen === "leve" && ans.equimosis_ortj !== "ninguno")
      ),
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

  {
    id: "fractura_pie_tipo",
    text: "Seleccione la fractura detectada:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_otra",
    options: [
        { value: "fractura_metatarsiano_abierta", label: "Fractura Metatarsiano Abierta" },
        { value: "fractura_metatarsiano_cerrada", label: "Fractura Metatarsiano Cerrada" },
        { value: "luxofractura_lisfranc_abierta", label: "Luxofractura de Lisfranc Abierta" },
        { value: "luxofractura_lisfranc_cerrada", label: "Luxofractura de Lisfranc Cerrada" },
        { value: "otra", label: "Otra" }
    ]
  },

  {
    id: "hay_derivacion_metatarso_cerrada",
    text: "¿Presenta alguno de estos criterios de derivación?:",
    type: "multi",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_otra" && ans.fractura_pie_tipo === "fractura_metatarsiano_cerrada",
    options: [
        { value: "compromiso_neurovascular", label: "Herida / compromiso neurovascular / sospecha sd compartimental / sospecha de lesión Lisfranc" },
        { value: "desplazada", label: "Desplazada > 3mm / escalón de > 1-2mm en superducue articular con el cuboide / Fx asociadas / No unión sintomática" },
        { value: "multiple", label: "Es múltiple / intraarticular / de cabeza" },
        { value: "zona2", label: "Pertenece al 5° metatarsiano en zona 2 (con diafisis, intermetatarsiana y proximal)"},
        { value: "no_cumple", label: "No presenta ninguno", exclusive: true }
    ]
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
    id: "compromiso_derivación",
    text: "¿Presenta alguno de estor criterios?:",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.clasificacion_cerrada_ortejos === "cerrada_primer_ortj" || ans.clasificacion_cerrada_ortejos === "cerrada_ex_primer_ortj",
    options: [
      { value: "compromiso_blandas", label: "Compromiso de partes blandas o neurovascular importante" },
      { value: "compromiso_articular", label: "Compromiso articular, está desplazada/angulada o presenta inestabilidad"},
      { value: "ninguno", label: "Ninguno de estos criterios" },
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

   // Lógica de derivación de fractura de pie 
  if (hayFractura === "si_otra") {
  const clasVal = answers.fractura_pie_tipo;

  const diagText =
    clasVal === "otra"
      ? answers.fractura_pie_otra?.trim() || "Fractura de Pie - Sin especificar"
      : FRACTURA_PIE_LABELS[clasVal] || clasVal;

  let protocolId;
  
  if (clasVal === "fractura_metatarsiano_abierta" || 
      clasVal === "luxofractura_lisfranc_abierta" || 
      clasVal === "luxofractura_lisfranc_cerrada") {
    protocolId = "protocolo_fx_derivacion_pie";
  } else if (clasVal === "fractura_metatarsiano_cerrada") {
    // Si NO cumple criterios de derivación → conservador
    const noCumpleCriterios = answers.hay_derivacion_metatarso_cerrada?.includes("no_cumple");
    protocolId = noCumpleCriterios 
      ? "protocolo_fx_metatarsiano_cerrada_conservador"
      : "protocolo_fx_derivacion_pie";
  } else {
    protocolId = "protocolo_fractura_pie";
  }

  return {
    id: "fractura_pie",
    text: diagText,
    color: "red",
    protocolId,
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
    const compromisoArticular = answers.compromiso_derivación === "compromiso_articular";
    const hayCompromisoBlandas = answers.compromiso_derivación === "compromiso_blandas";

    if (clasVal === "cerrada_primer_ortj" || clasVal === "cerrada_ex_primer_ortj") {
      return {
        id: compromisoArticular ? "fx_cerrada_primer_ortj_con_compromiso" : "fx_cerrada_primer_ortj",
        text: compromisoArticular
          ? "Fractura Primer Ortejo Cerrada con Compromiso Articular"
          : "Fractura Primer Ortejo Cerrada",
        color: "red",
        protocolId: compromisoArticular
          ? "protocolo_fx_derivacion_su_ortejos"
          : "protocolo_fx_cerrada_ortejos",
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


  // Grado III: inestabilidad presente, con o sin RX (si hubo RX debe ser sin fractura)
  if (inestabilidad === "con_inestabilidad" && (!huboRx || hayFractura === "no")) {
    return {
      id: "e3_ortj",
      text: "Esguince de Ortejos Grado III",
      color: "red",
      protocolId: "protocolo_esguince_3_ortj",
    };
  }

  // Grado II: RX realizada y sin fractura
  if (huboRx && hayFractura === "no") {
    return {
      id: "e2_ortj",
      text: "Esguince de Ortejos Grado II",
      color: "green",
      protocolId: "protocolo_esguince_2_ortj",
    };
  }

  // Grado I: AVO ninguno o leve → nunca llega a RX
  if (volumen === "ninguno" || volumen === "leve") {
    return {
      id: "e1_ortj",
      text: "Esguince de Ortejos Grado I",
      color: "green",
      protocolId: "protocolo_esguince_1_ortj",
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
    answers.pie ? `- Pie: ${answers.pie}` : null,
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


  const compromisoLabels = {
    "compromiso_blandas": "Compromiso de partes blandas o neurovascular importante",
    "compromiso_articular": "Compromiso articular, está desplazada/angulada o presenta inestabilidad",
    "ninguno": "No presenta"
  };

  const compromisoLinea = answers.compromiso_derivación
    ? `- Criterios de derivación: ${compromisoLabels[answers.compromiso_derivación] || answers.compromiso_derivación}`
    : null;

  const fracturaPieLinea = (() => {
    if (answers.hay_fractura !== "si_otra" || !answers.fractura_pie_tipo) return null;
    if (answers.fractura_pie_tipo === "otra") {
      return `- Fractura de pie: ${answers.fractura_pie_otra?.trim() || "Sin especificar"}`;
    }
    return `- Fractura de pie: ${FRACTURA_PIE_LABELS[answers.fractura_pie_tipo] || answers.fractura_pie_tipo}`;
  })();

  // Agregamos info de la derivación para metatarso

  const derivacionMetatarsoLinea = (() => {
  if (!answers.hay_derivacion_metatarso_cerrada) return null;
  const criterios = answers.hay_derivacion_metatarso_cerrada;
  if (criterios.includes("no_cumple")) {
    return "- Criterios de derivación metatarso: No presenta";
  }
  const labels = {
    compromiso_neurovascular: "Herida/compromiso neurovascular/sd compartimental/lesión Lisfranc",
    desplazada: "Desplazada >3mm / escalón >1-2mm / Fx asociadas / No unión sintomática",
    multiple: "Múltiple / intraarticular / de cabeza",
    zona2: "5° metatarsiano zona 2"
  };
  const textos = criterios.map(c => labels[c] || c);
  return `- Criterios de derivación metatarso: ${textos.join(", ")}`;
})();

const seccionII_lineas = [
  rxTexto ? `- Radiografía solicitada: ${rxTexto}` : null,
  fracturaTexto ? `- Resultado: ${fracturaTexto}` : null,
  // clasificacionLinea,
  compromisoLinea,
  fracturaPieLinea,
  derivacionMetatarsoLinea, // ✅ Agregar aquí
].filter(Boolean);

  // const seccionII_lineas = [
  //   rxTexto ? `- Radiografía solicitada: ${rxTexto}` : null,
  //   fracturaTexto ? `- Resultado: ${fracturaTexto}` : null,
  //   clasificacionLinea,
  //   compromisoLinea,
  //   fracturaPieLinea,
  // ].filter(Boolean);

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
  protocolo_fx_derivacion_pie,
  requiresAnamnesis: true,
};

export default questionnaireModule;