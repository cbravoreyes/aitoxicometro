import React from 'react';
import { X, Clock, Trash2, ArrowRight, CheckCircle2, TrendingDown } from 'lucide-react';
import type { DiagnosisReport } from '../types/diagnosis';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: DiagnosisReport[];
  onSelectReport: (report: DiagnosisReport) => void;
  onClearHistory: () => void;
  currentReportId?: string;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectReport,
  onClearHistory,
  currentReportId
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-2.5">
            <Clock className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base font-bold text-white">Historial de Evaluaciones</h2>
              <p className="text-xs text-slate-400">
                {history.length} {history.length === 1 ? 'dictamen guardado' : 'dictámenes guardados'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                onClick={onClearHistory}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Borrar todo el historial"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p>Aún no hay evaluaciones previas guardadas.</p>
              <p className="mt-1 text-slate-600">Cada análisis realizado se guardará aquí automáticamente.</p>
            </div>
          ) : (
            history.map((item) => {
              const isSelected = item.id === currentReportId;
              const dateStr = new Date(item.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              });

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectReport(item);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500 shadow-md ring-1 ring-indigo-500/30'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                        item.nivelGlobal === 'Bajo'
                          ? 'bg-emerald-950/50 text-emerald-300 border-emerald-800/60'
                          : item.nivelGlobal === 'Moderado'
                          ? 'bg-amber-950/50 text-amber-300 border-amber-800/60'
                          : item.nivelGlobal === 'Alto'
                          ? 'bg-orange-950/50 text-orange-300 border-orange-800/60'
                          : 'bg-rose-950/50 text-rose-300 border-rose-800/60'
                      }`}
                    >
                      Nivel {item.nivelGlobal} ({item.indiceAitoxicacionGlobal}%)
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">{dateStr}</span>
                  </div>

                  <p className="text-xs text-slate-300 font-serif line-clamp-2 leading-relaxed">
                    "{item.textoOriginal.slice(0, 120)}..."
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[11px] text-slate-400">
                    <span>{item.resumenMetricasTexto.palabras} palabras</span>
                    <span className="text-indigo-400 flex items-center gap-1 font-medium hover:underline">
                      Cargar dictamen <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 text-[11px] text-slate-500 text-center">
          Útil para medir la des-aitoxicación progresiva de un mismo texto tras sucesivas revisiones.
        </div>
      </div>
    </div>
  );
};
