// questionnaires/MetaTarsoQuestions.js

// ═══════════════════════════════════════════════════════════════
// PROTOCOLOS DINÁMICOS - ESGUINCES DEL PIE
// ═══════════════════════════════════════════════════════════════

export const getProtocoloEsguincePie1 = (answers) => {
  const carga = Number(answers?.carga_laboral);
  const esSTP = carga === 1;

  const pasosBase = [
    "Realizar actividades habituales ",
    "Realizar ejercicios indicados en pauta ",
    "Reposo deportivo por 7-10 días ",
    ...(!esSTP ? [
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
    ] : []),
    "Tubigrip opcional (máx 1 semana, retiro nocturno)",
    "Medicamentos sugeridos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 3 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 3 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días.",
    "Medicamentos según receta",
    "En caso de dolor invalidante, aumento de volumen o cambio de coloración del sitio lesionado acudir a agencia ACHS más cercana",
  ];

  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO I",
    pasos: pasosBase,
  };
};

export const getProtocoloEsguincePie2 = (answers) => {
  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO II",
    pasos: [
      "Reposo laboral",
      "Reposo deportivo",
      "Realizar ejercicios indicados en pauta ",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
      "Descansar con extremidad en alto",
      "Zapato pop",
      "Medicamentos sugeridos: Analgesia escalonada según EVA (Iniciar con Paracetamol 1 gr cada 8hrs VO + AINES (Ibuprofeno, ketoprofeno) cada 8hrs por 5-7 días VO) Ajustar según respuesta",
      "Medicamentos según receta",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
    ]
  };
};

export const getProtocoloEsguincePie3 = (answers) => {
  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO III",
    pasos: [
      "Reposo laboral.",
      "Reposo deportivo.",
      "Realizar ejercicios indicados en pauta ",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad.",
      "Zapato pop con bastón según limitación de marcha",
      "Medicamentos sugeridos: Analgesia escalonada según EVA Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 5 días. Ajustar según respuesta.",
      "Medicamentos según receta",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
    ]
  };
};

// ═══════════════════════════════════════════════════════════════
// PROTOCOLOS DINÁMICOS - ESGUINCES DE ORTEJOS (IMPORTADOS)
// ═══════════════════════════════════════════════════════════════

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
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DE ORTEJOS GRADO II",
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
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DE ORTEJOS GRADO III",
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

// ═══════════════════════════════════════════════════════════════
// PROTOCOLOS DINÁMICOS - FRACTURAS
// ═══════════════════════════════════════════════════════════════

