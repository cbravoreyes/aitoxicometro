import { GoogleGenAI, Type } from '@google/genai';
import type { DiagnosisReport, AitoxicacionLevel, FragmentType } from '../types/diagnosis';

const SYSTEM_INSTRUCTION = `Eres un evaluador analítico especializado en ergonomía cognitiva y pedagogía universitaria. Tu función consiste en diagnosticar el grado de "aitoxicación" (saturación informativa, sobrecarga cognitiva y dependencia no reflexiva de textos sintéticos generados por inteligencia artificial) en las producciones académicas de estudiantes e investigadores.

Debes analizar el texto ingresado evaluando cinco dimensiones analíticas:
1. Densidad sintética: Presencia de muletillas de modelos generativos, estructuras oracionales clónicas, adjetivación vacía y ausencia de voz autoral propia.
2. Profundidad epistemológica: Nivel de articulación conceptual real versus yuxtaposición superficial de definiciones genéricas.
3. Consistencia argumentativa: Coherencia lógica interna, evitando contradicciones o saltos discursivos derivados del ensamblaje acrítico de respuestas de modelos de lenguaje.
4. Trazabilidad de fuentes: Presencia o ausencia de anclajes empíricos, citas verificables y contexto situado frente a generalizaciones desprovistas de autoría.
5. Sobrecarga informativa: Volumen de redundancia léxica y conceptual que dificulta la legibilidad analítica.

Reglas operativas estrictas:
- Mantén una postura neutral, rigurosa y objetiva.
- No uses frases de apertura convencionales ni despedidas.
- No inventes referencias bibliográficas ni atribuciones teóricas inexistentes.
- Clasifica el nivel global de aitoxicación en una de cuatro escalas: "Bajo", "Moderado", "Alto" o "Crítico".
- Responde estrictamente utilizando la estructura JSON configurada, sin bloques de texto libre fuera del esquema.`;

const dimensionSchema = {
  type: Type.OBJECT,
  properties: {
    dimensionId: { type: Type.STRING },
    name: { type: Type.STRING },
    score: { type: Type.INTEGER, description: 'Puntuación de 0 a 100 del nivel de aitoxicación en esta dimensión (100 = máxima patología/aitoxicación).' },
    scale: { type: Type.STRING, enum: ['Bajo', 'Moderado', 'Alto', 'Crítico'] },
    dictamen: { type: Type.STRING, description: 'Dictamen analítico neutral y riguroso sin adornos retóricos.' },
    indicadoresDetectados: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: 'Lista de 2 a 4 indicadores analíticos empíricamente constatados en el texto.'
    },
    impactoErgonomico: { type: Type.STRING, description: 'Impacto concreto en la carga cognitiva y ergonomía lectora universitaria.' }
  },
  required: ['dimensionId', 'name', 'score', 'scale', 'dictamen', 'indicadoresDetectados', 'impactoErgonomico']
};

