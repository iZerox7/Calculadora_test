// questionnaires/ortejosQuestions.js

// Reemplaza la entrada estática por una función generadora
export const getProtocoloEsguince1Ortejos = (answers) => {
  const carga = Number(answers?.carga_laboral);
  const esSTP = carga === 1;

  const pasosBase = [
    "Realizar actividades habituales ",
    "Realizar ejercicios indicados en pauta ",
    "Reposo deportivo por 7-10 días ",
    ...(!esSTP ? [
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
    ] : []),
    "En caso de dolor invalidante, aumento de volumen o cambio de coloración del sitio lesionado acudir a agencia ACHS más cercana",
    "Inmovilización: vendaje solidario con suela rígida por 3 días",
    "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 3 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 3 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días.",
  ];

  return {
    titulo: "INDICACIONES AL PACIENTE - ESGUINCE DE LOS ORTEJOS Y ANTEPIE GRADO I",
    pasos: pasosBase,
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

  const hayCompromisoArticular =
    answers?.compromiso_articular === "si";

  const esFracturaCerrada =
    esCerradaPrimerOrtejo || esCerradaNoPrimerOrtejo;

  // ---------------------------
  // Nombre de la fractura
  // ---------------------------
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

  // ---------------------------
  // Texto de derivación
  // ---------------------------
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
``

export const protocols = {
    "protocolo_esguince_1_ortj": {
      titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO I",
      pasos: [], // placeholder; se sobreescribe dinámicamente
    },

    "protocolo_esguince_2_ortj": {
      titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO II",
      pasos: [ "Reposo laboral",
      "Reposo deportivo",
      "Realizar ejercicios indicados en pauta",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad",
      "Descansar con extremidad en alto",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
      "Inmovilización: vendaje solidario con suela rígida por 5 días",
      "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días",
      "Control con médico AP en agencia en 5 a 7 días"] //INCLUIR MENSAJE DE ESTO Y AHI AGENDAR], // placeholder; se sobreescribe dinámicamente
    },
    
    "protocolo_esguince_3_ortj": {
      titulo: "INDICACIONES AL PACIENTE - ESGUINCE GRADO III",
      pasos: ["Reposo laboral.",
      "Reposo deportivo.",
      "Aplicar frío local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad.",
      "Descansar con extremidad en alto",
      "En caso de dolor invalidante, acudir a agencia ACHS más cercana",
      "Inmovilización: suela rígida o bota entre 7-10 días",
      "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 5 días. Ajustar según respuesta. En caso de no respuesta a los 7-10 días, considerar escalar a tramadol/paracetamol 37,5 mg/ 325 mg vo c/8-12 h. No extender uso de AINES por más de 7 días",
      "Control con médico AP en agencia en 5 a 7 días"] //INCLUIR MENSAJE DE ESTO Y AHI AGENDAR  ], // placeholder; se sobreescribe dinámicamente
    },
      
///////////// PROTOCOLOS ESCENARIOS FRACTURAS ///////////////
    "protocolo_fx_cerrada_primer_ortejo": { // Cuando no se requiere derivación
        "titulo": "PROTOCOLO DE MANEJO - FRACTURA ORTEJOS CERRADA",
        "pasos": [
            "Reposo",
            "Pie en alto",
            "Evitar carga hasta evidencia de consolidación",
            "Frío local por 15 minutos 3 veces al día por 48 hrs luego calor local por 15 minutos, 3 veces al dia hasta control",
            "Analgesia según EVA",
            "Medicamentos: Analgesia y profilaxis tromboembólica con aspirina. Iniciar con Paracetamol 1gr cada 8hrs VO y ketoprofeno 50mg o ibuprofeno 400mg cada 8hrs por 5-7 días VO. Ajustar según respuesta",
            "Inmovilización: vendaje solidario con zapato POP y bastones",
            "Control con medico AP al día 7",
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

{ id: "eva", text: "Dolor (EVA)", type: "slider", group: "anamnesis", min: 0, max: 10 },

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
    id: "inestabilidad", 
    text: "Inestabilidad", 
    type: "options", 
    group: "anamnesis",
    options: [
      { value: "sin_inestabilidad", label: "Sin inestabilidad" },
      { value: "con_inestabilidad", label: "Con inestabilidad" }
    ]
  },

{ 
    id: "hallazgos_fisicos", 
    text: "Examen Físico: Marcha / Heridas / Maniobras", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Describa presencia de heridas, tipo de marcha..."
  },

  {
    id: "tipo_dolor",
    text: "¿Cómo se presenta el dolor?",
    type: "options",
    group: "anamnesis",
    options: [
        { value: "difuso", label: "Difuso" },
        { value: "local", label: "Local" }
    ]
  },

  

   // MANDA A RX SI TIENE DOLOR DIFUSO Y AVO ++ O +++
 {
  id: "rx_dolor_difuso",
  text: "Realizar Radiografía Pie Ap-Lat-Obl del dedo afectado (con carga si tolera)",
  type: "options",
  group: "risk",
  showIf: (ans) => ans.tipo_dolor === "difuso" && (ans.aumento_volumen === "moderado" || ans.aumento_volumen === "severo"),
  options: [
    { value: "listo", label: "✅ Realizada" }
  ]
},

   // MANDA A RX SI TIENE DOLOR LOCAL Y AVO ++ O +++
 {
  id: "rx_dolor_local",
  text: "Realizar Radiografía Ap-Lat-Obl del dedo afectado",
  type: "options",
  group: "risk",
  showIf: (ans) => ans.tipo_dolor === "local" && (ans.aumento_volumen === "moderado" || ans.aumento_volumen === "severo"),
  options: [
    { value: "listo", label: "✅ Realizada" }
  ]
},
 

  // ¿Hay fractura?
  {
    id: "hay_fractura",
    text: "¿Se detectó una fractura?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.rx_dolor_difuso === "listo" || ans.rx_dolor_local === "listo",
    options: [
        { value: "no", label: "No" },
        { value: "si_cerrada", label: "Sí, cerrada" },
        { value: "si_abierta", label: "Sí, abierta" },
        { value: "si_otra", label: "Sí, pero no en ortejos" }
    ]
  },

// Fractura de pie: lista desplegable
{
  id: "fractura_pie_tipo",
  text: "Seleccione la fractura detectada:",
  type: "select",
  group: "risk",
  showIf: (ans) => ans.hay_fractura === "si_otra",
  options: [
    { value: "fractura_astragalo_abierta",             label: "Fractura Astragalo Abierta" },
    { value: "fractura_astragalo_cerrada",             label: "Fractura Astragalo Cerrada" },
    { value: "fractura_calcaneo_abierta",              label: "Fractura Calcáneo Abierta" },
    { value: "fractura_calcaneo_cerrada",              label: "Fractura Calcáneo Cerrada" },
    { value: "fractura_cuello_talo_cerrada",           label: "Fractura Cuello Talo Cerrada" },
    { value: "fractura_cuerpo_talo_cerrada",           label: "Fractura Cuerpo Talo Cerrada" },
    { value: "fractura_escafoides_tarso_cerrada",      label: "Fractura Escafoides Tarso del Pie Cerrada" },
    { value: "fractura_huesos_tarso_cerrada",          label: "Fractura Huesos del Tarso (excepto Escafoides) Cerrada" },
    { value: "fractura_metatarsiano_abierta",          label: "Fractura Metatarsiano Abierta" },
    { value: "fractura_metatarsiano_cerrada",          label: "Fractura Metatarsiano Cerrada" },
    { value: "fracturas_perifericas_talo_abiertas",    label: "Fracturas Periféricas Talo Abiertas" },
    { value: "fracturas_perifericas_talo_cerradas",    label: "Fracturas Periféricas Talo Cerradas" },
    { value: "luxafractura_lisfranc_abierta",          label: "Luxafractura de Lisfranc Abierta" },
    { value: "luxofractura_chopart_cerrada",           label: "Luxofractura de Chopart Cerrada" },
    { value: "luxofractura_lisfranc_cerrada",          label: "Luxofractura de Lisfranc Cerrada" },
    { value: "luxofractura_pie_abierta",               label: "Luxofractura del Pie Abierta" },
    { value: "luxofractura_pie_cerrada",               label: "Luxofractura del Pie Cerrada" },
    { value: "otra",                                   label: "Otra" },
  ]
},

// Fractura de pie: texto libre si seleccionó "Otra"
{
  id: "fractura_pie_otra",
  text: "Especifique la fractura:",
  type: "textarea",
  group: "risk",
  showIf: (ans) => ans.hay_fractura === "si_otra" && ans.fractura_pie_tipo === "otra",
  placeholder: "Describa la fractura detectada..."
},


  // Clasificación específica (solo si hay fractura)
  {
    id: "clasificacion_especifica_cerrada",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_cerrada",
    options: [
        { value: "cerrada_primer_ortj", label: "Primer ortejo" },
        { value: "cerrada_ex_primer_ortj", label: "Ortejos excepto primer ortejo" }
    ]
  },

    // Clasificación específica (solo si hay fractura)
  {
    id: "clasificacion_abierta_ortejos",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_abierta",
    options: [
        { value: "abierta_primer_ortj", label: "Primer ortejo" },
        { value: "abierta_ex_primer_ortj", label: "Ortejos excepto primer ortejo" }
    ]
  },

];

// Diccionario de los values
const FRACTURA_CERRADA_LABEL_ORTJ = {
  cerrada_primer_ortj: 'Primer ortejo Cerrada',
  cerrada_ex_primer_ortj: 'Ortejos excepto primer ortejo Cerrada',
};

const FRACTURA_ABIERTA_LABEL_ORTJ = {
  abierta_primer_ortj: 'Primer ortejo Abierta',
  abierta_ex_primer_ortj: 'Ortejos excepto primer ortejo Abierta',
};


// --- NUEVO: reposo dinámico por carga para esguinces I, II y III
export const restTextPorCarga = (answers, protocolId) => {
  const carga = Number(answers?.carga_laboral); // valores esperados: 1, 2 o 3
  if (!carga || ![1, 2, 3].includes(carga)) return null;

  // Mapa por protocolo
  const reposoPorProtocolo = {
    // Mantengo tu lógica tal cual para Grado I
    protocolo_esguince_1: {
      1: 'Sin reposo',
      2: 'Alta diferida hasta 2 días',
      3: 'Alta diferida hasta 3 días',
    },
    // NUEVO: Grado II
    protocolo_esguince_2: {
      1: 'Alta diferida 5 días',
      2: 'hasta 7 días',
      3: 'hasta 14 días',
    },
    // NUEVO: Grado III
    protocolo_esguince_3: {
      1: 'hasta 21 días',
      2: 'hasta 30 días',
      3: 'hasta 45 días',
    },
  };

  const map = reposoPorProtocolo[protocolId];
  const indicacion = map?.[carga];
  return indicacion ? `Reposo según carga laboral: ${indicacion}` : null;
};

// EVALUACIÓN PARA SUGERIR DIAGNÓSTICO
export const evaluateRisk = (answers) => {
  // 1. Diagnósticos de Fractura (prioridad más alta)

// Prioridad de escenarios: 4 > 3 > 2 > 1
const SCENARIO_PRIORITY = ['escenario_4', 'escenario_3', 'escenario_2', 'escenario_1'];


// Validación de escenarios con tus restricciones
  const isScenarioValid = (scenario, isAbierta, clasVal, weberVal) => {
    if (!scenario) return false;

    // Escenario 4: cualquier fractura
    if (scenario === 'escenario_4') return true;

    // Escenarios 1-3 aplican a fracturas cerradas
    if (isAbierta) return false;

    switch (scenario) {
      case 'escenario_1': {
        // Weber A: Pilón tibial cerrada o Maléolo peroné cerrada
        // Weber B/C: solo Maléolo peroné cerrada
        if (!weberVal) return false;
        if (weberVal === 'weber_a') {
          return ['maleolo_perone_cerrada'].includes(clasVal);
        }
        if (weberVal === 'weber_b_c') {
          return clasVal === 'maleolo_perone_cerrada';
        }
        return false;
      }
      case 'escenario_2':
        return clasVal === 'bimaleolar_cerrada';
      case 'escenario_3': {
        const allowed = new Set([
          'bimaleolar_cerrada',
          'maleolo_tibial_cerrada',
          'maleolo_perone_cerrada',
          'trimaleolar_cerrada',
        ]);
        return allowed.has(clasVal);
      }
      default:
        return false;
    }
  };

  const pickScenarioByPriority = (list) => SCENARIO_PRIORITY.find(s => list.includes(s));

  // Builder de diagnóstico de fractura
  const buildFracturaResult = (ans) => {
    const tipo = ans.hay_fractura;

// Fractura de pie (no tobillo)
if (tipo === 'si_otra') {
  const opcionSeleccionada = ans.fractura_pie_tipo;
  if (!opcionSeleccionada) return null; // aún no respondió

  // Buscar el label de la opción seleccionada
  const FRACTURA_PIE_LABELS = {
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

  const diagText = opcionSeleccionada === 'otra'
    ? (ans.fractura_pie_otra?.trim() || 'Fractura de Pie - Sin especificar')
    : (FRACTURA_PIE_LABELS[opcionSeleccionada] || opcionSeleccionada);

  return {
    id: 'fractura_pie',
    text: diagText,
    color: 'red',
    protocolId: 'protocolo_fractura_pie',
  };
}

if (tipo !== 'si_abierta' && tipo !== 'si_cerrada') return null;

    const isAbierta = tipo === 'si_abierta';
    const clasVal   = isAbierta ? ans.clasificacion_especifica_abierta : ans.clasificacion_especifica_cerrada;
    const clasLabel = isAbierta ? FRACTURA_ABIERTA_LABEL[clasVal]      : FRACTURA_CERRADA_LABEL[clasVal];
    const protocolClas = isAbierta ? PROTOCOL_ABIERTA[clasVal]         : PROTOCOL_CERRADA[clasVal];
    const tipoTxt = isAbierta ? 'Abierta' : 'Cerrada';

    // Normaliza selección de escenarios
    const sel = ans.escenario_fractura;
    const selected = Array.isArray(sel) ? sel : (sel ? [sel] : []);
    const validSelected = selected.filter(s => isScenarioValid(s, isAbierta, clasVal, ans.weber));
    const chosen = pickScenarioByPriority(validSelected);

    if (chosen) {
      if (chosen === 'escenario_1') {
        const weber = ans.weber; // weber_a | weber_b | weber_c
        const weberLabel = WEBER_LABEL[weber];
        const protocolWeber = PROTOCOL_WEBER[weber];

        return {
          id: `f_${clasVal || weber || chosen}`,
          text: `Fractura ${tipoTxt}: ${clasLabel || 'No especificada'} (Escenario 1${weberLabel ? ' · ' + weberLabel : ''})`,
          color: 'red',
          protocolId: protocolWeber || PROTOCOL_ESCENARIO[chosen] || protocolClas,
        };
      }

      // Escenarios 2, 3 o 4
      return {
        id: `f_${clasVal || chosen}`,
        text: `Fractura ${tipoTxt}: ${clasLabel || 'No especificada'} (${ESCENARIO_LABEL[chosen]})`,
        color: 'red',
        protocolId: PROTOCOL_ESCENARIO[chosen] || protocolClas,
      };
    }

    // Sin escenario válido -> protocolo por clasificación (si hay)
    if (clasVal && protocolClas) {
      return {
        id: `f_${clasVal}`,
        text: `Fractura ${tipoTxt}: ${clasLabel || 'No especificada'}`,
        color: 'red',
        protocolId: protocolClas,
      };
    }

    // Hay fractura pero sin clasificación -> protocolo genérico por tipo
    return {
      id: `f_sin_clasificar_${isAbierta ? 'abierta' : 'cerrada'}`,
      text: `Fractura ${tipoTxt}: No especificada`,
      color: 'red',
      protocolId: isAbierta ? 'protocolo_escenario_4' : 'protocolo_escenario_3',
    };
  };

// 1) Intentar con fractura
  const diagFractura = buildFracturaResult(answers);
  if (diagFractura) return diagFractura;

  // Helper: Ottawa negativo = seleccionó solo "no_cumple" o array vacío
  const ottawaArray = Array.isArray(answers.criterios_ottawa2) ? answers.criterios_ottawa2 : [];
  const ottawaNegativo = ottawaArray.length === 0 || 
    (ottawaArray.length === 1 && ottawaArray.includes("no_cumple"));

  // Lógica de esguinces — aplica tanto si hay_fractura === "no" como si no hubo RX (ottawa negativo)
  const puedeEsguince = answers.hay_fractura === "no" || ottawaNegativo;

  if (puedeEsguince) {
    const inestabilidad = answers.inestabilidad;
    const volumen = answers.aumento_volumen;
    const equimosis = answers.equimosis;

    // Grado III: con inestabilidad + edema + equimosis (ambos presentes)
    if (
      inestabilidad === "con_inestabilidad" &&
      volumen !== "ninguno" && volumen != null &&
      equimosis === "difusa" && equimosis != null
    ) {
      return { id: "e3", text: "Esguince de Tobillo Grado III", color: "red", protocolId: "protocolo_esguince_3" };
    }

    // Grado II: sin inestabilidad o dudosa + edema presente + algo de equimosis
    if (
      (inestabilidad === "sin_inestabilidad" || inestabilidad === "dudosa") &&
      (volumen === "moderado" || volumen === "severo") 
      //  &&
      // (equimosis === "localizada" || equimosis === "difusa" ) // Comentamos el criterio de equimosis para darle más importancia al AVO
    ) {
      return { id: "e2", text: "Esguince de Tobillo Grado II", color: "green", protocolId: "protocolo_esguince_2" };
    }

    // Grado II (fallback por Ottawa): incapacidad de dar pasos, aunque edema sea leve o ausente
    const tieneIncapacidadPasos = ottawaArray.includes("incapacidad_pasos");
    if (
      (inestabilidad === "sin_inestabilidad" || inestabilidad === "dudosa") &&
      tieneIncapacidadPasos
    ) {
      return { id: "e2", text: "Esguince de Tobillo Grado II", color: "green", protocolId: "protocolo_esguince_2" };
    }

    // Grado I: sin inestabilidad + sin edema o leve
    if (
      inestabilidad === "sin_inestabilidad" &&
      (volumen === "ninguno" || volumen === "leve")
    ) {
      return { id: "e1", text: "Esguince de Tobillo Grado I", color: "green", protocolId: "protocolo_esguince_1" };
    }
  }

  // Detectar si cumple criterio metatarsiano
  const tieneMetatarsiano = Array.isArray(answers.criterios_ottawa2) &&
    answers.criterios_ottawa2.includes("dolor_metatarsiano");
  // Fallback
  return { id: "e1", text: "Esguince de Tobillo Grado I", color: "green", protocolId: "protocolo_esguince_1" };
};


export const generateClinicalReport = ({ caseId, answers, resultQuestion, protocols, stepsOverride }) => {
  const prot = resultQuestion.protocolId === 'protocolo_esguince_1'
    ? getProtocoloEsguince1(answers)
    : protocols[resultQuestion.protocolId];

  const reposoDinamico = restTextPorCarga(answers, resultQuestion.protocolId);
  const pasosBase = Array.isArray(prot?.pasos) ? [...prot.pasos] : [];
  if (reposoDinamico) pasosBase.unshift(reposoDinamico);

  // Si hay override (indicaciones seleccionadas), usar esas; si no, usar todas
  const pasos = stepsOverride ?? pasosBase;


  // Determinar qué radiografías se solicitaron
  const rxSolicitadas = [];
  if (answers.rx_deformidad === 'listo') rxSolicitadas.push('Rx tobillo Ap-Lat-Obl sin carga (deformidad)');
  if (answers.rx_no_tolera_carga === 'listo') rxSolicitadas.push('Rx tobillo Ap-Lat-Obl sin carga (no tolera carga)');
  if (answers.rx_tolera_carga === 'listo') rxSolicitadas.push('Rx tobillo Ap-Lat-Obl con carga, comparativa contralateral');

  const tieneMetatarsiano = Array.isArray(answers.criterios_ottawa2) &&
    answers.criterios_ottawa2.includes('dolor_metatarsiano');
  if (tieneMetatarsiano && rxSolicitadas.length > 0) {
    rxSolicitadas.push('Rx AP-Lat y Obl del Pie (dolor metatarsiano)');
  }

  const rxTexto = rxSolicitadas.length > 0
    ? rxSolicitadas.join(' | ')
    : 'No solicitada';

  const fracturaTexto = answers.hay_fractura === 'si_cerrada' ? 'FRACTURA CERRADA DETECTADA'
    : answers.hay_fractura === 'si_abierta' ? 'FRACTURA ABIERTA DETECTADA'
    : answers.hay_fractura === 'si_otra' ? 'FRACTURA DE PIE DETECTADA'
    : answers.hay_fractura === 'no' ? 'Sin fractura en radiografía'
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
    answers.eva !== undefined ? `- Dolor (EVA): ${answers.eva}/10` : null,
    line('Aumento de volumen (AVO)', edemaTexto[answers.aumento_volumen]),
    line('Equimosis', equimosisTexto[answers.equimosis]),
    line('Inestabilidad', inestabilidadTexto[answers.inestabilidad]),
    answers.hallazgos_fisicos ? `- Hallazgos Físicos: ${answers.hallazgos_fisicos}` : null,
  ].filter(Boolean).join('\n');

  // Construir sección II — solo si hubo RX o fractura
  const clasificacionLinea = (() => {
    const LABELS = {
      maleolo_perone_cerrada: 'Maléolo Peroneo Cerrada',
      maleolo_tibial_cerrada: 'Maléolo Tibial Cerrada',
      bimaleolar_cerrada:     'Bimaleolar Cerrada',
      trimaleolar_cerrada:    'Trimaleolar Cerrada',
      maleolo_perone_abierta: 'Maléolo Peroneo Abierta',
      maleolo_tibial_abierta: 'Maléolo Tibial Abierta',
      bimaleolar_abierta:     'Bimaleolar Abierta',
      trimaleolar_abierta:    'Trimaleolar Abierta',
    };
    const val = answers.clasificacion_especifica_cerrada || answers.clasificacion_especifica_abierta;
    return val ? `- Clasificación: ${LABELS[val] || val}` : null;
  })();

  const fracturaPieLinea = (() => {
    if (answers.hay_fractura !== 'si_otra' || !answers.fractura_pie_tipo) return null;
    if (answers.fractura_pie_tipo === 'otra') {
      return `- Fractura de pie: ${answers.fractura_pie_otra?.trim() || 'Sin especificar'}`;
    }
    const FRACTURA_PIE_LABELS = {
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
    return `- Fractura de pie: ${FRACTURA_PIE_LABELS[answers.fractura_pie_tipo] || answers.fractura_pie_tipo}`;
  })();

  // Solo incluir sección de imagenología si hubo alguna radiografía
  const huboRx = rxSolicitadas.length > 0;
  const seccionII_lineas = [
    huboRx ? `- Radiografía solicitada: ${rxTexto}` : null,
    fracturaTexto ? `- Resultado: ${fracturaTexto}` : null,
    clasificacionLinea,
    fracturaPieLinea,
  ].filter(Boolean);

  const seccionII = seccionII_lineas.length > 0
    ? `IMAGENOLOGÍA\n${seccionII_lineas.join('\n')}`
    : null;

  // Criterios Ottawa — solo si se respondió
  const ottawaLinea = (() => {
    const ottawa = answers.criterios_ottawa2;
    if (!Array.isArray(ottawa) || ottawa.length === 0) return null;
    const texto = (ottawa.length === 1 && ottawa.includes('no_cumple'))
      ? 'Negativo (-)'
      : 'Positivo (+)';
    return `- Criterios Ottawa: ${texto}`;
  })();

  // Deformidad y tolerancia — solo si se respondieron
  const deformidadLinea = answers.deformidad_evidente
    ? `- Deformidad Evidente: ${answers.deformidad_evidente === 'si' ? 'SÍ' : 'NO'}`
    : null;
  const tipoDolorLinea = answers.tipo_dolor
    ? `- Tipo de Dolor: ${answers.tipo_dolor}`
    : null;
  const toleranciaLinea = answers.tolera_carga_difuso
    ? `- Tolerancia Carga: ${toleranciaTexto[answers.tolera_carga_difuso]}`
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
    `      INFORME MÉDICO: TOBILLO Y PIE`,
    `=========================================`,
    `ID CASO: ${caseId}`,
    `FECHA: ${new Date().toLocaleDateString()}`,
    `TOBILLO: ${answers.tobillo}`,
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
  getProtocoloEsguince1,
  getProtocoloEsguince2,  // ← agregar
  getProtocoloEsguince3,  // ← agregar
  requiresAnamnesis: true,
};
export default questionnaireModule;