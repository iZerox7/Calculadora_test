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
  { id: "fecha_accidente", text: "Fecha del accidente", type: "date", group: "anamnesis" },
  { id: "ocupacion", text: "Ocupación del paciente", type: "occupation", group: "anamnesis" },
  { id: "eva", text: "Nivel de Dolor (EVA)", type: "slider", group: "anamnesis", min: 0, max: 10 },
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
    id: "hallazgos_fisicos", 
    text: "Examen Físico: Equimosis / Deformidad / Heridas / Maniobras", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Describa presencia de equimosis en abanico, deformidad evidente o heridas..."
  },

  // --- GRUPO RIESGO (Árbol de Decisión corregido) ---
  {
    id: "deformidad_evidente",
    text: "¿Hay deformidad evidente?",
    type: "options",
    group: "risk",
    options: [
        { value: "si", label: "Sí" },
        { value: "no", label: "No" }
    ]
  },

  // Criterios de Ottawa (solo si estable o local sin equimosis)
  {
    id: "criterios_ottawa",
    text: "¿Cumple alguno de los Criterios de Ottawa?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.deformidad_evidente === "no",
    options: [
        { value: "cumple", label: "Cumple criterios (Ottawa +)" },
        { value: "no_cumple", label: "No cumple ninguno (Ottawa -)" }
    ]
  },


    // MANDA A RX SI TIENE DEFORMIDAD EVIDENTE
  {
    id: "rx_deformidad",
    text: "Realizar Radiografía Ap-Lat_Obl",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.deformidad_evidente === "si",
    options: [
        { value: "listo", label: "✅ Realizada" }
    ]
  }, // esto después debe conectarse con un ¿Presenta fractura?

  // NUEVA: Pregunta de dolor siempre (independiente de deformidad)
  {
    id: "tipo_dolor",
    text: "¿Cómo se presenta el dolor?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.criterios_ottawa === "cumple",
    options: [
        { value: "difuso", label: "Difuso" },
        { value: "local", label: "Local" },
        { value: "local_no_equimosis", label: "Local - Sin Equimosis" }
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

  

  // Estabilidad (solo si dolor local o local sin equimosis)
  {
    id: "estabilidad",
    text: "Evaluación de estabilidad / Localización:",
    type: "options",
    group: "risk",
    // showIf: (ans) => ans.tipo_dolor === "local" || ans.tipo_dolor === "local_no_equimosis",
    showIf: (ans) => ans.tipo_dolor === "local_no_equimosis",
    options: [
        { value: "inestable", label: "Leve inestabilidad" },
        { value: "estable", label: "Sin inestabilidad" }
    ]
  },





  // MANDA A RX SI CUMPLE CON ALGÚN CRITERIO DE OTTAWA
  {
    id: "rx_ottawa",
    text: "Realizar Radiografía Ap-Lat-Obl con carga",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.estabilidad === "estable",
    options: [
        { value: "listo", label: "✅ Realizada" }
    ]
  }, // esto después debe conectarse con un ¿Presenta fractura?

  // MANDA A RX SI NO TOLERA CARGA
  {
    id: "rx_no_tolera_carga",
    text: "Realizar Radiografía Ap-Lat-Obl con carga comparativa contralateral y Radiografía Ap-Lateral-Pie",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tolera_carga_difuso === "no_tolera",
    options: [
        { value: "listo", label: "✅ Ambas Realizadas" }
    ]
  }, // esto después debe conectarse con un ¿Presenta fractura?


  // Radiografía (múltiples condiciones)
  {
    // id: "evaluacion_radiografia",
    id: "rx_varias",
    text: "Realizar Radiografía AP-Lat-Obl sin carga:",
    type: "options",
    group: "risk",
    showIf: (ans) => {
        // Radiografía se pide si:
        
        // 3. Tolera carga con dificultad (dolor difuso)
        if (ans.tolera_carga_difuso === "con_dificultad") return true;

        // 3. Tolera carga con dificultad (dolor difuso)
        if (ans.tolera_carga_difuso === "tolera") return true;
        
        // 4. Leve inestabilidad (dolor local)
        if (ans.estabilidad === "inestable") return true;
        
        return false;
    },
    options: [
        // { value: "fractura", label: "Fractura" },
        // { value: "no_fractura", label: "No hay fractura" }
        { value: "listo", label: "✅ Realizada" }
    ]
  },

  // ¿Hay fractura?
  {
    id: "hay_fractura",
    text: "¿Se detectó una fractura?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.rx_varias === "listo" || ans.rx_no_tolera_carga === "listo" || ans.rx_ottawa === "listo" || ans.rx_deformidad === "listo",
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
        { value: "maleolo_perone_cerrada", label: "Maléolo Peroné Cerrada" },
        { value: "maleolo_tibial_cerrada", label: "Maléolo Tibial Cerrada" },
        { value: "pilon_tibial_cerrada", label: "Pilón Tibial Cerrada" },
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
        { value: "maleolo_perone_abierta", label: "Maléolo Peroné Abierta" },
        { value: "maleolo_tibial_abierta", label: "Maléolo Tibial Abierta" },
        { value: "pilon_tibial_abierta", label: "Pilón Tibial Abierta" },
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
  maleolo_perone_cerrada: 'Maléolo Peroné Cerrada',
  maleolo_tibial_cerrada: 'Maléolo Tibial Cerrada',
  pilon_tibial_cerrada: 'Pilón Tibial Cerrada',
  bimaleolar_cerrada: 'Bimaleolar Cerrada',
  trimaleolar_cerrada: 'Trimaleolar Cerrada',
};

const FRACTURA_ABIERTA_LABEL = {
  maleolo_perone_abierta: 'Maléolo Peroné Abierta',
  maleolo_tibial_abierta: 'Maléolo Tibial Abierta',
  pilon_tibial_abierta: 'Pilón Tibial Abierta',
  bimaleolar_abierta: 'Bimaleolar Abierta',
  trimaleolar_abierta: 'Trimaleolar Abierta',
};

// Mapas value -> protocolo por CLASIFICACIÓN (usamos protocolos de ESCENARIO que sí existen)
const PROTOCOL_CERRADA = {
  maleolo_perone_cerrada: 'protocolo_escenario_3',
  maleolo_tibial_cerrada: 'protocolo_escenario_3',
  pilon_tibial_cerrada:   'protocolo_escenario_3',
  bimaleolar_cerrada:     'protocolo_escenario_2', // caso particular
  trimaleolar_cerrada:    'protocolo_escenario_3',
};

const PROTOCOL_ABIERTA = {
  maleolo_perone_abierta: 'protocolo_escenario_4',
  maleolo_tibial_abierta: 'protocolo_escenario_4',
  pilon_tibial_abierta:   'protocolo_escenario_4',
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

// Devuelve el texto de reposo sugerido según carga laboral SOLO para esguince grado I
export const restTextPorCarga = (answers, protocolId) => {
  if (protocolId !== 'protocolo_esguince_1') return null;
  const carga = Number(answers?.carga_laboral); // 1..3
  const map = {
    1: 'STP',
    2: 'Alta diferida 2 días',
    3: 'Alta diferida 3 días',
  };
  const indicacion = map[carga];
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
          return ['pilon_tibial_cerrada', 'maleolo_perone_cerrada'].includes(clasVal);
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
          'pilon_tibial_cerrada',
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

  // 2) Si NO hay fractura -> lógica de esguinces (tu lógica previa)
  if (answers.hay_fractura === "no") {
    // No tolera carga → Esguince III
    if (answers.tolera_carga_difuso === "no_tolera" || (answers.deformidad_evidente === "si" && answers.hay_fractura === "no")) {
      return { id: "e3", text: "Esguince de Tobillo Grado III", color: "red", protocolId: "protocolo_esguince_3" };
    }
    // if (answers.deformidad_evidente === "si" && answers.hay_fractura === "no") {
    //   return { id: "e3", text: "Esguince de Tobillo Grado III", color: "red", protocolId: "protocolo_esguince_3" };
    // }    
    // Tolera con dificultad / hay inestabilidad / (o incluso 'tolera') -> Esguince II
    if (
      answers.tolera_carga_difuso === "con_dificultad" ||
      answers.estabilidad === "inestable" ||
      answers.tolera_carga_difuso === "tolera"
    ) {
      return { id: "e2", text: "Esguince de Tobillo Grado II", color: "green", protocolId: "protocolo_esguince_2" };
    }
    // Ottawa negativo -> Esguince I
    if (answers.criterios_ottawa === "no_cumple") {
      return { id: "e1", text: "Esguince de Tobillo Grado I", color: "green", protocolId: "protocolo_esguince_1" };
    }
  }

  // 3) Sin RX (Ottawa negativo y estable) -> Esguince I
  if (answers.criterios_ottawa === "no_cumple") {
    return { id: "e1", text: "Esguince de Tobillo Grado I", color: "green", protocolId: "protocolo_esguince_1" };
  }

  // 4) Fallback: siempre retorna algo
  return { id: "e1", text: "Esguince de Tobillo Grado I", color: "green", protocolId: "protocolo_esguince_1" };
};


export const generateClinicalReport = ({ caseId, answers, resultQuestion, protocols }) => {
  const prot = protocols[resultQuestion.protocolId];
  

  // NUEVO: reposo dinámico por carga (solo Esguince I)
  const reposoDinamico = restTextPorCarga(answers, resultQuestion.protocolId);


  // Mapeo de valores a texto legible
  const edemaTexto = {
      "ninguno": "Sin aumento de volumen",
      "leve": "Leve (+/+++)",
      "moderado": "Moderado (++/+++)",
      "severo": "Severo (+++/+++)"
  };
  
  const toleranciaTexto = {
      "no_tolera": "No tolera carga",
      "con_dificultad": "Tolera carga con dificultad"
  };
  
  return `
=========================================
      INFORME MÉDICO: TOBILLO Y PIE
=========================================
ID CASO: ${caseId}
FECHA: ${new Date().toLocaleDateString()}
DIAGNÓSTICO SUGERIDO: ${resultQuestion.text}

I. EXAMEN FÍSICO
- Fecha Accidente: ${answers.fecha_accidente || 'No especificada'}
- Nivel Dolor (EVA): ${answers.eva || 0}/10
- Edema: ${edemaTexto[answers.aumento_volumen] || 'No evaluado'}
- Hallazgos Físicos: ${answers.hallazgos_fisicos || 'Sin otros hallazgos'}
- Deformidad Evidente: ${answers.deformidad_evidente === 'si' ? 'SÍ' : 'NO'}
- Tipo de Dolor: ${answers.tipo_dolor || 'No especificado'}
- Tolerancia Carga: ${toleranciaTexto[answers.tolera_carga_difuso] || 'No evaluado'}
- Estabilidad: ${answers.estabilidad || 'No evaluado'}
- Criterios Ottawa: ${answers.criterios_ottawa === 'cumple' ? 'Positivo (+)' : answers.criterios_ottawa === 'no_cumple' ? 'Negativo (-)' : 'No evaluado'}


II. IMAGENOLOGÍA
- Radiografía: ${
  answers.hay_fractura == null
    ? 'No solicitada'
    : (answers.hay_fractura === 'si_cerrada' || answers.hay_fractura === 'si_abierta')
      ? 'FRACTURA DETECTADA'
      : 'Sin fractura'
}
${
  (answers.hay_fractura === 'si_cerrada' || answers.hay_fractura === 'si_abierta')
    ? `- Tipo Fractura: ${answers.hay_fractura === 'si_cerrada' ? 'CERRADA' : 'ABIERTA'}`
    : ''
}
${
  (answers.clasificacion_especifica_cerrada || answers.clasificacion_especifica_abierta)
    ? `- Clasificación: ${
        answers.clasificacion_especifica_cerrada
          ? answers.clasificacion_especifica_cerrada
          : answers.clasificacion_especifica_abierta
      }`
    : ''
}


III. DIAGNÓSTICO SUGERIDO
${resultQuestion.text}

IV. INDICACIONES SUGERIDAS
${prot?.pasos.map((s, i) => `${i+1}. ${s}`).join('\n')}

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
  guideImage: "arbol_decision.png",
};

export default questionnaireModule

