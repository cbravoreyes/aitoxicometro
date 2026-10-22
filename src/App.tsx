import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TextInputSection } from './components/TextInputSection';
import { GlobalScoreCard } from './components/GlobalScoreCard';
import { DimensionGrid } from './components/DimensionGrid';
import { InteractiveTextInspector } from './components/InteractiveTextInspector';
import { PedagogicalRecommendations } from './components/PedagogicalRecommendations';
import { ReportExportModal } from './components/ReportExportModal';
import { TheoryModal } from './components/TheoryModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { SAMPLE_TEXTS, type SampleText } from './data/sampleTexts';
import type { DiagnosisReport } from './types/diagnosis';
import { AlertCircle, Sparkles, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'aitoxicometro_evaluations_v1';

export default function App() {
  const [text, setText] = useState<string>(SAMPLE_TEXTS[0].content);
  const [selectedSampleId, setSelectedSampleId] = useState<string | null>(SAMPLE_TEXTS[0].id);
  const [currentReport, setCurrentReport] = useState<DiagnosisReport | null>(null);
  const [history, setHistory] = useState<DiagnosisReport[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Modals state
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      }
    } catch (e) {
      console.warn('Could not load history from localStorage', e);
    }
  }, []);

  // Save history to localStorage
  const saveToHistory = (newReport: DiagnosisReport) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== newReport.id);
      const updated = [newReport, ...filtered].slice(0, 20);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save history', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear history', e);
    }
  };

  // Perform Analysis
  const performAnalysis = async (targetText: string) => {
    if (!targetText.trim()) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: targetText })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || `Error del servidor (${response.status})`);
      }

      const report: DiagnosisReport = await response.json();
      setCurrentReport(report);
      saveToHistory(report);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setErrorMessage(err.message || 'Ocurrió un error inesperado al analizar el texto.');
    } finally {
      setIsLoading(false);
    }
  };

  // Run initial analysis on first mount with initial sample text
  useEffect(() => {
    if (!currentReport && text) {
      performAnalysis(text);
    }
  }, []);

  const handleSelectSample = (sample: SampleText) => {
    setSelectedSampleId(sample.id);
    setText(sample.content);
    performAnalysis(sample.content);
  };

  const handleTextChange = (val: string) => {
    setText(val);
    setSelectedSampleId(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Header */}
      <Header
        onOpenTheory={() => setIsTheoryOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Intro banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800/80 rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2.5 py-0.5 rounded-full inline-block mb-1">
                Evaluador Analítico Universitario
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Diagnóstico de Aitoxicación Textual y Ergonomía Cognitiva
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                Herramienta de cribado epistémico para medir la saturación informativa, la sobrecarga cognitiva y la dependencia no reflexiva de modelos generativos en producciones académicas.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setIsTheoryOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" />
                <span>Ver Criterios y 5 Dimensiones</span>
              </button>
            </div>
          </div>
        </div>

        {/* Input Text Section */}
        <TextInputSection
          text={text}
          onChangeText={handleTextChange}
          onAnalyze={() => performAnalysis(text)}
          isLoading={isLoading}
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSampleId}
        />

        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
            <div>
              <p className="font-bold">Error en la evaluación analítica:</p>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Results Sections */}
        {isLoading && !currentReport && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-sm font-semibold text-white">
              Ejecutando diagnóstico de las 5 dimensiones epistemológicas...
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Analizando densidad sintética, consistencia argumentativa y trazabilidad de fuentes
            </p>
          </div>
        )}

        {currentReport && (
          <div className="space-y-8 animate-fade-in">
            {/* Global Score & Cognitive Ergonomics */}
            <GlobalScoreCard
              report={currentReport}
              onOpenExport={() => setIsExportOpen(true)}
            />

            {/* The 5 Analytical Dimensions */}
            <DimensionGrid dimensions={currentReport.dimensiones} />

            {/* Interactive Inspector for Detected Text Fragments */}
            <InteractiveTextInspector
              originalText={currentReport.textoOriginal}
              snippets={currentReport.fragmentosDetectados}
            />

            {/* Pedagogical Recommendations & Rewrite Protocols */}
            <PedagogicalRecommendations
              recommendations={currentReport.recomendacionesPedagogicas}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-6 mt-12 text-xs text-slate-500 text-center font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>Aitoxicómetro Académico · Laboratorio de Ergonomía Cognitiva y Pedagogía Universitaria</p>
          <p className="text-slate-600">Postura neutral, objetiva y rigurosa · Escalas: Bajo · Moderado · Alto · Crítico</p>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectReport={(rep) => {
          setCurrentReport(rep);
          setText(rep.textoOriginal);
        }}
        onClearHistory={handleClearHistory}
        currentReportId={currentReport?.id}
      />

      {currentReport && (
        <ReportExportModal
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
          report={currentReport}
        />
      )}
    </div>
  );
}
