// questionnaires/tobilloQuestions.js

export const protocols = {
    "protocolo_esguince_1": {
        "titulo": "PROTOCOLO DE MANEJO - ESGUINCE GRADO I",
        "pasos": [
            "Realizar actividades habituales ",
            "Realizar ejercicios indicados en pauta ",
            "Reposo deportivo por 7-10 días ",
            "Aplicar frio local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. En caso de persistir dolor posterior, aplicar calor local de forma intermitente o según necesidad ",
            "Tubigrip opcional (máx 1 semana, retiro nocturno)",
            "Al descansar, poner extremidad en alto ",
            "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 3 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 3 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días.",
            "En caso de dolor invalidante, aumento de volumen o cambio de coloración del sitio lesionado acudir a agencia ACHS más cercana"
                    ]
    },
    "protocolo_esguince_2": {
        "titulo": "PROTOCOLO DE MANEJO - ESGUINCE GRADO II",
        "pasos": [
          "Reposo laboral. ",
          "Reposo deportivo.",  
          "Realizar ejercicios indicados en pauta ",
          "Aplicar frio local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad.",  
          "Uso de tobillera con barras laterales durante el día hasta control con médico, retirar para dormir y descansar.", 
          "Descansar con extremidad en alto.", 
          "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 3 días.", 
          "Control con médico AP en agencia en 5 a 7 días. ",
          "En caso de dolor invalidante, acudir a agencia ACHS más cercana."
 
        ]
    },
    "protocolo_esguince_3": {
        "titulo": "PROTOCOLO DE MANEJO - ESGUINCE GRADO III",
        "pasos": [
                    "Reposo laboral. ",
            "Reposo deportivo.",  
            "Realizar ejercicios indicados en pauta ",
            "Aplicar frio local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad.", 
            "Uso de bota ortopédica y descarga con muletas.",
            "Derivación a Traumatología para evaluar integridad ligamentaria.",
            "Medicamentos: Paracetamol 500 mg vo 2 comprimidos cada 8 horas por 5-7 días y/o ibuprofeno 400 mg vo 1 comprimido cada 8 horas por 5-7 días o Ketoprofeno 50 mg vo 1 comprimido cada 8 horas por 5 días. Ajustar según respuesta.En caso de no respuesta a los 7-10 días, considerar escalara tramadol/paracetamol 37,5 mg/ 325 mg vo c/8-12 h."
        ]
    },
    
    // PROTOCOLOS ESCENARIOS FRACTURAS
    "protocolo_weber_a": {
        "titulo": "PROTOCOLO DE MANEJO - ESCENARIO 1 - WEBER A",
        "pasos": [
            "Inmovilización: bota con bastones. Se puede retirar en la noche",
            "Carga a tolerancia por 4 semanas",
            "Medicamentos: Profilaxis anticoagulante (aspirina 100mg c/12 hrs)"
        ]
    },

    "protocolo_weber_b_c": {
        "titulo": "PROTOCOLO DE MANEJO - ESCENARIO 1 - Unimaleolar no luxada - WEBER B Y C",
        "pasos": [
            "Inmovilización: bota ortopédica con bastones canadienses",
            "Sin carga",
            "Medicamentos: Profilaxis tromboembólica con heparina de bajo peso molecular (enoxaparina o dalteparina) hasta definición de especialista",
            "Aplicar frio local en región dolorosa por 10-15 minutos al menos 3 veces al día por las primeras 48 horas. Luego aplicar calor local de forma intermitente o según necesidad.", 
        ]
    },    

    "protocolo_escenario_2": {
        "titulo": "PROTOCOLO DE MANEJO - ESCENARIO 2 - Bimaleolar no luxada",
        "pasos": [
            "Inmovilización: bota ortopédica con bastones canadienses",
            "Medicamentos: Profilaxis tromboembólica con heparina de bajo peso molecular (enoxaparina o dalteparina) para cirugía",
            "Aplicar frío local" ,
            "Corroborar protocolo con TMT de urgencia"
        ]
    }, 

    "protocolo_escenario_3": {
        "titulo": "PROTOCOLO DE MANEJO - ESCENARIO 3 - Luxada (uni/bi/tri)",
        "pasos": [
            "🚨 Derivación inmediata a HT o centro hospitalario con capacidad resolutiva (reducción cerrada e instalación de yeso)🚨",
            "Inmovilización con valva de la ambulancia",
            "Aplicar frío local",
            "Reducir fractura e inmovilizar con yeso",
            "Medicamentos: Analgesia ev, profilaxis tromboembólica con heparina de bajo peso molecular (enoxaparina o dalteparina) una vez inmovilizada"
        ]
    }, 
    "protocolo_escenario_4": {
        "titulo": "PROTOCOLO DE MANEJO - ESCENARIO 4 - Expuesta / SC / NV",
        "pasos": [
            "🚨 Tratamiento quirúrgico urgente 🚨", 
            "Derivación inmediata a HT o centro hospitalario con capacidad resolutiva o evaluar traslado a Santiago",
            "Inmovilización con valva de la ambulancia",
            "Aplicar frío local",
            "Reducir fractura e inmovilizar con yeso",
            "Medicamentos: Analgesia ev, tratamiento antibiótivo ev (en caso de fractura expuesta)",
            "Vacunación antitetánica (en caso de fractura expuesta)"
       ]
    }
};

