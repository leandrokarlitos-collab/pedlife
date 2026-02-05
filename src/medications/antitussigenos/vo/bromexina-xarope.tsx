/**
 * Bromexina 0,8 mg/mL - Xarope Infantil
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'bromexina-xarope',
  nome: 'Bromexina 0,8 mg/mL (Xarope Infantil)',
  nomesComerciais: ['Bisolvon Xarope Infantil'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 0,8 mg/mL (4 mg/5 mL)',
  classe: { nome: 'Mucolítico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-6 anos: 2,5-5 mL 8/8h | 6-12 anos: 5-10 mL 8/8h',
  doseMinima: '2 mg/dose',
  doseMaxima: '8 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0.5,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 0.8,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Mucolítico que diminui a viscosidade do muco. Aumentar ingestão hídrica.',
  alertas: ['Aumentar ingestão de líquidos', 'Não usar em < 2 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl = 5;
  if (idade && idade >= 2 && idade < 6) {
    volumeMl = 2.5;
  } else if (idade && idade >= 6 && idade < 12) {
    volumeMl = 5;
  } else if (idade && idade >= 12) {
    volumeMl = 10;
  }
  const doseMg = volumeMl * 0.8;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
