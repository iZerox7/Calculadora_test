const n={protocolo_esguince_1:{titulo:"PROTOCOLO DE MANEJO - ESGUINCE GRADO I",pasos:["1. TRATAMIENTO RICE: Reposo, Hielo local (15 min c/6h), Compresión, Elevación.","2. CARGA: Apoyo completo según tolerancia.","3. MEDICACIÓN: Analgésicos/AINEs por 3-5 días.","4. SEGUIMIENTO: Retorno gradual a actividades en 1-2 semanas."]},protocolo_esguince_2:{titulo:"PROTOCOLO DE MANEJO - ESGUINCE GRADO II",pasos:["1. INMOVILIZACIÓN: Bota Walker o Vendaje funcional firme por 10-14 días.","2. KINESIOTERAPIA: Derivación para manejo de edema y propiocepción.","3. SEGUIMIENTO: Recuperación estimada en 3-6 semanas."]},protocolo_esguince_3:{titulo:"PROTOCOLO DE MANEJO - ESGUINCE GRADO III",pasos:["1. INMOVILIZACIÓN: Bota Walker fija y descarga con muletas.","2. EVALUACIÓN ESPECIALISTA: Derivación a Traumatología para evaluar integridad ligamentaria.","3. SEGUIMIENTO: Recuperación prolongada (3-6 meses)."]},protocolo_fractura_abierta:{titulo:"🚨 URGENCIA QUIRÚRGICA - FRACTURA ABIERTA",pasos:["1. MANEJO DE HERIDA: Cubrir con apósito estéril, NO reducir.","2. ANTIBIÓTICOS: Cefazolina 2g EV + Profilaxis antitetánica.","3. TRASLADO: Derivación inmediata a centro de mayor complejidad."]},protocolo_fractura_cerrada:{titulo:"MANEJO - FRACTURA CERRADA",pasos:["1. INMOVILIZACIÓN: Férula posterior de yeso bien almohadillada.","2. DESCARGA: Prohibición absoluta de carga de peso.","3. DERIVACIÓN: Control con Traumatología para resolución quirúrgica o conservadora."]}},u=[{id:"fecha_accidente",text:"Fecha del accidente",type:"date",group:"anamnesis"},{id:"info_complementaria",text:"Antecedentes generales y alergias",type:"textarea",group:"anamnesis",placeholder:"Antecedentes mórbidos, cirugías previas, alergias, si hubo crujido audible..."},{id:"actividad_accidente",text:"Actividad al momento del accidente",type:"textarea",group:"anamnesis",placeholder:"Ej: Estaba tomando el metro de camino al trabajo..."},{id:"descripcion_accidente",text:"Descripción del accidente",type:"textarea",group:"anamnesis",placeholder:"Ej: Al bajar de la plataforma, el pie derecho se invirtió bruscamente..."},{id:"eva",text:"Nivel de Dolor (EVA)",type:"slider",group:"anamnesis",min:0,max:10},{id:"aumento_volumen",text:"Aumento de volumen (Edema)",type:"options",group:"anamnesis",options:[{value:"ninguno",label:"Sin aumento de volumen"},{value:"leve",label:"Leve (+)"},{value:"moderado",label:"Moderado (++)"},{value:"severo",label:"Severo (+++)"}]},{id:"hallazgos_fisicos",text:"Examen Físico: Equimosis / Deformidad / Heridas / Maniobras",type:"textarea",group:"anamnesis",placeholder:"Describa presencia de equimosis en abanico, deformidad evidente o heridas..."},{id:"deformidad_evidente",text:"¿Hay deformidad evidente?",type:"options",group:"risk",options:[{value:"si",label:"Sí"},{value:"no",label:"No"}]},{id:"tipo_dolor",text:"¿Cómo se presenta el dolor?",type:"options",group:"risk",options:[{value:"difuso",label:"Difuso"},{value:"local",label:"Local"},{value:"local_no_equimosis",label:"Local - Sin Equimosis"}]},{id:"tolera_carga_difuso",text:"¿Tolera la carga?",type:"options",group:"risk",showIf:a=>a.tipo_dolor==="difuso",options:[{value:"no_tolera",label:"No tolera carga"},{value:"con_dificultad",label:"Tolera carga con dificultad"}]},{id:"estabilidad",text:"Evaluación de estabilidad / Localización:",type:"options",group:"risk",showIf:a=>a.tipo_dolor==="local"||a.tipo_dolor==="local_no_equimosis",options:[{value:"inestable",label:"Leve inestabilidad"},{value:"estable",label:"Sin inestabilidad"}]},{id:"criterios_ottawa",text:"¿Cumple alguno de los Criterios de Ottawa?",type:"options",group:"risk",showIf:a=>a.estabilidad==="estable"||a.tipo_dolor==="local_no_equimosis",options:[{value:"cumple",label:"Cumple criterios (Ottawa +)"},{value:"no_cumple",label:"No cumple ninguno (Ottawa -)"}]},{id:"evaluacion_radiografia",text:"Resultado de Radiografía (AP-Lat-Obl):",type:"options",group:"risk",showIf:a=>a.deformidad_evidente==="si"||a.tolera_carga_difuso==="no_tolera"||a.tolera_carga_difuso==="con_dificultad"||a.estabilidad==="inestable"||a.criterios_ottawa==="cumple",options:[{value:"fractura",label:"Fractura"},{value:"no_fractura",label:"No hay fractura"}]},{id:"tipo_fractura",text:"Tipo de fractura detectada:",type:"options",group:"risk",showIf:a=>a.evaluacion_radiografia==="fractura",options:[{value:"abierta",label:"Abierta"},{value:"cerrada",label:"Cerrada"}]},{id:"clasificacion_especifica",text:"Clasificación de la fractura:",type:"options",group:"risk",showIf:a=>a.tipo_fractura!==void 0,options:[{value:"Maléolo Peroné",label:"Maléolo Peroné"},{value:"Maléolo Tibial",label:"Maléolo Tibial"},{value:"Pilón Tibial",label:"Pilón Tibial"},{value:"Bimaleolar",label:"Bimaleolar"},{value:"Trimaleolar",label:"Trimaleolar"}]}],s=a=>a.tipo_fractura==="abierta"?{id:"f_abierta",text:`Fractura Abierta: ${a.clasificacion_especifica||"No especificada"}`,color:"red",protocolId:"protocolo_fractura_abierta"}:a.tipo_fractura==="cerrada"?{id:"f_cerrada",text:`Fractura Cerrada: ${a.clasificacion_especifica||"No especificada"}`,color:"red",protocolId:"protocolo_fractura_cerrada"}:a.evaluacion_radiografia==="no_fractura"?a.tolera_carga_difuso==="no_tolera"?{id:"e3",text:"Esguince de Tobillo Grado III",color:"red",protocolId:"protocolo_esguince_3"}:a.tolera_carga_difuso==="con_dificultad"||a.estabilidad==="inestable"?{id:"e2",text:"Esguince de Tobillo Grado II",color:"green",protocolId:"protocolo_esguince_2"}:{id:"e2",text:"Esguince de Tobillo Grado II",color:"green",protocolId:"protocolo_esguince_2"}:a.tolera_carga_difuso==="no_tolera"?{id:"e3",text:"Esguince de Tobillo Grado III",color:"red",protocolId:"protocolo_esguince_3"}:a.tolera_carga_difuso==="con_dificultad"||a.estabilidad==="inestable"?{id:"e2",text:"Esguince de Tobillo Grado II",color:"green",protocolId:"protocolo_esguince_2"}:{id:"e1",text:"Esguince de Tobillo Grado I",color:"green",protocolId:"protocolo_esguince_1"},p=({caseId:a,answers:e,resultQuestion:o,protocols:i})=>{const t=i[o.protocolId],r={ninguno:"Sin aumento de volumen",leve:"Leve (+/+++)",moderado:"Moderado (++/+++)",severo:"Severo (+++/+++)"},l={no_tolera:"No tolera carga",con_dificultad:"Tolera carga con dificultad"};return`
=========================================
      INFORME MÉDICO: TOBILLO Y PIE
=========================================
ID CASO: ${a}
FECHA: ${new Date().toLocaleDateString()}
DIAGNÓSTICO SUGERIDO: ${o.text}

I. ANAMNESIS DETALLADA
- Fecha Accidente: ${e.fecha_accidente||"No especificada"}
- Antecedentes generales y alergias: ${e.info_complementaria||"Sin antecedentes"}
- Actividad al momento del accidente: ${e.actividad_accidente||"No especificada"}
- Descripción del accidente: ${e.descripcion_accidente||"No especificado"}


II. EXAMEN FÍSICO
- Nivel Dolor (EVA): ${e.eva||0}/10
- Edema: ${r[e.aumento_volumen]||"No evaluado"}
- Hallazgos Físicos: ${e.hallazgos_fisicos||"Sin otros hallazgos"}
- Deformidad Evidente: ${e.deformidad_evidente==="si"?"SÍ":"NO"}
- Tipo de Dolor: ${e.tipo_dolor||"No especificado"}
- Tolerancia Carga: ${l[e.tolera_carga_difuso]||"No evaluado"}
- Estabilidad: ${e.estabilidad||"No evaluado"}
- Criterios Ottawa: ${e.criterios_ottawa==="cumple"?"Positivo (+)":e.criterios_ottawa==="no_cumple"?"Negativo (-)":"No evaluado"}

III. IMAGENOLOGÍA
- Radiografía: ${e.evaluacion_radiografia?e.evaluacion_radiografia==="fractura"?"FRACTURA DETECTADA":"Sin fractura":"No solicitada"}
${e.tipo_fractura?`- Tipo Fractura: ${e.tipo_fractura==="abierta"?"ABIERTA":"CERRADA"}`:""}
${e.clasificacion_especifica?`- Clasificación: ${e.clasificacion_especifica}`:""}

IV. DIAGNÓSTICO SUGERIDO
${o.text}

V. INDICACIONES SUGERIDAS
${t?.pasos.map((c,d)=>`${d+1}. ${c}`).join(`
`)}

=========================================
Sistema de Apoyo al Diagnóstico - ACHS
=========================================
`.trim()},_={questions:u,protocols:n,evaluateRisk:s,generateClinicalReport:p,guideImage:"arbol_decision.png"};export{_ as default,s as evaluateRisk,p as generateClinicalReport,n as protocols,u as questions};