export const protocolo_fx_derivacion = (answers) => {
  const esMetatarsianoAbierta =
    answers?.clasificacion_especifica_abierta_pie === "metatarsiano_abierta";
  const esLuxoLisfrancAbierta =
    answers?.clasificacion_especifica_abierta_pie === "luxo_lisfranc_abierta";
  const esLuxoLisfrancCerrada =
    answers?.clasificacion_especifica_cerrada_pie === "luxo_lisfranc_cerrada";
  const esLuxoChopartCerrada =
    answers?.clasificacion_especifica_cerrada_pie === "luxo_chopart_cerrada";
  const esLuxoPieCerrada =
    answers?.clasificacion_especifica_cerrada_pie === "luxo_pie_cerrada";
  const esLuxoPieAbierta =
    answers?.clasificacion_especifica_abierta_pie === "luxo_pie_abierta";
  const esAstragaloAbierta =
    answers?.clasificacion_especifica_abierta_pie === "astragalo_abierta";
  const esCalcaneoAbierta =
    answers?.clasificacion_especifica_abierta_pie === "calcaneo_abierta";
  const esPerifericasTaloAbiertas =
    answers?.clasificacion_especifica_abierta_pie === "perifericas_talo_abierta";

  // Metatarsiano cerrada con criterios de derivación
  const esMetatarsianoCerradaConDerivacion = 
    answers?.clasificacion_especifica_cerrada_pie === "metatarsiano_cerrada" &&
    Array.isArray(answers?.hay_derivacion_metatarso_cerrada) &&
    !answers.hay_derivacion_metatarso_cerrada.includes("no_cumple");

  // Tarso cerrado con criterios de derivación
  const esTarsoCerradoConDerivacion =
    ['astragalo_cerrada', 'calcaneo_cerrada', 'cuello_talo_cerrada',
     'cuerpo_talo_cerrada', 'escafoides_cerrada', 'huesos_tarso_cerrada',
     'perifericas_talo_cerrada'].includes(answers?.clasificacion_especifica_cerrada_pie) &&
    Array.isArray(answers?.hay_derivacion_tarso_cerrada) &&
    !answers.hay_derivacion_tarso_cerrada.includes("no_cumple");

  let nombreFractura = "";
  if (esLuxoLisfrancAbierta) {
    nombreFractura = "LUXOFRACTURA DE LISFRANC ABIERTA";
  } else if (esMetatarsianoAbierta) {
    nombreFractura = "FRACTURA METATARSIANO ABIERTA";
  } else if (esLuxoLisfrancCerrada) {
    nombreFractura = "LUXOFRACTURA DE LISFRANC CERRADA";
  } else if (esLuxoChopartCerrada) {
    nombreFractura = "LUXOFRACTURA DE CHOPART CERRADA";
  } else if (esLuxoPieCerrada) {
    nombreFractura = "LUXOFRACTURA DEL PIE CERRADA";
  } else if (esLuxoPieAbierta) {
    nombreFractura = "LUXOFRACTURA DEL PIE ABIERTA";
  } else if (esAstragaloAbierta) {
    nombreFractura = "FRACTURA ASTRAGALO ABIERTA";
  } else if (esCalcaneoAbierta) {
    nombreFractura = "FRACTURA CALCANEO ABIERTA";
  } else if (esPerifericasTaloAbiertas) {
    nombreFractura = "FRACTURAS PERIFERICAS TALO ABIERTAS";
  } else if (esMetatarsianoCerradaConDerivacion) {
    nombreFractura = "FRACTURA METATARSIANO CERRADA CON CRITERIOS DE DERIVACIÓN";
  } else if (esTarsoCerradoConDerivacion) {
    const LABELS = {
      astragalo_cerrada: "FRACTURA ASTRAGALO CERRADA",
      calcaneo_cerrada: "FRACTURA CALCANEO CERRADA",
      cuello_talo_cerrada: "FRACTURA CUELLO TALO CERRADA",
      cuerpo_talo_cerrada: "FRACTURA CUERPO TALO CERRADA",
      escafoides_cerrada: "FRACTURA ESCAFOIDES TARSO DEL PIE CERRADA",
      huesos_tarso_cerrada: "FRACTURA HUESOS DEL TARSO (EXCEPTO ESCAFOIDES) CERRADA",
      perifericas_talo_cerrada: "FRACTURAS PERIFERICAS TALO CERRADAS"
    };
    nombreFractura = LABELS[answers.clasificacion_especifica_cerrada_pie] || "FRACTURA TARSO CERRADA";
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

export const protocolo_fx_metatarsiano_cerrada_conservador = (answers) => {
  return {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA METATARSIANO CERRADA",
    pasos: [
      "Reposo",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
      "Inmovilización: Zapato pop",
      "Analgesia VO",
      "Medicamentos: tromboprofilaxis según protocolo, sólo si no tolera carga",
      "Control con médico AP a la semana",
      "Control SOS"
    ]
  };
};

export const protocolo_fx_cerrada_conservador_tarso = (answers) => {
  return {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA TARSO CERRADA",
    pasos: [
      "Manejo conservador",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
      "Inmovilización con bota walker y bastones",
      "Descarga por 6 a 8 semanas",
      "Medicamentos: Analgesia VO y profilaxis tromboembólica con aspirina o dabigatrán",
      "Control en 2 semanas"
    ]
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
  const hayCompromisoArticular = answers?.compromiso_derivacion_ortejos === "compromiso_articular"; 
  const hayCompromisoBlandas = answers?.compromiso_derivacion_ortejos === "compromiso_blandas";
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

// ═══════════════════════════════════════════════════════════════
// PROTOCOLOS ESTÁTICOS
// ═══════════════════════════════════════════════════════════════

export const protocols = {
  "getProtocoloEsguincePie1": {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO I",
    pasos: [],
  },
  "getProtocoloEsguincePie2": {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO II",
    pasos: [],
  },
  "getProtocoloEsguincePie3": {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO III",
    pasos: [],
  },
  "protocolo_fx_cerrada_conservador_tarso": {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA TARSO CERRADA",
    pasos: []
  },
  "protocolo_fx_metatarsiano_cerrada_conservador": {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA METATARSIANO CERRADA",
    pasos: []
  },
  "protocolo_esguince_1_ortj": {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DE ORTEJOS GRADO I",
    pasos: [],
  },
  "protocolo_esguince_2_ortj": {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DE ORTEJOS GRADO II",
    pasos: [],
  },
  "protocolo_esguince_3_ortj": {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DE ORTEJOS GRADO III",
    pasos: [],
  },
  "protocolo_fx_cerrada_ortejos": {
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
  "protocolo_fx_derivacion_su_ortejos": {
    titulo: "PROTOCOLO DE MANEJO - FRACTURA ORTEJOS CON DERIVACIÓN",
    pasos: [],
  }
};

// ═══════════════════════════════════════════════════════════════
// PREGUNTAS DEL CUESTIONARIO
// ═══════════════════════════════════════════════════════════════

export const questions = [
  {
    id: "pie",
    text: "Pie",
    type: "options",
    group: "anamnesis",
    options: [
      { value: "Izquierdo", label: "Izquierdo" },
      { value: "Derecho", label: "Derecho" },
      { value: "Bilateral", label: "Bilateral" }
    ]
  },
  {
    id: "carga_laboral",
    text: "Carga laboral habitual",
    type: "button-group",
    group: "anamnesis",
    options: [
      { value: 1, labelBold: "Liviana", labelDesc: "sedentario/escritorio" },
      { value: 2, labelBold: "Mediana", labelDesc: "de pie y en movimiento" },
      { value: 3, labelBold: "Pesada", labelDesc: "levanta peso/maquinaria" }
    ]
  },
  { 
    id: "eva_pie", 
    text: "Dolor (EVA)", 
    type: "slider", 
    group: "anamnesis", 
    min: 0, 
    max: 10 
  },
  { 
    id: "aumento_volumen", 
    text: "Aumento de volumen (Edema)", 
    type: "options", 
    group: "anamnesis",
    options: [
      { value: "ninguno", label: "Sin aumento de volumen" },
      { value: "leve", label: "Leve (+)" },
      { value: "moderado", label: "Moderado (++)" },
      { value: "severo", label: "Severo (+++)" }
    ]
  },
  { 
    id: "equimosis_pie", 
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
    id: "inestabilidad_pie", 
    text: "Inestabilidad (Aplicar Lisfranc, Piano Key Test, Compresión Transversal del Antepié y Mulder Test)", 
    type: "options", 
    group: "anamnesis",
    options: [
      { value: "sin_inestabilidad", label: "Sin inestabilidad" },
      { value: "dudosa", label: "Dudosa" },
      { value: "con_inestabilidad", label: "Con inestabilidad" }
    ]
  },
  { 
    id: "hallazgos_fisicos_pie", 
    text: "Examen Físico: Marcha / Heridas / Maniobras", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Describa presencia de heridas, tipo de marcha..."
  },

  // ─────────────────────────────────────────────
  // GRUPO RIESGO
  // ─────────────────────────────────────────────

  {
    id: "criterios_pie",
    text: "¿Cumple algún criterio de las pruebas de pie? Seleccione aquellos que cumple:",
    type: "multi",
    group: "risk",
    options: [
      { value: "prueba_lisfranc", label: "Prueba de Lisfranc: Palpar la zona dorsal entre la base del 1° y 2° metatarsiano. Mover antepié en abducción manteniendo retropié fijo. Positiva: dolor en mediopié" },
      { value: "prueba_chopart", label: "Prueba de Chopart: Sujetar retropié y movilizar mediopié en aducción/abducción o inversión/eversión. Positiva: dolor en línea articular del mediopié" },
      { value: "prueba_squeeze", label: "Prueba de Squeeze: Comprimir tibia y peroné proximalmente. Positiva: dolor distal en tobillo (sindesmosis)" },
      { value: "no_cumple", label: "No cumple ninguno (-)", exclusive: true}
    ]
  },

  {
    id: "compromiso_funcional_1",
    text: "¿Presenta compromiso funcional para actividades habituales o laborales?",
    type: "options",
    group: "risk",
    showIf: (ans) => {
      const criterios = ans.criterios_pie;
      const cumpleNoCumple = Array.isArray(criterios) &&
        criterios.length === 1 &&
        criterios.includes("no_cumple");
      return (cumpleNoCumple && ans.carga_laboral === 2 && (ans.aumento_volumen === "ninguno" || ans.aumento_volumen === "leve") && ans.inestabilidad === "sin_inestabilidad") ;
    },
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" }
    ]
  },

{
    id: "dolor_ortejo",
    text: "¿El dolor se presenta en algún ortejo específico?",
    type: "options",
    group: "risk",
    showIf: (ans) => {
      const criterios = ans.criterios_pie;
      const cumple = Array.isArray(criterios) &&
        criterios.includes("prueba_lisfranc");
      return cumple  ;
    },
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" }
    ]
  },

  {
    id: "deformidad_evidente_pie",
    text: "¿Hay deformidad evidente?",
    type: "options",
    group: "risk",
    showIf: (ans) => {
      const pie = ans.criterios_pie;
      if (!Array.isArray(pie)) return false;
      return pie.some(v => v !== "no_cumple");
    },
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" }
    ]
  },
  {
    id: "rx_deformidad_pie",
    textFn: (ans) => {
      if (ans.dolor_ortejo === "si") {
        return "Realizar Radiografía Pie Ap-Lat-Obl sin carga con mortaja + Rx Pie ap-lat/oblicua del dedo afectado (con carga si tolera)";
      }
      return "Realizar Radiografía Pie Ap-Lat-Obl sin carga con mortaja";
    },
    type: "options",
    group: "risk",
    showIf: (ans) => ans.deformidad_evidente_pie === "si",
    options: [
      { value: "listo", label: "✅ Realizada" }
    ]
  },
  {
    id: "tipo_dolor_pie",
    text: "¿Cómo se presenta el dolor?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.deformidad_evidente_pie === "no",
    options: [
      { value: "difuso", label: "Difuso" },
      { value: "local", label: "Local" }
    ]
  },

  {
    id: "compromiso_funcional_2",
    text: "¿Presenta compromiso funcional para actividades habituales o laborales?",
    type: "options",
    group: "risk",
    showIf: (ans) => {
      const esguinceLeve =
        ans.deformidad_evidente_pie === "no" &&
        ans.tipo_dolor_pie === "local" &&
        ans.equimosis_pie === "ninguno" &&
        ans.inestabilidad_pie === "sin_inestabilidad" &&
        ans.carga_laboral === 2;
      return esguinceLeve ;
    },
    options: [
      { value: "si", label: "Sí" },
      { value: "no", label: "No" }
    ]
  },

  {
    id: "tolera_carga_pie",
    text: "¿Tolera la carga monopodal?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tipo_dolor_pie === "difuso" || 
      (ans.tipo_dolor_pie === "local" && ans.inestabilidad_pie !== "sin_inestabilidad"),
    options: [
      { value: "no_tolera", label: "No tolera carga" },
      { value: "con_dificultad", label: "Tolera carga con dificultad" },
      { value: "tolera", label: "Tolera carga" }
    ]
  },
  {
    id: "rx_no_tolera_carga_pie",
    textFn: (ans) => {
      if (ans.dolor_ortejo === "si") {
        return "Realizar Radiografía Ap-Lateral-obl de Pie con carga + mortaja + Rx Pie ap-lat/oblicua del dedo afectado (con carga si tolera)";
      }
      return "Realizar Radiografía Ap-Lateral-obl de Pie con carga + mortaja";
    },
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tolera_carga_pie === "no_tolera",
    options: [
      { value: "listo", label: "✅ Realizada" }
    ]
  },
  {
    id: "rx_tolera_carga_pie",
    textFn: (ans) => {
      if (ans.dolor_ortejo === "si") {
        return "Realizar Radiografía Pie Ap-Lat-Obl con carga + Rx Pie ap-lat/oblicua del dedo afectado (con carga si tolera)";
      }
      return "Realizar Radiografía Pie Ap-Lat-Obl con carga";
    },
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tolera_carga_pie === "con_dificultad" || ans.tolera_carga_pie === "tolera",
    options: [
      { value: "listo", label: "✅ Realizada" }
    ]
  },

  // ¿Hay fractura?
  {
    id: "hay_fractura_pie",
    text: "¿Se detectó una fractura?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.rx_deformidad_pie === "listo" || 
      ans.rx_no_tolera_carga_pie === "listo" || 
      ans.rx_tolera_carga_pie === "listo",
    options: [
      { value: "no", label: "No" },
      { value: "si_cerrada", label: "Sí, cerrada" },
      { value: "si_abierta", label: "Sí, abierta" },
      { value: "si_ortejos", label: "Sí, pero en ortejos" }
    ]
  },

  // ─────────────────────────────────────────────
  // FRACTURAS DEL PIE (METATARSO Y TARSO)
  // ─────────────────────────────────────────────

  {
    id: "clasificacion_especifica_cerrada_pie",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura_pie === "si_cerrada",
    options: [
      { value: "metatarsiano_cerrada", label: "Metatarsiano Cerrada" },
      { value: "astragalo_cerrada", label: "Astragalo Cerrada" },
      { value: "calcaneo_cerrada", label: "Calcaneo Cerrada" },
      { value: "cuello_talo_cerrada", label: "Cuello Talo Cerrada" },
      { value: "cuerpo_talo_cerrada", label: "Cuerpo Talo Cerrada" },
      { value: "escafoides_cerrada", label: "Escafoides Tarso del Pie Cerrada" },
      { value: "huesos_tarso_cerrada", label: "Huesos del Tarso (Excepto Escafoides) Cerrada" },
      { value: "perifericas_talo_cerrada", label: "Perifericas Talo Cerradas" },
      { value: "luxo_lisfranc_cerrada", label: "Luxofractura de Lisfranc Cerrada" },
      { value: "luxo_chopart_cerrada", label: "Luxofractura de Chopart Cerrada" },
      { value: "luxo_pie_cerrada", label: "Luxofractura del Pie Cerrada" }
    ]
  },
  {
    id: "clasificacion_especifica_abierta_pie",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura_pie === "si_abierta",
    options: [
      { value: "metatarsiano_abierta", label: "Metatarsiano Abierta" },
      { value: "astragalo_abierta", label: "Astragalo Abierta" },
      { value: "calcaneo_abierta", label: "Calcaneo Abierta" },
      { value: "perifericas_talo_abierta", label: "Perifericas Talo Abierta" },
      { value: "luxo_lisfranc_abierta", label: "Luxofractura de Lisfranc Abierta" },
      { value: "luxo_pie_abierta", label: "Luxofractura del Pie Abierta" }
    ]
  },
  {
    id: "hay_derivacion_metatarso_cerrada",
    text: "¿Presenta alguno de estos criterios de derivación?:",
    type: "multi",
    group: "risk",
    showIf: (ans) => ans.hay_fractura_pie === "si_cerrada" && 
      ans.clasificacion_especifica_cerrada_pie === "metatarsiano_cerrada",
    options: [
      { value: "compromiso_neurovascular", label: "Herida / compromiso neurovascular / sospecha sd compartimental / sospecha de lesión Lisfranc" },
      { value: "desplazada", label: "Desplazada > 3mm / escalón de > 1-2mm en superficie articular con el cuboide / Fx asociadas / No unión sintomática" },
      { value: "multiple", label: "Es múltiple / intraarticular / de cabeza" },
      { value: "zona2", label: "Pertenece al 5° metatarsiano en zona 2 (con diafisis, intermetatarsiana y proximal)"},
      { value: "no_cumple", label: "No presenta ninguno", exclusive: true }
    ]
  },
  {
    id: "hay_derivacion_tarso_cerrada",
    text: "¿Presenta alguno de estos criterios de derivación?:",
    type: "multi",
    group: "risk",
    showIf: (ans) => {
      const clasificacion = ans.clasificacion_especifica_cerrada_pie;
      const fracturasTarso = [
        "astragalo_cerrada",
        "calcaneo_cerrada", 
        "cuello_talo_cerrada",
        "cuerpo_talo_cerrada",
        "escafoides_cerrada",
        "huesos_tarso_cerrada",
        "perifericas_talo_cerrada"
      ];
      return ans.hay_fractura_pie === "si_cerrada" && 
        fracturasTarso.includes(clasificacion);
    },
    options: [
      { value: "compromiso_neurovascular", label: "Herida / compromiso neurovascular / sospecha sd compartimental / sospecha de lesión Lisfranc" },
      { value: "desplazada", label: "Desplazada > 2mm" },
      { value: "multiple", label: "Es múltiple / intraarticular / de cabeza" },
      { value: "no_cumple", label: "No presenta ninguno", exclusive: true }
    ]
  },

  // ─────────────────────────────────────────────
  // FRACTURAS DE ORTEJOS
  // ─────────────────────────────────────────────

  {
    id: "fractura_ortejo_tipo",
    text: "¿La fractura de ortejo es abierta o cerrada?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura_pie === "si_ortejos",
    options: [
      { value: "cerrada_ortejo", label: "Cerrada" },
      { value: "abierta_ortejo", label: "Abierta" }
    ]
  },
  {
    id: "clasificacion_cerrada_ortejos",
    text: "Clasificación de la fractura de ortejo:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.fractura_ortejo_tipo === "cerrada_ortejo",
    options: [
      { value: "cerrada_primer_ortj", label: "Primer ortejo" },
      { value: "cerrada_ex_primer_ortj", label: "Ortejos excepto primer ortejo" }
    ]
  },
  {
    id: "clasificacion_abierta_ortejos",
    text: "Clasificación de la fractura de ortejo:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.fractura_ortejo_tipo === "abierta_ortejo",
    options: [
      { value: "abierta_primer_ortj", label: "Primer ortejo" },
      { value: "abierta_ex_primer_ortj", label: "Ortejos excepto primer ortejo" }
    ]
  },
  {
    id: "compromiso_derivacion_ortejos",
    text: "¿Presenta alguno de estos criterios?:",
    type: "options",
    group: "risk",
    showIf: (ans) =>
      ans.clasificacion_cerrada_ortejos === "cerrada_primer_ortj" || 
      ans.clasificacion_cerrada_ortejos === "cerrada_ex_primer_ortj",
    options: [
      { value: "compromiso_blandas", label: "Compromiso de partes blandas o neurovascular importante" },
      { value: "compromiso_articular", label: "Compromiso articular, está desplazada/angulada o presenta inestabilidad"},
      { value: "ninguno", label: "Ninguno de estos criterios" }
    ]
  }
];

// ═══════════════════════════════════════════════════════════════
// DICCIONARIOS DE LABELS
// ═══════════════════════════════════════════════════════════════

const TARSO_CERRADA_CONSERVADOR_LABEL = {
  astragalo_cerrada:       "FRACTURA ASTRAGALO CERRADA",
  calcaneo_cerrada:        "FRACTURA CALCANEO CERRADA",
  cuello_talo_cerrada:     "FRACTURA CUELLO TALO CERRADA",
  cuerpo_talo_cerrada:     "FRACTURA CUERPO TALO CERRADA",
  escafoides_cerrada:      "FRACTURA ESCAFOIDES TARSO DEL PIE CERRADA",
  huesos_tarso_cerrada:    "FRACTURA HUESOS DEL TARSO (EXCEPTO ESCAFOIDES) CERRADA",
  perifericas_talo_cerrada:"FRACTURAS PERIFERICAS TALO CERRADAS",
};

const FRACTURA_CERRADA_LABEL_PIE = {
  metatarsiano_cerrada: 'Metatarsiano Cerrada',
  astragalo_cerrada: 'Astragalo Cerrada',
  calcaneo_cerrada: 'Calcaneo Cerrada',
  cuello_talo_cerrada: 'Cuello Talo Cerrada',
  cuerpo_talo_cerrada: 'Cuerpo Talo Cerrada',
  escafoides_cerrada: 'Escafoides Tarso del Pie Cerrada',
  huesos_tarso_cerrada: 'Huesos del Tarso (Excepto Escafoides) Cerrada',
  perifericas_talo_cerrada: 'Perifericas Talo Cerrada',
  luxo_lisfranc_cerrada: 'Luxofractura de Lisfranc Cerrada',
  luxo_chopart_cerrada: 'Luxofractura de Chopart Cerrada',
  luxo_pie_cerrada: 'Luxofractura del Pie Cerrada',
};

const FRACTURA_ABIERTA_LABEL_PIE = {
  metatarsiano_abierta: 'Metatarsiano Abierta',
  astragalo_abierta: 'Astragalo Abierta',
  calcaneo_abierta: 'Calcaneo Abierta',
  perifericas_talo_abierta: 'Perifericas Talo Abierta',
  luxo_lisfranc_abierta: 'Luxofractura de Lisfranc Abierta',
  luxo_pie_abierta: 'Luxofractura del Pie Abierta'
};

const FRACTURA_CERRADA_LABEL_ORTEJO = {
  cerrada_primer_ortj: 'Primer Ortejo Cerrada',
  cerrada_ex_primer_ortj: 'Ortejos (excepto primer ortejo) Cerrada'
};

const FRACTURA_ABIERTA_LABEL_ORTEJO = {
  abierta_primer_ortj: 'Primer Ortejo Abierta',
  abierta_ex_primer_ortj: 'Ortejos (excepto primer ortejo) Abierta'
};

// ═══════════════════════════════════════════════════════════════
// REPOSO DINÁMICO POR CARGA
// ═══════════════════════════════════════════════════════════════

export const restTextPorCarga = (answers, protocolId) => {
  const carga = Number(answers?.carga_laboral);
  if (!carga || ![1, 2, 3].includes(carga)) return null;

  const reposoPorProtocolo = {
    getProtocoloEsguincePie1: {
      1: 'Sin reposo',
      2: 'Alta diferida hasta 1 día',
      3: 'Alta diferida hasta 2 días',
    },
    getProtocoloEsguincePie2: {
      1: 'Alta diferida 5 días',
      2: 'hasta 7 días',
      3: 'hasta 14 días',
    },
    getProtocoloEsguincePie3: {
      1: 'hasta 6 semanas',
      2: 'hasta 7 semanas',
      3: 'hasta 8 semanas',
    },
    protocolo_esguince_1_ortj: {
      1: 'Sin reposo',
      2: 'hasta 5 días',
      3: 'hasta 5 días',
    },
    protocolo_esguince_2_ortj: {
      1: 'hasta 5 días',
      2: 'hasta 10 días',
      3: 'hasta 10 días',
    },
    protocolo_esguince_3_ortj: {
      1: 'hasta 7 días',
      2: 'hasta 14 días',
      3: 'hasta 14 días',
    },
  };

  const map = reposoPorProtocolo[protocolId];
  let indicacion = map?.[carga];

  if (protocolId === 'getProtocoloEsguincePie1' && 
      (answers.compromiso_funcional_1 === "no" || answers.compromiso_funcional_2 === "no") && 
      carga === 2) {
    indicacion = 'Sin reposo';
  }

  return indicacion ? `Reposo según carga laboral: ${indicacion}` : null;
};

// ═══════════════════════════════════════════════════════════════
// EVALUACIÓN DE RIESGO
// ═══════════════════════════════════════════════════════════════

export const evaluateRisk = (answers) => {
  // ── 1. FRACTURAS DE ORTEJOS ──────────────────────────────────
  
  if (answers.hay_fractura_pie === "si_ortejos") {
    const tipoOrtejo = answers.fractura_ortejo_tipo;
    
    // Fractura abierta de ortejo
    if (tipoOrtejo === "abierta_ortejo") {
      const clasVal = answers.clasificacion_abierta_ortejos;
      const LABELS_ABIERTA = {
        abierta_primer_ortj: "Fractura Primer Ortejo Abierta",
        abierta_ex_primer_ortj: "Fractura Ortejos Abierta (excepto primer ortejo)",
      };
      return {
        id: `fx_abierta_ortejo_${clasVal || "sin_clasificar"}`,
        text: LABELS_ABIERTA[clasVal] || "Fractura de Ortejo Abierta: No especificada",
        color: "red",
        protocolId: "protocolo_fx_derivacion_su_ortejos",
      };
    }
    
    // Fractura cerrada de ortejo
    if (tipoOrtejo === "cerrada_ortejo") {
      const clasVal = answers.clasificacion_cerrada_ortejos;
      const compromisoArticular = answers.compromiso_derivacion_ortejos === "compromiso_articular";
      const hayCompromisoBlandas = answers.compromiso_derivacion_ortejos === "compromiso_blandas";

      if (clasVal === "cerrada_primer_ortj") {
        if (compromisoArticular || hayCompromisoBlandas) {
          return {
            id: "fx_cerrada_primer_ortj_derivacion",
            text: "Fractura Primer Ortejo Cerrada con Criterios de Derivación",
            color: "red",
            protocolId: "protocolo_fx_derivacion_su_ortejos",
          };
        }
        return {
          id: "fx_cerrada_primer_ortj",
          text: "Fractura Primer Ortejo Cerrada",
          color: "red",
          protocolId: "protocolo_fx_derivacion_su_ortejos",
        };
      }

      if (clasVal === "cerrada_ex_primer_ortj") {
        if (compromisoArticular || hayCompromisoBlandas) {
          return {
            id: "fx_cerrada_ex_primer_ortj_derivacion",
            text: "Fractura Ortejos Cerrada (excepto primer ortejo) con Criterios de Derivación",
            color: "red",
            protocolId: "protocolo_fx_derivacion_su_ortejos",
          };
        }
        return {
          id: "fx_cerrada_ex_primer_ortj",
          text: "Fractura Ortejos Cerrada (excepto primer ortejo)",
          color: "red",
          protocolId: "protocolo_fx_cerrada_ortejos",
        };
      }

      return {
        id: "fx_cerrada_ortejo_sin_clasificar",
        text: "Fractura Ortejo Cerrada: No especificada",
        color: "red",
        protocolId: "protocolo_fx_derivacion_su_ortejos",
      };
    }
  }

  // ── 2. FRACTURAS DEL PIE (METATARSO Y TARSO) ─────────────────

  const buildFracturaResult = (ans) => {
    const tipo = ans.hay_fractura_pie;
    
    if (tipo !== 'si_abierta' && tipo !== 'si_cerrada') return null;
    
    const isAbierta = tipo === 'si_abierta';
    const clasVal = isAbierta 
      ? ans.clasificacion_especifica_abierta_pie 
      : ans.clasificacion_especifica_cerrada_pie;
    const clasLabel = isAbierta 
      ? FRACTURA_ABIERTA_LABEL_PIE[clasVal] 
      : FRACTURA_CERRADA_LABEL_PIE[clasVal];
    const tipoTxt = isAbierta ? 'Abierta' : 'Cerrada';

    let protocolId;
    
    if (isAbierta) {
      protocolId = 'protocolo_fx_derivacion';
    } else if (clasVal === 'metatarsiano_cerrada') {
      const noCumpleCriterios = Array.isArray(ans.hay_derivacion_metatarso_cerrada) &&
        ans.hay_derivacion_metatarso_cerrada.includes('no_cumple') &&
        ans.hay_derivacion_metatarso_cerrada.length === 1;
      
      protocolId = noCumpleCriterios
        ? 'protocolo_fx_metatarsiano_cerrada_conservador'
        : 'protocolo_fx_derivacion';
        
    } else if (['astragalo_cerrada', 'calcaneo_cerrada', 'cuello_talo_cerrada',
                'cuerpo_talo_cerrada', 'escafoides_cerrada', 'huesos_tarso_cerrada',
                'perifericas_talo_cerrada'].includes(clasVal)) {
      const noCumpleCriterios = Array.isArray(ans.hay_derivacion_tarso_cerrada) &&
        ans.hay_derivacion_tarso_cerrada.includes('no_cumple');

      if (noCumpleCriterios) {
        return {
          id: `f_pie_${clasVal}_conservador`,
          text: TARSO_CERRADA_CONSERVADOR_LABEL[clasVal] || `Fractura del Pie Cerrada: ${clasLabel}`,
          color: 'red',
          protocolId: 'protocolo_fx_cerrada_conservador_tarso',
        };
      }
      protocolId = 'protocolo_fx_derivacion';

    } else {
      protocolId = 'protocolo_fx_derivacion';
    }

    return {
      id: `f_pie_${clasVal}`,
      text: `Fractura del Pie ${tipoTxt}: ${clasLabel || 'No especificada'}`,
      color: 'red',
      protocolId,
    };
  };

  const diagFractura = buildFracturaResult(answers);
  if (diagFractura) return diagFractura;

  // ── 3. ESGUINCES ─────────────────────────────────────────────

  const ottawaArray = Array.isArray(answers.criterios_pie) ? answers.criterios_pie : [];
  const ottawaNegativo = ottawaArray.length === 0 || 
    (ottawaArray.length === 1 && ottawaArray.includes("no_cumple"));

  const puedeEsguince = answers.hay_fractura_pie === "no" || ottawaNegativo;

  if (puedeEsguince) {
    const inestabilidad = answers.inestabilidad_pie;
    const deformidad = answers.deformidad_evidente_pie;
    const volumen = answers.aumento_volumen;
    const carga = answers.tolera_carga_pie;
    const equimosis = answers.equimosis_pie;
    const pruebasNegativas = ottawaArray.length === 0 ||
      (ottawaArray.length === 1 && ottawaArray.includes('no_cumple'));

    if (//deformidad === "si" || carga === "no_tolera"
      inestabilidad === "con_inestabilidad" && ((
      volumen !== "ninguno" && volumen != null &&
      equimosis === "difusa" && equimosis != null) || (volumen === "severo"))

    ) {
      return { 
        id: "e3", 
        text: "Esguince del Pie Grado III", 
        color: "red", 
        protocolId: "getProtocoloEsguincePie3" 
      };
    }

    if (

      // Me traigo los criterios de tobillo para derivar el esguince
      (inestabilidad === "sin_inestabilidad" || inestabilidad === "dudosa") &&
      (volumen === "moderado" || volumen === "severo") 
      
      // así lo tenía antes
      // carga === "tolera" || carga === "con_dificultad" || 
      //   (equimosis === "ninguno" && answers.tipo_dolor_pie === "local" && 
      //    inestabilidad === "sin_inestabilidad") 
        
        ) {
      return { 
        id: "e2", 
        text: "Esguince del Pie Grado II", 
        color: "green", 
        protocolId: "getProtocoloEsguincePie2" 
      };
    }

    if (pruebasNegativas || 
        (inestabilidad === "sin_inestabilidad" && 
          (volumen === "ninguno" || volumen === "leve")
          // answers.tipo_dolor_pie === "local"

        )) {
      return { 
        id: "e1", 
        text: "Esguince del Pie Grado I", 
        color: "green", 
        protocolId: "getProtocoloEsguincePie1" 
      };
    }
  }
  
  return { 
    id: "e1", 
    text: "Esguince del Pie Grado I", 
    color: "green", 
    protocolId: "getProtocoloEsguincePie1" 
  };
};

// ═══════════════════════════════════════════════════════════════
// GENERACIÓN DE INFORME CLÍNICO
// ═══════════════════════════════════════════════════════════════

export const generateClinicalReport = ({ 
  caseId, 
  answers, 
  resultQuestion, 
  protocols, 
  stepsOverride 
}) => {
  // Resolver protocolo dinámico
  const resolveProtocol = () => {
    switch (resultQuestion.protocolId) {
      case 'getProtocoloEsguincePie1':
        return getProtocoloEsguincePie1(answers);
      case 'getProtocoloEsguincePie2':
        return getProtocoloEsguincePie2(answers);
      case 'getProtocoloEsguincePie3':
        return getProtocoloEsguincePie3(answers);
      case 'protocolo_esguince_1_ortj':
        return getProtocoloEsguince1Ortejos(answers);
      case 'protocolo_esguince_2_ortj':
        return getProtocoloEsguince2Ortejos(answers);
      case 'protocolo_esguince_3_ortj':
        return getProtocoloEsguince3Ortejos(answers);
      case 'protocolo_fx_derivacion_su_ortejos':
        return getProtocoloFxDerivacionSUOrtejos(answers);
      case 'protocolo_fx_derivacion':
        return protocolo_fx_derivacion(answers);
      case 'protocolo_fx_metatarsiano_cerrada_conservador':
        return protocolo_fx_metatarsiano_cerrada_conservador(answers);
      case 'protocolo_fx_cerrada_conservador_tarso':
        return protocolo_fx_cerrada_conservador_tarso(answers);
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
    "ninguno": "Sin aumento de volumen",
    "leve": "Leve (+/+++)",
    "moderado": "Moderado (++/+++)",
    "severo": "Severo (+++/+++)"
  };

  const toleranciaTexto = {
    "no_tolera": "No tolera carga",
    "con_dificultad": "Tolera carga con dificultad",
    "tolera": "Tolera carga"
  };

  const cargaTexto = {
    1: "Liviana (sedentario/escritorio)",
    2: "Mediana (de pie y en movimiento; esfuerzos ocasionales)",
    3: "Pesada (levanta peso/maquinaria)"
  };

  const equimosisTexto = {
    "ninguno": "Sin equimosis",
    "localizada": "Localizada",
    "difusa": "Difusa"
  };

  const inestabilidadTexto = {
    "sin_inestabilidad": "Sin inestabilidad",
    "dudosa": "Dudosa",
    "con_inestabilidad": "Con inestabilidad"
  };

  const line = (label, value) => (value ? `- ${label}: ${value}` : null);

  // Sección I — Examen físico
  const seccionI = [
    answers.pie ? `- Pie: ${answers.pie}` : null,
    line('Carga Laboral', cargaTexto[Number(answers.carga_laboral)]),
    answers.eva_pie !== undefined ? `- Dolor (EVA): ${answers.eva_pie}/10` : null,
    line('Aumento de volumen (AVO)', edemaTexto[answers.aumento_volumen]),
    line('Equimosis', equimosisTexto[answers.equimosis_pie]),
    line('Inestabilidad', inestabilidadTexto[answers.inestabilidad_pie]),
    answers.hallazgos_fisicos_pie ? `- Hallazgos Físicos: ${answers.hallazgos_fisicos_pie}` : null,
  ].filter(Boolean).join('\n');

  // Radiografías solicitadas
  const rxSolicitadas = [];
  if (answers.rx_deformidad_pie === 'listo') {
    const criterios = answers.criterios_pie;
    const cumpleLisfranc = Array.isArray(criterios) && criterios.includes("prueba_lisfranc");
    rxSolicitadas.push(
      cumpleLisfranc 
        ? 'Rx pie Ap-Lat-Obl sin carga + Rx Pie ap-lat/oblicua del dedo afectado (con carga si tolera)'
        : 'Rx pie Ap-Lat-Obl sin carga'
    );
  }
  if (answers.rx_no_tolera_carga_pie === 'listo') {
    const criterios = answers.criterios_pie;
    const cumpleLisfranc = Array.isArray(criterios) && criterios.includes("prueba_lisfranc");
    rxSolicitadas.push(
      cumpleLisfranc
        ? 'Rx pie Ap-Lat-Obl con carga + mortaja + Rx Pie ap-lat/oblicua del dedo afectado'
        : 'Rx pie Ap-Lat-Obl con carga + mortaja'
    );
  }
  if (answers.rx_tolera_carga_pie === 'listo') {
    const criterios = answers.criterios_pie;
    const cumpleLisfranc = Array.isArray(criterios) && criterios.includes("prueba_lisfranc");
    rxSolicitadas.push(
      cumpleLisfranc
        ? 'Rx pie Ap-Lat-Obl con carga + Rx Pie ap-lat/oblicua del dedo afectado'
        : 'Rx pie Ap-Lat-Obl con carga'
    );
  }

  const rxTexto = rxSolicitadas.length > 0 ? rxSolicitadas.join(' | ') : 'No solicitada';

  const fracturaTexto = 
    answers.hay_fractura_pie === 'si_cerrada' ? 'FRACTURA CERRADA DETECTADA (PIE)'
    : answers.hay_fractura_pie === 'si_abierta' ? 'FRACTURA ABIERTA DETECTADA (PIE)'
    : answers.hay_fractura_pie === 'si_ortejos' ? 'FRACTURA DETECTADA (ORTEJOS)'
    : answers.hay_fractura_pie === 'no' ? 'Sin fractura en radiografía'
    : null;

  // Clasificación de fractura del pie
  const clasificacionLineaPie = (() => {
    const val = answers.clasificacion_especifica_cerrada_pie || 
                answers.clasificacion_especifica_abierta_pie;
    const label = FRACTURA_CERRADA_LABEL_PIE[val] || FRACTURA_ABIERTA_LABEL_PIE[val];
    return val ? `- Clasificación: ${label || val}` : null;
  })();

  // Clasificación de fractura de ortejo
  const clasificacionLineaOrtejo = (() => {
    const val = answers.clasificacion_cerrada_ortejos || 
                answers.clasificacion_abierta_ortejos;
    const label = FRACTURA_CERRADA_LABEL_ORTEJO[val] || FRACTURA_ABIERTA_LABEL_ORTEJO[val];
    return val ? `- Clasificación: ${label || val}` : null;
  })();

  // Criterios de derivación metatarso
  const derivacionMetatarsoLinea = (() => {
    if (!answers.hay_derivacion_metatarso_cerrada) return null;
    const criterios = answers.hay_derivacion_metatarso_cerrada;
    if (Array.isArray(criterios) && criterios.includes("no_cumple") && criterios.length === 1) {
      return "- Criterios derivación metatarso: No presenta";
    }
    const labels = {
      compromiso_neurovascular: "Herida/compromiso neurovascular/sd compartimental/lesión Lisfranc",
      desplazada: "Desplazada >3mm / escalón >1-2mm / Fx asociadas / No unión sintomática",
      multiple: "Múltiple / intraarticular / de cabeza",
      zona2: "5° metatarsiano zona 2"
    };
    const textos = criterios.filter(c => c !== 'no_cumple').map(c => labels[c] || c);
    return `- Criterios derivación metatarso: ${textos.join(", ")}`;
  })();

  // Criterios de derivación tarso
  const derivacionTarsoLinea = (() => {
    if (!answers.hay_derivacion_tarso_cerrada) return null;
    const criterios = answers.hay_derivacion_tarso_cerrada;
    if (Array.isArray(criterios) && criterios.includes("no_cumple") && criterios.length === 1) {
      return "- Criterios derivación tarso: No presenta";
    }
    const labels = {
      compromiso_neurovascular: "Herida/compromiso neurovascular/sd compartimental/lesión Lisfranc",
      desplazada: "Desplazada > 2mm",
      multiple: "Múltiple / intraarticular / de cabeza"
    };
    const textos = criterios.filter(c => c !== 'no_cumple').map(c => labels[c] || c);
    return `- Criterios derivación tarso: ${textos.join(", ")}`;
  })();

  // Criterios de derivación ortejos
  const compromisoLabelsOrtejos = {
    "compromiso_blandas": "Compromiso de partes blandas o neurovascular importante",
    "compromiso_articular": "Compromiso articular, está desplazada/angulada o presenta inestabilidad",
    "ninguno": "No presenta"
  };

  const compromisoLineaOrtejos = answers.compromiso_derivacion_ortejos
    ? `- Criterios de derivación: ${compromisoLabelsOrtejos[answers.compromiso_derivacion_ortejos] || answers.compromiso_derivacion_ortejos}`
    : null;

  // Sección II
  const huboRx = rxSolicitadas.length > 0;
  const seccionII_lineas = [
    huboRx ? `- Radiografía solicitada: ${rxTexto}` : null,
    fracturaTexto ? `- Resultado: ${fracturaTexto}` : null,
    clasificacionLineaPie,
    clasificacionLineaOrtejo,
    derivacionMetatarsoLinea,
    derivacionTarsoLinea,
    compromisoLineaOrtejos,
  ].filter(Boolean);

  const seccionII = seccionII_lineas.length > 0
    ? `IMAGENOLOGÍA\n${seccionII_lineas.join('\n')}`
    : null;

  // Criterios Ottawa
  const ottawaLinea = (() => {
    const ottawa = answers.criterios_pie;
    if (!Array.isArray(ottawa) || ottawa.length === 0) return null;
    const criteriosPieLabels = {
      prueba_lisfranc: 'Prueba de Lisfranc (+)',
      prueba_chopart: 'Prueba de Chopart (+)',
      prueba_squeeze: 'Prueba de Squeeze (+)',
      no_cumple: 'No cumple ninguno (-)',
    };
    const criteriosSeleccionados = ottawa.map(v => criteriosPieLabels[v] || v).join('; ');
    return `- Pruebas del pie: ${criteriosSeleccionados}`;
  })();

  const deformidadLinea = answers.deformidad_evidente_pie
    ? `- Deformidad Evidente: ${answers.deformidad_evidente_pie === 'si' ? 'SÍ' : 'NO'}`
    : null;
  const tipoDolorLinea = answers.tipo_dolor_pie
    ? `- Tipo de Dolor: ${answers.tipo_dolor_pie}`
    : null;
  const toleranciaLinea = answers.tolera_carga_pie
    ? `- Tolerancia Carga: ${toleranciaTexto[answers.tolera_carga_pie]}`
    : null;

  const seccionI_extra = [ottawaLinea, deformidadLinea, tipoDolorLinea, toleranciaLinea]
    .filter(Boolean).join('\n');

  const seccionI_completa = [seccionI, seccionI_extra].filter(Boolean).join('\n');

  // Sección IV
  const seccionIV = pasos.map(s => `- ${s}`).join('\n');

  // Informe final
  const secciones = [
    `=========================================`,
    `      INFORME MÉDICO: METATARSO, TARSO Y ORTEJOS`,
    `=========================================`,
    `ID CASO: ${caseId}`,
    `FECHA: ${new Date().toLocaleDateString()}`,
    `DIAGNÓSTICO SUGERIDO: ${resultQuestion.text}`,
    ``,
    `EXAMEN FÍSICO`,
    seccionI_completa,
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
  ].filter(s => s !== null).join('\n');

  return secciones.trim();
};

// ═══════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════

const questionnaireModule = {
  questions,
  protocols,
  evaluateRisk,
  generateClinicalReport,
  restTextPorCarga,
  getProtocoloEsguincePie1,
  getProtocoloEsguincePie2,  
  getProtocoloEsguincePie3,
  getProtocoloEsguince1Ortejos,
  getProtocoloEsguince2Ortejos,
  getProtocoloEsguince3Ortejos,
  protocolo_fx_derivacion,
  protocolo_fx_cerrada_conservador_tarso,
  protocolo_fx_metatarsiano_cerrada_conservador,
  getProtocoloFxDerivacionSUOrtejos,
  requiresAnamnesis: true,
};

export default questionnaireModule;