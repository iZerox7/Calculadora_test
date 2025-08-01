import{d as p}from"./commonAnamnesis-DnXU8SF6.js";const _=({caseId:t,answers:a,resultQuestion:r,allQuestions:u})=>{if(!r)return"Generando informe...";const i=(d,n)=>{const o=u.find(l=>l.id===d);return!o||!o.options?n:Array.isArray(n)?n.map(l=>o.options.find(s=>s.value===l)?.label||l).join(", "):o.options.find(l=>l.value===n)?.label||n};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - LEVANTAMIENTO INDIVIDUAL
`;return e+=`==================================================

`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. ANAMNESIS:
`,e+=`- Fecha de inicio del dolor: ${a.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${a.actividad_dolor||"No reportado"}
`,e+=`- Información complementaria a la anamnesis: ${a.info_complementaria||"No reportado"}
`,e+=`- Características del objeto: ${a.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${a.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${a.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${a.banderas_rojas||"No reportado"}

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Sexo del paciente: ${i("sexo_paciente",a.sexo_paciente)}
`,a.sexo_paciente==="mujer"&&(e+=`- Embarazo: ${i("embarazada",a.embarazada)}
`),e+=`- Edad del paciente: ${a.edad} años
`,e+=`- Peso movilizado: ${a.peso_movilizado_valor||"N/A"} kg
`,e+=`- Repetitividad / Frecuencia: ${i("repetitividad",a.repetitividad)}
`,e+=`- Tipo de carga: ${i("tipo_carga",a.tipo_carga)}
`,e+=`- Factores de postura: ${(a.factores_postura||[]).map(d=>i("factores_postura",d)).join(", ")||"Ninguno"}
`,e+=`- Distancia de transporte: ${i("distancia_transporte",a.distancia_transporte)}

`,e+=`III. GRADO DE EXPOSICIÓN:
`,e+=`- ${r.text}
`,e},m=(t,a=!1)=>{const r=parseFloat(t.peso_movilizado_valor),u=parseInt(t.edad),i=t.sexo_paciente==="mujer",e=t.embarazada==="si",d=t.repetitividad,n=t.tipo_carga,o=t.distancia_transporte,s=(t.factores_postura||[]).filter(c=>c!=="ninguno").length;if(e||r>25||r>20&&r<=25&&(i||u<18)||d==="menos_12"&&r>20&&r<=25||d==="mas_12"&&r>15&&r<=25)return"result_alto";if(a){if(n==="simetrica"){if(o==="menos_4"&&s>=2||o==="entre_4_10"&&s>=1||o==="mas_10"&&s>=1)return"result_alto"}else if(n==="asimetrica"&&(o==="menos_4"&&s>=1||o==="entre_4_10"&&s>=1||o==="mas_10"))return"result_alto";return"result_bajo"}return null},b=[{id:"sexo_paciente",text:"Sexo del paciente",type:"options",group:"risk",options:[{value:"hombre",label:"Hombre"},{value:"mujer",label:"Mujer"}]},{id:"embarazada",text:"¿Está embarazada?",type:"boolean",group:"risk",options:[{value:"si",label:"Sí"},{value:"no",label:"No"}],showIf:t=>t.sexo_paciente==="mujer"},{id:"edad",text:"Edad del paciente",type:"number",group:"risk",placeholder:"Ej: 35"},{id:"peso_movilizado_valor",text:"¿Cuánto peso movilizó? (kg)",type:"number",group:"risk",placeholder:"Ej: 15"},{id:"repetitividad",text:"Repetitividad / Frecuencia",type:"options",group:"risk",options:[{value:"unico",label:"Levantamiento único"},{value:"menos_12",label:"Menos de 12/hora"},{value:"mas_12",label:"12 o más/hora"}]},{id:"tipo_carga",text:"Tipo de carga",type:"options",group:"risk",options:[{value:"simetrica",label:"Carga simétrica"},{value:"asimetrica",label:"Carga asimétrica"}]},{id:"factores_postura",text:"Factores de postura (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"postura_restringida",label:"Postura restringida"},{value:"atravesar_rampa",label:"Atraviesa obstáculos"},{value:"subir_escaleras",label:"Sube escaleras"},{value:"materiales_sin_sujecion",label:"Sujeción inadecuada"},{value:"ninguno",label:"Ninguno"}]},{id:"distancia_transporte",text:"Distancia de transporte",type:"options",group:"risk",options:[{value:"menos_4",label:"< 4 metros"},{value:"entre_4_10",label:"4 a 10 metros"},{value:"mas_10",label:"> 10 metros"}]},...p,{id:"result_alto",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo",text:"Riesgo Bajo",type:"result",color:"green"}],g={questions:b,generateClinicalReport:_,evaluateRisk:m,guideImage:"Memoria_levantamiento.png"};export{g as default};
