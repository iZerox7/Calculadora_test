// questionnaires/tobilloQuestions.js

export const protocols = {
    "protocolo_esguince_1": {
        "titulo": "PROTOCOLO DE MANEJO - ESGUINCE GRADO I",
        "pasos": [
            "1. TRATAMIENTO RICE: Reposo, Hielo local (15 min c/6h), Compresión, Elevación.",
            "2. CARGA: Apoyo completo según tolerancia.",
            "3. MEDICACIÓN: Analgésicos/AINEs por 3-5 días.",
            "4. SEGUIMIENTO: Retorno gradual a actividades en 1-2 semanas."
        ]
    },
    "protocolo_esguince_2": {
        "titulo": "PROTOCOLO DE MANEJO - ESGUINCE GRADO II",
        "pasos": [
            "1. INMOVILIZACIÓN: Bota Walker o Vendaje funcional firme por 10-14 días.",
            "2. KINESIOTERAPIA: Derivación para manejo de edema y propiocepción.",
            "3. SEGUIMIENTO: Recuperación estimada en 3-6 semanas."
        ]
    },
    "protocolo_esguince_3": {
        "titulo": "PROTOCOLO DE MANEJO - ESGUINCE GRADO III",
        "pasos": [
            "1. INMOVILIZACIÓN: Bota Walker fija y descarga con muletas.",
            "2. EVALUACIÓN ESPECIALISTA: Derivación a Traumatología para evaluar integridad ligamentaria.",
            "3. SEGUIMIENTO: Recuperación prolongada (3-6 meses)."
        ]
    },
    "protocolo_fractura_abierta": {
        "titulo": "🚨 URGENCIA QUIRÚRGICA - FRACTURA ABIERTA",
        "pasos": [
            "1. MANEJO DE HERIDA: Cubrir con apósito estéril, NO reducir.",
            "2. ANTIBIÓTICOS: Cefazolina 2g EV + Profilaxis antitetánica.",
            "3. TRASLADO: Derivación inmediata a centro de mayor complejidad."
        ]
    },
    "protocolo_fractura_cerrada": {
        "titulo": "MANEJO - FRACTURA CERRADA",
        "pasos": [
            "1. INMOVILIZACIÓN: Férula posterior de yeso bien almohadillada.",
            "2. DESCARGA: Prohibición absoluta de carga de peso.",
            "3. DERIVACIÓN: Control con Traumatología para resolución quirúrgica o conservadora."
        ]
    }
};

