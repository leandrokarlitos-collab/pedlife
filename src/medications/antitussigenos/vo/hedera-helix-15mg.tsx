/**
 * Hedera helix 15 mg/mL (Extrato de Hera) - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'hedera-helix-15mg',
  nome: 'Hedera helix 15 mg/mL (Xarope)',
  nomesComerciais: ['Abrilar Adulto', 'Hedera Helix 15 mg'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 15 mg/mL (extrato seco de folhas de hera)',
  classe: { nome: 'Expectorante / Mucolítico fitoterápico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '5-12 anos: 5 mL 8/8h | > 12 anos: 5-7,5 mL 8/8h',
  doseMinima: '5 mL/dose',
  doseMaxima: '7,5 mL/dose',
  parametrosCalculo: {
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { 
    idadeMinima: '≥ 5 anos',
    observacao: 'Apresentação adulto - usar 7 mg/mL para < 5 anos'
  },
  observacoes: `Fitoterápico com ação expectorante e broncoespasmolítica.
Apresentação adulto (concentração dobrada).
Para < 5 anos, usar apresentação de 7 mg/mL.`,
  alertas: ['Fitoterápico', 'Agitar antes de usar'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl = 5;
  let intervalo = '8/8 horas';
  
  const alertas: string[] = [];
  if (idade && idade < 5) {
    alertas.push('Para < 5 anos, preferir apresentação de 7 mg/mL');
  }
  
  if (idade && idade >= 12) {
    volumeMl = 7.5;
  } else if (idade && idade >= 5) {
    volumeMl = 5;
  }

  return {
    doseCalculada: `${volumeMl} mL`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: intervalo,
    observacoes: ['Agitar antes de usar'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
