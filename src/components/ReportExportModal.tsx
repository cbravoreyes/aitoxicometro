import React, { useState } from 'react';
import { X, Copy, Check, Download, Printer, FileText } from 'lucide-react';
import type { DiagnosisReport } from '../types/diagnosis';
import { calculateFleschSincero } from '../utils/readability';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: DiagnosisReport;
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  report
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const flesch = calculateFleschSincero(report.textoOriginal);

  const generateMarkdown = () => {
    return `# INFORME DE DIAGNÓSTICO DE AITOXICACIÓN Y ERGONOMÍA COGNITIVA
Fecha de emisión: ${new Date(report.timestamp).toLocaleString()}
Identificador: ${report.id}

---

## 1. RESUMEN EJECUTIVO Y NIVEL GLOBAL
- **Nivel Global de Aitoxicación:** ${report.nivelGlobal}
- **Índice Global de Aitoxicación:** ${report.indiceAitoxicacionGlobal}% (0% = Orgánico/Riguroso, 100% = Máxima Aitoxicación)
- **Índice de Legibilidad Flesch-Sincero:** ${flesch.score}/100 [${flesch.nivel}]
- **Métricas Flesch-Sincero:** ${flesch.palabrasPorOracion} palabras/oración | ${flesch.silabasPorPalabra} sílabas/palabra (${flesch.totalSilabas} sílabas en ${flesch.totalPalabras} palabras)
- **Interpretación Flesch-Sincero:** ${flesch.interpretacionErgonomica}
- **Esfuerzo Cognitivo del Lector:** ${report.balanceErgonomiaCognitiva.esfuerzoCognitivoLector}
- **Carga Cognitiva:** ${report.balanceErgonomiaCognitiva.diagnosticoCargaCognitiva}
- **Efecto en Arbitraje:** ${report.balanceErgonomiaCognitiva.efectoEnRevisionUniversitaria}

### Síntesis Diagnóstica:
${report.sintesisEjecutiva}

---

## 2. EVALUACIÓN DE LAS 5 DIMENSIONES ANALÍTICAS

### 1. Densidad Sintética
- Puntuación: ${report.dimensiones.densidadSintetica.score}/100 [Escala: ${report.dimensiones.densidadSintetica.scale}]
- Dictamen: ${report.dimensiones.densidadSintetica.dictamen}
- Impacto Ergonómico: ${report.dimensiones.densidadSintetica.impactoErgonomico}
- Indicadores observados:
${report.dimensiones.densidadSintetica.indicadoresDetectados.map(i => `  - ${i}`).join('\n')}

### 2. Profundidad Epistemológica
- Puntuación: ${report.dimensiones.profundidadEpistemologica.score}/100 [Escala: ${report.dimensiones.profundidadEpistemologica.scale}]
- Dictamen: ${report.dimensiones.profundidadEpistemologica.dictamen}
- Impacto Ergonómico: ${report.dimensiones.profundidadEpistemologica.impactoErgonomico}
- Indicadores observados:
${report.dimensiones.profundidadEpistemologica.indicadoresDetectados.map(i => `  - ${i}`).join('\n')}

### 3. Consistencia Argumentativa
- Puntuación: ${report.dimensiones.consistenciaArgumentativa.score}/100 [Escala: ${report.dimensiones.consistenciaArgumentativa.scale}]
- Dictamen: ${report.dimensiones.consistenciaArgumentativa.dictamen}
- Impacto Ergonómico: ${report.dimensiones.consistenciaArgumentativa.impactoErgonomico}
- Indicadores observados:
${report.dimensiones.consistenciaArgumentativa.indicadoresDetectados.map(i => `  - ${i}`).join('\n')}

### 4. Trazabilidad de Fuentes
- Puntuación: ${report.dimensiones.trazabilidadFuentes.score}/100 [Escala: ${report.dimensiones.trazabilidadFuentes.scale}]
- Dictamen: ${report.dimensiones.trazabilidadFuentes.dictamen}
- Impacto Ergonómico: ${report.dimensiones.trazabilidadFuentes.impactoErgonomico}
- Indicadores observados:
${report.dimensiones.trazabilidadFuentes.indicadoresDetectados.map(i => `  - ${i}`).join('\n')}

### 5. Sobrecarga Informativa
- Puntuación: ${report.dimensiones.sobrecargaInformativa.score}/100 [Escala: ${report.dimensiones.sobrecargaInformativa.scale}]
- Dictamen: ${report.dimensiones.sobrecargaInformativa.dictamen}
- Impacto Ergonómico: ${report.dimensiones.sobrecargaInformativa.impactoErgonomico}
- Indicadores observados:
${report.dimensiones.sobrecargaInformativa.indicadoresDetectados.map(i => `  - ${i}`).join('\n')}

---

## 3. FRAGMENTOS Y EVIDENCIAS TEXTUALES
${report.fragmentosDetectados.map((f, i) => `
#### Evidencia ${i + 1}: [${f.tipo}] - ${f.dimensionAsociada}
> "${f.fragmento.replace(/^"|"$/g, '')}"
*Dictamen crítico:* ${f.explicacionCritica}
`).join('\n')}

---

## 4. PRESCRIPCIÓN PEDAGÓGICA Y RECOMENDACIONES DE REESCRITURA
${report.recomendacionesPedagogicas.map((r, i) => `
### ${i + 1}. Eje: ${r.eje}
- **Problema ergonómico:** ${r.diagnosticoPuntual}
- **Acción didáctica:** ${r.accionPedagogicaSugerida}
- **Patrón a evitar:** ${r.ejemploTransformacion.patronDetectado}
- **Propuesta situada:** ${r.ejemploTransformacion.propuestaReescritura}
`).join('\n')}

---
*Emitido por el Laboratorio de Ergonomía Cognitiva y Pedagogía Universitaria (Aitoxicómetro Académico).*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `informe-aitoxicacion-${report.id}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in no-print">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Informe Formal de Dictamen Académico
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Dictamen ID: {report.id} · Nivel {report.nivelGlobal} ({report.indiceAitoxicacionGlobal}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar Markdown'}</span>
            </button>

            <button
              onClick={handleDownloadFile}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar .md</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
              title="Imprimir informe o guardar como PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Preview */}
        <div className="p-6 overflow-y-auto font-mono text-xs text-slate-300 bg-slate-950/80 leading-relaxed whitespace-pre-wrap select-all max-h-[70vh]">
          {generateMarkdown()}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex justify-between items-center text-xs text-slate-400">
          <span>Este dictamen puede anexarse a actas de evaluación o sesiones de tutoría docente.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
