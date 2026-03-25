/**
 * backfill_indicaciones.mjs
 * 
 * Rellena la columna `indicaciones` en todos los registros de tobillo
 * que aún no la tienen, usando la misma lógica que usa la app.
 * 
 * USO:
 *   1. Coloca este archivo en la raíz de tu proyecto (junto a package.json)
 *   2. Crea un archivo .env.local (o exporta las variables) con:
 *        VITE_SUPABASE_URL=https://xxxx.supabase.co
 *        VITE_SUPABASE_ANON_KEY=eyJ...
 *   3. Ejecuta:  node backfill_indicaciones.mjs
 *   4. Cuando estés conforme, cámbia DRY_RUN a false y vuelve a ejecutar.
 */

// ─── Configuración ────────────────────────────────────────────────────────────

const DRY_RUN = true; // ← Ponlo en false solo cuando hayas revisado el output

// Lee las variables de entorno de .env.local (Node no las carga automáticamente)
import { readFileSync } from 'fs';

function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    try {
      const raw = readFileSync(file, 'utf-8');
      for (const line of raw.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx === -1) continue;
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) process.env[key] = val;
      }
      console.log(`✅ Variables cargadas desde ${file}`);
      break;
    } catch {
      // archivo no existe, intenta el siguiente
    }
  }
}

loadEnv();

// const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
// const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;


const SUPABASE_URL = 'https://nraekhhvzsqqnbknkvyy.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYWVraGh2enNxcW5ia25rdnl5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDc5NTY2NCwiZXhwIjoyMDY2MzcxNjY0fQ.U3vCJj938_3wsbItso3bqpERKO9weAD2fNG3MK1IqyY';


if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}

// ─── Importar lógica del cuestionario ─────────────────────────────────────────

import {
  protocols,
  evaluateRisk,
  restTextPorCarga,
  getProtocoloEsguince1,
} from './src/questionnaires/tobilloQuestions.js';

// ─── Cliente Supabase liviano (sin SDK, usando fetch) ─────────────────────────

async function supabaseRequest(method, path, body = null) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': method === 'PATCH' ? 'return=minimal' : 'return=representation',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase error ${res.status}: ${text}`);
  }

  // PATCH con return=minimal devuelve 204 sin body
  if (res.status === 204) return null;
  return res.json();
}

// ─── Lógica de indicaciones (igual que en App.js) ─────────────────────────────

function buildIndicaciones(answers, evaluation) {
  const currentProtocol =
    evaluation.protocolId === 'protocolo_esguince_1'
      ? (getProtocoloEsguince1?.(answers) ?? protocols[evaluation.protocolId])
      : protocols[evaluation.protocolId];

  const reposoDinamico = restTextPorCarga?.(answers, evaluation.protocolId) ?? null;

  const displayedSteps = [
    ...(reposoDinamico ? [reposoDinamico] : []),
    ...(currentProtocol?.pasos ?? []),
  ];

  return displayedSteps.map((paso, i) => `${i + 1}. ${paso}`).join('\n');
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n🔍 Modo: ${DRY_RUN ? 'DRY RUN (solo lectura, sin cambios)' : '⚠️  ESCRITURA REAL'}\n`);

  // 1. Obtener todos los registros de tobillo sin indicaciones
  //    Filtra por cuestionarios que contengan "tobillo" en el nombre
// POR ESTO:

const rows = await supabaseRequest(
  'GET',
  'respuestas?select=id,id_caso,cuestionario,respuestas,resultado&indicaciones=is.null&cuestionario=eq.torsion_tobillo'
);

// // REEMPLAZA la línea de const rows por esto temporalmente:
// const rows = await supabaseRequest(
//   'GET',
//   'respuestas?select=id,id_caso,cuestionario,indicaciones&cuestionario=eq.torsion_tobillo&limit=5'
// );

// console.log('RAW response:', JSON.stringify(rows, null, 2));

  if (!rows || rows.length === 0) {
    console.log('✅ No hay registros pendientes. Todo al día.');
    return;
  }

  console.log(`📋 Registros a procesar: ${rows.length}\n`);

  let ok = 0;
  let errores = 0;

  for (const row of rows) {
    const { id, id_caso, cuestionario, resultado } = row;

    // respuestas puede venir como string (jsonb serializado) u objeto
    let answers;
    try {
    answers = typeof row.respuestas === 'string'
        ? JSON.parse(row.respuestas)
        : row.respuestas;
    } catch {
    console.warn(`  ⚠️  ID ${id} (caso ${id_caso}): respuestas no parseable, omitiendo.`);
    errores++;
    continue;
    }

    // Verificar que answers es un objeto válido con datos mínimos
    if (!answers || typeof answers !== 'object' || Object.keys(answers).length === 0) {
    console.warn(`  ⚠️  ID ${id} (caso ${id_caso}): respuestas vacías o nulas, omitiendo.`);
    errores++;
    continue;
    }

    // Reconstruir el resultado usando la misma función de evaluación
    let evaluation;
    try {
      evaluation = evaluateRisk(answers);
    } catch (e) {
      console.warn(`  ⚠️  ID ${id} (caso ${id_caso}): error en evaluateRisk — ${e.message}`);
      errores++;
      continue;
    }

    // Verificación: el resultado reconstruido debe coincidir con el guardado
    if (evaluation.text !== resultado) {
      console.warn(
        `  ⚠️  ID ${id} (caso ${id_caso}): diagnóstico no coincide.\n` +
        `       Guardado:      "${resultado}"\n` +
        `       Reconstruido:  "${evaluation.text}"\n` +
        `       → Se usará el reconstruido para generar las indicaciones.`
      );
    }

    const indicaciones = buildIndicaciones(answers, evaluation);

    console.log(`  📝 ID ${id} | Caso ${id_caso} | ${cuestionario}`);
    console.log(`       Diagnóstico: ${evaluation.text}`);
    console.log(`       Indicaciones (primeras 2 líneas):`);
    indicaciones.split('\n').slice(0, 2).forEach(l => console.log(`         ${l}`));
    console.log('');

    if (!DRY_RUN) {
      try {
        await supabaseRequest('PATCH', `respuestas?id=eq.${id}`, { indicaciones });
        ok++;
      } catch (e) {
        console.error(`  ❌ Error actualizando ID ${id}: ${e.message}`);
        errores++;
      }
    } else {
      ok++;
    }
  }

  console.log('─────────────────────────────────────────');
  if (DRY_RUN) {
    console.log(`✅ DRY RUN completado: ${ok} registros serían actualizados, ${errores} omitidos.`);
    console.log('   Cambia DRY_RUN = false y vuelve a ejecutar para aplicar los cambios.\n');
  } else {
    console.log(`✅ Backfill completado: ${ok} actualizados, ${errores} con errores.\n`);
  }
}

main().catch(e => {
  console.error('❌ Error fatal:', e);
  process.exit(1);
});
