export type AitoxicacionLevel = 'Bajo' | 'Moderado' | 'Alto' | 'Crítico';

export interface AnalyticalDimension {
  dimensionId: 'densidad_sintetica' | 'profundidad_epistemologica' | 'consistencia_argumentativa' | 'trazabilidad_fuentes' | 'sobrecarga_informativa';
  name: string;
  score: number; // 0 - 100 (100 = máxima aitoxicación / mayor patología)
  scale: AitoxicacionLevel;
  dictamen: string;
  indicadoresDetectados: string[];
  impactoErgonomico: string;
}

export type FragmentType =
  | 'muletilla_sintetica'
  | 'yuxtaposicion_superficial'
  | 'salto_argumentativo'
  | 'generalizacion_huerfana'
  | 'redundancia_vacia';

export interface TextSnippetHighlight {
  fragmento: string;
  tipo: FragmentType;
  dimensionAsociada: string;
  explicacionCritica: string;
}

export interface PedagogicalRecommendation {
  eje: string;
  diagnosticoPuntual: string;
  accionPedagogicaSugerida: string;
  ejemploTransformacion: {
    patronDetectado: string;
    propuestaReescritura: string;
  };
}

export interface DiagnosisReport {
  id: string;
  timestamp: string;
  resumenMetricasTexto: {
    palabras: number;
    caracteres: number;
    oracionesAproximadas: number;
    tiempoLecturaEstimadoMin: number;
  };
  nivelGlobal: AitoxicacionLevel;
  indiceAitoxicacionGlobal: number; // 0 - 100
  sintesisEjecutiva: string;
  metricasLegibilidad: {
    densidadLexicaEstimada: string;
    articulacionConceptual: string;
    presenciaVozAutoral: string;
    anclajeContextual: string;
  };
  dimensiones: {
    densidadSintetica: AnalyticalDimension;
    profundidadEpistemologica: AnalyticalDimension;
    consistenciaArgumentativa: AnalyticalDimension;
    trazabilidadFuentes: AnalyticalDimension;
    sobrecargaInformativa: AnalyticalDimension;
  };
  fragmentosDetectados: TextSnippetHighlight[];
  recomendacionesPedagogicas: PedagogicalRecommendation[];
  balanceErgonomiaCognitiva: {
    esfuerzoCognitivoLector: 'Óptimo' | 'Moderado' | 'Elevado' | 'Extremo';
    diagnosticoCargaCognitiva: string;
    efectoEnRevisionUniversitaria: string;
  };
  textoOriginal: string;
}