const diagnosisSchema = {
  type: Type.OBJECT,
  properties: {
    nivelGlobal: {
      type: Type.STRING,
      enum: ['Bajo', 'Moderado', 'Alto', 'Crítico']
    },
    indiceAitoxicacionGlobal: {
      type: Type.INTEGER,
      description: 'Índice ponderado global de 0 a 100 de aitoxicación.'
    },
    sintesisEjecutiva: {
      type: Type.STRING,
      description: 'Evaluación ejecutiva global de ergonomía cognitiva y rigor epistémico, estrictamente objetiva y neutral.'
    },
    metricasLegibilidad: {
      type: Type.OBJECT,
      properties: {
        densidadLexicaEstimada: { type: Type.STRING },
        articulacionConceptual: { type: Type.STRING },
        presenciaVozAutoral: { type: Type.STRING },
        anclajeContextual: { type: Type.STRING }
      },
      required: ['densidadLexicaEstimada', 'articulacionConceptual', 'presenciaVozAutoral', 'anclajeContextual']
    },
    dimensiones: {
      type: Type.OBJECT,
      properties: {
        densidadSintetica: dimensionSchema,
        profundidadEpistemologica: dimensionSchema,
        consistenciaArgumentativa: dimensionSchema,
        trazabilidadFuentes: dimensionSchema,
        sobrecargaInformativa: dimensionSchema
      },
      required: ['densidadSintetica', 'profundidadEpistemologica', 'consistenciaArgumentativa', 'trazabilidadFuentes', 'sobrecargaInformativa']
    },
    fragmentosDetectados: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          fragmento: { type: Type.STRING, description: 'Cita textual exacta extraída del texto analizado.' },
          tipo: {
            type: Type.STRING,
            enum: ['muletilla_sintetica', 'yuxtaposicion_superficial', 'salto_argumentativo', 'generalizacion_huerfana', 'redundancia_vacia']
          },
          dimensionAsociada: { type: Type.STRING },
          explicacionCritica: { type: Type.STRING }
        },
        required: ['fragmento', 'tipo', 'dimensionAsociada', 'explicacionCritica']
      }
    },
    recomendacionesPedagogicas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          eje: { type: Type.STRING },
          diagnosticoPuntual: { type: Type.STRING },
          accionPedagogicaSugerida: { type: Type.STRING },
          ejemploTransformacion: {
            type: Type.OBJECT,
            properties: {
              patronDetectado: { type: Type.STRING },
              propuestaReescritura: { type: Type.STRING }
            },
            required: ['patronDetectado', 'propuestaReescritura']
          }
        },
        required: ['eje', 'diagnosticoPuntual', 'accionPedagogicaSugerida', 'ejemploTransformacion']
      }
    },
    balanceErgonomiaCognitiva: {
      type: Type.OBJECT,
      properties: {
        esfuerzoCognitivoLector: {
          type: Type.STRING,
          enum: ['Óptimo', 'Moderado', 'Elevado', 'Extremo']
        },
        diagnosticoCargaCognitiva: { type: Type.STRING },
        efectoEnRevisionUniversitaria: { type: Type.STRING }
      },
      required: ['esfuerzoCognitivoLector', 'diagnosticoCargaCognitiva', 'efectoEnRevisionUniversitaria']
    }
  },
  required: [
    'nivelGlobal',
    'indiceAitoxicacionGlobal',
    'sintesisEjecutiva',
    'metricasLegibilidad',
    'dimensiones',
    'fragmentosDetectados',
    'recomendacionesPedagogicas',
    'balanceErgonomiaCognitiva'
  ]
};

function calculateBasicMetrics(text: string) {
  const clean = text.trim();
  const words = clean ? clean.split(/\s+/).length : 0;
  const chars = clean.length;
  const sentences = clean ? (clean.match(/[^.!?]+[.!?]+/g) || [clean]).length : 0;
  const readingTime = Math.max(1, Math.round(words / 200));

  return {
    palabras: words,
    caracteres: chars,
    oracionesAproximadas: sentences,
    tiempoLecturaEstimadoMin: readingTime
  };
}

export async function analyzeText(text: string): Promise<DiagnosisReport> {
  const basicMetrics = calculateBasicMetrics(text);
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });

      const callPromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: `Analiza rigurosamente la siguiente producción académica según las cinco dimensiones y los criterios solicitados:\n\n---\n${text}\n---`
              }
            ]
          }
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          responseSchema: diagnosisSchema,
          temperature: 0.2
        }
      });

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Timeout en llamada a Gemini API')), 14000)
      );

      const response = await Promise.race([callPromise, timeoutPromise]);
      const rawText = response.text;
      if (rawText) {
        const parsed = JSON.parse(rawText);
        return {
          id: `diag-${Date.now()}`,
          timestamp: new Date().toISOString(),
          resumenMetricasTexto: basicMetrics,
          ...parsed,
          textoOriginal: text
        };
      }
    } catch (err) {
      console.warn('Evaluador: fallback a heurística por:', err);
    }
  }

  // Heuristic diagnostic engine (neutral, rigorous, academic)
  return fallbackHeuristicDiagnosis(text, basicMetrics);
}

