import{d}from"./commonAnamnesis-DdwxIT9E.js";const p=({caseId:t,answers:o,resultQuestion:a,allQuestions:s})=>{if(!a)return"Generando informe...";const l=(u,i)=>{const n=s.find(r=>r.id===u);return!n||!n.options?i:Array.isArray(i)?i.map(r=>n.options.find(c=>c.value===r)?.label||r).join(", "):n.options.find(r=>r.value===i)?.label||i};let e=`INFORME DE EVALUACIÓN CALCULADORA - TAREAS EN EQUIPO
`;return e+=`==================================================

`,e+=`SINIESTRO ID: ${t}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Número de personas: ${o.numero_personas||"N/A"}
`,e+=`- Peso de la carga: ${o.peso_carga_equipo||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${l("factores_riesgo_equipo",o.factores_riesgo_equipo)||"Ninguno"}

`,e+=`III. ANAMNESIS ADICIONAL:
`,e+=`- Fecha de inicio del dolor: ${o.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${o.actividad_dolor||"No reportado"}
`,e+=`- Características del objeto: ${o.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${o.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${o.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${o.banderas_rojas||"No reportado"}

`,e+=`IV. CONCLUSIÓN:
`,e+=`${a.text}
`,e},_=(t,o=!1)=>{if(!o)return null;const a=parseInt(t.numero_personas,10),s=parseFloat(t.peso_carga_equipo),l=t.factores_riesgo_equipo||[];let e=0;return l.forEach(u=>{switch(u){case"postura_restringida":e+=1;break;case"obstaculos":e+=1;break;case"sin_sujecion":e+=1;break;case"control_deficiente":e+=2;break;case"distancia_4_10":e+=1;break;case"distancia_mas_10":e+=2;break;case"ninguno":e+=0;break}}),a===2?s>35||e>=2?"result_alto_equipo":"result_bajo_equipo":a===3?s>55||e>=2?"result_alto_equipo":"result_bajo_equipo":a===4&&(s>75||e>=2)?"result_alto_equipo":"result_bajo_equipo"},b=[{id:"numero_personas",text:"Número de personas involucradas",type:"options",group:"risk",options:[{value:"2",label:"2 Personas"},{value:"3",label:"3 Personas"},{value:"4",label:"4 Personas"}]},{id:"peso_carga_equipo",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 40"},{id:"factores_riesgo_equipo",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"postura_restringida",label:"Postura severamente restringida (+1)"},{value:"obstaculos",label:"Hay rampas, escaleras u obstáculos (+1)"},{value:"sin_sujecion",label:"Materiales sin sistema de sujeción (+1)"},{value:"control_deficiente",label:"Control deficiente de la carga (+2)"},{value:"distancia_4_10",label:"Distancia 4-10 metros (+1)"},{value:"distancia_mas_10",label:"Distancia > 10 metros (+2)"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},...d,{id:"result_alto_equipo",text:"Riesgo Alto: La combinación de peso, personas y factores de riesgo supera los límites recomendados.",type:"result",color:"red"},{id:"result_bajo_equipo",text:"Riesgo Bajo: La tarea se encuentra dentro de los límites aceptables.",type:"result",color:"green"}],m={questions:b,generateClinicalReport:p,evaluateRisk:_,guideImage:"Memoria_teamwork.png"};export{m as default};
