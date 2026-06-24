import{d as _}from"./commonAnamnesis-DnXU8SF6.js";const b={prot_lumbago_alto:{titulo:"--",pasos:["--"]},prot_lumbago_bajo:{titulo:"--",pasos:["--"]}},g=({caseId:o,answers:a,resultQuestion:r,allQuestions:c})=>{if(!r)return"Generando informe...";const n=(p,l)=>{const t=c.find(s=>s.id===p);return!t||!t.options?l:Array.isArray(l)?l.map(s=>t.options.find(d=>d.value===s)?.label||s).join(", "):t.options.find(s=>s.value===l)?.label||l};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - LEVANTAMIENTO INDIVIDUAL
`;return e+=`==================================================

`,e+=`SINIESTRO ID: ${o}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. ANAMNESIS:
`,e+=`- Fecha de inicio del dolor: ${a.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${a.actividad_dolor||"No reportado"}
`,e+=`- Información complementaria: ${a.info_complementaria||"No reportado"}
`,e+=`- Características del objeto: ${a.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${a.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${a.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${a.banderas_rojas||"No reportado"}

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Sexo del paciente: ${n("sexo_paciente",a.sexo_paciente)}
`,a.sexo_paciente==="mujer"&&(e+=`- Embarazo: ${n("embarazada",a.embarazada)}
`),e+=`- Edad del paciente: ${a.edad} años
`,e+=`- Peso movilizado: ${a.peso_movilizado_valor||"N/A"} kg
`,e+=`- Repetitividad / Frecuencia: ${n("repetitividad",a.repetitividad)}
`,e+=`- Tipo de carga: ${n("tipo_carga",a.tipo_carga)}
`,e+=`- Factores de postura: ${(a.factores_postura||[]).map(p=>n("factores_postura",p)).join(", ")||"Ninguno"}
`,e+=`- Distancia de transporte: ${n("distancia_transporte",a.distancia_transporte)}

`,e+=`III. GRADO DE EXPOSICIÓN:
`,e+=`- ${r.text}
`,e},v=(o,a=!1)=>{const r=parseFloat(o.peso_movilizado_valor),c=parseInt(o.edad),n=o.sexo_paciente==="mujer",e=o.embarazada==="si",p=o.repetitividad,l=o.tipo_carga,t=o.distancia_transporte,d=(o.factores_postura||[]).filter(m=>m!=="ninguno").length,i={id:"result_alto",text:"Grado de Exposición: ALTO",color:"red",protocolId:"prot_lumbago_alto"},u={id:"result_bajo",text:"Grado de Exposición: BAJO",color:"green",protocolId:"prot_lumbago_bajo"};if(e||r>25||r>20&&r<=25&&(n||c<18)||p==="menos_12"&&r>20&&r<=25||p==="mas_12"&&r>15&&r<=25)return i;{if(l==="simetrica"){if(t==="menos_4"&&d>=2||t==="entre_4_10"&&d>=1||t==="mas_10"&&d>=1)return i}else if(l==="asimetrica"&&(t==="menos_4"&&d>=1||t==="entre_4_10"&&d>=1||t==="mas_10"))return i;return u}},f=[{id:"sexo_paciente",text:"Sexo del paciente",type:"options",group:"risk",options:[{value:"hombre",label:"Hombre"},{value:"mujer",label:"Mujer"}]},{id:"embarazada",text:"¿Está embarazada?",type:"options",group:"risk",options:[{value:"si",label:"Sí"},{value:"no",label:"No"}],showIf:o=>o.sexo_paciente==="mujer"},{id:"edad",text:"Edad del paciente",type:"number",group:"risk",placeholder:"Ej: 35"},{id:"peso_movilizado_valor",text:"¿Cuánto peso movilizó? (kg)",type:"number",group:"risk",placeholder:"Ej: 15"},{id:"repetitividad",text:"Repetitividad / Frecuencia",type:"options",group:"risk",options:[{value:"unico",label:"Levantamiento único"},{value:"menos_12",label:"Menos de 12/hora"},{value:"mas_12",label:"12 o más/hora"}]},{id:"tipo_carga",text:"Tipo de carga",type:"options",group:"risk",options:[{value:"simetrica",label:"Carga simétrica"},{value:"asimetrica",label:"Carga asimétrica"}]},{id:"factores_postura",text:"Factores de postura",type:"multi",group:"risk",options:[{value:"postura_restringida",label:"Postura restringida"},{value:"atravesar_rampa",label:"Atraviesa obstáculos"},{value:"subir_escaleras",label:"Sube escaleras"},{value:"materiales_sin_sujecion",label:"Sujeción inadecuada"},{value:"ninguno",label:"Ninguno"}]},{id:"distancia_transporte",text:"Distancia de transporte",type:"options",group:"risk",options:[{value:"menos_4",label:"< 4 metros"},{value:"entre_4_10",label:"4 a 10 metros"},{value:"mas_10",label:"> 10 metros"}]},..._],A={questions:f,generateClinicalReport:g,evaluateRisk:v,protocols:b,guideImage:"Memoria_levantamiento.png"};export{A as default,b as protocols};
