import React from 'react';
import {
  Cpu,
  Brain,
  GitBranch,
  BookMarked,
  Activity,
  AlertCircle,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import type { AnalyticalDimension, AitoxicacionLevel } from '../types/diagnosis';

interface DimensionGridProps {
  dimensions: {
    densidadSintetica: AnalyticalDimension;
    profundidadEpistemologica: AnalyticalDimension;
    consistenciaArgumentativa: AnalyticalDimension;
    trazabilidadFuentes: AnalyticalDimension;
    sobrecargaInformativa: AnalyticalDimension;
  };
}

export const DimensionGrid: React.FC<DimensionGridProps> = ({ dimensions }) => {
  const getScaleBadge = (scale: AitoxicacionLevel) => {
    switch (scale) {
      case 'Bajo':
        return 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60';
      case 'Moderado':
        return 'bg-amber-950/60 text-amber-300 border-amber-700/60';
      case 'Alto':
        return 'bg-orange-950/60 text-orange-300 border-orange-700/60';
      case 'Crítico':
        return 'bg-rose-950/60 text-rose-300 border-rose-700/60';
    }
  };

  const getProgressColor = (score: number) => {
    if (score < 25) return 'bg-emerald-500';
    if (score < 55) return 'bg-amber-500';
    if (score < 80) return 'bg-orange-500';
    return 'bg-rose-500';
  };

  const dimensionList = [
    {
      dim: dimensions.densidadSintetica,
      icon: Cpu,
      iconColor: 'text-sky-400',
      iconBg: 'bg-sky-500/10 border-sky-500/20',
      num: '01',
      description: 'Presencia de muletillas de LLM, oraciones clónicas, adjetivación vacía y ausencia de voz autoral propia.'
    },
    {
      dim: dimensions.profundidadEpistemologica,
      icon: Brain,
      iconColor: 'text-purple-400',
      iconBg: 'bg-purple-500/10 border-purple-500/20',
      num: '02',
      description: 'Articulación conceptual dialéctica vs. yuxtaposición plana de definiciones de diccionario.'
    },
    {
      dim: dimensions.consistenciaArgumentativa,
      icon: GitBranch,
      iconColor: 'text-amber-400',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
      num: '03',
      description: 'Coherencia lógica interna; ausencia de saltos o contradicciones por ensamblaje acrítico.'
    },
    {
      dim: dimensions.trazabilidadFuentes,
      icon: BookMarked,
      iconColor: 'text-emerald-400',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
      num: '04',
      description: 'Anclajes empíricos, citas verificables y contexto situado vs. generalizaciones abstractas.'
    },
    {
      dim: dimensions.sobrecargaInformativa,
      icon: Activity,
      iconColor: 'text-rose-400',
      iconBg: 'bg-rose-500/10 border-rose-500/20',
      num: '05',
      description: 'Volumen de redundancia léxica, perífrasis decorativas y fatiga en la legibilidad analítica.'
    }
  ];

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            Desglose de las 5 Dimensiones Analíticas
          </h2>
          <p className="text-xs text-slate-400">
            Diagnóstico específico de ergonomía cognitiva y patologías textuales por dimensión.
          </p>
        </div>
        <div className="text-[11px] font-mono text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Bajo
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span> Moderado
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span> Alto
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500"></span> Crítico
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dimensionList.map(({ dim, icon: Icon, iconColor, iconBg, num, description }) => (
          <div
            key={dim.dimensionId}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-slate-700/80 transition-all shadow-lg"
          >
            <div>
              {/* Top header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center space-x-2.5">
                  <div className={`p-2 rounded-xl border ${iconBg} ${iconColor}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                      Dimensión {num}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight">{dim.name}</h3>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold uppercase border ${getScaleBadge(
                    dim.scale
                  )}`}
                >
                  {dim.scale}
                </span>
              </div>

              {/* Progress bar and score */}
              <div className="space-y-1.5 mb-3.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Patología / Aitoxicación:</span>
                  <span className="font-bold text-slate-200">{dim.score}/100</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${getProgressColor(
                      dim.score
                    )}`}
                    style={{ width: `${Math.min(100, Math.max(4, dim.score))}%` }}
                  />
                </div>
              </div>

              {/* Dictamen */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Dictamen analítico:
                </span>
                <p className="text-xs text-slate-300 font-serif leading-relaxed">{dim.dictamen}</p>
              </div>

              {/* Indicadores detectados */}
              {dim.indicadoresDetectados && dim.indicadoresDetectados.length > 0 && (
                <div className="space-y-1 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Evidencias observadas:
                  </span>
                  <ul className="space-y-1">
                    {dim.indicadoresDetectados.map((ind, i) => (
                      <li key={i} className="text-[11px] text-slate-300 flex items-start gap-1.5">
                        <span className="text-indigo-400 shrink-0 mt-0.5">•</span>
                        <span className="leading-tight">{ind}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom ergonomic impact */}
            <div className="pt-3 border-t border-slate-800/80 mt-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-0.5">
                Impacto en la ergonomía cognitiva:
              </span>
              <p className="text-[11px] text-slate-400 leading-snug">{dim.impactoErgonomico}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