export const questions = [
  // --- GRUPO ANAMNESIS (Basado en estándares ACHS) ---
  { id: "fecha_accidente", text: "Fecha del accidente", type: "date", group: "anamnesis" },
  { 
    id: "descripcion_accidente", 
    text: "Relato del Accidente / Mecanismo", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Ej: Al bajar de la plataforma, el pie derecho se invirtió bruscamente..."
  },
  { 
    id: "info_complementaria", 
    text: "Antecedentes y síntomas asociados", 
    type: "textarea", 
    group: "anamnesis",
    placeholder: "Antecedentes mórbidos, cirugías previas, alergias, si hubo crujido audible..."
  },
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
    text: "Examen Físico: Equimosis / Deformidad / Heridas", 
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
  // NUEVA: Pregunta de dolor siempre (independiente de deformidad)
  {
    id: "tipo_dolor",
    text: "¿Cómo se presenta el dolor?",
    type: "options",
    group: "risk",
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
    showIf: (ans) => ans.tipo_dolor === "difuso",
    options: [
        { value: "no_tolera", label: "No tolera carga" },
        { value: "con_dificultad", label: "Tolera carga con dificultad" }
    ]
  },
  // Estabilidad (solo si dolor local o local sin equimosis)
  {
    id: "estabilidad",
    text: "Evaluación de estabilidad / Localización:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tipo_dolor === "local" || ans.tipo_dolor === "local_no_equimosis",
    options: [
        { value: "inestable", label: "Leve inestabilidad" },
        { value: "estable", label: "Sin inestabilidad" }
    ]
  },
  // Criterios de Ottawa (solo si estable o local sin equimosis)
  {
    id: "criterios_ottawa",
    text: "¿Cumple alguno de los Criterios de Ottawa?",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.estabilidad === "estable" || ans.tipo_dolor === "local_no_equimosis",
    options: [
        { value: "cumple", label: "Cumple criterios (Ottawa +)" },
        { value: "no_cumple", label: "No cumple ninguno (Ottawa -)" }
    ]
  },
  // Radiografía (múltiples condiciones)
  {
    id: "evaluacion_radiografia",
    text: "Resultado de Radiografía (AP-Lat-Obl):",
    type: "options",
    group: "risk",
    showIf: (ans) => {
        // Radiografía se pide si:
        // 1. Hay deformidad evidente
        if (ans.deformidad_evidente === "si") return true;
        
        // 2. No tolera carga (dolor difuso)
        if (ans.tolera_carga_difuso === "no_tolera") return true;
        
        // 3. Tolera carga con dificultad (dolor difuso)
        if (ans.tolera_carga_difuso === "con_dificultad") return true;
        
        // 4. Leve inestabilidad (dolor local)
        if (ans.estabilidad === "inestable") return true;
        
        // 5. Cumple criterios de Ottawa
        if (ans.criterios_ottawa === "cumple") return true;
        
        return false;
    },
    options: [
        { value: "fractura", label: "FRACTURA" },
        { value: "no_fractura", label: "No hay fractura" }
    ]
  },
  // Tipo de fractura (solo si hay fractura)
  {
    id: "tipo_fractura",
    text: "Tipo de fractura detectada:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.evaluacion_radiografia === "fractura",
    options: [
        { value: "abierta", label: "Abierta (Atraviesa la piel / Herida)" },
        { value: "cerrada", label: "Cerrada (Piel intacta)" }
    ]
  },
  // Clasificación específica (solo si hay fractura)
  {
    id: "clasificacion_especifica",
    text: "Clasificación de la fractura:",
    type: "options",
    group: "risk",
    showIf: (ans) => ans.tipo_fractura !== undefined,
    options: [
        { value: "Maléolo Peroné", label: "Maléolo Peroné" },
        { value: "Maléolo Tibial", label: "Maléolo Tibial" },
        { value: "Pilón Tibial", label: "Pilón Tibial" },
        { value: "Bimaleolar", label: "Bimaleolar" },
        { value: "Trimaleolar", label: "Trimaleolar" }
    ]
  }
];

