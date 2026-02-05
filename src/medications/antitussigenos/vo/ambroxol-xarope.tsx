/**
 * Ambroxol 3 mg/mL - Xarope Pediátrico
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ambroxol-xarope',
  nome: 'Ambroxol 3 mg/mL (Xarope Pediátrico)',
  nomesComerciais: ['Mucosolvan Pediátrico', 'Ambroxol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 3 mg/mL (15 mg/5 mL)',
  classe: { nome: 'Mucolítico / Expectorante' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-5 anos: 2,5 mL 8/8h | 6-12 anos: 5 mL 8/8h',
  doseMinima: '7,5 mg/dose',
  doseMaxima: '15 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0.5,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 3,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Metabólito ativo da bromexina. Estimula produção de surfactante. Aumentar ingestão hídrica.',
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
  const doseMg = volumeMl * 3;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
