/**
 * Ambroxol 7,5 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ambroxol-gotas',
  nome: 'Ambroxol 7,5 mg/mL (Gotas)',
  nomesComerciais: ['Mucosolvan Gotas', 'Ambroxol Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 7,5 mg/mL (1 mL = 25 gotas)',
  classe: { nome: 'Mucolítico / Expectorante' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-5 anos: 12-16 gotas 8/8h | 6-12 anos: 16-25 gotas 8/8h | > 12 anos: 25-50 gotas 8/8h',
  doseMinima: '12 gotas/dose',
  doseMaxima: '50 gotas/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0.5,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 7.5,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Metabólito ativo da bromexina. Pode diluir em água ou suco.',
  alertas: ['Aumentar ingestão de líquidos', 'Pode diluir em líquidos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let gotas = 16;
  if (idade && idade >= 2 && idade < 6) {
    gotas = 14;
  } else if (idade && idade >= 6 && idade < 12) {
    gotas = 20;
  } else if (idade && idade >= 12) {
    gotas = 35;
  }
  const volumeMl = gotas / 25;
  const doseMg = volumeMl * 7.5;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