export const questions = [
  // --- GRUPO ANAMNESIS (Basado en estándares ACHS) ---
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
    id: "equimosis", 
    text: "Equimosis", 
    type: "options", 
    group: "anamnesis",
    options: [
      { value: "ninguno", label: "Sin equimosis" },
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
      { value: "dudosa", label: "Dudosa" },
      { value: "con_inestabilidad", label: "Con inestabilidad" }
    ]
  },
  { 
    id: "hallazgos_fisicos", 
    text: "Examen Físico: Equimosis / Deformidad / Heridas / Maniobras", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Describa presencia de equimosis en abanico, deformidad evidente o heridas..."
  },

  // --- GRUPO RIESGO (Árbol de Decisión corregido) ---


  // // Criterios de Ottawa (solo si estable o local sin equimosis)
  // {
  //   id: "criterios_ottawa",
  //   text: "¿Cumple alguno de los Criterios de Ottawa?",
  //   type: "options",
  //   group: "risk",
  //   showIf: (ans) => ans.deformidad_evidente === "no",
  //   options: [
  //       { value: "cumple", label: "Cumple criterios (Ottawa +)" },
  //       { value: "no_cumple", label: "No cumple ninguno (Ottawa -)" }
  //   ]
  // },

// Criterios de Ottawa (solo si estable o local sin equimosis)
  {
    id: "criterios_ottawa2",
    text: "¿Cumple alguno de los Criterios de Ottawa? Seleccione aquellos que cumple:",
    type: "multi",
    group: "risk",
    showIf: (ans) => ans.deformidad_evidente === "no",
    options: [
        { value: "dolor_metatarsiano", label: "Dolor en la base del quinto metatarsiano o en el navicular" },
        { value: "dolor_palpacion", label: "Dolor a la palpación en el borde posterior de los 6 centímetros distales de la tibia o la fíbula hasta el segmento más distal del maléolo medial o lateral" },
        { value: "incapacidad_pasos", label: "Incapacidad de dar más de 4 pasos seguidos sin ayuda o de sostener su peso corporal" },
        { value: "no_cumple", label: "No cumple ninguno (Ottawa -)" }
    ]
  },


