// questionnaires/MetaTarsoQuestions.js

// Reemplaza la entrada estática por una función generadora
export const getProtocoloEsguincePie1 = (answers) => {
  const carga = Number(answers?.carga_laboral);
  const compromiso = answers?.compromiso_funcional === "si";
  const esSTP = carga === 1 || compromiso;

  const pasosBase = [
    "Realizar actividades habituales ",
    "Realizar ejercicios indicados en pauta ",
    "Reposo deportivo por 7-10 días ",
    ...(!esSTP ? [
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
    ] : []),
    "Tubigrip opcional (máx 1 semana, retiro nocturno)",
    "En caso de dolor invalidante, aumento de volumen o cambio de coloración del sitio lesionado acudir a agencia ACHS más cercana",
    "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 3 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 3 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días.",
  ];

  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO I",
    pasos: pasosBase,
  };
};

export const getProtocoloEsguincePie2 = (answers) => {
  const aumento = answers?.aumento_volumen;
  const tolerancia = answers?.tolera_carga_difuso_pie;

  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO II",
    pasos: [
      "Reposo laboral",
      "Reposo deportivo",
      "Realizar ejercicios indicados en pauta ",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
      "Descansar con extremidad en alto",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
      "Zapato pop con bastón según limitación de marcha",
      "Medicamentos: Analgesia escalonada según EVA (Iniciar con Paracetamol 1 gr cada 8hrs VO + AINES (Ibuprefno, ketoprofeno) cada 8hrs por 5-7 días VO) Ajustar según respuesta",
    ]
  };
};

export const getProtocoloEsguincePie3 = (answers) => {
  const aumento = answers?.aumento_volumen;
  const tolerancia = answers?.tolera_carga_difuso_pie;

  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO III",
    pasos: [
      "Reposo laboral.",
      "Reposo deportivo.",
      "Realizar ejercicios indicados en pauta ",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad.",
      "Zapato pop con bastón según limitación de marcha",
      "Medicamentos: Analgesia escalonada según EVA Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 5 días. Ajustar según respuesta.",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
    ]
  };
};

export const protocolo_fx_derivacion = (answers) => {
  const esLuxoLisfrancAbierta =
    answers?.clasificacion_abierta_pie === "abierta_luxo_lisfranc";
  const esMetatarsianoAbierta =
    answers?.clasificacion_abierta_pie === "abierta_metatarsiano";
  const esLuxoLisfrancCerrada =
    answers?.clasificacion_cerrada_pie === "cerrada_luxo_lisfranc";
  const esMetatarsianoCerradaZ2 =
    answers?.clasificacion_cerrada_pie === "cerrada_metatarsiano_z2";

  const esAtragaloAbierta =
    answers?.clasificacion_abierta_pie === "abierta_astragalo";
  const esCalcaneoAbierta =
    answers?.clasificacion_abierta_pie === "abierta_calcaneo";
  const esPerifericasTaloAbiertas =
    answers?.clasificacion_cerrada_pie === "abiertas_perifericas_talo";
  const esLuxoChopartCerrada =
    answers?.clasificacion_abierta_pie === "cerrada_luxo_chopart";
  const esLuxoPieCerrada =
    answers?.clasificacion_abierta_pie === "cerrada_luxo_pie";
  const esLuxoPieAbierta =
    answers?.clasificacion_cerrada_pie === "abierta_luxo_pie";  


  const hayCompromisoNeurovascular = answers?.compromiso_neurovascular === "si";
  const esMultiple = answers?.fractura__multiple;

  let nombreFractura = "";
  if (esLuxoLisfrancAbierta) {
    nombreFractura = "LUXOFRACTURA DE LISFRANC ABIERTA";
  } else if (esMetatarsianoAbierta) {
    nombreFractura = "FRACTURA METATARSIANO ABIERTA";
  } else if (esLuxoLisfrancCerrada) {
    nombreFractura = "LUXOFRACTURA DE LISFRANC CERRADA";
  } else if (esMetatarsianoCerradaZ2) {
    nombreFractura = "FRACTURA METATARSIANO CERRADA";
  } else if (esAtragaloAbierta) {
    nombreFractura = "FRACTURA ASATRAGALO ABIERTA";
  } else if (esCalcaneoAbierta) {
    nombreFractura = "FRACTURA CALCANEO ABIERTA";
  } else if (esPerifericasTaloAbiertas) {
    nombreFractura = "FRACTURAS PERIFERICAS TALO ABIERTAS";
  } else if (esLuxoChopartCerrada) {
    nombreFractura = "LUXOFRACTURA DE CHOPART CERRADA";
  } else if (esLuxoPieCerrada) {
    nombreFractura = "LUXOFRACTURA DEL PIE CERRADA";
  } else if (esLuxoPieAbierta) {
    nombreFractura = "LUXOFRACTURA DEL PIE ABIERTA";
  }


  return {
    titulo: `PROTOCOLO DE MANEJO - ${nombreFractura}`,
    pasos: [
      "🚨 Derivación inmediata a HT TyP o centro hospitalario con capacidad resolutiva 🚨",
      "Inmovilización con valva de la ambulancia",
      "Aplicar frío local",
      "Medicamentos: Analgesia EV y profilaxis tromboembólica con aspirina o dabigatrán una vez inmovilizada",
      "Vacunación antitetánica (en caso de fractura expuesta)",
    ],
  };
};

