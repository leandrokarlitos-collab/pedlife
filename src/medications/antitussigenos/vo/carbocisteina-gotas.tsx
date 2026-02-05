/**
 * Carbocisteína 50 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'carbocisteina-gotas',
  nome: 'Carbocisteína 50 mg/mL (Gotas)',
  nomesComerciais: ['Mucolitic Gotas', 'Mucofan Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 50 mg/mL (1 mL = 20 gotas)',
  classe: { nome: 'Mucolítico / Mucorregulador' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-5 anos: 10 gotas 8/8h | 5-12 anos: 20 gotas 8/8h',
  doseMinima: '10 gotas/dose',
  doseMaxima: '20 gotas/dose',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Mucorregulador que normaliza as características do muco. Aumentar ingestão hídrica.',
  alertas: ['Aumentar ingestão de líquidos', 'Não usar em < 2 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let gotas = 15;
  if (idade && idade >= 2 && idade < 5) {
    gotas = 10;
  } else if (idade && idade >= 5 && idade < 12) {
    gotas = 20;
  } else if (idade && idade >= 12) {
    gotas = 20;
  }
  const volumeMl = gotas / 20;
  const doseMg = volumeMl * 50;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