{
  id: "deformidad_evidente",
  text: "¿Hay deformidad evidente?",
  type: "options",
  group: "risk",
  showIf: (ans) => {
    const ottawa = ans.criterios_ottawa2;
    if (!Array.isArray(ottawa)) return false;
    // Mostrar si seleccionó al menos un criterio positivo (cualquiera que no sea "no_cumple")
    return ottawa.some(v => v !== "no_cumple");
  },
  options: [
    { value: "si", label: "Sí" },
    { value: "no", label: "No" }
  ]
},

    // MANDA A RX SI TIENE DEFORMIDAD EVIDENTE
 {
  id: "rx_deformidad",
  text: "Realizar Radiografía tobillo Ap-Lat_Obl sin carga.",
  textFn: (ans) => {
    const base = "Realizar Radiografía tobillo Ap-Lat_Obl sin carga";
    const tieneMetatarsiano = Array.isArray(ans.criterios_ottawa2) && 
      ans.criterios_ottawa2.includes("dolor_metatarsiano");
    return tieneMetatarsiano 
      ? `${base}\nAdicional: Radiografía AP-Lat y Obl del Pie.`
      : base;
  },
  type: "options",
  group: "risk",
  showIf: (ans) => ans.deformidad_evidente === "si" || ans.tolera_carga_difuso === "no_tolera",
  options: [
    { value: "listo", label: "✅ Realizada" }
  ]
},

  // NUEVA: Pregunta de dolor siempre (independiente de deformidad)
  {
    id: "tipo_dolor",
    text: "¿Cómo se presenta el dolor?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.deformidad_evidente === "no",
    options: [
        { value: "difuso", label: "Difuso" },
        { value: "local", label: "Local" }
    ]
  },


  // Tolerancia a la carga (solo si dolor difuso)
  {
    id: "tolera_carga_difuso",
    text: "¿Tolera la carga?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tipo_dolor === "difuso" || ans.tipo_dolor === "local" ,
    options: [
        { value: "no_tolera", label: "No tolera carga" },
        { value: "con_dificultad", label: "Tolera carga con dificultad" },
        { value: "tolera", label: "Tolera carga" }
    ]
  },

  
   // MANDA A RX SI TIENE DEFORMIDAD EVIDENTE
 {
  id: "rx_no_tolera_carga",
  text: "Realizar Radiografía tobillo Ap-Lat_Obl sin carga.",
  textFn: (ans) => {
    const base = "Realizar Radiografía tobillo Ap-Lat_Obl sin carga";
    const tieneMetatarsiano = Array.isArray(ans.criterios_ottawa2) && 
      ans.criterios_ottawa2.includes("dolor_metatarsiano");
    return tieneMetatarsiano 
      ? `${base}\nAdicional: Radiografía AP-Lat y Obl del Pie.`
      : base;
  },
  type: "options",
  group: "risk",
  showIf: (ans) => ans.tolera_carga_difuso === "no_tolera",
  options: [
    { value: "listo", label: "✅ Realizada" }
  ]
},

  // // Estabilidad (solo si dolor local o local sin equimosis)
  // {
  //   id: "estabilidad",
  //   text: "Evaluación de estabilidad / Localización:",
  //   type: "options",
  //   group: "risk",
  //   // showIf: (ans) => ans.tipo_dolor === "local" || ans.tipo_dolor === "local_no_equimosis",
  //   showIf: (ans) => ans.tipo_dolor === "local_no_equimosis",
  //   options: [
  //       { value: "inestable", label: "Leve inestabilidad" },
  //       { value: "estable", label: "Sin inestabilidad" }
  //   ]
  // },


  // MANDA A RX SI CUMPLE CON ALGÚN CRITERIO DE OTTAWA
  {
    id: "rx_tolera_carga",
    textFn: (ans) => {
    const base = "Realizar Radiografía Ap-Lat-Obl con carga, comparativa contralateral.";
    const tieneMetatarsiano = Array.isArray(ans.criterios_ottawa2) && 
      ans.criterios_ottawa2.includes("dolor_metatarsiano");
    return tieneMetatarsiano 
      ? `${base}\nAdicional: Radiografía AP-Lat y Obl del Pie.`
      : base;
  },
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tolera_carga_difuso === "con_dificultad" || ans.tolera_carga_difuso === "tolera",
    options: [
        { value: "listo", label: "✅ Realizada" }
    ]
  }, // esto después debe conectarse con un ¿Presenta fractura?



  // // Evaluación Radiografía (múltiples condiciones)
  // {
  //   // id: "evaluacion_radiografia",
  //   id: "rx_varias",
  //   text: "Realizar Radiografía AP-Lat-Obl sin carga:",
  //   type: "options",
  //   group: "risk",
  //   showIf: (ans) => {
  //       // Radiografía se pide si:
        
  //       // 3. Tolera carga con dificultad (dolor difuso)
  //       if (ans.tolera_carga_difuso === "con_dificultad") return true;

  //       // 3. Tolera carga con dificultad (dolor difuso)
  //       if (ans.tolera_carga_difuso === "tolera") return true;
        
  //       // 4. Leve inestabilidad (dolor local)
  //       if (ans.estabilidad === "inestable") return true;
        
  //       return false;
  //   },
  //   options: [
  //       // { value: "fractura", label: "Fractura" },
  //       // { value: "no_fractura", label: "No hay fractura" }
  //       { value: "listo", label: "✅ Realizada" }
  //   ]
  // },

  // ¿Hay fractura?
  {
    id: "hay_fractura",
    text: "¿Se detectó una fractura?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.rx_deformidad === "listo" || ans.rx_no_tolera_carga === "listo" || ans.rx_tolera_carga === "listo" ,
    options: [
        { value: "no", label: "No" },
        { value: "si_cerrada", label: "Sí, cerrada" },
        { value: "si_abierta", label: "Sí, abierta" }
    ]
  },




  // Clasificación específica (solo si hay fractura)
  {
    id: "clasificacion_especifica_cerrada",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_cerrada",
    options: [
        { value: "maleolo_perone_cerrada", label: "Maléolo Peroneo Cerrada" },
        { value: "maleolo_tibial_cerrada", label: "Maléolo Tibial Cerrada" },
        { value: "bimaleolar_cerrada", label: "Bimaleolar Cerrada" },
        { value: "trimaleolar_cerrada", label: "Trimaleolar Cerrada" }
    ]
  },

    // Clasificación específica (solo si hay fractura)
  {
    id: "clasificacion_especifica_abierta",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_abierta",
    options: [
        { value: "maleolo_perone_abierta", label: "Maléolo Peroneo Abierta" },
        { value: "maleolo_tibial_abierta", label: "Maléolo Tibial Abierta" },
        { value: "bimaleolar_abierta", label: "Bimaleolar Abierta" },
        { value: "trimaleolar_abierta", label: "Trimaleolar Abierta" }
    ]
  },
  // Separación por escenarios
  {
    id: "escenario_fractura",
    text: "¿A cuál escenario pertenece la fractura?:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.hay_fractura === "si_abierta" || ans.hay_fractura === "si_cerrada",
    options: [
        { value: "escenario_1", label: "Escenario 1: Fractura unimaleolar no luxada" },
        { value: "escenario_2", label: "Escenario 2: Fractura bimaleolar no luxada" },
        { value: "escenario_3", label: "Escenario 3: Fractura uni, bi o trimaleolar luxada" },
        { value: "escenario_4", label: "Escenario 4: Fractura expuesta, síndrome compartimental, daño severo de partes blandas y/o lesión neurovascular" }
    ]
  },
    // Weber
  {
    id: "weber",
    text: "¿A cuál tipo de Weber corresponde?:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.escenario_fractura === "escenario_1",
    options: [
        { value: "weber_a", label: "Weber A" },
        { value: "weber_b_c", label: "Weber B o C" }
    ]
  }



];

