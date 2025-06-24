import React, { useState } from 'react';
import { faenasCampamentosQuestions } from './questions/faenasCampamentosQuestions';
import { lumbagoQuestions } from './questions/lumbagoQuestions';
import { supabase } from './supabaseClient';
import './index.css'; // Asegúrate que esté importado el CSS

export default function App() {
  const [idCaso, setIdCaso] = useState('');
  const [cuestionario, setCuestionario] = useState('');
  const [empezado, setEmpezado] = useState(false);
  const [preguntaId, setPreguntaId] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [guardando, setGuardando] = useState(false);

const colorResultado = (texto) => {
  const textoMinus = texto.toLowerCase();

  // Si contiene palabras que indican No Ley, con prioridad
  if (
    textoMinus.includes('no es') ||
    textoMinus.includes('no') ||
    textoMinus.includes('sin')
  ) {
    return 'rgb(150, 0, 0)'; // No Ley
  }

  // Palabras que indican Ley
  if (
    textoMinus.includes('ley') ||
    textoMinus.includes('trabajo') ||
    textoMinus.includes('trayecto')
  ) {
    return 'green'; // Ley
  }

  // Si no se sabe o es intermedio
  return 'orange'; // Indefinido / pendiente
};


  const cuestionariosDisponibles = {
    faenas: {
      label: 'Faenas y Campamentos',
      preguntas: faenasCampamentosQuestions,
    },
    lumbago: {
      label: 'Lumbago',
      preguntas: lumbagoQuestions,
    },
  };

  const preguntas = cuestionariosDisponibles[cuestionario]?.preguntas || [];
  const preguntaActual = preguntas.find(q => q.id === preguntaId);

  const resultadosTexto = {
    result_trabajo: 'Resultado final: Trabajo',
    result_no_trabajo: 'Resultado final: No es trabajo',
    result_trayecto: 'Resultado final: Trayecto',
    result_no_trayecto: 'Resultado final: No es trayecto',
    result_alto: 'Riesgo alto: Califica como Ley',
    result_bajo: 'Riesgo bajo: No califica como Ley',
    result_medio: 'Riesgo medio: Evaluación adicional requerida',
    result_no_ley: 'No aplica: Menor de edad',
  };

  const empezarCuestionario = () => {
    if (!idCaso.trim() || !cuestionario) {
      alert('Ingresa el ID del caso y selecciona un cuestionario.');
      return;
    }
    setEmpezado(true);
    setPreguntaId(cuestionariosDisponibles[cuestionario].preguntas[0].id);
  };

  const responder = async (valor) => {
    const nuevasRespuestas = { ...respuestas, [preguntaId]: valor };
    setRespuestas(nuevasRespuestas);

    const siguiente = preguntaActual.next[valor];

    if (siguiente.startsWith('result_')) {
      const textoResultado = resultadosTexto[siguiente];
      setResultado(textoResultado);
      setGuardando(true);

      const { error } = await supabase.from('respuestas').insert([
        {
          id_caso: idCaso,
          cuestionario,
          respuestas: nuevasRespuestas,
          resultado: textoResultado,
        },
      ]);

      setGuardando(false);

      if (error) {
        alert('Error al guardar: ' + error.message);
      }

      return;
    }

    setPreguntaId(siguiente);
  };

  const reiniciar = () => {
    setIdCaso('');
    setCuestionario('');
    setEmpezado(false);
    setPreguntaId(null);
    setRespuestas({});
    setResultado(null);
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: 'auto',
        padding: 20,
        textAlign: 'center',
      }}
    >
      {/* Imagen fija arriba */}
      <img
        src="logo.png"
        alt="Logo"
        className="imagen-fija"
      />    

      {/* Título fijo */}
      <h1 className="titulo-fijo">Evaluación de Casos Médicos</h1>

      {!empezado ? (
        <div className="card">
          <label>ID del Caso:</label>
          <input
            type="text"
            value={idCaso}
            onChange={e => setIdCaso(e.target.value)}
            placeholder="Ej: 123456"
          />

          <label>Selecciona el Cuestionario:</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            {Object.entries(cuestionariosDisponibles).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setCuestionario(key)}
                className="btn-azul"
                style={{
                  backgroundColor: cuestionario === key ? 'rgb(32, 100, 180)' : 'rgb(52, 143, 255)',
                }}
              >
                {data.label}
              </button>
            ))}
          </div>

          <button
            onClick={empezarCuestionario}
            disabled={!idCaso.trim() || !cuestionario}
            className="btn-azul"
            style={{
              backgroundColor: (!idCaso.trim() || !cuestionario) ? '#999' : 'rgb(46, 204, 113)',
              cursor: (!idCaso.trim() || !cuestionario) ? 'not-allowed' : 'pointer',
              marginTop: 20,
            }}
          >
            Comenzar
          </button>
        </div>
      ) : resultado ? (
      <div className="card">
          <h2 style={{ color: colorResultado(resultado) }}>
            {resultado}
          </h2>
          {guardando && <p>Guardando respuestas...</p>}
          <button onClick={reiniciar} className="btn-azul" style={{ backgroundColor: 'rgb(46, 204, 113)' }}>
            Nuevo caso
          </button>
        </div>
      ) : !preguntaActual ? (
        <div className="card">
          <p>Error: no se pudo cargar la pregunta.</p>
          <button onClick={reiniciar} className="btn-azul" style={{ backgroundColor: 'rgb(46, 204, 113)' }}>
            Reiniciar
          </button>
        </div>
      ) : (
        <div className="card">
          <h2>{preguntaActual.text}</h2>
          {preguntaActual.options.map(opt => (
            <button
              key={opt.value}
              onClick={() => responder(opt.value)}
              className="btn-azul"
              disabled={guardando}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
