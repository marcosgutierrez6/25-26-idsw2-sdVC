export interface ExamenTemplate {
  evaluacion: string;
  asignatura: string;
  alumnoNombre: string;
  hashAsignacion: string;
  preguntas: Array<{
    numero: number;
    enunciado: string;
    respuestas: Array<{
      letra: string;
      texto: string;
    }>;
  }>;
}

export const examenTemplate = (examen: ExamenTemplate): string => {
  const preguntasHtml = examen.preguntas
    .map(
      (p) => `
    <div class="pregunta">
      <p class="pregunta-numero"><strong>${p.numero}. ${p.enunciado}</strong></p>
      <div class="opciones">
        ${p.respuestas.map((r) => `<p class="opcion">${r.letra}) ${r.texto}</p>`).join('')}
      </div>
    </div>
  `,
    )
    .join('');

  return `
<div class="page" data-alumno="${examen.alumnoNombre}" data-hash="${examen.hashAsignacion.substring(0, 16)}...">
  <div class="encabezado">
    <h1>EXAMEN</h1>
    <div class="info">Evaluación: ${examen.evaluacion}</div>
    <div class="info">Asignatura: ${examen.asignatura}</div>
  </div>

  <div class="contenido">
    ${preguntasHtml}
  </div>

  <div class="footer">
    <div class="footer-left">${examen.alumnoNombre}</div>
    <div class="footer-right">${examen.hashAsignacion.substring(0, 16)}...</div>
  </div>
</div>
  `;
};