// Diccionario de los values
const FRACTURA_CERRADA_LABEL = {
  maleolo_perone_cerrada: 'Maléolo Peroneo Cerrada',
  maleolo_tibial_cerrada: 'Maléolo Tibial Cerrada',
  bimaleolar_cerrada: 'Bimaleolar Cerrada',
  trimaleolar_cerrada: 'Trimaleolar Cerrada',
};

const FRACTURA_ABIERTA_LABEL = {
  maleolo_perone_abierta: 'Maléolo Peroneo Abierta',
  maleolo_tibial_abierta: 'Maléolo Tibial Abierta',
  bimaleolar_abierta: 'Bimaleolar Abierta',
  trimaleolar_abierta: 'Trimaleolar Abierta',
};

// Mapas value -> protocolo por CLASIFICACIÓN (usamos protocolos de ESCENARIO que sí existen)
const PROTOCOL_CERRADA = {
  maleolo_perone_cerrada: 'protocolo_escenario_3',
  maleolo_tibial_cerrada: 'protocolo_escenario_3',
  bimaleolar_cerrada:     'protocolo_escenario_2', // caso particular
  trimaleolar_cerrada:    'protocolo_escenario_3',
};

const PROTOCOL_ABIERTA = {
  maleolo_perone_abierta: 'protocolo_escenario_4',
  maleolo_tibial_abierta: 'protocolo_escenario_4',
  bimaleolar_abierta:     'protocolo_escenario_4',
  trimaleolar_abierta:    'protocolo_escenario_4',
};
// Mapas value -> protocolo

