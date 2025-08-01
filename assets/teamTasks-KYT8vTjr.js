import{d}from"./commonAnamnesis-DnXU8SF6.js";import{c as p}from"./commonDemographics-D0hn_te2.js";const _=({caseId:n,answers:o,resultQuestion:a,allQuestions:t})=>{if(!a)return"Generando informe...";const s=(u,i)=>{const l=t.find(r=>r.id===u);return!l||!l.options?i:Array.isArray(i)?i.map(r=>l.options.find(c=>c.value===r)?.label||r).join(", "):l.options.find(r=>r.value===i)?.label||i};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - TAREAS EN EQUIPO
`;return e+=`==================================================

`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Sexo del paciente: ${s("sexo_paciente",o.sexo_paciente)||"N/A"}
`,e+=`- Edad del paciente: ${o.edad_paciente||"N/A"} años
`,e+=`- Número de personas: ${o.numero_personas||"N/A"}
`,e+=`- Peso de la carga: ${o.peso_carga_equipo||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${s("factores_riesgo_equipo",o.factores_riesgo_equipo)||"Ninguno"}

`,e+=`III. ANAMNESIS ADICIONAL:
`,e+=`- Fecha de inicio del dolor: ${o.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${o.actividad_dolor||"No reportado"}
`,e+=`- Información complementaria a la anamnesis: ${o.info_complementaria||"No reportado"}
`,e+=`- Características del objeto: ${o.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${o.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${o.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${o.banderas_rojas||"No reportado"}

`,e+=`IV. GRADO DE EXPOSICIÓN:
`,e+=`- ${a.text}
`,e},m=(n,o=!1)=>{if(!o)return null;const a=parseInt(n.numero_personas,10),t=parseFloat(n.peso_carga_equipo),s=n.factores_riesgo_equipo||[];let e=0;return s.forEach(u=>{switch(u){case"postura_restringida":e+=1;break;case"obstaculos":e+=1;break;case"sin_sujecion":e+=1;break;case"control_deficiente":e+=2;break;case"distancia_4_10":e+=1;break;case"distancia_mas_10":e+=2;break;case"ninguno":e+=0;break}}),a===2?t>35||e>=2?"result_alto_equipo":"result_bajo_equipo":a===3?t>55||e>=2?"result_alto_equipo":"result_bajo_equipo":a===4&&(t>75||e>=2)?"result_alto_equipo":"result_bajo_equipo"},g=[...p,{id:"numero_personas",text:"Número de personas involucradas",type:"options",group:"risk",options:[{value:"2",label:"2 Personas"},{value:"3",label:"3 Personas"},{value:"4",label:"4 Personas"}]},{id:"peso_carga_equipo",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 40"},{id:"factores_riesgo_equipo",text:"Factores de riesgo adicionales",type:"multi",group:"risk",options:[{value:"postura_restringida",label:"Postura severamente restringida"},{value:"obstaculos",label:"Hay rampas, escaleras u obstáculos"},{value:"sin_sujecion",label:"Materiales sin sistema de sujeción"},{value:"control_deficiente",label:"Control deficiente de la carga"},{value:"distancia_4_10",label:"Distancia 4-10 metros"},{value:"distancia_mas_10",label:"Distancia > 10 metros"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},...d,{id:"result_alto_equipo",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo_equipo",text:"Riesgo Bajo",type:"result",color:"green"}],A={questions:g,generateClinicalReport:_,evaluateRisk:m,guideImage:"Memoria_teamwork.png"};export{A as default};
