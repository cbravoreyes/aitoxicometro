/**
 * Utilidades para el cálculo del Índice de Legibilidad de Flesch-Sincero (Flesch-Szigriszt)
 * Adaptación al español del Flesch Reading Ease para ergonomía cognitiva y pedagogía universitaria.
 *
 * Fórmula: F = 206.84 - (1.02 * (Palabras / Oraciones)) - (60 * (Sílabas / Palabras))
 */

export interface FleschSinceroResult {
  score: number; // 0 - 100
  nivel: string;
  nivelCorto: 'Muy Difícil' | 'Difícil' | 'Moderado' | 'Fácil' | 'Muy Fácil';
  rangoAcademico: string;
  interpretacionErgonomica: string;
  totalPalabras: number;
  totalOraciones: number;
  totalSilabas: number;
  palabrasPorOracion: number;
  silabasPorPalabra: number;
  colorEscala: {
    bg: string;
    border: string;
    text: string;
    barColor: string;
    badgeBg: string;
  };
}

/**
 * Cuenta las sílabas de una palabra en español considerando
 * diptongos, triptongos y vocales con acento ortográfico disolvente de diptongo (hiatos).
 */
export function countSpanishWordSyllables(rawWord: string): number {
  const word = rawWord.toLowerCase().replace(/[^a-záéíóúüñ]/g, '');
  if (!word) return 0;
  if (word.length <= 2) return 1;

  // Letras vocálicas en español
  // Fuertes o abiertas: a, e, o, á, é, ó
  // Débiles o cerradas inacentuadas: i, u, ü, y
  // Débiles con tilde (hiato obligatorio): í, ú

  // Normalizar 'y' al final de palabra como vocal
  const normalized = word.replace(/y$/, 'i');

  // Buscar secuencias vocálicas
  // Una vocal débil con tilde (í, ú) rompe siempre el diptongo
  // Hiatos de dos vocales fuertes: a-e, a-o, e-a, e-o, o-a, o-e, etc.
  let syllables = 0;
  let i = 0;

  const isStrong = (c: string) => /[aeoáéó]/.test(c);
  const isWeakTilde = (c: string) => /[íú]/.test(c);
  const isWeak = (c: string) => /[iuüy]/.test(c);
  const isVowel = (c: string) => /[aeiouáéíóúü]/.test(c);

  while (i < normalized.length) {
    const char = normalized[i];

    if (isVowel(char)) {
      syllables++;

      const next = normalized[i + 1] || '';
      const nextNext = normalized[i + 2] || '';

      // Triptongo: Débil + Fuerte + Débil (ej: buey, a-pre-ciáis, u-ru-guay)
      if (isWeak(char) && isStrong(next) && isWeak(nextNext) && !isWeakTilde(char) && !isWeakTilde(nextNext)) {
        i += 3;
        continue;
      }

      // Diptongo: Débil + Débil (ej: ciu-dad, cui-da-do)
      if (isWeak(char) && isWeak(next) && !isWeakTilde(char) && !isWeakTilde(next)) {
        i += 2;
        continue;
      }

      // Diptongo: Débil + Fuerte (ej: pia-no, com-bi-na-ción)
      if (isWeak(char) && isStrong(next) && !isWeakTilde(char)) {
        i += 2;
        continue;
      }

      // Diptongo: Fuerte + Débil (ej: pai-sa-je, cau-sa)
      if (isStrong(char) && isWeak(next) && !isWeakTilde(next)) {
        i += 2;
        continue;
      }

      // Hiato o vocal individual
      i++;
    } else {
      i++;
    }
  }

  return Math.max(1, syllables);
}

/**
 * Calcula el Índice de Legibilidad de Flesch-Sincero (Flesch-Szigriszt) para un texto en español.
 */