// Escenarios
const ESCENARIO_LABEL = {
  escenario_1: 'Fractura unimaleolar no luxada',
  escenario_2: 'Fractura bimaleolar no luxada',
  escenario_3: 'Fractura uni/bi/trimaleolar luxada',
  escenario_4: 'Fractura expuesta / síndrome compartimental / daño severo de partes blandas / lesión neurovascular',
};


// Protocolos por escenario (debes agregarlos en tu objeto protocols)
const PROTOCOL_ESCENARIO = {
  escenario_1: 'protocolo_escenario_1',
  escenario_2: 'protocolo_escenario_2',
  escenario_3: 'protocolo_escenario_3',
  escenario_4: 'protocolo_escenario_4',
};

// Weber (sólo aplica a escenario_1)
const WEBER_LABEL = { weber_a: 'Weber A', weber_b_c: 'Weber B y C'};
const PROTOCOL_WEBER = {
  weber_a: 'protocolo_weber_a',
  weber_b_c: 'protocolo_weber_b_c'
};


// --- NUEVO: reposo dinámico por carga para esguinces I, II y III
export const restTextPorCarga = (answers, protocolId) => {
  const carga = Number(answers?.carga_laboral); // valores esperados: 1, 2 o 3
  if (!carga || ![1, 2, 3].includes(carga)) return null;

  // Mapa por protocolo
  const reposoPorProtocolo = {
    // Mantengo tu lógica tal cual para Grado I
    protocolo_esguince_1: {
      1: 'STP',
      2: 'Alta diferida 0 - 2 días',
      3: 'Alta diferida 0 - 3 días',
    },
    // NUEVO: Grado II
    protocolo_esguince_2: {
      1: '0 - 5 días',
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

  return indicacion ? `Reposo sugerido según carga laboral: ${indicacion}` : null;
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
    const tipo = ans.hay_fractura; // 'si_abierta' | 'si_cerrada' | 'no'
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
      equimosis !== "ninguno" && equimosis != null
    ) {
      return { id: "e3", text: "Esguince de Tobillo Grado III", color: "red", protocolId: "protocolo_esguince_3" };
    }

    // Grado II: sin inestabilidad o dudosa + edema presente + algo de equimosis
    if (
      (inestabilidad === "sin_inestabilidad" || inestabilidad === "dudosa") &&
      volumen !== "ninguno" && volumen != null &&
      (equimosis === "leve" || equimosis === "moderado" || equimosis === "severo")
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


export const generateClinicalReport = ({ caseId, answers, resultQuestion, protocols }) => {
  const prot = protocols[resultQuestion.protocolId];

  // Reposo dinámico por carga (ahora soporta Esguince I, II y III)
  const reposoDinamico = restTextPorCarga(answers, resultQuestion.protocolId);

  // Construimos la lista de indicaciones
  const pasos = Array.isArray(prot?.pasos) ? [...prot.pasos] : [];
  if (reposoDinamico) {
    // Lo agregamos como primera indicación (puedes ponerle énfasis si quieres)
    pasos.unshift(reposoDinamico);
  }

    // Determinar qué radiografías se solicitaron
  const rxSolicitadas = [];
  if (answers.rx_deformidad === 'listo') rxSolicitadas.push('Rx tobillo Ap-Lat-Obl sin carga (deformidad)');
  if (answers.rx_no_tolera_carga === 'listo') rxSolicitadas.push('Rx tobillo Ap-Lat-Obl sin carga (no tolera carga)');
  if (answers.rx_tolera_carga === 'listo') rxSolicitadas.push('Rx tobillo Ap-Lat-Obl con carga, comparativa contralateral');

  // Agregar RX de pie si corresponde
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
    : answers.hay_fractura === 'no' ? 'Sin fractura en radiografía'
    : 'Resultado pendiente';

  // Mapeos auxiliares (como ya los tienes)
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
    "leve": "Leve (+/+++)",
    "moderado": "Moderado (++/+++)",
    "severo": "Severo (+++/+++)"
  };

const inestabilidadTexto = {
  "sin_inestabilidad": "Sin inestabilidad",
  "dudosa": "Dudosa",
  "con_inestabilidad": "Con inestabilidad"
};
 
  return `
=========================================
      INFORME MÉDICO: TOBILLO Y PIE
=========================================
ID CASO: ${caseId}
FECHA: ${new Date().toLocaleDateString()}
DIAGNÓSTICO SUGERIDO: ${resultQuestion.text}

I. EXAMEN FÍSICO
- Carga Laboral: ${cargaTexto[Number(answers.carga_laboral)] || 'No registrada'}
- Dolor (EVA): ${answers.eva || 0}/10
- Aumento de volumen (AVO): : ${edemaTexto[answers.aumento_volumen] || 'No evaluado'}
- Equimosis: ${equimosisTexto[answers.equimosis] || 'No evaluado'}
- Inestabilidad: ${inestabilidadTexto[answers.inestabilidad] || 'No evaluado'}
- Hallazgos Físicos: ${answers.hallazgos_fisicos || 'Sin otros hallazgos'}
- Deformidad Evidente: ${answers.deformidad_evidente === 'si' ? 'SÍ' : 'NO'}
- Tipo de Dolor: ${answers.tipo_dolor || 'No especificado'}
- Tolerancia Carga: ${toleranciaTexto[answers.tolera_carga_difuso] || 'No evaluado'}
- Estabilidad: ${answers.estabilidad || 'No evaluado'}
- Criterios Ottawa: ${answers.criterios_ottawa === 'cumple' ? 'Positivo (+)' : answers.criterios_ottawa === 'no_cumple' ? 'Negativo (-)' : 'No evaluado'}

II. IMAGENOLOGÍA
II. IMAGENOLOGÍA
- Radiografía solicitada: ${rxTexto}
- Resultado: ${fracturaTexto}
${
  (answers.clasificacion_especifica_cerrada || answers.clasificacion_especifica_abierta)
    ? `- Clasificación: ${answers.clasificacion_especifica_cerrada || answers.clasificacion_especifica_abierta}`
    : ''
}


III. DIAGNÓSTICO SUGERIDO
${resultQuestion.text}

IV. INDICACIONES SUGERIDAS
${pasos.map((s, i) => `${i+1}. ${s}`).join('\n')}

=========================================
Sistema de Apoyo al Diagnóstico - ACHS
=========================================
`.trim();
};

const questionnaireModule = {
  questions,
  protocols,
  evaluateRisk,
  generateClinicalReport,
  restTextPorCarga,
  requiresAnamnesis: true,
  // guideImage: "arbol_decision.png",
};

export default questionnaireModule;