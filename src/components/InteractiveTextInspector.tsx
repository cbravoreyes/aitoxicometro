import React, { useState } from 'react';
import { Eye, AlertCircle, Sparkles, Filter, Info, CornerDownRight } from 'lucide-react';
import type { TextSnippetHighlight, FragmentType } from '../types/diagnosis';

interface InteractiveTextInspectorProps {
  originalText: string;
  snippets: TextSnippetHighlight[];
}

export const InteractiveTextInspector: React.FC<InteractiveTextInspectorProps> = ({
  originalText,
  snippets
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [activeSnippet, setActiveSnippet] = useState<TextSnippetHighlight | null>(
    snippets.length > 0 ? snippets[0] : null
  );

  const getTypeBadge = (type: FragmentType) => {
    switch (type) {
      case 'muletilla_sintetica':
        return {
          label: 'Cliché / Muletilla Sintética',
          bg: 'bg-purple-950/70 border-purple-600/60 text-purple-300',
          dot: 'bg-purple-400',
          highlight: 'bg-purple-500/25 border-b-2 border-purple-400 text-purple-100 hover:bg-purple-500/35'
        };
      case 'yuxtaposicion_superficial':
        return {
          label: 'Yuxtaposición Superficial',
          bg: 'bg-amber-950/70 border-amber-600/60 text-amber-300',
          dot: 'bg-amber-400',
          highlight: 'bg-amber-500/25 border-b-2 border-amber-400 text-amber-100 hover:bg-amber-500/35'
        };
      case 'salto_argumentativo':
        return {
          label: 'Salto Argumentativo / Inconsistencia',
          bg: 'bg-rose-950/70 border-rose-600/60 text-rose-300',
          dot: 'bg-rose-400',
          highlight: 'bg-rose-500/25 border-b-2 border-rose-400 text-rose-100 hover:bg-rose-500/35'
        };
      case 'generalizacion_huerfana':
        return {
          label: 'Generalización Huérfana de Fuente',
          bg: 'bg-orange-950/70 border-orange-600/60 text-orange-300',
          dot: 'bg-orange-400',
          highlight: 'bg-orange-500/25 border-b-2 border-orange-400 text-orange-100 hover:bg-orange-500/35'
        };
      case 'redundancia_vacia':
        return {
          label: 'Redundancia Léxica Vacía',
          bg: 'bg-sky-950/70 border-sky-600/60 text-sky-300',
          dot: 'bg-sky-400',
          highlight: 'bg-sky-500/25 border-b-2 border-sky-400 text-sky-100 hover:bg-sky-500/35'
        };
      default:
        return {
          label: 'Marcador Sintético',
          bg: 'bg-slate-800 border-slate-700 text-slate-300',
          dot: 'bg-slate-400',
          highlight: 'bg-indigo-500/20 text-indigo-200'
        };
    }
  };

  const filteredSnippets =
    selectedType === 'all'
      ? snippets
      : snippets.filter((s) => s.tipo === selectedType);

  return (
    <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-4 h-4 text-purple-400" />
            Mapeo Interactivo de Evidencias Textuales
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Explora las citas textuales exactas que denotan automatismo, vaciamiento epistémico o ruptura lógica.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedType === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Todos ({snippets.length})
          </button>
          <button
            onClick={() => setSelectedType('muletilla_sintetica')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedType === 'muletilla_sintetica'
                ? 'bg-purple-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Clichés / Muletillas
          </button>
          <button
            onClick={() => setSelectedType('generalizacion_huerfana')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              selectedType === 'generalizacion_huerfana'
                ? 'bg-orange-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Sin Fuentes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-5">
        {/* Left: Snippet list cards */}
        <div className="lg:col-span-5 space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
          {filteredSnippets.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400 bg-slate-950/40 rounded-xl border border-slate-800">
              No se detectaron fragmentos críticos para este filtro seleccionado.
            </div>
          ) : (
            filteredSnippets.map((snippet, idx) => {
              const cfg = getTypeBadge(snippet.tipo);
              const isSelected = activeSnippet === snippet;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveSnippet(snippet)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500/70 shadow-md ring-1 ring-indigo-500/40'
                      : 'bg-slate-950/50 border-slate-800/80 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${cfg.bg}`}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {snippet.dimensionAsociada}
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 font-serif italic line-clamp-2 leading-relaxed">
                    "{snippet.fragmento.replace(/^"|"$/g, '')}"
                  </p>

                  <p className="text-[11px] text-slate-400 mt-1.5 line-clamp-1 flex items-center gap-1">
                    <CornerDownRight className="w-3 h-3 text-slate-500 shrink-0" />
                    <span>{snippet.explicacionCritica}</span>
                  </p>
                </div>
              );
            })
          )}
        </div>

        {/* Right: Detailed Deep Dive Inspector */}
        <div className="lg:col-span-7 flex flex-col">
          {activeSnippet ? (
            <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        getTypeBadge(activeSnippet.tipo).dot
                      }`}
                    />
                    <span className="text-xs font-bold uppercase tracking-wider text-white">
                      Análisis Epistémico del Fragmento
                    </span>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-800/50">
                    Dimensión: {activeSnippet.dimensionAsociada}
                  </span>
                </div>

                {/* The quoted text */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                    Fragmento textual citado:
                  </span>
                  <blockquote className="text-sm text-slate-200 font-serif italic leading-relaxed border-l-2 border-indigo-500 pl-3">
                    "{activeSnippet.fragmento.replace(/^"|"$/g, '')}"
                  </blockquote>
                </div>

                {/* Critical Explanation */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Dictamen de patología cognitiva:
                  </span>
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 text-xs text-slate-300 leading-relaxed font-sans">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-200 mb-1">
                          Diagnóstico pedagógico:
                        </p>
                        <p>{activeSnippet.explicacionCritica}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom hint */}
              <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  Este patrón incrementa la fatiga en el arbitraje académico de comités de grado.
                </span>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-8 bg-slate-950/40 border border-slate-800 rounded-2xl text-xs text-slate-500">
              Selecciona un fragmento de la lista para inspeccionar su patología discursiva.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
