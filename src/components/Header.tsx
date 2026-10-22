import React from 'react';
import { BookOpen, HelpCircle, History, Sparkles, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenTheory: () => void;
  onOpenHistory: () => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTheory,
  onOpenHistory,
  historyCount
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-amber-500 p-0.5 shadow-lg shadow-indigo-950/50 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-indigo-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Aitoxicómetro Académico
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  v2.0 Epistémico
                </span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-mono tracking-tight">
              Ergonomía Cognitiva y Pedagogía Universitaria · Diagnóstico de Textos Sintéticos
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onOpenHistory}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 text-xs text-slate-300 hover:text-white transition-colors"
            title="Ver historial de evaluaciones guardadas"
          >
            <History className="w-4 h-4 text-slate-400" />
            <span className="hidden sm:inline">Historial</span>
            {historyCount > 0 && (
              <span className="bg-indigo-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenTheory}
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-indigo-500/30 bg-indigo-950/30 hover:bg-indigo-900/40 text-xs text-indigo-300 hover:text-indigo-200 transition-colors"
            title="Conocer el marco teórico de la aitoxicación y las 5 dimensiones"
          >
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Marco Conceptual</span>
          </button>
        </div>
      </div>
    </header>
  );
};
