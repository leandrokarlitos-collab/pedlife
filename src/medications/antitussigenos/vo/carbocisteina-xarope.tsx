/**
 * Carbocisteína 20 mg/mL - Xarope Infantil
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'carbocisteina-xarope',
  nome: 'Carbocisteína 20 mg/mL (Xarope Infantil)',
  nomesComerciais: ['Mucolitic Xarope', 'Mucofan Xarope'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 20 mg/mL (100 mg/5 mL)',
  classe: { nome: 'Mucolítico / Mucorregulador' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-5 anos: 2,5 mL 8/8h | 5-12 anos: 5 mL 8/8h | > 12 anos: 10 mL 8/8h',
  doseMinima: '50 mg/dose',
  doseMaxima: '200 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 20,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Mucorregulador que normaliza as características do muco. Pode usar em crianças.',
  alertas: ['Aumentar ingestão de líquidos', 'Não usar em < 2 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl = 5;
  if (idade && idade >= 2 && idade < 5) {
    volumeMl = 2.5;
  } else if (idade && idade >= 5 && idade < 12) {
    volumeMl = 5;
  } else if (idade && idade >= 12) {
    volumeMl = 10;
  }
  const doseMg = volumeMl * 20;
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
