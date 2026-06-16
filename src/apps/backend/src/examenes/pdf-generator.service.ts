import PDFDocument from 'pdfkit';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfGeneratorService {
  generateExamensPdf(examenData: Array<{
    evaluacion: string;
    asignatura: string;
    preguntas: Array<{
      numero: number;
      enunciado: string;
      respuestas: Array<{
        letra: string;
        texto: string;
      }>;
    }>;
    alumnoNombre: string;
    hashAsignacion: string;
  }>): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const pdf = new PDFDocument({
        margin: 50,
        bufferPages: true,
      });

      const buffers: Buffer[] = [];
      pdf.on('data', (chunk: Buffer) => buffers.push(chunk));

      const pageHeight = pdf.page.height;
      const pageWidth = pdf.page.width;
      const footerY = pageHeight - 40;

      let examenIndex = 0;
      let currentY = 60;
      const maxHeightPerExamen = 180;

      for (const examen of examenData) {
        const examenHeight = this.calculateExamenHeight(examen);

        // Si el examen no cabe en la página actual, crear nueva página
        if (currentY + examenHeight > footerY - 20) {
          pdf.addPage();
          currentY = 60;
        }

        currentY = this.drawExamen(pdf, examen, currentY, pageWidth, examenIndex + 1);
        currentY += 15; // Espaciado entre exámenes

        examenIndex++;
      }

      // Agregar footers a todas las páginas
      const pageCount = pdf.bufferedPageRange().count;
      for (let i = 0; i < pageCount; i++) {
        pdf.switchToPage(i);
        this.drawFooter(pdf, examenData[0].alumnoNombre, examenData[0].hashAsignacion, footerY);
      }

      pdf.end();

      pdf.on('end', () => resolve(Buffer.concat(buffers)));
      pdf.on('error', reject);
    });
  }

  private calculateExamenHeight(examen: any): number {
    let height = 30; // Título
    height += 10 * 2; // Evaluación y Asignatura
    height += 10 * examen.preguntas.length; // Preguntas (aproximado)
    height += examen.preguntas.reduce((sum: number, p: any) => sum + p.respuestas.length * 8, 0); // Respuestas
    return height;
  }

  private drawExamen(
    pdf: any,
    examen: any,
    startY: number,
    pageWidth: number,
    numero: number,
  ): number {
    let y = startY;

    // Encabezado del examen
    pdf
      .fontSize(12)
      .font('Helvetica-Bold')
      .text(`EXAMEN ${numero}`, { align: 'center' })
      .moveDown(0.3);

    y += 20;

    pdf
      .fontSize(9)
      .font('Helvetica')
      .text(`Evaluación: ${examen.evaluacion} | Asignatura: ${examen.asignatura}`, {
        align: 'center',
      })
      .moveDown(0.3);

    y += 12;

    // Preguntas
    for (const pregunta of examen.preguntas) {
      pdf.fontSize(9).font('Helvetica-Bold').text(`${pregunta.numero}. ${pregunta.enunciado}`);
      y += 10;

      for (const respuesta of pregunta.respuestas) {
        pdf
          .fontSize(8)
          .font('Helvetica')
          .text(`  ${respuesta.letra}) ${respuesta.texto}`);
        y += 8;
      }

      y += 5; // Espaciado entre preguntas
    }

    // Línea separadora
    pdf
      .moveTo(50, y + 5)
      .lineTo(pageWidth - 50, y + 5)
      .stroke('#cccccc');

    return y + 15;
  }

  private drawFooter(
    pdf: any,
    alumnoNombre: string,
    hashAsignacion: string,
    footerY: number,
  ): void {
    const pageWidth = pdf.page.width;

    pdf.fontSize(7).font('Helvetica').fillColor('#666666');

    // Nombre a la izquierda
    pdf.text(alumnoNombre, 50, footerY, {
      width: 200,
      align: 'left',
    });

    // Hash a la derecha
    pdf.text(hashAsignacion.substring(0, 16) + '...', pageWidth - 250, footerY, {
      width: 200,
      align: 'right',
    });

    pdf.fillColor('black');
  }
}