export const protocolo_fx_cerrada_conservador_tarso = (answers) => {
  const esAtragaloCerrada =
    answers?.clasificacion_abierta_pie === "cerrada_astragalo";
  const esCalcaneoCerrada =
    answers?.clasificacion_abierta_pie === "cerrada_calcaneo";
  const esCuelloTaloCerrada =
    answers?.clasificacion_cerrada_pie === "cerrada_cuello_talo";
  const esCuerpoTaloCerrada =
    answers?.clasificacion_cerrada_pie === "cerrada_cuerpo_talo";

  const esEscafoidesCerrada =
    answers?.clasificacion_abierta_pie === "cerrada_escafoides";
  const esHuesosTarsoCerrada =
    answers?.clasificacion_abierta_pie === "cerrada_huesos_tarso";
  const esPerifericasTaloCerrada =
    answers?.clasificacion_cerrada_pie === "abiertas_perifericas_talo";

  const hayCompromisoNeurovascular = answers?.compromiso_neurovascular === "si";
  const esMultiple = answers?.fractura__multiple === "si";
  const esDesplazable = answers?.desplazable === "si";

  let nombreFractura = "";
  if (esAtragaloCerrada) {
    nombreFractura = "FRACTURA ASTRAGALO CERRADA";
  } else if (esCalcaneoCerrada) {
    nombreFractura = "FRACTURA CALCANEO CERRADA";
  } else if (esCuelloTaloCerrada) {
    nombreFractura = "FRACTURA CUELLO TALO CERRADA";
  } else if (esCuerpoTaloCerrada) {
    nombreFractura = "FRACTURA CUERPO TALO CERRADA";
  } else if (esEscafoidesCerrada) {
    nombreFractura = "FRACTURA ESCAFOIDES TARSO DEL PIE CERRADA";
  } else if (esHuesosTarsoCerrada) {
    nombreFractura = "FRACTURA HUESOS DEL TARSO (EXCEPTO ESCAFOIDES) CERRADA";
  } else if (esPerifericasTaloCerrada) {
    nombreFractura = "FRACTURAS PERIFERICAS TALO CERRADAS";
  } 

  return {
    titulo: `PROTOCOLO DE MANEJO - ${nombreFractura}`,
    pasos: [
      "Manejo conservador",
      "Aplicar frío local",
      "Inmovilización con bota w y bastones",
      "Descarga por 6 a 8 semanas",
      "Medicamentos: Analgesia EV y profilaxis tromboembólica con aspirina o dabigatrán una vez inmovilizada",
      "Control en 2 semanas"
    ]
  };
};

