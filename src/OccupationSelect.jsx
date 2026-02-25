// src/OccupationSelect.jsx
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from './supabaseClient';

export function OccupationSelect({ label = "Ocupación", initialValue = null, onSelect }) {
  const [query, setQuery] = useState(initialValue?.ocupacion || "");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);

  const fetchOccupations = useCallback(async (q) => {
    if (!q || q.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    setLoading(true);

    // Si creaste la columna normalizada, usa ocupacion_norm (recomendado):
    // const { data, error } = await supabase
    //   .from('ocupaciones')
    //   .select('id, ocupacion, carga_laboral')
    //   .ilike('ocupacion_norm', `%${q.toLowerCase()}%`)
      // .order('ocupacion', { ascending: true })ñ
    //   .limit(20);

    // Si aún no tienes la columna/índice normalizados, usa ocupacion:
    const { data, error } = await supabase
      // .from('ocupaciones')
      .rpc('search_ocupaciones_v2', { q, limit_count: 50 })
      // .order('ocupacion', { ascending: true })
      // .limit(20);

    if (error) {
      console.error('Error buscando ocupaciones:', error);
      setResults([]);
      setOpen(false);
    } else {
      setResults(data || []);
      setOpen(true);
    }
    setLoading(false);
  }, []);

  // Debounce
  useEffect(() => {
    const t = setTimeout(() => fetchOccupations(query), 250);
    return () => clearTimeout(t);
  }, [query, fetchOccupations]);

  // Cerrar al click fuera
  useEffect(() => {
    const onClickOutside = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const handlePick = (row) => {
    setQuery(row.ocupacion);
    setOpen(false);
    onSelect?.(row); // { id, ocupacion, carga_laboral }
  };

  return (
    <div className="mb-4" ref={wrapRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); }}
          placeholder="Ej: operario, enfermera, administrativo..."
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          onFocus={() => { if (results.length > 0) setOpen(true); }}
        />
        {loading && (
          <div className="absolute right-2 top-2 text-xs text-gray-400">Buscando...</div>
        )}
        {open && (
          <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
            {results.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500">Sin resultados</div>
            ) : results.map(r => (
              <div
                key={r.id}
                onMouseDown={() => handlePick(r)}
                className="px-3 py-2 cursor-pointer hover:bg-blue-50 flex items-center justify-between"
              >
                <span className="text-sm text-gray-800">{r.ocupacion}</span>
                {/* <span className="text-[10px] text-gray-500 font-semibold">
                  Carga {r.carga_laboral}
                </span> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}