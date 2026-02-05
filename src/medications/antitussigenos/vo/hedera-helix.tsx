/**
 * Hedera helix (Extrato de Hera) - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'hedera-helix',
  nome: 'Hedera helix 7-15 mg/mL (Xarope)',
  nomesComerciais: ['Abrilar', 'Hedera Helix'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 7 mg/mL ou 15 mg/mL (extrato seco de folhas de hera)',
  classe: { nome: 'Expectorante / Mucolítico fitoterápico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '< 1 ano: 2,5 mL 12/12h | 1-4 anos: 2,5 mL 8/8h | 5-12 anos: 5 mL 8/8h | > 12 anos: 5-7,5 mL 8/8h',
  doseMinima: '2,5 mL/dose',
  doseMaxima: '7,5 mL/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h ou 12/12h',
    dosesAoDia: 3,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: 'Lactentes' },
  observacoes: 'Fitoterápico com ação expectorante e broncoespasmolítica. Pode usar em lactentes.',
  alertas: ['Fitoterápico', 'Agitar antes de usar'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl = 5;
  let intervalo = '8/8 horas';
  if (idade !== undefined && idade < 1) {
    volumeMl = 2.5;
    intervalo = '12/12 horas';
  } else if (idade && idade >= 1 && idade < 5) {
    volumeMl = 2.5;
    intervalo = '8/8 horas';
  } else if (idade && idade >= 5 && idade < 12) {
    volumeMl = 5;
    intervalo = '8/8 horas';
  } else if (idade && idade >= 12) {
    volumeMl = 5;
    intervalo = '8/8 horas';
  }
  return {
    doseCalculada: `${volumeMl} mL`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: intervalo,
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