export const protocols = {
    "getProtocoloEsguincePie1": {
      titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO I",
      pasos: [], // placeholder; se sobreescribe dinámicamente
    },

    "getProtocoloEsguincePie2": {
      titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO II",
      pasos: [], // placeholder; se sobreescribe dinámicamente
    },
    
    "getProtocoloEsguincePie3": {
      titulo: "INDICACIONES AL PACIENTE - ESGUINCE DEL PIE GRADO III",
      pasos: [], // placeholder; se sobreescribe dinámicamente
    },
      
    // PROTOCOLOS ESCENARIOS FRACTURAS
    "protocolo_fx_cerrada_conservador_metatarso": {
        "titulo": "INDICACIONES AL PACIENTE - FRACTURA METATARSIANO CERRADA",
        "pasos": [
            "Reposo",
            "Inmovilización: Zapato pop",
            "Analgesia VO",
            "Medicamentos: tromboprofilaxis según protocolo, sólo si no tolera carga",
            "Control con medico AP a la semana ",
            "Control SOS"
        ]
    },  
};

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
    { value: 3, labelBold: "Pesada",  labelDesc: "levanta peso/maquinaria" }
  ]
},
  { id: "eva_pie", text: "Dolor (EVA)", type: "slider", group: "anamnesis", min: 0, max: 10 },
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
    text: "Inestabilidad", 
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

  // --- GRUPO RIESGO (Árbol de Decisión corregido) ---


// Criterios de Ottawa (solo si estable o local sin equimosis)
  {
    id: "criterios_pie",
    text: "¿Cumple algún criterio de las pruebas de pie? Seleccione aquellos que cumple:",
    type: "multi",
    group: "risk",
    showIf: (ans) => ans.deformidad_evidente_pie === "no",
    options: [
        { value: "prueba_lisfranc", label: "Prueba de Lisfranc: Palpar la zona dorsal entre la base del 1° y 2° metatarsiano. Mover antepié en abducción manteniendo retropié fijo. Positiva: dolor en mediopié" },
        { value: "prueba_chopart", label: "Prueba de Chopart: Sujetar retropié y movilizar mediopié en aducción/abducción o inversión/eversión. Positiva: dolor en línea articular del mediopié" },
        { value: "prueba_squeeze", label: "Prueba de Squeeze:Comprimir tibia y peroné proximalmente. Positiva: dolor distal en tobillo (sindesmosis)" },
        { value: "no_cumple", label: "No cumple ninguno (-)" }
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
    // Mostrar si seleccionó al menos un criterio positivo (cualquiera que no sea "no_cumple")
    return pie.some(v => v !== "no_cumple");
  },
  options: [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" }
  ]
},

    // MANDA A RX SI TIENE DEFORMIDAD EVIDENTE
 {
  id: "rx_deformidad_pie",
  text: "Realizar Radiografía Pie Ap-Lat-Obl sin carga.",
  textFn: () => "Realizar Radiografía Pie Ap-Lat-Obl sin carga",
  type: "options",
  group: "risk",
  showIf: (ans) => ans.deformidad_evidente_pie === "si",
  options: [
    { value: "listo", label: "✅ Realizada" }
  ]
},

  // NUEVA: Pregunta de dolor siempre (independiente de deformidad)
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


  // Tolerancia a la carga (solo si dolor difuso)
  {
    id: "tolera_carga_pie",
    text: "¿Tolera la carga?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tipo_dolor_pie === "difuso" || ans.tipo_dolor_pie === "local" ,
    options: [
        { value: "no_tolera", label: "No tolera carga" },
        { value: "con_dificultad", label: "Tolera carga con dificultad" },
        { value: "tolera", label: "Tolera carga" }
    ]
  },

  
   // MANDA A RX SI TIENE DEFORMIDAD EVIDENTE
 {
  id: "rx_no_tolera_carga_pie",
  text: "Realizar Radiografía Ap-Lateral- obl de Pie con carga + mortaja. ",
  textFn: (ans) => "Realizar Radiografía Ap-Lateral- obl de Pie con carga + mortaja.",
  type: "options",
  group: "risk",
  showIf: (ans) => ans.tolera_carga_pie === "no_tolera",
  options: [
    { value: "listo", label: "✅ Realizada" }
  ]
},


  // MANDA A RX SI CUMPLE CON ALGUNA PRUEBA DEL PIE
  {
    id: "rx_tolera_carga_pie",
    textFn: (ans) => "Realizar Radiografía Pie Ap-Lat-Obl con carga",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tolera_carga_pie === "con_dificultad" || ans.tolera_carga_pie === "tolera",
    options: [
        { value: "listo", label: "✅ Realizada" }
    ]
  }, // esto después debe conectarse con un ¿Presenta fractura?


  // ¿Hay fractura?
  {
    id: "hay_fractura_pie",
    text: "¿Se detectó una fractura?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.rx_deformidad_pie === "listo" || ans.rx_no_tolera_carga_pie === "listo" || ans.rx_tolera_carga_pie === "listo" ,
    options: [
        { value: "no", label: "No" },
        { value: "si_cerrada", label: "Sí, cerrada" },
        { value: "si_abierta", label: "Sí, abierta" }
    ]
  },

  // Clasificación específica (solo si hay fractura)
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

    // Clasificación específica (solo si hay fractura)
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
];