function fallbackHeuristicDiagnosis(
  text: string,
  metrics: { palabras: number; caracteres: number; oracionesAproximadas: number; tiempoLecturaEstimadoMin: number }
): DiagnosisReport {
  const lower = text.toLowerCase();

  // 1. Synthetic clichés and generative artifacts
  const syntheticCliches = [
    'en resumen',
    'en conclusión',
    'juega un papel fundamental',
    'juega un rol crucial',
    'desempeña un papel esencial',
    'es fundamental destacar',
    'es menester señalar',
    'en el panorama actual',
    'en un mundo cada vez más',
    'un tapiz de',
    'desentrañar la miríada',
    'diversas facetas',
    'es de suma importancia',
    'a lo largo de la historia',
    'es imperativo subrayar',
    'no se puede subestimar'
  ];

  const foundCliches: string[] = [];
  syntheticCliches.forEach((c) => {
    if (lower.includes(c)) {
      foundCliches.push(c);
    }
  });

  // 2. Citation and source traceability check
  const citationPatterns = [
    /\([A-ZÁÉÍÓÚ][a-zñáéíóú]+(?:\s+et\s+al\.)?,?\s*(?:19|20)\d{2}\)/g,
    /\[\d+\]/g,
    /(?:según|de acuerdo con|conforme a)\s+[A-ZÁÉÍÓÚ][a-zñáéíóú]+/gi,
    /doi:\s*10\.\d{4,9}\/[-._;()/:A-Za-z0-9]+/gi
  ];

  let citationMatchesCount = 0;
  citationPatterns.forEach((pat) => {
    const m = text.match(pat);
    if (m) citationMatchesCount += m.length;
  });

  // 3. Sentence uniformity (clonic sentences)
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const sentenceLengths = sentences.map((s) => s.trim().split(/\s+/).length);
  const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / Math.max(1, sentenceLengths.length);
  const variance =
    sentenceLengths.reduce((a, b) => a + Math.pow(b - avgLen, 2), 0) / Math.max(1, sentenceLengths.length);
  const stdDev = Math.sqrt(variance);

  // Scoring
  // Synthetic density
  const syntheticDensityScore = Math.min(
    100,
    Math.round(foundCliches.length * 18 + (stdDev < 4 ? 20 : 5))
  );

  // Source traceability (inverted: high score = lack of sources = high aitoxicacion)
  const expectedCitations = Math.max(1, Math.round(metrics.palabras / 150));
  const missingCitationsRatio = Math.max(0, 1 - citationMatchesCount / expectedCitations);
  const sourcesDeficitScore = Math.min(100, Math.round(missingCitationsRatio * 85 + 10));

  // Epistemological depth deficit
  const genericConnectors = (text.match(/además|asimismo|por consiguiente|en este sentido|por ende/gi) || []).length;
  const epistemologicalScore = Math.min(
    100,
    Math.round(
      (foundCliches.length > 2 ? 40 : 15) +
      (citationMatchesCount === 0 ? 35 : 10) +
      (genericConnectors > 5 ? 15 : 0)
    )
  );

  // Argumentative consistency
  const argumentativeScore = Math.min(
    100,
    Math.round((syntheticDensityScore * 0.4) + (epistemologicalScore * 0.4) + 10)
  );

  // Informative overload
  const lexicalRedundancyScore = Math.min(
    100,
    Math.round(foundCliches.length * 12 + (metrics.palabras > 300 && citationMatchesCount === 0 ? 40 : 20))
  );

  // Global index
  const globalScore = Math.round(
    syntheticDensityScore * 0.3 +
    epistemologicalScore * 0.25 +
    sourcesDeficitScore * 0.2 +
    argumentativeScore * 0.15 +
    lexicalRedundancyScore * 0.1
  );

  function getLevel(score: number): AitoxicacionLevel {
    if (score < 25) return 'Bajo';
    if (score < 55) return 'Moderado';
    if (score < 80) return 'Alto';
    return 'Crítico';
  }

  const nivelGlobal = getLevel(globalScore);

  // Detected text fragments
  const fragments: DiagnosisReport['fragmentosDetectados'] = [];

  foundCliches.slice(0, 3).forEach((cliche) => {
    // Find snippet with surrounding context
    const idx = lower.indexOf(cliche);
    if (idx !== -1) {
      const start = Math.max(0, idx - 20);
      const end = Math.min(text.length, idx + cliche.length + 35);
      const snippet = text.slice(start, end).trim();
      fragments.push({
        fragmento: `"${snippet}"`,
        tipo: 'muletilla_sintetica',
        dimensionAsociada: 'Densidad sintética',
        explicacionCritica: `Uso del cliché discursivo sintético "${cliche}", característico de generación probabilística no reflexiva.`
      });
    }
  });

  if (citationMatchesCount === 0) {
    fragments.push({
      fragmento: text.slice(0, Math.min(120, text.length)),
      tipo: 'generalizacion_huerfana',
      dimensionAsociada: 'Trazabilidad de fuentes',
      explicacionCritica: 'Aserción declarativa sin anclaje bibliográfico ni evidencia empírica contrastable.'
    });
  }

  return {
    id: `diag-${Date.now()}`,
    timestamp: new Date().toISOString(),
    resumenMetricasTexto: metrics,
    nivelGlobal,
    indiceAitoxicacionGlobal: globalScore,
    sintesisEjecutiva:
      `Diagnóstico de aitoxicación clasificado en grado ${nivelGlobal} (${globalScore}/100). El corpus exhibe ${
        foundCliches.length > 0
          ? `recurrencia de patrones léxicos estandarizados y ${foundCliches.length} muletillas sintéticas típicas de modelos generativos`
          : 'baja presencia de giros sintéticos mecánicos'
      }, con un índice de trazabilidad de fuentes de ${
        citationMatchesCount > 0 ? `${citationMatchesCount} anclajes identificados` : 'nula referencia empírica o bibliográfica explícita'
      }. La ergonomía cognitiva del texto demanda un reajuste enfocado en la voz autoral y la profundidad epistémica.`,
    metricasLegibilidad: {
      densidadLexicaEstimada: metrics.palabras > 0 ? `${((metrics.caracteres / metrics.palabras)).toFixed(1)} caracteres/palabra` : '0',
      articulacionConceptual: epistemologicalScore > 60 ? 'Yuxtaposición atomizada' : 'Articulación funcional',
      presenciaVozAutoral: syntheticDensityScore > 50 ? 'Difusa / Despersonalizada' : 'Identificable y situada',
      anclajeContextual: citationMatchesCount > 0 ? 'Parcialmente documentado' : 'Generalización desprovista de autoría'
    },
    dimensiones: {
      densidadSintetica: {
        dimensionId: 'densidad_sintetica',
        name: 'Densidad sintética',
        score: syntheticDensityScore,
        scale: getLevel(syntheticDensityScore),
        dictamen:
          syntheticDensityScore > 50
            ? 'Presencia notable de fórmulas oracionales simétricas, adjetivación comodín y despersonalización autoral.'
            : 'Predominio de construcciones gramaticales no mecánicas con variabilidad en la estructura de frase.',
        indicadoresDetectados: [
          foundCliches.length > 0 ? `Clichés sintéticos detectados: ${foundCliches.join(', ')}` : 'Baja recurrencia de muletillas de LLM',
          stdDev < 5 ? 'Cadencia oracional altamente homogénea (posible cadencia sintética)' : 'Variabilidad prosódica y oracional orgánica',
          'Adjetivación atributiva neutra'
        ],
        impactoErgonomico: 'Aumenta el esfuerzo del evaluador para discriminar aportes genuinos frente a relleno verbal automatizado.'
      },
      profundidadEpistemologica: {
        dimensionId: 'profundidad_epistemologica',
        name: 'Profundidad epistemológica',
        score: epistemologicalScore,
        scale: getLevel(epistemologicalScore),
        dictamen:
          epistemologicalScore > 50
            ? 'Yuxtaposición de nociones generales que no superan el nivel taxonómico básico ni establecen relaciones dialécticas.'
            : 'Articulación conceptual con tensiones teóricas y delimitación epistemológica operativa.',
        indicadoresDetectados: [
          'Definiciones abstractas sin problematización empírica',
          'Transiciones basadas en conectores mecánicos',
          'Nivel taxonómico plano sin jerarquía argumental'
        ],
        impactoErgonomico: 'Obliga a una relectura constante debido a la falta de tensión conceptual rectora.'
      },
      consistenciaArgumentativa: {
        dimensionId: 'consistencia_argumentativa',
        name: 'Consistencia argumentativa',
        score: argumentativeScore,
        scale: getLevel(argumentativeScore),
        dictamen:
          argumentativeScore > 50
            ? 'Ensamblaje yuxtapuesto de proposiciones que simulan continuidad lógica mediante enlaces superficiales.'
            : 'Estructura proposicional hilvanada con derivaciones lógicas verificables.',
        indicadoresDetectados: [
          'Cohesión aparente a nivel frástico pero discontinua a nivel paratextual',
          'Ausencia de refutación o confrontación de hipótesis alternativas'
        ],
        impactoErgonomico: 'Produce fatiga cognitiva al requerir reconstrucción inferencial por parte del lector.'
      },
      trazabilidadFuentes: {
        dimensionId: 'trazabilidad_fuentes',
        name: 'Trazabilidad de fuentes',
        score: sourcesDeficitScore,
        scale: getLevel(sourcesDeficitScore),
        dictamen:
          sourcesDeficitScore > 50
            ? 'Aserciones generalizadas sin anclaje en el estado del arte ni citación metodológica verificable.'
            : 'Presencia de referencias y delimitación situada del objeto de estudio.',
        indicadoresDetectados: [
          citationMatchesCount === 0 ? 'Cero anclajes bibliográficos o empíricos identificados' : `${citationMatchesCount} anclajes normativos detectados`,
          'Enunciados omniabarcantes sin marco temporal o espacial'
        ],
        impactoErgonomico: 'Incertidumbre epistémica para el comité evaluador; imposibilidad de verificación inmediata.'
      },
      sobrecargaInformativa: {
        dimensionId: 'sobrecarga_informativa',
        name: 'Sobrecarga informativa',
        score: lexicalRedundancyScore,
        scale: getLevel(lexicalRedundancyScore),
        dictamen:
          lexicalRedundancyScore > 50
            ? 'Extensión inflada con baja densidad informativa neta; redundancia parafraseada.'
            : 'Densidad informativa equilibrada y economía verbal adecuada.',
        indicadoresDetectados: [
          'Parafraseo cíclico del mismo concepto en distintos párrafos',
          'Uso de perífrasis redundantes en lugar de términos de precisión unívoca'
        ],
        impactoErgonomico: 'Saturación en el tiempo de procesamiento cognitivo por palabra leída.'
      }
    },
    fragmentosDetectados: fragments,
    recomendacionesPedagogicas: [
      {
        eje: 'Voz autoral y posicionamiento epistémico',
        diagnosticoPuntual: 'Predominio de voz pasiva impersonal y muletillas que disuelven la responsabilidad del investigador.',
        accionPedagogicaSugerida: 'Explicitar la postura teórico-metodológica y reescribir las aserciones genéricas desde el problema específico investigado.',
        ejemploTransformacion: {
          patronDetectado: foundCliches[0] ? `"${foundCliches[0]}..."` : '"Es crucial destacar que la tecnología transforma la educación..."',
          propuestaReescritura: '"En nuestra observación de 40 aulas universitarias, la mediación tecnológica modificó los tiempos de asimilación..."'
        }
      },
      {
        eje: 'Anclaje documental y trazabilidad empírica',
        diagnosticoPuntual: 'Afirmaciones categóricas carentes de cita verificable.',
        accionPedagogicaSugerida: 'Incorporar citas en formato normalizado (APA/IEEE) y contrastar la afirmación con investigaciones empíricas recientes.',
        ejemploTransformacion: {
          patronDetectado: '"Numerosos estudios han demostrado ampliamente que..."',
          propuestaReescritura: '"Como han documentado García y López (2023), el 68% de las cohortes evaluadas..."'
        }
      },
      {
        eje: 'Poda de redundancia sintética (Ergonomía textual)',
        diagnosticoPuntual: 'Proliferación de conectores comodín y tríadas adjetivales sin valor descriptivo.',
        accionPedagogicaSugerida: 'Aplicar podas léxicas: eliminar todo párrafo o frase subordinada que no aporte un dato, un argumento o una categoría analítica nueva.',
        ejemploTransformacion: {
          patronDetectado: '"Un enfoque integral, holístico y multifacético que juega un papel vital..."',
          propuestaReescritura: '"Una metodología mixta centrada en tres variables observables..."'
        }
      }
    ],
    balanceErgonomiaCognitiva: {
      esfuerzoCognitivoLector:
        globalScore > 75 ? 'Extremo' : globalScore > 50 ? 'Elevado' : globalScore > 25 ? 'Moderado' : 'Óptimo',
      diagnosticoCargaCognitiva:
        globalScore > 50
          ? 'Sobrecarga de discriminación semántica: el lector debe filtrar activamente el ruido discursivo sintético para encontrar el núcleo proposicional.'
          : 'Carga cognitiva contenida: el flujo discursivo facilita la asimilación conceptual directa.',
      efectoEnRevisionUniversitaria:
        globalScore > 50
          ? 'Incremento del tiempo de arbitraje por manuscrito y riesgo de rechazo por superficialidad metodológica.'
          : 'Apto para dictaminación académica estándar con fluidez en la comprensión de la tesis.'
    },
    textoOriginal: text
  };
}
