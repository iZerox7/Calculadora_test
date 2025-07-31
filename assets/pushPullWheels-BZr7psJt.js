import{d as c}from"./commonAnamnesis-DnXU8SF6.js";import{c as _}from"./commonDemographics-Nu-SUVbe.js";const p=({caseId:i,answers:a,resultQuestion:o,allQuestions:t})=>{if(!o)return"Generando informe...";const s=(d,n)=>{const l=t.find(r=>r.id===d);return!l||!l.options?n:Array.isArray(n)?n.map(r=>l.options.find(u=>u.value===r)?.label||r).join(", "):l.options.find(r=>r.value===n)?.label||n};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - EMPUJE Y TRACCIÓN (CON RUEDAS)
`;return e+=`==================================================

`,e+=`SINIESTRO ID: ${i}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Sexo del paciente: ${s("sexo_paciente",a.sexo_paciente)||"N/A"}
`,e+=`- Edad del paciente: ${a.edad_paciente||"N/A"} años
`,e+=`- Tipo de equipo: ${s("tipo_equipo_ruedas",a.tipo_equipo_ruedas)||"N/A"}
`,e+=`- Peso de la carga: ${a.peso_carga_ruedas||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${s("factores_riesgo_ruedas",a.factores_riesgo_ruedas)||"Ninguno"}

`,e+=`III. ANAMNESIS ADICIONAL:
`,e+=`- Fecha de inicio del dolor: ${a.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${a.actividad_dolor||"No reportado"}
`,e+=`- Información complementaria a la anamnesis: ${a.info_complementaria||"No reportado"}
`,e+=`- Características del objeto: ${a.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${a.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${a.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${a.banderas_rojas||"No reportado"}

`,e+=`IV. GRADO DE EXPOSICIÓN:
`,e+=`- ${o.text}
`,e},g=(i,a=!1)=>{if(!a)return null;const o=i.tipo_equipo_ruedas,t=parseFloat(i.peso_carga_ruedas),s=i.factores_riesgo_ruedas||[];let e=0;return s.forEach(d=>{switch(d){case"mal_estado":e+=1;break;case"sin_manillas":e+=1;break;case"piso_malo":e+=2;break;case"carga_inestable":e+=1;break;case"obstruye_vision":e+=1;break;case"carga_peligrosa":e+=1;break;case"distancia_10_30":e+=1;break;case"distancia_mas_30":e+=2;break;case"ninguno":e+=0;break}}),o==="pequeno"?t>50||e>=2?"result_alto_ruedas":"result_bajo_ruedas":o==="mediano"?t>250||e>=2?"result_alto_ruedas":"result_bajo_ruedas":o==="grande"&&(t>600||e>=2)?"result_alto_ruedas":"result_bajo_ruedas"},b=[..._,{id:"tipo_equipo_ruedas",text:"Tipo de equipo con ruedas",type:"options",group:"risk",options:[{value:"pequeno",label:"Pequeño (1-2 ruedas)"},{value:"mediano",label:"Mediano (3+ ruedas)"},{value:"grande",label:"Grande (dirigible/rieles)"}]},{id:"peso_carga_ruedas",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 100"},{id:"factores_riesgo_ruedas",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"mal_estado",label:"Equipo en mal estado (+1)"},{value:"sin_manillas",label:"Sin manillas / Contacto incómodo (+1)"},{value:"piso_malo",label:"Superficie de piso en mal estado (+2)"},{value:"carga_inestable",label:"Carga inestable (+1)"},{value:"obstruye_vision",label:"Carga obstruye la visión (+1)"},{value:"carga_peligrosa",label:"Carga peligrosa al tacto (+1)"},{value:"distancia_10_30",label:"Distancia 10-30 metros (+1)"},{value:"distancia_mas_30",label:"Distancia > 30 metros (+2)"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},...c,{id:"result_alto_ruedas",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo_ruedas",text:"Riesgo Bajo",type:"result",color:"green"}],A={questions:b,generateClinicalReport:p,evaluateRisk:g,guideImage:"Memoria_ruedas.png"};export{A as default};