// Diccionario de los values
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


// --- NUEVO: reposo dinámico por carga para esguinces I, II y III
export const restTextPorCarga = (answers, protocolId) => {
  const carga = Number(answers?.carga_laboral); // valores esperados: 1, 2 o 3
  if (!carga || ![1, 2, 3].includes(carga)) return null;

  // Mapa por protocolo
  const reposoPorProtocolo = {
    // Mantengo tu lógica tal cual para Grado I
    getProtocoloEsguincePie1: {
      1: 'Sin reposo',
      2: 'Alta diferida hasta 1 día', // Si no presenta compromiso funcional debe ser Sin reposo
      3: 'Alta diferida hasta 2 días',
    },
    // NUEVO: Grado II
    getProtocoloEsguincePie2: {
      1: 'Alta diferida 5 días',
      2: 'hasta 7 días',
      3: 'hasta 14 días',
    },
    // NUEVO: Grado III
    getProtocoloEsguincePie3: {
      1: 'hasta 6 semanas ',
      2: 'hasta 7 semanas',
      3: 'hasta 8 semanas',
    },
  };

  const map = reposoPorProtocolo[protocolId];
  const indicacion = map?.[carga];
  return indicacion ? `Reposo según carga laboral: ${indicacion}` : null;
};

// EVALUACIÓN PARA SUGERIR DIAGNÓSTICO
export const evaluateRisk = (answers) => {
  // 1. Diagnósticos de Fractura (prioridad más alta)

  // Builder de diagnóstico de fractura
  const buildFracturaResult = (ans) => {
    const tipo = ans.hay_fractura_pie;

if (tipo !== 'si_abierta' && tipo !== 'si_cerrada') return null;

    const isAbierta = tipo === 'si_abierta';
    const clasVal   = isAbierta ? ans.clasificacion_especifica_abierta_pie : ans.clasificacion_especifica_cerrada_pie;
    const clasLabel = isAbierta ? FRACTURA_ABIERTA_LABEL_PIE[clasVal]      : FRACTURA_CERRADA_LABEL_PIE[clasVal];
    const tipoTxt = isAbierta ? 'Abierta' : 'Cerrada';

    return {
  id: `f_pie_${clasVal}`,
  text: `Fractura del Pie ${tipoTxt}: ${clasLabel || 'No especificada'}`,
  color: 'red',
  protocolId: isAbierta
    ? 'protocolo_fx_derivacion'
    : 'protocolo_fx_cerrada_conservador_metatarso',
};

  };

// 1) Intentar con fractura
  const diagFractura = buildFracturaResult(answers);
  if (diagFractura) return diagFractura;

  // Helper: Ottawa negativo = seleccionó solo "no_cumple" o array vacío
  const ottawaArray = Array.isArray(answers.criterios_pie) ? answers.criterios_pie : [];
  const ottawaNegativo = ottawaArray.length === 0 || 
    (ottawaArray.length === 1 && ottawaArray.includes("no_cumple"));

  // Lógica de esguinces — aplica tanto si hay_fractura === "no" como si no hubo RX (ottawa negativo)
  const puedeEsguince = answers.hay_fractura_pie === "no" || ottawaNegativo;

  if (puedeEsguince) {
    const inestabilidad = answers.inestabilidad_pie;
    const volumen = answers.aumento_volumen;
    const equimosis = answers.equimosis_pie;
    const deformidad = answers.deformidad_evidente_pie;
    const carga = answers.tolera_carga_pie;
    const rx_eg2 = answers.rx_tolera_carga_pie;
    const pruebasNegativas =
    ottawaArray.length === 0 ||
    (ottawaArray.length === 1 && ottawaArray.includes('no_cumple'));



    // Grado III: con inestabilidad + edema + equimosis (ambos presentes)
    if (
      deformidad === "si" ||
      carga === "no_tolera" 
    ) {
      return { id: "e3", text: "Esguince del Pie Grado III", color: "red", protocolId: "getProtocoloEsguincePie3" };
    }

    // Grado II: sin inestabilidad o dudosa + edema presente + algo de equimosis
    if ( carga === "tolera" || carga === "con_dificultad"  || (equimosis === "sin_equimosis" && tipo_dolor_pie === "local" && inestabilidad_pie === "sin_inestabilidad")
    ) {
      return { id: "e2", text: "Esguince del Pie Grado II", color: "green", protocolId: "getProtocoloEsguincePie2" };
    }

    // Grado I: sin inestabilidad + sin edema o leve
    if ( pruebasNegativas  || (inestabilidad === "sin_inestabilidad" && tipo_dolor_pie === "local")
    ) {
      return { id: "e1", text: "Esguince del Pie Grado I", color: "green", protocolId: "getProtocoloEsguincePie1" };
    }
  }
  return { id: "e1", text: "Esguince del Pie Grado I", color: "green", protocolId: "getProtocoloEsguincePie1" };
};


