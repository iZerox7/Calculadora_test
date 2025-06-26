import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { categorias } from './config/categorias';
import './index.css';

export default function App() {
  const [idCaso, setIdCaso] = useState('');
  const [cuestionario, setCuestionario] = useState('');
  const [empezado, setEmpezado] = useState(false);
  const [preguntaId, setPreguntaId] = useState(null);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [historialPreguntas, setHistorialPreguntas] = useState([]);
  const [respuestasPrevias, setRespuestasPrevias] = useState(null);

  const cuestionariosDisponibles = categoriaSeleccionada
    ? categorias[categoriaSeleccionada].cuestionarios
    : {};

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

  const colorResultado = (texto) => {
    const textoMinus = texto.toLowerCase();
    if (textoMinus.includes('no es') || textoMinus.includes('no') || textoMinus.includes('sin')) {
      return 'rgb(120, 0, 0)';
    }
    if (textoMinus.includes('ley') || textoMinus.includes('trabajo') || textoMinus.includes('trayecto')) {
      return 'green';
    }
    return 'orange';
  };

  const empezarCuestionario = () => {
    if (!idCaso.trim() || !cuestionario) {
      alert('Ingresa el ID del caso y selecciona un cuestionario.');
      return;
    }
    const primeraPreguntaId = cuestionariosDisponibles[cuestionario].preguntas[0].id;
    setEmpezado(true);
    setPreguntaId(primeraPreguntaId);
    setHistorialPreguntas([primeraPreguntaId]);
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
      if (error) alert('Error al guardar: ' + error.message);
      return;
    }

    setHistorialPreguntas(prev => [...prev, siguiente]);
    setPreguntaId(siguiente);
  };

  const volverPreguntaAnterior = () => {
    if (historialPreguntas.length <= 1) return;
    const nuevoHistorial = [...historialPreguntas];
    nuevoHistorial.pop();
    const preguntaAnterior = nuevoHistorial[nuevoHistorial.length - 1];
    setRespuestas(prev => {
      const copia = { ...prev };
      delete copia[preguntaId];
      return copia;
    });
    setHistorialPreguntas(nuevoHistorial);
    setPreguntaId(preguntaAnterior);
    setResultado(null);
  };

  const reiniciar = () => {
    setIdCaso('');
    setCuestionario('');
    setCategoriaSeleccionada('');
    setEmpezado(false);
    setPreguntaId(null);
    setRespuestas({});
    setResultado(null);
    setHistorialPreguntas([]);
    setRespuestasPrevias(null);
  };

  const cargarRespuestasPrevias = async (idCaso, cuestionario) => {
    const { data, error } = await supabase
      .from('respuestas')
      .select('*')
      .eq('id_caso', idCaso)
      .eq('cuestionario', cuestionario)
      .order('timestamp', { ascending: false })
      .limit(1);

    if (error) {
      console.error('Error al cargar respuestas previas:', error);
      return null;
    }

    return data?.[0] || null;
  };

  useEffect(() => {
    if (idCaso.trim() && cuestionario) {
      cargarRespuestasPrevias(idCaso.trim(), cuestionario).then(previas =>
        setRespuestasPrevias(previas)
      );
    } else {
      setRespuestasPrevias(null);
    }
  }, [idCaso, cuestionario]);

  const renderResumenRespuestas = () =>
    preguntas
      .filter(q => respuestas[q.id] !== undefined)
      .map(q => {
        const opcion = q.options.find(opt => opt.value === respuestas[q.id]);
        return (
          <div key={q.id} style={{ textAlign: 'left', marginBottom: '8px' }}>
            <strong>{q.text}</strong><br />
            <span>{opcion ? opcion.label : 'No respondido'}</span>
          </div>
        );
      });

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      {/* BLOQUE LATERAL IZQUIERDO */}
      <div style={{
        width: 300,
        backgroundColor: '#f9f9f9',
        border: '1px solid #ccc',
        borderRadius: 8,
        padding: 15,
        margin: 20,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        <h3>Respuestas anteriores</h3>
        {respuestasPrevias?.respuestas ? (
          <>
            {Object.entries(respuestasPrevias.respuestas).map(([id, val]) => {
              const pregunta = preguntas.find(q => q.id === id);
              const opcion = pregunta?.options.find(opt => opt.value === val);
              return (
                <div key={id} style={{ marginBottom: 10 }}>
                  <strong>{pregunta?.text || id}</strong><br />
                  <span>{opcion?.label || val}</span>
                </div>
              );
            })}

            {/* Resultado final */}
            {respuestasPrevias.resultado && (
              <div style={{ marginTop: 20 }}>
                <strong>Resultado final:</strong>
                <div style={{
                  color: colorResultado(respuestasPrevias.resultado),
                  fontWeight: 'bold',
                  marginTop: 5
                }}>
                  {respuestasPrevias.resultado}
                </div>
              </div>
            )}
          </>
        ) : (
          <p style={{ fontStyle: 'italic' }}>Sin respuestas registradas.</p>
        )}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div style={{ flex: 1, padding: 20, textAlign: 'center' }}>
        <img src="logo.png" alt="logo" className="imagen-fija" />
        <h1 className="titulo-fijo">Calculadoras de Gestión Médica</h1>

        {!empezado ? (
          <div className="card">
            {!categoriaSeleccionada ? (
              <>
                <label>Selecciona una categoría:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                  {Object.entries(categorias).map(([key, value]) => (
                    <button key={key} onClick={() => setCategoriaSeleccionada(key)} className="btn-azul">
                      {value.label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <label>Ingresa el Siniestro:</label>
                <input type="text" value={idCaso} onChange={e => setIdCaso(e.target.value)} />

                <label>Selecciona la calculadora:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
                  {Object.entries(categorias[categoriaSeleccionada].cuestionarios).map(([key, data]) => (
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

                <button
                  onClick={() => {
                    setCategoriaSeleccionada('');
                    setCuestionario('');
                    setIdCaso('');
                  }}
                  className="btn-azul"
                  style={{ backgroundColor: 'rgb(212, 45, 3)', marginTop: 10 }}
                >
                  ← Volver a selección de categorías
                </button>
              </>
            )}
          </div>
        ) : resultado ? (
          <div className="card">
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>{cuestionario}</div>
            <h2 style={{ color: colorResultado(resultado) }}>{resultado}</h2>
            <div style={{ marginTop: 20, textAlign: 'left' }}>
              <h3>Resumen de respuestas:</h3>
              {renderResumenRespuestas()}
            </div>
            <div style={{ marginTop: 20 }}>
              <button onClick={volverPreguntaAnterior} className="btn-azul" style={{ marginRight: 10 }}>
                ← Pregunta anterior
              </button>
              <button onClick={reiniciar} className="btn-azul" style={{ backgroundColor: 'rgb(46, 204, 113)' }}>
                Nuevo caso
              </button>
            </div>
          </div>
        ) : !preguntaActual ? (
          <div className="card">
            <p>Error al cargar la pregunta.</p>
            <button onClick={reiniciar} className="btn-azul">Reiniciar</button>
          </div>
        ) : (
          <div className="card">
            <div style={{ fontWeight: 'bold', marginBottom: 10 }}>{cuestionario}</div>
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
            {historialPreguntas.length > 1 && (
              <div style={{ marginTop: 20 }}>
                <button onClick={volverPreguntaAnterior} className="btn-azul" style={{ marginRight: 10 }}>
                  ← Pregunta anterior
                </button>
                <button
                  onClick={() => {
                    setCuestionario('');
                    setEmpezado(false);
                    setPreguntaId(null);
                    setRespuestas({});
                    setResultado(null);
                    setHistorialPreguntas([]);
                  }}
                  className="btn-azul"
                  style={{ backgroundColor: 'rgb(212, 45, 3)' }}
                >
                  ← Volver a selección de calculadoras
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
