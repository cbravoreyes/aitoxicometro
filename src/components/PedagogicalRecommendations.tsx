import React from 'react';
import {
  GraduationCap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  XCircle,
  Lightbulb,
  CheckSquare
} from 'lucide-react';
import type { PedagogicalRecommendation } from '../types/diagnosis';

interface PedagogicalRecommendationsProps {
  recommendations: PedagogicalRecommendation[];
}

export const PedagogicalRecommendations: React.FC<PedagogicalRecommendationsProps> = ({
  recommendations
}) => {
  return (
    <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" />
            Prescripción Pedagógica y Ergonomía de Reescritura
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Estrategias docentes y analíticas para depurar la dependencia acrítica y fortalecer la voz investigadora.
          </p>
        </div>
        <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded-full self-start sm:self-auto">
          Protocolo de Des-aitoxicación
        </span>
      </div>

      {/* Grid of recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700/80 transition-all"
          >
            <div>
              {/* Eje header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-5 h-5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-xs flex items-center justify-center font-bold">
                  {idx + 1}
                </span>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {rec.eje}
                </h3>
              </div>

              {/* Diagnóstico puntual */}
              <div className="mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Problema ergonómico:
                </span>
                <p className="text-xs text-slate-300 font-serif leading-relaxed mt-0.5">
                  {rec.diagnosticoPuntual}
                </p>
              </div>

              {/* Acción pedagógica */}
              <div className="mb-4 bg-indigo-950/20 border border-indigo-900/30 p-3 rounded-lg">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1 mb-1">
                  <Lightbulb className="w-3 h-3 text-indigo-400" />
                  Acción didáctica recomendada:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-sans">
                  {rec.accionPedagogicaSugerida}
                </p>
              </div>

              {/* Before / After Transformational Example */}
              <div className="space-y-2 text-xs">
                {/* Patrón detectado */}
                <div className="bg-rose-950/30 border border-rose-900/40 p-2.5 rounded-lg">
                  <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-[10px] uppercase mb-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Patrón Aitoxicado (Evitar)</span>
                  </div>
                  <p className="text-[11px] text-rose-200/90 font-serif italic leading-relaxed">
                    {rec.ejemploTransformacion.patronDetectado}
                  </p>
                </div>

                {/* Propuesta de reescritura */}
                <div className="bg-emerald-950/30 border border-emerald-900/40 p-2.5 rounded-lg">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[10px] uppercase mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Reescritura Epistémica (Situada)</span>
                  </div>
                  <p className="text-[11px] text-emerald-200/90 font-serif italic leading-relaxed">
                    {rec.ejemploTransformacion.propuestaReescritura}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Practical revision checklist */}
      <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 mt-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5 flex items-center gap-1.5">
          <CheckSquare className="w-4 h-4 text-emerald-400" />
          Lista de Cotejo para la Reescritura Reflexiva (Estudiante e Investigador)
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
          <div className="flex items-start gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
            <span className="text-indigo-400 font-bold">1.</span>
            <span><strong>Poda de fórmulas de relleno:</strong> Suprimir tríadas adjetivales sin sustento empírico ("integral, holístico y dinámico").</span>
          </div>
          <div className="flex items-start gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
            <span className="text-indigo-400 font-bold">2.</span>
            <span><strong>Anclaje empírico directo:</strong> Cada afirmación general debe vincularse a datos de campo, corpus o cita de autor con año.</span>
          </div>
          <div className="flex items-start gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
            <span className="text-indigo-400 font-bold">3.</span>
            <span><strong>Explicitación de la voz:</strong> Explicitar el rol epistémico del autor ("En este estudio sostenemos..." vs "Es sabido que...").</span>
          </div>
          <div className="flex items-start gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
            <span className="text-indigo-400 font-bold">4.</span>
            <span><strong>Tensión dialéctica:</strong> Incluir contraejemplos, límites metodológicos y refutaciones en lugar de acuerdos universales asépticos.</span>
          </div>
        </div>
      </div>
    </section>
  );
};