export function calculateFleschSincero(text: string): FleschSinceroResult {
  const clean = text.trim();
  if (!clean) {
    return {
      score: 50,
      nivel: 'Texto no evaluable (vacío)',
      nivelCorto: 'Moderado',
      rangoAcademico: 'Sin datos',
      interpretacionErgonomica: 'Ingresa un texto para computar la métrica Flesch-Sincero.',
      totalPalabras: 0,
      totalOraciones: 0,
      totalSilabas: 0,
      palabrasPorOracion: 0,
      silabasPorPalabra: 0,
      colorEscala: {
        bg: 'bg-slate-900',
        border: 'border-slate-800',
        text: 'text-slate-400',
        barColor: 'bg-slate-600',
        badgeBg: 'bg-slate-800 text-slate-300 border-slate-700'
      }
    };
  }

  // 1. Detección de oraciones
  // Delimitadores de fin de oración: . ! ? ; o saltos de línea dobles
  const sentencesRaw = clean.split(/[.!?]+|\n{2,}/g).filter((s) => s.trim().length > 0);
  const totalOraciones = Math.max(1, sentencesRaw.length);

  // 2. Detección de palabras (excluyendo números y signos sueltos)
  const wordsRaw = clean.match(/[a-záéíóúüñA-ZÁÉÍÓÚÜÑ0-9-]+/g) || [];
  const words = wordsRaw.filter((w) => /[a-záéíóúüñA-ZÁÉÍÓÚÜÑ]/.test(w));
  const totalPalabras = Math.max(1, words.length);

  // 3. Conteo de sílabas
  let totalSilabas = 0;
  words.forEach((w) => {
    totalSilabas += countSpanishWordSyllables(w);
  });

  // 4. Parámetros del índice
  const palabrasPorOracion = totalPalabras / totalOraciones;
  const silabasPorPalabra = totalSilabas / totalPalabras;

  // Fórmula Flesch-Szigriszt / Flesch-Sincero:
  // F = 206.84 - (1.02 * (Palabras / Oraciones)) - (60 * (Sílabas / Palabras))
  const rawScore = 206.84 - (1.02 * palabrasPorOracion) - (60 * silabasPorPalabra);
  const score = Math.max(0, Math.min(100, Math.round(rawScore)));

  // 5. Interpretación cualitativa y ergomónica en el contexto universitario
  let nivel: string;
  let nivelCorto: FleschSinceroResult['nivelCorto'];
  let rangoAcademico: string;
  let interpretacionErgonomica: string;
  let colorEscala: FleschSinceroResult['colorEscala'];

  if (score <= 30) {
    nivel = 'Muy Difícil (Científico / Posgrado)';
    nivelCorto = 'Muy Difícil';
    rangoAcademico = 'Artículos de investigación, tesis doctorales y monografías de alta especialización';
    interpretacionErgonomica =
      'Alta carga intrínseca sintáctico-léxica. Periodos oracionales extensos y vocabulario denso. Exige alta capacidad de memoria de trabajo en el lector universitario.';
    colorEscala = {
      bg: 'bg-rose-950/30',
      border: 'border-rose-800/40',
      text: 'text-rose-400',
      barColor: 'bg-rose-500',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    };
  } else if (score <= 50) {
    nivel = 'Difícil (Académico Universitario)';
    nivelCorto = 'Difícil';
    rangoAcademico = 'Manuales universitarios, ensayos de grado y literatura académica canónica';
    interpretacionErgonomica =
      'Rango óptimo para la prosa académica rigurosa. Equilibrio formal entre precisión terminológica y longitud oracional sin llegar al encriptamiento.';
    colorEscala = {
      bg: 'bg-indigo-950/30',
      border: 'border-indigo-800/40',
      text: 'text-indigo-400',
      barColor: 'bg-indigo-500',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    };
  } else if (score <= 65) {
    nivel = 'Moderado (Preuniversitario / Ensayístico)';
    nivelCorto = 'Moderado';
    rangoAcademico = 'Ensayos formativos, divulgación científica y textos didácticos de grado';
    interpretacionErgonomica =
      'Fricción sintáctica baja-moderada. Facilidad de comprensión sin pérdida de rigor temático, ideal para manuales de iniciación.';
    colorEscala = {
      bg: 'bg-sky-950/30',
      border: 'border-sky-800/40',
      text: 'text-sky-400',
      barColor: 'bg-sky-500',
      badgeBg: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
    };
  } else if (score <= 80) {
    nivel = 'Fácil (Divulgación General / Accesible)';
    nivelCorto = 'Fácil';
    rangoAcademico = 'Prensa divulgativa y textos de difusión pública general';
    interpretacionErgonomica =
      'Lectura muy ágil. Si se trata de un borrador de tesis o paper formal, este valor sugiere posible dilución conceptual o falta de densidad terminológica.';
    colorEscala = {
      bg: 'bg-amber-950/30',
      border: 'border-amber-800/40',
      text: 'text-amber-400',
      barColor: 'bg-amber-500',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    };
  } else {
    nivel = 'Muy Fácil (Elemental / Escolar)';
    nivelCorto = 'Muy Fácil';
    rangoAcademico = 'Educación básica / primaria y textos de lectura recreativa';
    interpretacionErgonomica =
      'Fricción léxica mínima. Impropio para el ámbito universitario; denota simplificación sintáctica extrema o vacuidad conceptual.';
    colorEscala = {
      bg: 'bg-emerald-950/30',
      border: 'border-emerald-800/40',
      text: 'text-emerald-400',
      barColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
    };
  }

  return {
    score,
    nivel,
    nivelCorto,
    rangoAcademico,
    interpretacionErgonomica,
    totalPalabras,
    totalOraciones,
    totalSilabas,
    palabrasPorOracion: parseFloat(palabrasPorOracion.toFixed(1)),
    silabasPorPalabra: parseFloat(silabasPorPalabra.toFixed(2)),
    colorEscala
  };
}
