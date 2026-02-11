import{d as u}from"./commonAnamnesis-DnXU8SF6.js";import{c as _}from"./commonDemographics-Nu-SUVbe.js";const p=({caseId:s,answers:o,resultQuestion:r,allQuestions:n})=>{if(!r)return"Generando informe...";const l=(c,a)=>{const t=n.find(i=>i.id===c);return!t||!t.options?a:Array.isArray(a)?a.map(i=>t.options.find(d=>d.value===i)?.label||i).join(", "):t.options.find(i=>i.value===a)?.label||a};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - EMPUJE Y TRACCIÓN (SIN RUEDAS)
`;return e+=`==================================================

`,e+=`SINIESTRO ID: ${s}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Sexo del paciente: ${l("sexo_paciente",o.sexo_paciente)||"N/A"}
`,e+=`- Edad del paciente: ${o.edad_paciente||"N/A"} años
`,e+=`- Tipo de empuje/tracción: ${l("tipo_empuje_sin_ruedas",o.tipo_empuje_sin_ruedas)||"N/A"}
`,e+=`- Peso de la carga: ${o.peso_carga_sin_ruedas||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${l("factores_riesgo_sin_ruedas",o.factores_riesgo_sin_ruedas)||"Ninguno"}

`,e+=`III. ANAMNESIS ADICIONAL:
`,e+=`- Fecha de inicio del dolor: ${o.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${o.actividad_dolor||"No reportado"}
`,e+=`- Información complementaria a la anamnesis: ${o.info_complementaria||"No reportado"}
`,e+=`- Características del objeto: ${o.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${o.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${o.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${o.banderas_rojas||"No reportado"}

`,e+=`IV. GRADO DE EXPOSICIÓN:
`,e+=`- ${r.text}
`,e},g={prot_lumbago_alto:{titulo:"--",pasos:["--"]},prot_lumbago_bajo:{titulo:"--",pasos:["--"]}},m=(s,o=!1)=>{const r=s.tipo_empuje_sin_ruedas,n=parseFloat(s.peso_carga_sin_ruedas),l=s.factores_riesgo_sin_ruedas||[],e={id:"result_alto_sin_ruedas",text:"Riesgo Alto",color:"red",protocolId:"prot_lumbago_alto"},c={id:"result_bajo_sin_ruedas",text:"Riesgo Bajo",color:"green",protocolId:"prot_lumbago_bajo"};if(r==="rodado"&&n>400||r==="pivoteo"&&n>80||r==="arrastrar"&&n>25)return e;if(!o)return null;let a=0;return l.forEach(t=>{switch(t){case"obstaculos":a+=1;break;case"sin_manillas":a+=1;break;case"piso_malo":a+=2;break;case"carga_inestable":a+=1;break;case"obstruye_vision":a+=1;break;case"carga_peligrosa":a+=1;break;case"distancia_2_10":a+=1;break;case"distancia_mas_10":a+=2;break}}),a>=2?e:c},b=[..._,{id:"tipo_empuje_sin_ruedas",text:"Tipo de empuje / tracción",type:"options",group:"risk",options:[{value:"rodado",label:"Rodado"},{value:"pivoteo",label:"Pivoteo y rodado"},{value:"arrastrar",label:"Arrastrar / Halar / Deslizar"}]},{id:"peso_carga_sin_ruedas",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 50"},{id:"factores_riesgo_sin_ruedas",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"obstaculos",label:"Existen obstáculos o escalones (+1)"},{value:"sin_manillas",label:"Sin manillas / Contacto incómodo (+1)"},{value:"piso_malo",label:"Superficie de piso en mal estado (+2)"},{value:"carga_inestable",label:"Carga inestable (+1)"},{value:"obstruye_vision",label:"Carga obstruye la visión (+1)"},{value:"carga_peligrosa",label:"Carga peligrosa al tacto (+1)"},{value:"distancia_2_10",label:"Distancia 2-10 metros (+1)"},{value:"distancia_mas_10",label:"Distancia > 10 metros (+2)"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},...u,{id:"result_alto_sin_ruedas",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo_sin_ruedas",text:"Riesgo Bajo",type:"result",color:"green"}],f={questions:b,generateClinicalReport:p,evaluateRisk:m,protocols:g,guideImage:"Memoria_ruedant.png"};export{f as default};
