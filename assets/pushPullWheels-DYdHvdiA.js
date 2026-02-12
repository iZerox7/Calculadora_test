import{d as u}from"./commonAnamnesis-DnXU8SF6.js";import{c as p}from"./commonDemographics-Nu-SUVbe.js";const _=({caseId:s,answers:o,resultQuestion:r,allQuestions:n})=>{if(!r)return"Generando informe...";const l=(d,a)=>{const i=n.find(t=>t.id===d);return!i||!i.options?a:Array.isArray(a)?a.map(t=>i.options.find(c=>c.value===t)?.label||t).join(", "):i.options.find(t=>t.value===a)?.label||a};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - EMPUJE Y TRACCIÓN (CON RUEDAS)
`;return e+=`==================================================

`,e+=`SINIESTRO ID: ${s}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Sexo del paciente: ${l("sexo_paciente",o.sexo_paciente)||"N/A"}
`,e+=`- Edad del paciente: ${o.edad_paciente||"N/A"} años
`,e+=`- Tipo de equipo: ${l("tipo_equipo_ruedas",o.tipo_equipo_ruedas)||"N/A"}
`,e+=`- Peso de la carga: ${o.peso_carga_ruedas||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${l("factores_riesgo_ruedas",o.factores_riesgo_ruedas)||"Ninguno"}

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
`,e},g={prot_lumbago_alto:{titulo:"PROTOCOLO MANEJO - RIESGO ALTO",pasos:["1. REPOSO: Reposo laboral (48-72h).","2. TRATAMIENTO: Analgesia y calor local.","3. RESTRICCIÓN: Uso de transpaletas eléctricas o apoyo mecánico.","4. SEGUIMIENTO: Evaluación en 7 días."]},prot_lumbago_bajo:{titulo:"PROTOCOLO MANEJO - RIESGO BAJO",pasos:["1. REPOSO RELATIVO: Mantener actividad.","2. CALOR LOCAL: 20 min, 3 veces al día.","3. EDUCACIÓN: Revisar estado de ruedas y rodamientos.","4. REINTEGRO: Continuar labores."]}},m=(s,o=!1)=>{if(!o)return null;const r=s.tipo_equipo_ruedas,n=parseFloat(s.peso_carga_ruedas),l=s.factores_riesgo_ruedas||[],e={id:"result_alto_ruedas",text:"Riesgo Alto",color:"red",protocolId:"prot_lumbago_alto"},d={id:"result_bajo_ruedas",text:"Riesgo Bajo",color:"green",protocolId:"prot_lumbago_bajo"};let a=0;return l.forEach(i=>{switch(i){case"mal_estado":a+=1;break;case"sin_manillas":a+=1;break;case"piso_malo":a+=2;break;case"carga_inestable":a+=1;break;case"obstruye_vision":a+=1;break;case"carga_peligrosa":a+=1;break;case"distancia_10_30":a+=1;break;case"distancia_mas_30":a+=2;break}}),r==="pequeno"&&(n>50||a>=2)||r==="mediano"&&(n>250||a>=2)||r==="grande"&&(n>600||a>=2)?e:d},b=[...p,{id:"tipo_equipo_ruedas",text:"Tipo de equipo con ruedas",type:"options",group:"risk",options:[{value:"pequeno",label:"Pequeño (1-2 ruedas)"},{value:"mediano",label:"Mediano (3+ ruedas)"},{value:"grande",label:"Grande (dirigible/rieles)"}]},{id:"peso_carga_ruedas",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 100"},{id:"factores_riesgo_ruedas",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"mal_estado",label:"Equipo en mal estado (+1)"},{value:"sin_manillas",label:"Sin manillas / Contacto incómodo (+1)"},{value:"piso_malo",label:"Superficie de piso en mal estado (+2)"},{value:"carga_inestable",label:"Carga inestable (+1)"},{value:"obstruye_vision",label:"Carga obstruye la visión (+1)"},{value:"carga_peligrosa",label:"Carga peligrosa al tacto (+1)"},{value:"distancia_10_30",label:"Distancia 10-30 metros (+1)"},{value:"distancia_mas_30",label:"Distancia > 30 metros (+2)"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},...u,{id:"result_alto_ruedas",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo_ruedas",text:"Riesgo Bajo",type:"result",color:"green"}],I={questions:b,generateClinicalReport:_,evaluateRisk:m,protocols:g,guideImage:"Memoria_ruedas.png"};export{I as default};
