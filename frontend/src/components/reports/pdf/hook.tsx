import { EstadoUF, EstadoUFDisplay } from "@/components/domains/formulario/entidades";
import { InternosInsaltSchema } from "@/components/domains/formulario/schema";
import { useAppFormContext } from "@/components/form/hook";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Content, TDocumentDefinitions } from "pdfmake/interfaces";

export function useAssinaturaPdfButton({ nomeAcolhido, action, estado }: UseAssinaturaPdfButtonProps) {
  estado ??= EstadoUF.MG;
  const fileName = "TERMO DE RESPONSABILIDADE DE ACOLHIMENTO - " + nomeAcolhido + ' - ' + new Date().getFullYear().toString();
  pdfMake.vfs = pdfFonts.pdfMake?.vfs;
  const date = new Date();
  //action = 'download'

  const { watch, getValues } = useAppFormContext<InternosInsaltSchema>();
  const dadosAlta = watch('alta');
  const dados = watch();
  let motivoAlta = 'N/A';
  if (dadosAlta?.altaTerapeutica) {
    motivoAlta = 'Alta Terapêutica (Conclusão)';
  } else if (dadosAlta?.altaDesistencia) {
    motivoAlta = 'Desistência (Alta a pedido)';
  } else if (dadosAlta?.altaAdministrativa) {
    motivoAlta = 'Alta Administrativa (Desligamento)';
  } else if (dadosAlta?.altaAbandono) {
    motivoAlta = 'Abandono (Evasão ou fuga)';
  } else if (dadosAlta?.altaJudicial) {
    motivoAlta = 'Decisão Judiciária/Procedimento Policial';
  } else if (dadosAlta?.altaFalecimento) {
    motivoAlta = 'Falecimento';
  }

  const details: Content = [
    { text: 'TERMO DE RESPONSABILIDADE DE ACOLHIMENTO', style: 'header', alignment: 'center' },
    {
      text: [
        `Declaro que iniciei o Programa de Recuperação para tratamento da dependência química e/ou do estado de vulnerabilidade social em que me encontro no Centro de Recuperação da Missão Vida, na cidade de ${dados.cidade}, estado de ${dados.estadoUf}, no dia ${date.getDate()} de ${date.getMonth() + 1} de ${date.getFullYear()}, permanecendo no local por livre e espontânea vontade.\n\n`,
        'Declaro estar ciente que o Programa de Recuperação é de sete (7) meses e tenho direito de sair para visitas a partir dos três meses e meio (3 ½). O programa é gratuito incluindo: alimentação, internato em regime de residência transitória, assistências: médica, odontológica, psicologia e espiritual.\n\n',
        'Estou disposto a receber o acompanhamento sabendo que o mesmo se baseia em terapias ocupacionais e laborais, psicoterapias breves, convivência em grupo e espiritualidade, tendo eu ainda a disposição em cumprir os horários e regras estabelecidas pela Missão Vida.',
      ],
      style: 'body'
    },
    { text: '\n\n\n' },
    {
      columns: [
        {
          stack: [
            { text: '1ª SAÍDA', style: 'header', alignment: 'left' },
            { text: 'DATA DE SAÍDA: _____ / _____ / _____', style: 'body' },
            { text: 'DATA DE RETORNO: _____ / _____ / _____', style: 'body' },
            { text: 'VISTO DO ACOLHIDO: ___________________', style: 'body' },
            { text: 'VISTO DO OBREIRO: ____________________', style: 'body' },
            { text: 'MOTIVO: ______________________________', style: 'body' }
          ],
          width: '50%',
          margin: [0, 0, 10, 0]
        },
        //{ text: '\n\n\n' },
        {
          stack: [
            { text: '2ª SAÍDA', style: 'header', alignment: 'left' },
            { text: 'DATA DE SAÍDA: _____ / _____ / _____', style: 'body' },
            { text: 'DATA DE RETORNO: _____ / _____ / _____', style: 'body' },
            { text: 'VISTO DO ACOLHIDO: ___________________', style: 'body' },
            { text: 'VISTO DO OBREIRO: ____________________', style: 'body' },
            { text: 'MOTIVO: ______________________________', style: 'body' }
          ],
          width: '50%',
          margin: [10, 0, 0, 0]
        }
      ]
    },
    { text: '\n\n' },
    {
      columns: [
        {
          stack: [
            { text: '3ª SAÍDA', style: 'header', alignment: 'left' },
            { text: 'DATA DE SAÍDA: _____ / _____ / _____', style: 'body' },
            { text: 'DATA DE RETORNO: _____ / _____ / _____', style: 'body' },
            { text: 'VISTO DO ACOLHIDO: ___________________', style: 'body' },
            { text: 'VISTO DO OBREIRO: ____________________', style: 'body' },
            { text: 'MOTIVO: ______________________________', style: 'body' }
          ],
          width: '50%',
          margin: [0, 0, 10, 0]
        },
        {
          stack: [
            { text: '4ª SAÍDA', style: 'header', alignment: 'left' },
            { text: 'DATA DE SAÍDA: _____ / _____ / _____', style: 'body' },
            { text: 'DATA DE RETORNO: _____ / _____ / _____', style: 'body' },
            { text: 'VISTO DO ACOLHIDO: ___________________', style: 'body' },
            { text: 'VISTO DO OBREIRO: ____________________', style: 'body' },
            { text: 'MOTIVO: ______________________________', style: 'body' }
          ],
          width: '50%',
          margin: [10, 0, 0, 0]
        }
      ]
    },
    { text: '\n\n\n' },
    {
      columns: [
        {
          stack: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 230, y2: 0, lineWidth: 1 }], alignment: 'center' },
            { text: '\nAssinatura do Acolhido - Por extenso', alignment: 'center' },
          ],
          width: '50%',
          margin: [0, 0, 0, 0],
          alignment: 'left'
        },
        {
          stack: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 230, y2: 0, lineWidth: 1 }], alignment: 'center' },
            { text: '\nAssinatura do obreiro responsável pelo acolhimento', alignment: 'center' },
          ],
          //[left, top, right, bottom]
          width: '50%',
          margin: [0, 0, 0, 0],
          alignment: 'right'
        }
      ],
      columnGap: 150,
      margin: [10, 0, 10, 0],
      alignment: 'center'
    },
    { text: '\n\n\n\n' },
    { text: 'TERMO DE ALTA DO ACOLHIDO', style: 'header', alignment: 'center' },
    {
      text: [
        `Nome: ${getValues('name') ?? 'N/A'}\n`,
        `Motivo da Alta: ${motivoAlta}\n`,
        `Justificativa: ${dadosAlta?.justificativaAlta ?? 'N/A'}\n`,
        `Núcleo: ${dadosAlta?.nucleoAlta ?? 'N/A'}\n`,
        `Data: ${dadosAlta?.dataAlta ?? 'N/A'}\n`,
      ],
      style: 'body'
    },
    { text: '\n\n\n' },
    {
      columns: [
        {
          stack: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }], alignment: 'left' },
            { text: '\nAssinatura do Acolhido - Por extenso', alignment: 'center' },
          ],
          width: '50%',
          margin: [0, 0, 0, 0],
          alignment: 'left'
        },
        {
          stack: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }], alignment: 'right' },
            { text: '\nAssinatura do Coordenador do Núcleo', alignment: 'center' },
          ],
          width: '50%',
          margin: [0, 0, 0, 0],
          alignment: 'right'
        }
      ],
      columnGap: 150,
      alignment: 'center'
    },
    {
      stack: [
        { text: '\n\n\n' },
        { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }], alignment: 'center' },
        { text: '\nObreiro responsável pelo desligamento', alignment: 'center' }
      ],
      alignment: 'center'
    },

    { text: '\n\n\nEm caso de evasão:', alignment: "left", style: 'header' },
    { text: '\n\n\n' },
    {
      columns: [
        {
          stack: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }], alignment: 'left' },
            { text: '\n1 - Testemunha - Em caso de evasão', alignment: 'center' },
          ],
          width: '50%',
          margin: [0, 0, 0, 0],
          alignment: 'left'
        },
        {
          stack: [
            { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 200, y2: 0, lineWidth: 1 }], alignment: 'right' },
            { text: '\n2 - Testemunha - Em caso de evasão', alignment: 'center' },
          ],
          width: '50%',
          margin: [0, 0, 0, 0],
          alignment: 'right'
        }
      ],
      columnGap: 150,
      alignment: 'center'
    },
  ];


  const docDefinitions: TDocumentDefinitions = {
    pageSize: 'A4',
    pageMargins: [40, 50, 40, 40],
    info: {
      title: fileName,
      author: 'Missão Vida'
    },
    content: details,
    styles: {
      header: { fontSize: 16, bold: true, margin: [0, 0, 0, 10] },
      body: { fontSize: 12, lineHeight: 1.5 }
    }
  };

  const generatePDF = () => {
    if (action === 'download') {
      pdfMake.createPdf(docDefinitions).download(fileName);
    } else if (action === 'open') {
      pdfMake.createPdf(docDefinitions).open();
    }
  };

  return {
    generatePDF
  };
}

export interface UseAssinaturaPdfButtonProps {
  nomeAcolhido?: string;
  action: 'open' | 'download';
  estado?: EstadoUF;
}
