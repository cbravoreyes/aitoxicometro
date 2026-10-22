import React from 'react';
import { X, Brain, Layers, GitCommit, FileCheck, Gauge, ShieldAlert } from 'lucide-react';

interface TheoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Marco Epistemológico: Aitoxicación y Ergonomía Cognitiva</h2>
              <p className="text-xs text-slate-400">Criterios de diagnóstico para evaluación académica universitaria</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300 leading-relaxed">
          {/* Definition */}
          <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
            <h3 className="text-indigo-300 font-semibold mb-2 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-indigo-400" />
              ¿Qué es la "Aitoxicación" en el ámbito universitario?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm">
              La <strong>aitoxicación</strong> se define como el estado de <em>saturación informativa, sobrecarga cognitiva y dependencia no reflexiva de textos sintéticos</em> generados por modelos de inteligencia artificial en las producciones académicas de estudiantes e investigadores.
            </p>
            <p className="text-slate-400 text-xs mt-2">
              No atañe únicamente al plagio textual estricto, sino a la <strong>degradación epistémica</strong>: la sustitución del pensamiento dialéctico, situado y empírico por un discurso aséptico, pseudo-consensual y lleno de fórmulas probabilísticas vacías.
            </p>
          </div>

          {/* The 5 Dimensions */}
          <div>
            <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-base">
              Las 5 Dimensiones Analíticas Evaluadas
            </h3>
            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center space-x-2.5 font-semibold text-sky-400 mb-1">
                  <span className="w-6 h-6 rounded-full bg-sky-950/60 border border-sky-800 flex items-center justify-center text-xs">1</span>
                  <h4>Densidad sintética</h4>
                </div>
                <p className="text-xs text-slate-300 pl-8">
                  Detección de muletillas de modelos generativos (<em>"juega un papel fundamental", "un tapiz de...", "en resumen", "desentrañar la miríada"</em>), estructuras oracionales clónicas y simétricas, adjetivación vacía y ausencia total de voz autoral propia.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center space-x-2.5 font-semibold text-purple-400 mb-1">
                  <span className="w-6 h-6 rounded-full bg-purple-950/60 border border-purple-800 flex items-center justify-center text-xs">2</span>
                  <h4>Profundidad epistemológica</h4>
                </div>
                <p className="text-xs text-slate-300 pl-8">
                  Evaluación del grado de articulación conceptual real frente a la yuxtaposición superficial de definiciones de manual desarticuladas entre sí.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center space-x-2.5 font-semibold text-amber-400 mb-1">
                  <span className="w-6 h-6 rounded-full bg-amber-950/60 border border-amber-800 flex items-center justify-center text-xs">3</span>
                  <h4>Consistencia argumentativa</h4>
                </div>
                <p className="text-xs text-slate-300 pl-8">
                  Coherencia lógica interna, comprobando que no existan saltos discursivos ni contradicciones inadvertidas derivadas del ensamblaje tipo "collage" de respuestas de LLM.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center space-x-2.5 font-semibold text-emerald-400 mb-1">
                  <span className="w-6 h-6 rounded-full bg-emerald-950/60 border border-emerald-800 flex items-center justify-center text-xs">4</span>
                  <h4>Trazabilidad de fuentes</h4>
                </div>
                <p className="text-xs text-slate-300 pl-8">
                  Presencia o ausencia de anclajes empíricos, citas verificables en formatos estandarizados y contexto situado, frente a generalizaciones omnímodas desprovistas de autoría.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800">
                <div className="flex items-center space-x-2.5 font-semibold text-rose-400 mb-1">
                  <span className="w-6 h-6 rounded-full bg-rose-950/60 border border-rose-800 flex items-center justify-center text-xs">5</span>
                  <h4>Sobrecarga informativa</h4>
                </div>
                <p className="text-xs text-slate-300 pl-8">
                  Volumen de redundancia léxica y conceptual que fatiga al revisor, diluyendo el núcleo proposicional en perífrasis estériles.
                </p>
              </div>
            </div>
          </div>

          {/* Scales */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h4 className="font-semibold text-white mb-2 text-xs uppercase tracking-wider">Escala Global de Aitoxicación</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 rounded bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
                <span className="font-bold block">Bajo (0 - 24%)</span>
                Voz autoral situada, fuentes explícitas y articulación dialéctica.
              </div>
              <div className="p-2 rounded bg-amber-950/30 border border-amber-800/40 text-amber-300">
                <span className="font-bold block">Moderado (25 - 54%)</span>
                Hibridación parcial con clichés sintéticos y vacíos de trazabilidad.
              </div>
              <div className="p-2 rounded bg-orange-950/30 border border-orange-800/40 text-orange-300">
                <span className="font-bold block">Alto (55 - 79%)</span>
                Fuerte dependencia acrítica; primacía de fórmulas de LLM.
              </div>
              <div className="p-2 rounded bg-rose-950/30 border border-rose-800/40 text-rose-300">
                <span className="font-bold block">Crítico (80 - 100%)</span>
                Saturación sintética severa, vaciamiento epistémico y nula autoría.
              </div>
            </div>
          </div>

          {/* Flesch-Sincero Readability section */}
          <div className="bg-indigo-950/30 p-4 rounded-xl border border-indigo-800/50">
            <h4 className="font-semibold text-indigo-300 mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span>Índice Flesch-Sincero (Flesch-Szigriszt) y Ergonomía Lectora</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mide la <strong>fricción sintáctica superficial</strong> a través de la longitud oracional media y la densidad polisilábica:
              <code className="block mt-1 font-mono text-[11px] bg-slate-950/80 p-2 rounded border border-indigo-900/50 text-indigo-200">
                F = 206.84 − (1.02 × palabras/oración) − (60 × sílabas/palabra)
              </code>
            </p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              <strong>Contraste con la Aitoxicación:</strong> Permite desenmascarar la <em>pseudocomplejidad sintética</em> (textos con Flesch bajo o difícil debido a verborrea inflada de LLM sin sustancia) frente al verdadero <em>rigor conceptual universitario</em> (dificultad debida a categorías teóricas genuinas).
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
