import React, { useRef } from 'react';
import { FileText, Upload, Sparkles, RotateCcw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SAMPLE_TEXTS, type SampleText } from '../data/sampleTexts';

interface TextInputSectionProps {
  text: string;
  onChangeText: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  onSelectSample: (sample: SampleText) => void;
  selectedSampleId: string | null;
}

export const TextInputSection: React.FC<TextInputSectionProps> = ({
  text,
  onChangeText,
  onAnalyze,
  isLoading,
  onSelectSample,
  selectedSampleId
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.trim() ? (text.match(/[^.!?]+[.!?]+/g) || [text]).length : 0;
  const readingTime = Math.max(1, Math.round(words / 200));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        onChangeText(content);
      }
    };
    reader.readAsText(file);
    // Reset file input value
    e.target.value = '';
  };

  return (
    <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Top Banner / Sample selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Producción Académica a Diagnosticar
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Ingresa un extracto de tesis, artículo de investigación, monografía o ensayo universitario.
          </p>
        </div>

        {/* Calibration Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Muestras de calibración:
          </span>
          {SAMPLE_TEXTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedSampleId === sample.id
                  ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                  : 'bg-slate-800/80 hover:bg-slate-700/80 text-slate-300'
              }`}
              title={sample.description}
            >
              {sample.title.split('(')[0].trim()}
            </button>
          ))}
        </div>
      </div>

      {/* Text Area */}
      <div className="mt-4 relative">
        <textarea
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Pega aquí el texto académico a examinar (mínimo 40 palabras para una calibración analítica precisa de las 5 dimensiones)..."
          rows={9}
          className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/60 font-serif leading-relaxed transition-all resize-y"
        />

        {/* Action icons in bottom right or overlay */}
        {text && (
          <button
            onClick={() => onChangeText('')}
            className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-rose-300 transition-colors text-xs flex items-center gap-1"
            title="Limpiar texto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px]">Limpiar</span>
          </button>
        )}
      </div>

      {/* Metrics bar & Actions */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-slate-800/60 text-xs">
        {/* Real-time counters */}
        <div className="flex flex-wrap items-center gap-3 text-slate-400">
          <div className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800/60 font-mono">
            <span className="text-slate-500">Palabras:</span>
            <span className={`font-semibold ${words >= 40 ? 'text-slate-200' : 'text-amber-400'}`}>
              {words}
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800/60 font-mono">
            <span className="text-slate-500">Caracteres:</span>
            <span className="text-slate-300">{chars}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800/60 font-mono">
            <span className="text-slate-500">Oraciones est.:</span>
            <span className="text-slate-300">{sentences}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950/50 px-2.5 py-1 rounded-md border border-slate-800/60 font-mono">
            <span className="text-slate-500">Lectura est.:</span>
            <span className="text-slate-300">~{readingTime} min</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".txt,.md"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/50 transition-colors flex items-center gap-1.5 font-medium"
            title="Subir archivo .txt o .md"
          >
            <Upload className="w-3.5 h-3.5 text-slate-400" />
            <span>Subir Archivo</span>
          </button>

          <button
            type="button"
            onClick={onAnalyze}
            disabled={words < 15 || isLoading}
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all shadow-lg flex items-center gap-2 ${
              words < 15 || isLoading
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-950/60 active:scale-[0.98]'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Evaluando 5 Dimensiones...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-indigo-200" />
                <span>Diagnosticar Aitoxicación</span>
              </>
            )}
          </button>
        </div>
      </div>

      {words > 0 && words < 40 && (
        <div className="mt-3 flex items-center gap-2 text-xs text-amber-400/90 bg-amber-950/20 px-3 py-1.5 rounded-lg border border-amber-900/40">
          <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
          <span>Para un análisis de trazabilidad y densidad sintética estadísticamente fiable, se aconseja ingresar al menos 40 a 50 palabras.</span>
        </div>
      )}
    </section>
  );
};
