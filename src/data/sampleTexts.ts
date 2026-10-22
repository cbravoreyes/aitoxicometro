export interface SampleText {
  id: string;
  title: string;
  category: string;
  expectedLevel: 'Alto' | 'Moderado' | 'Bajo';
  description: string;
  content: string;
}

export const SAMPLE_TEXTS: SampleText[] = [
  {
    id: 'sample-high',
    title: 'Ensayo con Alta Aitoxicación (Texto Sintético Clónico)',
    category: 'Pedagogía Universitaria / TIC',
    expectedLevel: 'Alto',
    description: 'Texto inundado de fórmulas generativas comunes, adjetivación vacía, tríadas clónicas, sin fuentes y con nula voz autoral.',
    content: `En el panorama actual de la contemporaneidad, la integración de la inteligencia artificial en la educación universitaria juega un papel fundamental y crucial. Es imperativo destacar que este fenómeno representa un tapiz multifacético de oportunidades y desafíos que transforman profundamente los paradigmas pedagógicos tradicionales.

A lo largo de la historia, las herramientas tecnológicas han moldeado el conocimiento, y en un mundo cada vez más digitalizado, los educadores deben desentrañar la miríada de implicaciones éticas y didácticas. Diversas facetas del aprendizaje se ven impactadas de manera integral y holística, fomentando un pensamiento crítico sin precedentes.

Asimismo, es menester señalar que la colaboración entre humanos y algoritmos es de suma importancia. Por consiguiente, los estudiantes pueden acceder a una personalización del aprendizaje enriquecedora, equitativa y sostenible. No se puede subestimar la relevancia de este avance en los ecosistemas académicos del siglo XXI.

En resumen, podemos concluir diciendo que el futuro de la educación superior depende de abrazar esta sinergia transformadora con responsabilidad, visión de futuro y rigor metodológico, permitiendo alcanzar nuevas fronteras del saber.`
  },
  {
    id: 'sample-moderate',
    title: 'Monografía Híbrida (Aitoxicación Moderada)',
    category: 'Ciencias Sociales / Metodología',
    expectedLevel: 'Moderado',
    description: 'Mezcla de ideas propias con injertos sintéticos; definiciones genéricas yuxtapuestas y saltos conceptuales sin articulación dialéctica.',
    content: `El análisis de la deserción estudiantil en los primeros semestres de ingeniería requiere considerar factores socioeconómicos e institucionales. Sin embargo, en el panorama contemporáneo, este fenómeno multifacético juega un rol determinante en la sostenibilidad universitaria.

Según Tinto (1975), la integración académica y social es clave para la retención. No obstante, es fundamental destacar que la motivación intrínseca y extrínseca conforma un tapiz de variables interconectadas que todo docente debe cultivar. Además, las plataformas de analítica de datos ofrecen soluciones holísticas y sinérgicas para predecir el abandono escolar temprano.

Aunque se recolectaron cuestionarios en una muestra de 120 alumnos en 2024, la literatura reciente enfatiza que la resiliencia es una cualidad esencial en el contexto formativo. Por lo tanto, es menester concluir que el acompañamiento tutorial es una piedra angular indiscutible.`
  },
  {
    id: 'sample-low',
    title: 'Artículo con Rigor Epistemológico (Baja Aitoxicación / Voz Autoral)',
    category: 'Epistemología y Educación Superior',
    expectedLevel: 'Bajo',
    description: 'Voz autoral situada, fuentes documentadas y verificables, tensión conceptual real y economía verbal ergonómica.',
    content: `Para evaluar el impacto de la mediación algorítmica en la escritura académica, examinamos 48 borradores de tesis de maestría presentados en la Universidad Nacional entre 2023 y 2024. A diferencia de las posturas tecno-optimistas que conciben al software generativo como un mero catalizador de productividad, nuestros hallazgos evidencian una atrofia en la delimitación del problema de investigación cuando el estudiante delega la formulación de hipótesis en modelos de lenguaje.

Siguiendo la crítica de Biesta (2015) sobre la "aprendificación" de la educación superior, observamos que el ensamblaje de párrafos sintéticos sustituye la tensión argumental por una prosa aséptica y pseudo-consensual. En las entrevistas en profundidad (n=14), los tesistas reconocieron recurrir a conectores de relleno para enmascarar la ausencia de datos de campo primarios.

Esta sustitución erosiona la trazabilidad epistémica: el 72% de los borradores examinados carecía de contraste entre fuentes primarias y secundarias, amparándose en aserciones omnímodas. Concluimos que la alfabetización crítica universitaria no debe centrarse en la prohibición punitiva del software, sino en la exigencia de justificación metodológica situada y defensa oral de las premisas analíticas.`
  }
];