export const generateClinicalReport = ({ caseId, answers, resultQuestion, protocols, stepsOverride }) => {
  const prot = resultQuestion.protocolId === 'getProtocoloEsguincePie1'
    ? getProtocoloEsguincePie1(answers)
    : protocols[resultQuestion.protocolId];

  const reposoDinamico = restTextPorCarga(answers, resultQuestion.protocolId);
  const pasosBase = Array.isArray(prot?.pasos) ? [...prot.pasos] : [];
  if (reposoDinamico) pasosBase.unshift(reposoDinamico);

  // Si hay override (indicaciones seleccionadas), usar esas; si no, usar todas
  const pasos = stepsOverride ?? pasosBase;

  // Determinar qué radiografías se solicitaron
  const rxSolicitadas = [];
  if (answers.rx_deformidad_pie === 'listo') rxSolicitadas.push('Rx pie Ap-Lat-Obl sin carga (deformidad)');
  if (answers.rx_no_tolera_carga_pie === 'listo') rxSolicitadas.push('Rx pie Ap-Lat-Obl con carga + mortaja (no tolera carga)');
  if (answers.rx_tolera_carga_pie === 'listo') rxSolicitadas.push('Rx pie Ap-Lat-Obl con carga');

  const rxTexto = rxSolicitadas.length > 0
    ? rxSolicitadas.join(' | ')
    : 'No solicitada';

  const fracturaTexto = answers.hay_fractura_pie === 'si_cerrada' ? 'FRACTURA CERRADA DETECTADA'
    : answers.hay_fractura_pie === 'si_abierta' ? 'FRACTURA ABIERTA DETECTADA'
    : answers.hay_fractura_pie === 'no' ? 'Sin fractura en radiografía'
    : null; // Si no se llegó a responder, se omite

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

  // Helper: solo incluye una línea si el valor existe y no es "No evaluado"
  const line = (label, value) => (value ? `- ${label}: ${value}` : null);

  // Construir sección I — solo campos con valor
  const seccionI = [
    line('Carga Laboral', cargaTexto[Number(answers.carga_laboral)]),
    answers.eva_pie !== undefined ? `- Dolor (EVA): ${answers.eva_pie}/10` : null,
    line('Aumento de volumen (AVO)', edemaTexto[answers.aumento_volumen]),
    line('Equimosis', equimosisTexto[answers.equimosis_pie]),
    line('Inestabilidad', inestabilidadTexto[answers.inestabilidad_pie]),
    answers.hallazgos_fisicos_pie ? `- Hallazgos Físicos: ${answers.hallazgos_fisicos_pie}` : null,
  ].filter(Boolean).join('\n');

  // Construir sección II — solo si hubo RX o fractura
  const clasificacionLinea = (() => {
    const LABELS = {
      fractura_astragalo_abierta:          'Fractura Astragalo Abierta',
      fractura_astragalo_cerrada:          'Fractura Astragalo Cerrada',
      fractura_calcaneo_abierta:           'Fractura Calcáneo Abierta',
      fractura_calcaneo_cerrada:           'Fractura Calcáneo Cerrada',
      fractura_cuello_talo_cerrada:        'Fractura Cuello Talo Cerrada',
      fractura_cuerpo_talo_cerrada:        'Fractura Cuerpo Talo Cerrada',
      fractura_escafoides_tarso_cerrada:   'Fractura Escafoides Tarso del Pie Cerrada',
      fractura_huesos_tarso_cerrada:       'Fractura Huesos del Tarso (excepto Escafoides) Cerrada',
      fractura_metatarsiano_abierta:       'Fractura Metatarsiano Abierta',
      fractura_metatarsiano_cerrada:       'Fractura Metatarsiano Cerrada',
      fracturas_perifericas_talo_abiertas: 'Fracturas Periféricas Talo Abiertas',
      fracturas_perifericas_talo_cerradas: 'Fracturas Periféricas Talo Cerradas',
      luxafractura_lisfranc_abierta:       'Luxafractura de Lisfranc Abierta',
      luxofractura_chopart_cerrada:        'Luxofractura de Chopart Cerrada',
      luxofractura_lisfranc_cerrada:       'Luxofractura de Lisfranc Cerrada',
      luxofractura_pie_abierta:            'Luxofractura del Pie Abierta',
      luxofractura_pie_cerrada:            'Luxofractura del Pie Cerrada',
    };
    const val = answers.clasificacion_especifica_cerrada_pie || answers.clasificacion_especifica_abierta_pie;
    return val ? `- Clasificación: ${LABELS[val] || val}` : null;
  })();

  // Solo incluir sección de imagenología si hubo alguna radiografía
  const huboRx = rxSolicitadas.length > 0;
  const seccionII_lineas = [
    huboRx ? `- Radiografía solicitada: ${rxTexto}` : null,
    fracturaTexto ? `- Resultado: ${fracturaTexto}` : null,
    clasificacionLinea,
  ].filter(Boolean);

  const seccionII = seccionII_lineas.length > 0
    ? `IMAGENOLOGÍA\n${seccionII_lineas.join('\n')}`
    : null;

  // Criterios Ottawa — solo si se respondió
  const ottawaLinea = (() => {
    const ottawa = answers.criterios_pie;
    if (!Array.isArray(ottawa) || ottawa.length === 0) return null;
    const texto = (ottawa.length === 1 && ottawa.includes('no_cumple'))
      ? 'Negativo (-)'
      : 'Positivo (+)';
    return `- Pruebas del pie: ${texto}`;
  })();

  // Deformidad y tolerancia — solo si se respondieron
  const deformidadLinea = answers.deformidad_evidente_pie
    ? `- Deformidad Evidente: ${answers.deformidad_evidente_pie === 'si' ? 'SÍ' : 'NO'}`
    : null;
  const tipoDolorLinea = answers.tipo_dolor_pie
    ? `- Tipo de Dolor: ${answers.tipo_dolor_pie}`
    : null;
  const toleranciaLinea = answers.tolera_carga_difuso_pie
    ? `- Tolerancia Carga: ${toleranciaTexto[answers.tolera_carga_difuso_pie]}`
    : null;

  // Agregamos a sección I los campos de evaluación que apliquen
  const seccionI_extra = [ottawaLinea, deformidadLinea, tipoDolorLinea, toleranciaLinea]
    .filter(Boolean).join('\n');

  const seccionI_completa = [seccionI, seccionI_extra].filter(Boolean).join('\n');

  // Sección IV — guiones en vez de números, TODOS los pasos
  const seccionIV = pasos.map(s => `- ${s}`).join('\n');

  // Armar el informe final
  const secciones = [
    `=========================================`,
    `      INFORME MÉDICO: METATARSO Y TARSO`,
    `=========================================`,
    `ID CASO: ${caseId}`,
    `FECHA: ${new Date().toLocaleDateString()}`,
    `TOBILLO: ${answers.pie}`,
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
const questionnaireModule = {
  questions,
  protocols,
  evaluateRisk,
  generateClinicalReport,
  restTextPorCarga,
  getProtocoloEsguincePie1,
  getProtocoloEsguincePie2,  // ← agregar
  getProtocoloEsguincePie3,  // ← agregar
  requiresAnamnesis: true,
};
export default questionnaireModule;