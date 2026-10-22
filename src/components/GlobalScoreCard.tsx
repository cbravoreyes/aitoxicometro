import React, { useMemo } from 'react';
import {
  AlertOctagon,
  CheckCircle,
  AlertTriangle,
  Info,
  BrainCircuit,
  Share2,
  Download,
  Copy,
  Check,
  BookOpen,
  Gauge,
  Sparkles,
  Scale
} from 'lucide-react';
import type { DiagnosisReport, AitoxicacionLevel } from '../types/diagnosis';
import { calculateFleschSincero } from '../utils/readability';

interface GlobalScoreCardProps {
  report: DiagnosisReport;
  onOpenExport: () => void;
}

export const GlobalScoreCard: React.FC<GlobalScoreCardProps> = ({ report, onOpenExport }) => {
  const [copied, setCopied] = React.useState(false);

  // Cálculo del Índice de Legibilidad de Flesch-Sincero (Flesch-Szigriszt)
  const flesch = useMemo(() => {
    return calculateFleschSincero(report.textoOriginal);
  }, [report.textoOriginal]);

  const getLevelConfig = (level: AitoxicacionLevel) => {
    switch (level) {
      case 'Bajo':
        return {
          bg: 'bg-emerald-950/40',
          border: 'border-emerald-600/40',
          text: 'text-emerald-400',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          stroke: '#10b981',
          label: 'Aitoxicación Baja (Voz Autoral Sólida)',
          desc: 'Texto orgánico con articulación epistémica genuina y anclaje metodológico riguroso.'
        };
      case 'Moderado':
        return {
          bg: 'bg-amber-950/40',
          border: 'border-amber-600/40',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          stroke: '#f59e0b',
          label: 'Aitoxicación Moderada (Hibridación Parcial)',
          desc: 'Presencia intercalada de giros sintéticos y cierta dependencia de estructuras automáticas.'
        };
      case 'Alto':
        return {
          bg: 'bg-orange-950/40',
          border: 'border-orange-600/40',
          text: 'text-orange-400',
          badgeBg: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
          stroke: '#f97316',
          label: 'Aitoxicación Alta (Dependencia Sintética)',
          desc: 'Predominio de clichés generativos, oraciones clónicas y atrofia de la voz autoral propia.'
        };
      case 'Crítico':
        return {
          bg: 'bg-rose-950/40',
          border: 'border-rose-600/40',
          text: 'text-rose-400',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          stroke: '#f43f5e',
          label: 'Aitoxicación Crítica (Saturación Sintética Severa)',
          desc: 'Despersonalización extrema, vacuidad epistemológica y sobrecarga cognitiva para el lector.'
        };
    }
  };

  const config = getLevelConfig(report.nivelGlobal);
  const score = report.indiceAitoxicacionGlobal;
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Diagnóstico ergonómico cruzado: Aitoxicación vs. Legibilidad Flesch-Sincero
  const diagnosticoCruzado = useMemo(() => {
    const esAltaAitox = report.nivelGlobal === 'Alto' || report.nivelGlobal === 'Crítico';
    const esDificil = flesch.score <= 50;

    if (esAltaAitox && esDificil) {
      return {
        tipo: 'alerta-pseudocomplejidad',
        titulo: 'Pseudocomplejidad Sintética Detectada',
        colorBadge: 'bg-rose-950/60 border-rose-800 text-rose-300',
        mensaje:
          'El texto registra una legibilidad Flesch-Sincero baja/compleja generada por perífrasis artificiales, adjetivación vacía y subordinación artificiosa, en lugar de una verdadera densidad conceptual o teórica.'
      };
    }
    if (esAltaAitox && !esDificil) {
      return {
        tipo: 'alerta-vacuidad',
        titulo: 'Vacuidad y Clonicidad Sintética',
        colorBadge: 'bg-orange-950/60 border-orange-800 text-orange-300',
        mensaje:
          'La lectura superficial es fluida o sencilla según Flesch-Sincero, pero enmascara una prosa algorítmica sin problematización crítica, carente de anclaje empírico y desprovista de voz autoral situada.'
      };
    }
    if (!esAltaAitox && esDificil) {
      return {
        tipo: 'optimo-academico',
        titulo: 'Rigor y Densidad Conceptual Orgánica',
        colorBadge: 'bg-indigo-950/60 border-indigo-800 text-indigo-300',
        mensaje:
          'La dificultad sintáctica y léxica medida por Flesch-Sincero responde legítimamente a la terminología especializada y a la deliberación teórica propia del nivel universitario.'
      };
    }
    return {
      tipo: 'optimo-comunicabilidad',
      titulo: 'Alta Ergonomía y Claridad Pedagógica',
      colorBadge: 'bg-emerald-950/60 border-emerald-800 text-emerald-300',
      mensaje:
        'Excelente balance de ergonomía cognitiva: prosa limpia, accesible y comunicativa, sustentada en un discurso sin muletillas sintéticas de modelos generativos.'
    };
  }, [report.nivelGlobal, flesch.score]);

  const handleCopySummary = () => {
    const textToCopy = `[Aitoxicómetro Académico]\nNivel Global de Aitoxicación: ${report.nivelGlobal} (${report.indiceAitoxicacionGlobal}%)\nÍndice Flesch-Sincero: ${flesch.score}/100 [${flesch.nivel}]\nEsfuerzo Cognitivo: ${report.balanceErgonomiaCognitiva.esfuerzoCognitivoLector}\nSíntesis: ${report.sintesisEjecutiva}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-2xl border ${config.border} ${config.bg} p-6 shadow-2xl backdrop-blur-sm transition-all space-y-6`}>
      {/* Top Section: Radial Gauge + Level + Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
        {/* Left: Gauge + Level badge */}
        <div className="flex items-center gap-5">
          {/* Circular SVG Gauge */}
          <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="stroke-slate-800"
                strokeWidth="9"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke={config.stroke}
                strokeWidth="9"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black font-mono tracking-tight text-white">
                {score}%
              </span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                Índice
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                Diagnóstico Global
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider border ${config.badgeBg}`}
              >
                Nivel {report.nivelGlobal}
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1.5 flex items-center gap-2">
              {config.label}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
              {config.desc}
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2.5 self-end lg:self-center">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition-colors"
            title="Copiar síntesis diagnóstica con índice Flesch-Sincero"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copiado' : 'Copiar Síntesis'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-950/50 transition-all active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Informe Dictamen</span>
          </button>
        </div>
      </div>

      {/* Middle: Síntesis Ejecutiva */}
      <div className="py-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
          <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
          Dictamen Ejecutivo y Epistemológico
        </h4>
        <p className="text-sm text-slate-200 leading-relaxed font-serif bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
          {report.sintesisEjecutiva}
        </p>
      </div>

      {/* NEW COMPONENT: Índice de Legibilidad Flesch-Sincero (Ergonomía Lectora) */}
      <div className="bg-slate-950/60 border border-slate-800/90 rounded-2xl p-5 shadow-inner">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-slate-800/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-white tracking-tight">
                  Índice de Legibilidad Flesch-Sincero (Flesch-Szigriszt)
                </h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Español · Ergonomía Lectora
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Fórmula: 206.84 - (1.02 × palabras/oración) - (60 × sílabas/palabra)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-400 block font-mono">Puntuación Flesch</span>
              <span className="text-2xl font-black font-mono tracking-tight text-white">
                {flesch.score}
                <span className="text-xs font-normal text-slate-500"> / 100</span>
              </span>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-bold border uppercase tracking-wide ${flesch.colorEscala.badgeBg}`}
            >
              {flesch.nivelCorto}
            </span>
          </div>
        </div>

        {/* Visual Progress Bar for Flesch-Sincero with Academic Segments */}
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-[11px] font-mono text-slate-400">
            <span>Muy Difícil (0-30)</span>
            <span>Difícil Universitario (31-50)</span>
            <span>Moderado (51-65)</span>
            <span>Accesible (66-80)</span>
            <span>Escolar (81+)</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 relative">
            {/* Guide markers */}
            <div className="absolute left-[30%] top-0 bottom-0 w-0.5 bg-slate-700/60 z-10" title="Límite Científico/Posgrado (30)" />
            <div className="absolute left-[50%] top-0 bottom-0 w-0.5 bg-slate-700/60 z-10" title="Límite Universitario (50)" />
            <div className="absolute left-[65%] top-0 bottom-0 w-0.5 bg-slate-700/60 z-10" title="Límite Moderado (65)" />
            <div className="absolute left-[80%] top-0 bottom-0 w-0.5 bg-slate-700/60 z-10" title="Límite Accesible (80)" />

            <div
              className={`h-full rounded-full transition-all duration-700 ${flesch.colorEscala.barColor}`}
              style={{ width: `${Math.min(100, Math.max(5, flesch.score))}%` }}
            />
          </div>
        </div>

        {/* Sub-metrics Breakdown Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 text-xs font-mono">
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 text-[10px] uppercase block">Longitud oracional:</span>
            <span className="font-bold text-slate-200 text-sm">{flesch.palabrasPorOracion}</span>
            <span className="text-[10px] text-slate-400 ml-1">pal/oración</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 text-[10px] uppercase block">Densidad silábica:</span>
            <span className="font-bold text-slate-200 text-sm">{flesch.silabasPorPalabra}</span>
            <span className="text-[10px] text-slate-400 ml-1">síl/palabra</span>
          </div>
          <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800/80">
            <span className="text-slate-500 text-[10px] uppercase block">Sílabas totales:</span>
            <span className="font-bold text-slate-200 text-sm">{flesch.totalSilabas}</span>
            <span className="text-[10px] text-slate-400 ml-1">en {flesch.totalPalabras} palabras</span>
          </div>
        </div>

        {/* Ergonomic & Pedagogical Analysis of Flesch-Sincero */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {diagnosticoCruzado.titulo}
              </span>
            </div>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${diagnosticoCruzado.colorBadge}`}>
              Contraste: Aitoxicación ({report.nivelGlobal}) vs. Flesch-Sincero ({flesch.nivelCorto})
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {diagnosticoCruzado.mensaje}
          </p>

          <p className="text-[11px] text-slate-400 leading-snug pt-1 border-t border-slate-800/60">
            <strong>Relevancia pedagógica:</strong> {flesch.interpretacionErgonomica}
          </p>
        </div>
      </div>

      {/* Bottom Grid: Balance de Ergonomía Cognitiva & 4 Metadatos */}
      <div className="pt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/90">
          <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] mb-1">
            Carga Cognitiva del Lector
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`font-black text-sm ${
                report.balanceErgonomiaCognitiva.esfuerzoCognitivoLector === 'Óptimo'
                  ? 'text-emerald-400'
                  : report.balanceErgonomiaCognitiva.esfuerzoCognitivoLector === 'Moderado'
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {report.balanceErgonomiaCognitiva.esfuerzoCognitivoLector}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {report.balanceErgonomiaCognitiva.diagnosticoCargaCognitiva}
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/90">
          <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] mb-1">
            Articulación Conceptual
          </div>
          <div className="font-bold text-sm text-slate-200">
            {report.metricasLegibilidad.articulacionConceptual}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Densidad de enlaces lógicos vs. agregación desarticulada.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/90">
          <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] mb-1">
            Presencia de Voz Autoral
          </div>
          <div className="font-bold text-sm text-slate-200">
            {report.metricasLegibilidad.presenciaVozAutoral}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            Posicionamiento dialéctico propio vs. aséptica despersonalización.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/90">
          <div className="text-slate-400 uppercase tracking-wider font-semibold text-[10px] mb-1">
            Anclaje y Trazabilidad
          </div>
          <div className="font-bold text-sm text-slate-200">
            {report.metricasLegibilidad.anclajeContextual}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {report.balanceErgonomiaCognitiva.efectoEnRevisionUniversitaria}
          </p>
        </div>
      </div>
    </div>
  );
};