export const evaluateRisk = (answers) => {
  // 1. Diagnósticos de Fractura (prioridad más alta)
  if (answers.tipo_fractura === "abierta") {
    return { 
        id: "f_abierta", 
        text: `Fractura Abierta: ${answers.clasificacion_especifica || 'No especificada'}`, 
        color: "red", 
        protocolId: "protocolo_fractura_abierta" 
    };
  }
  
  if (answers.tipo_fractura === "cerrada") {
    return { 
        id: "f_cerrada", 
        text: `Fractura Cerrada: ${answers.clasificacion_especifica || 'No especificada'}`, 
        color: "red", 
        protocolId: "protocolo_fractura_cerrada" 
    };
  }

  // 2. Si hubo radiografía pero NO hay fractura, evaluar según tolerancia a la carga
  if (answers.evaluacion_radiografia === "no_fractura") {
    // Si no tolera carga → Esguince Grado III
    if (answers.tolera_carga_difuso === "no_tolera") {
      return { 
          id: "e3", 
          text: "Esguince de Tobillo Grado III", 
          color: "red", 
          protocolId: "protocolo_esguince_3" 
      };
    }
    
    // Si tolera con dificultad O hay inestabilidad → Esguince Grado II
    if (answers.tolera_carga_difuso === "con_dificultad" || answers.estabilidad === "inestable") {
      return { 
          id: "e2", 
          text: "Esguince de Tobillo Grado II", 
          color: "green", 
          protocolId: "protocolo_esguince_2" 
      };
    }
    
    // Si no tolera o tolera con dificultad pero radiografía negativa → Esguince II
    return { 
        id: "e2", 
        text: "Esguince de Tobillo Grado II", 
        color: "green", 
        protocolId: "protocolo_esguince_2" 
    };
  }

  // 3. Si NO hubo radiografía (Ottawa negativo y estable)
  // Esguince Grado III (no tolera carga)
  if (answers.tolera_carga_difuso === "no_tolera") {
    return { 
        id: "e3", 
        text: "Esguince de Tobillo Grado III", 
        color: "red", 
        protocolId: "protocolo_esguince_3" 
    };
  }

  // Esguince Grado II (tolera con dificultad o inestabilidad)
  if (answers.tolera_carga_difuso === "con_dificultad" || answers.estabilidad === "inestable") {
    return { 
        id: "e2", 
        text: "Esguince de Tobillo Grado II", 
        color: "green", 
        protocolId: "protocolo_esguince_2" 
    };
  }

  // 4. Esguince Grado I (default - Ottawa negativo, estable, sin criterios mayores)
  return { 
      id: "e1", 
      text: "Esguince de Tobillo Grado I", 
      color: "green", 
      protocolId: "protocolo_esguince_1" 
  };
};

export const generateClinicalReport = ({ caseId, answers, resultQuestion, protocols }) => {
  const prot = protocols[resultQuestion.protocolId];
  
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
DIAGNÓSTICO: ${resultQuestion.text}

I. ANAMNESIS DETALLADA
- Fecha Accidente: ${answers.fecha_accidente || 'No especificada'}
- Mecanismo: ${answers.descripcion_accidente || 'No especificado'}
- Info. Complementaria: ${answers.info_complementaria || 'Sin antecedentes'}

II. EXAMEN FÍSICO
- Nivel Dolor (EVA): ${answers.eva || 0}/10
- Edema: ${edemaTexto[answers.aumento_volumen] || 'No evaluado'}
- Hallazgos Físicos: ${answers.hallazgos_fisicos || 'Sin otros hallazgos'}
- Deformidad Evidente: ${answers.deformidad_evidente === 'si' ? 'SÍ' : 'NO'}
- Tipo de Dolor: ${answers.tipo_dolor || 'No especificado'}
- Tolerancia Carga: ${toleranciaTexto[answers.tolera_carga_difuso] || 'No evaluado'}
- Estabilidad: ${answers.estabilidad || 'No evaluado'}
- Criterios Ottawa: ${answers.criterios_ottawa === 'cumple' ? 'Positivo (+)' : answers.criterios_ottawa === 'no_cumple' ? 'Negativo (-)' : 'No evaluado'}

III. IMAGENOLOGÍA
- Radiografía: ${answers.evaluacion_radiografia ? (answers.evaluacion_radiografia === 'fractura' ? 'FRACTURA DETECTADA' : 'Sin fractura') : 'No solicitada'}
${answers.tipo_fractura ? `- Tipo Fractura: ${answers.tipo_fractura === 'abierta' ? 'ABIERTA' : 'CERRADA'}` : ''}
${answers.clasificacion_especifica ? `- Clasificación: ${answers.clasificacion_especifica}` : ''}

IV. PROTOCOLO RECOMENDADO
${prot?.titulo}
${prot?.pasos.map((s, i) => `${i+1}. ${s}`).join('\n')}

=========================================
Sistema de Apoyo al Diagnóstico - ACHS
=========================================
`.trim();
};

export const guideImage = "https://www.physiotutors.com/wp-content/uploads/2017/05/Ottawa-Ankle-Rules.png";