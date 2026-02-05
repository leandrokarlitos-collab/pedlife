/**
 * Bromexina 2 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'bromexina-gotas',
  nome: 'Bromexina 2 mg/mL (Gotas)',
  nomesComerciais: ['Bisolvon Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 2 mg/mL (1 mL = 25 gotas)',
  classe: { nome: 'Mucolítico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-6 anos: 10-15 gotas 8/8h | 6-12 anos: 15-25 gotas 8/8h | > 12 anos: 25-50 gotas 8/8h',
  doseMinima: '10 gotas/dose',
  doseMaxima: '50 gotas/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 2,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Mucolítico que diminui a viscosidade do muco. Diluir em água ou suco.',
  alertas: ['Aumentar ingestão de líquidos', 'Pode diluir em água'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let gotas = 15;
  if (idade && idade >= 2 && idade < 6) {
    gotas = 12;
  } else if (idade && idade >= 6 && idade < 12) {
    gotas = 20;
  } else if (idade && idade >= 12) {
    gotas = 35;
  }
  const volumeMl = gotas / 25;
  const doseMg = volumeMl * 2;
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
