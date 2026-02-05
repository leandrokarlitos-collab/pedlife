/**
 * Guaifenesina 13,3 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'guaifenesina',
  nome: 'Guaifenesina 13,3 mg/mL (Xarope)',
  nomesComerciais: ['Transpulmin Xarope'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 13,3 mg/mL (66,7 mg/5 mL)',
  classe: { nome: 'Expectorante' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-5 anos: 2,5-5 mL 6/6h | 6-12 anos: 5-10 mL 6/6h | > 12 anos: 10-20 mL 6/6h',
  doseMinima: '50 mg/dose',
  doseMaxima: '400 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 13.3,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Expectorante que reduz viscosidade do muco. Aumentar ingestão hídrica.',
  alertas: ['Aumentar ingestão de líquidos', 'Não usar em tosse seca'],
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
  const doseMg = volumeMl * 13.3;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
