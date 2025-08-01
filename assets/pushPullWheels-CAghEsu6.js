import{d as c}from"./commonAnamnesis-DnXU8SF6.js";import{c as _}from"./commonDemographics-D0hn_te2.js";const p=({caseId:n,answers:a,resultQuestion:o,allQuestions:i})=>{if(!o)return"Generando informe...";const t=(d,s)=>{const l=i.find(r=>r.id===d);return!l||!l.options?s:Array.isArray(s)?s.map(r=>l.options.find(u=>u.value===r)?.label||r).join(", "):l.options.find(r=>r.value===s)?.label||s};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - EMPUJE Y TRACCIÓN (CON RUEDAS)
`;return e+=`==================================================

`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Sexo del paciente: ${t("sexo_paciente",a.sexo_paciente)||"N/A"}
`,e+=`- Edad del paciente: ${a.edad_paciente||"N/A"} años
`,e+=`- Tipo de equipo: ${t("tipo_equipo_ruedas",a.tipo_equipo_ruedas)||"N/A"}
`,e+=`- Peso de la carga: ${a.peso_carga_ruedas||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${t("factores_riesgo_ruedas",a.factores_riesgo_ruedas)||"Ninguno"}

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
`,e},g=(n,a=!1)=>{if(!a)return null;const o=n.tipo_equipo_ruedas,i=parseFloat(n.peso_carga_ruedas),t=n.factores_riesgo_ruedas||[];let e=0;return t.forEach(d=>{switch(d){case"mal_estado":e+=1;break;case"sin_manillas":e+=1;break;case"piso_malo":e+=2;break;case"carga_inestable":e+=1;break;case"obstruye_vision":e+=1;break;case"carga_peligrosa":e+=1;break;case"distancia_10_30":e+=1;break;case"distancia_mas_30":e+=2;break;case"ninguno":e+=0;break}}),o==="pequeno"?i>50||e>=2?"result_alto_ruedas":"result_bajo_ruedas":o==="mediano"?i>250||e>=2?"result_alto_ruedas":"result_bajo_ruedas":o==="grande"&&(i>600||e>=2)?"result_alto_ruedas":"result_bajo_ruedas"},b=[..._,{id:"tipo_equipo_ruedas",text:"Tipo de equipo con ruedas",type:"options",group:"risk",options:[{value:"pequeno",label:"Pequeño (1-2 ruedas)"},{value:"mediano",label:"Mediano (3+ ruedas)"},{value:"grande",label:"Grande (dirigible/rieles)"}]},{id:"peso_carga_ruedas",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 100"},{id:"factores_riesgo_ruedas",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"mal_estado",label:"Equipo en mal estado)"},{value:"sin_manillas",label:"Sin manillas / Contacto incómodo"},{value:"piso_malo",label:"Superficie de piso en mal estado"},{value:"carga_inestable",label:"Carga inestable)"},{value:"obstruye_vision",label:"Carga obstruye la visión"},{value:"carga_peligrosa",label:"Carga peligrosa al tacto"},{value:"distancia_10_30",label:"Distancia 10-30 metros"},{value:"distancia_mas_30",label:"Distancia > 30 metros"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},...c,{id:"result_alto_ruedas",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo_ruedas",text:"Riesgo Bajo",type:"result",color:"green"}],A={questions:b,generateClinicalReport:p,evaluateRisk:g,guideImage:"Memoria_ruedas.png"};export{A as default};
