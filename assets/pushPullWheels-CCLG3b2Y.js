import{d as c}from"./commonAnamnesis-DdwxIT9E.js";const _=({caseId:s,answers:a,resultQuestion:o,allQuestions:i})=>{if(!o)return"Generando informe...";const n=(u,t)=>{const l=i.find(r=>r.id===u);return!l||!l.options?t:Array.isArray(t)?t.map(r=>l.options.find(d=>d.value===r)?.label||r).join(", "):l.options.find(r=>r.value===t)?.label||t};let e=`INFORME DE EVALUACIÓN DE RIESGO - EMPUJE Y TRACCIÓN (CON RUEDAS)
`;return e+=`==================================================

`,e+=`CASO ID: ${s}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Tipo de equipo: ${n("tipo_equipo_ruedas",a.tipo_equipo_ruedas)||"N/A"}
`,e+=`- Peso de la carga: ${a.peso_carga_ruedas||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${n("factores_riesgo_ruedas",a.factores_riesgo_ruedas)||"Ninguno"}

`,e+=`III. ANAMNESIS ADICIONAL:
`,e+=`- Fecha de inicio del dolor: ${a.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${a.actividad_dolor||"No reportado"}
`,e+=`- Características del objeto: ${a.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${a.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${a.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${a.banderas_rojas||"No reportado"}

`,e+=`IV. CONCLUSIÓN:
`,e+=`${o.text}
`,e},p=(s,a=!1)=>{if(!a)return null;const o=s.tipo_equipo_ruedas,i=parseFloat(s.peso_carga_ruedas),n=s.factores_riesgo_ruedas||[];let e=0;return n.forEach(u=>{switch(u){case"mal_estado":e+=1;break;case"sin_manillas":e+=1;break;case"piso_malo":e+=2;break;case"carga_inestable":e+=1;break;case"obstruye_vision":e+=1;break;case"carga_peligrosa":e+=1;break;case"distancia_10_30":e+=1;break;case"distancia_mas_30":e+=2;break;case"ninguno":e+=0;break}}),o==="pequeno"?i>50||e>=2?"result_alto_ruedas":"result_bajo_ruedas":o==="mediano"?i>250||e>=2?"result_alto_ruedas":"result_bajo_ruedas":o==="grande"&&(i>600||e>=2)?"result_alto_ruedas":"result_bajo_ruedas"},g=[{id:"tipo_equipo_ruedas",text:"Tipo de equipo con ruedas",type:"options",group:"risk",options:[{value:"pequeno",label:"Pequeño (1-2 ruedas)"},{value:"mediano",label:"Mediano (3+ ruedas)"},{value:"grande",label:"Grande (dirigible/rieles)"}]},{id:"peso_carga_ruedas",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 100"},{id:"factores_riesgo_ruedas",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"mal_estado",label:"Equipo en mal estado (+1)"},{value:"sin_manillas",label:"Sin manillas / Contacto incómodo (+1)"},{value:"piso_malo",label:"Superficie de piso en mal estado (+2)"},{value:"carga_inestable",label:"Carga inestable (+1)"},{value:"obstruye_vision",label:"Carga obstruye la visión (+1)"},{value:"carga_peligrosa",label:"Carga peligrosa al tacto (+1)"},{value:"distancia_10_30",label:"Distancia 10-30 metros (+1)"},{value:"distancia_mas_30",label:"Distancia > 30 metros (+2)"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},...c,{id:"result_alto_ruedas",text:"Riesgo Alto: La combinación de peso, equipo y factores de riesgo supera los límites recomendados.",type:"result",color:"red"},{id:"result_bajo_ruedas",text:"Riesgo Bajo: La tarea se encuentra dentro de los límites aceptables.",type:"result",color:"green"}],m={questions:g,generateClinicalReport:_,evaluateRisk:p,guideImage:"Memoria_ruedas.png"};export{m as default};
