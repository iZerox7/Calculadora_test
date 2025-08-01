import{d as _}from"./commonAnamnesis-DnXU8SF6.js";import{c}from"./commonDemographics-D0hn_te2.js";const p=({caseId:n,answers:a,resultQuestion:o,allQuestions:s})=>{if(!o)return"Generando informe...";const i=(d,t)=>{const l=s.find(r=>r.id===d);return!l||!l.options?t:Array.isArray(t)?t.map(r=>l.options.find(u=>u.value===r)?.label||r).join(", "):l.options.find(r=>r.value===t)?.label||t};let e=`INFORME DE EVALUACIÓN CALCULADORA LUMBAGO - EMPUJE Y TRACCIÓN (SIN RUEDAS)
`;return e+=`==================================================

`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Sexo del paciente: ${i("sexo_paciente",a.sexo_paciente)||"N/A"}
`,e+=`- Edad del paciente: ${a.edad_paciente||"N/A"} años
`,e+=`- Tipo de empuje/tracción: ${i("tipo_empuje_sin_ruedas",a.tipo_empuje_sin_ruedas)||"N/A"}
`,e+=`- Peso de la carga: ${a.peso_carga_sin_ruedas||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${i("factores_riesgo_sin_ruedas",a.factores_riesgo_sin_ruedas)||"Ninguno"}

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
`,e},b=(n,a=!1)=>{const o=n.tipo_empuje_sin_ruedas,s=parseFloat(n.peso_carga_sin_ruedas),i=n.factores_riesgo_sin_ruedas||[];if(o==="rodado"&&s>400||o==="pivoteo"&&s>80||o==="arrastrar"&&s>25)return"result_alto_sin_ruedas";if(!a)return null;let e=0;return i.forEach(d=>{switch(d){case"obstaculos":e+=1;break;case"sin_manillas":e+=1;break;case"piso_malo":e+=2;break;case"carga_inestable":e+=1;break;case"obstruye_vision":e+=1;break;case"carga_peligrosa":e+=1;break;case"distancia_2_10":e+=1;break;case"distancia_mas_10":e+=2;break;case"ninguno":e+=0;break}}),(o==="rodado"||o==="pivoteo"||o==="arrastrar")&&e>=2?"result_alto_sin_ruedas":"result_bajo_sin_ruedas"},m=[...c,{id:"tipo_empuje_sin_ruedas",text:"Tipo de empuje / tracción",type:"options",group:"risk",options:[{value:"rodado",label:"Rodado"},{value:"pivoteo",label:"Pivoteo y rodado"},{value:"arrastrar",label:"Arrastrar / Halar / Deslizar"}]},{id:"peso_carga_sin_ruedas",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 50"},{id:"factores_riesgo_sin_ruedas",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"obstaculos",label:"Existen obstáculos o escalones"},{value:"sin_manillas",label:"Sin manillas / Contacto incómodo"},{value:"piso_malo",label:"Superficie de piso en mal estado"},{value:"carga_inestable",label:"Carga inestable"},{value:"obstruye_vision",label:"Carga obstruye la visión"},{value:"carga_peligrosa",label:"Carga peligrosa al tacto"},{value:"distancia_2_10",label:"Distancia 2-10 metros"},{value:"distancia_mas_10",label:"Distancia > 10 metros"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},..._,{id:"result_alto_sin_ruedas",text:"Riesgo Alto",type:"result",color:"red"},{id:"result_bajo_sin_ruedas",text:"Riesgo Bajo",type:"result",color:"green"}],A={questions:m,generateClinicalReport:p,evaluateRisk:b,guideImage:"Memoria_ruedant.png"};export{A as default};
