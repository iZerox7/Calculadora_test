import{d as _}from"./commonAnamnesis-DdwxIT9E.js";const c=({caseId:s,answers:a,resultQuestion:r,allQuestions:i})=>{if(!r)return"Generando informe...";const n=(d,t)=>{const l=i.find(o=>o.id===d);return!l||!l.options?t:Array.isArray(t)?t.map(o=>l.options.find(u=>u.value===o)?.label||o).join(", "):l.options.find(o=>o.value===t)?.label||t};let e=`INFORME DE EVALUACIÓN DE RIESGO - EMPUJE Y TRACCIÓN (SIN RUEDAS)
`;return e+=`==================================================

`,e+=`CASO ID: ${s}
`,e+=`Fecha de Evaluación: ${new Date().toLocaleDateString("es-CL")}

`,e+=`I. DATOS DE LA TAREA:
`,e+=`- Tipo de empuje/tracción: ${n("tipo_empuje_sin_ruedas",a.tipo_empuje_sin_ruedas)||"N/A"}
`,e+=`- Peso de la carga: ${a.peso_carga_sin_ruedas||"N/A"} kg

`,e+=`II. FACTORES DE RIESGO IDENTIFICADOS:
`,e+=`- Factores seleccionados: ${n("factores_riesgo_sin_ruedas",a.factores_riesgo_sin_ruedas)||"Ninguno"}

`,e+=`III. ANAMNESIS ADICIONAL:
`,e+=`- Fecha de inicio del dolor: ${a.fecha_inicio_dolor||"No reportado"}
`,e+=`- Actividad durante inicio del dolor: ${a.actividad_dolor||"No reportado"}
`,e+=`- Características del objeto: ${a.caracteristicas_objeto||"No reportado"}
`,e+=`- Forma de agarre: ${a.forma_agarre||"No reportado"}
`,e+=`- Incidentes: ${a.incidente_durante_tarea||"No reportado"}
`,e+=`- Banderas Rojas: ${a.banderas_rojas||"No reportado"}

`,e+=`IV. CONCLUSIÓN:
`,e+=`${r.text}
`,e},p=(s,a=!1)=>{const r=s.tipo_empuje_sin_ruedas,i=parseFloat(s.peso_carga_sin_ruedas),n=s.factores_riesgo_sin_ruedas||[];if(r==="rodado"&&i>400||r==="pivoteo"&&i>80||r==="arrastrar"&&i>25)return"result_alto_sin_ruedas";if(!a)return null;let e=0;return n.forEach(d=>{switch(d){case"obstaculos":e+=1;break;case"sin_manillas":e+=1;break;case"piso_malo":e+=2;break;case"carga_inestable":e+=1;break;case"obstruye_vision":e+=1;break;case"carga_peligrosa":e+=1;break;case"distancia_2_10":e+=1;break;case"distancia_mas_10":e+=2;break;case"ninguno":e+=0;break}}),(r==="rodado"||r==="pivoteo"||r==="arrastrar")&&e>=2?"result_alto_sin_ruedas":"result_bajo_sin_ruedas"},b=[{id:"tipo_empuje_sin_ruedas",text:"Tipo de empuje / tracción",type:"options",group:"risk",options:[{value:"rodado",label:"Rodado"},{value:"pivoteo",label:"Pivoteo y rodado"},{value:"arrastrar",label:"Arrastrar / Halar / Deslizar"}]},{id:"peso_carga_sin_ruedas",text:"¿Cuál es el peso de la carga? (kg)",type:"number",group:"risk",placeholder:"Ej: 50"},{id:"factores_riesgo_sin_ruedas",text:"Factores de riesgo adicionales (Puedes seleccionar más de una opción)",type:"multi",group:"risk",options:[{value:"obstaculos",label:"Existen obstáculos o escalones (+1)"},{value:"sin_manillas",label:"Sin manillas / Contacto incómodo (+1)"},{value:"piso_malo",label:"Superficie de piso en mal estado (+2)"},{value:"carga_inestable",label:"Carga inestable (+1)"},{value:"obstruye_vision",label:"Carga obstruye la visión (+1)"},{value:"carga_peligrosa",label:"Carga peligrosa al tacto (+1)"},{value:"distancia_2_10",label:"Distancia 2-10 metros (+1)"},{value:"distancia_mas_10",label:"Distancia > 10 metros (+2)"},{value:"ninguno",label:"Sin Factores de Riesgo"}]},..._,{id:"result_alto_sin_ruedas",text:"Riesgo Alto: La combinación de peso, acción y factores de riesgo supera los límites recomendados.",type:"result",color:"red"},{id:"result_bajo_sin_ruedas",text:"Riesgo Bajo: La tarea se encuentra dentro de los límites aceptables.",type:"result",color:"green"}],m={questions:b,generateClinicalReport:c,evaluateRisk:p,guideImage:"Memoria_ruedant.png"};export{m as default};
