import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { examenTemplate, ExamenTemplate } from './templates/examen.template';

@Injectable()
export class HtmlPdfGeneratorService {
  async generateExamensPdf(examenes: ExamenTemplate[]): Promise<Buffer> {
    let browser;
    try {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();
      await page.setDefaultNavigationTimeout(30000);

      let pagesHtml = '';
      for (let i = 0; i < examenes.length; i++) {
        pagesHtml += examenTemplate(examenes[i]);
      }

      const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exámenes</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @page {
      size: A4;
      margin: 2cm 2cm 2cm 2cm;
    }

    html, body {
      width: 100%;
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333;
    }

    .page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      padding: 0;
      margin: 0;
    }

    .page:last-child {
      page-break-after: avoid;
    }

    .encabezado {
      text-align: center;
      margin-bottom: 1.5rem;
      border-bottom: 2px solid #000;
      padding-bottom: 1rem;
    }

    .encabezado h1 {
      font-size: 18pt;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }

    .encabezado .info {
      font-size: 10pt;
      color: #555;
      margin-bottom: 0.3rem;
    }

    .contenido {
      margin-top: 0.5rem;
      flex: 1;
      overflow: hidden;
    }

    .pregunta {
      margin-bottom: 1rem;
      page-break-inside: avoid;
    }

    .pregunta-numero {
      font-size: 11pt;
      font-weight: bold;
      margin-bottom: 0.4rem;
      line-height: 1.3;
    }

    .opciones {
      margin-left: 1.5rem;
      margin-bottom: 0.2rem;
    }

    .opcion {
      font-size: 10pt;
      margin-bottom: 0.2rem;
      line-height: 1.2;
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #ddd;
      padding-top: 0.5rem;
      font-size: 9pt;
      color: #666;
      flex-shrink: 0;
    }

    .footer-left {
      flex: 1;
      text-align: left;
    }

    .footer-right {
      flex: 1;
      text-align: right;
    }
  </style>
</head>
<body>
  ${pagesHtml}
</body>
</html>
      `;

      await page.setContent(htmlContent, { waitUntil: 'load' });

      const pdfBuffer = await page.pdf({
        format: 'A4',
      });

      await page.close();
      await browser.close();

      return Buffer.from(pdfBuffer);
    } catch (error) {
      if (browser) {
        await browser.close().catch(() => {});
      }
      throw new InternalServerErrorException('Error generando PDF: ' + error.message);
    }
  }
}
