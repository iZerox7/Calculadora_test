import{d}from"./commonAnamnesis-DnXU8SF6.js";import{c as p}from"./commonDemographics-Nu-SUVbe.js";const _=({caseId:n,answers:a,resultQuestion:t,allQuestions:s})=>{if(!t)return"Generando informe...";const l=(c,o)=>{const r=s.find(i=>i.id===c);return!r||!r.options?o:Array.isArray(o)?o.map(i=>r.options.find(u=>u.value===i)?.label||i).join(", "):r.options.find(i=>i.value===o)?.label||o};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - TAREAS EN EQUIPO
`;return e+=`==================================================

`,e+=`SINIESTRO ID: ${n}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Sexo del paciente: ${l("sexo_paciente",a.sexo_paciente)||"N/A"}
`,e+=`- Edad del paciente: ${a.edad_paciente||"N/A"} años
`,e+=`- Número de personas: ${a.numero_personas||"N/A"}
`,e+=`- Peso de la carga: ${a.peso_carga_equipo||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${l("factores_riesgo_equipo",a.factores_riesgo_equipo)||"Ninguno"}

`,e+=`III. ANAMNESIS ADICIONAL:
`,e+=`- Fecha de inicio del dolor: ${a.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${a.actividad_dolor||"No reportado"}
`,e+=`- Información complementaria a la anamnesis: ${a.info_complementaria||"No reportado"}
`,e+=`- Características del objeto: ${a.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${a.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${a.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${a.banderas_rojas||"No reportado"}

`,e+=`IV. GRADO DE EXPOSICIÓN:
`,e+=`- ${t.text}
`,e},m={prot_lumbago_equipo_alto:{titulo:"--",pasos:["--"]},prot_lumbago_equipo_bajo:{titulo:"--",pasos:["--"]}},g=(n,a=!1)=>{if(!a)return null;const t=parseInt(n.numero_personas,10),s=parseFloat(n.peso_carga_equipo),l=n.factores_riesgo_equipo||[],e={id:"result_alto_equipo",text:"Riesgo Alto",color:"red",protocolId:"prot_lumbago_equipo_alto"},c={id:"result_bajo_equipo",text:"Riesgo Bajo",color:"green",protocolId:"prot_lumbago_equipo_bajo"};let o=0;return l.forEach(r=>{switch(r){case"postura_restringida":o+=1;break;case"obstaculos":o+=1;break;case"sin_sujecion":o+=1;break;case"control_deficiente":o+=2;break;case"distancia_4_10":o+=1;break;case"distancia_mas_10":o+=2;break}}),t===2&&(s>35||o>=2)||t===3&&(s>55||o>=2)||t===4&&(s>75||o>=2)?e:c},b=[...p,{id:"numero_personas",text:"Número de personas involucradas",type:"options",group:"risk",options:[{value:"2",label:"2 Personas"},{value:"3",label:"3 Personas"},{value:"4",label:"4 Personas"}]},{id:"peso_carga_equipo",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 40"},{id:"factores_riesgo_equipo",text:"Factores de riesgo adicionales",type:"multi",group:"risk",options:[{value:"postura_restringida",label:"Postura severamente restringida (+1)"},{value:"obstaculos",label:"Hay rampas, escaleras u obstáculos (+1)"},{value:"sin_sujecion",label:"Materiales sin sistema de sujeción (+1)"},{value:"control_deficiente",label:"Control deficiente de la carga (+2)"},{value:"distancia_4_10",label:"Distancia 4-10 metros (+1)"},{value:"distancia_mas_10",label:"Distancia > 10 metros (+2)"}]},...d,{id:"result_alto_equipo",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo_equipo",text:"Riesgo Bajo",type:"result",color:"green"}],I={questions:b,generateClinicalReport:_,evaluateRisk:g,protocols:m,guideImage:"Memoria_teamwork.png"};export{I as default};
