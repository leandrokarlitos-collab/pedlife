/**
 * Budesonida + Formoterol - Combinação
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'budesonida-formoterol',
  nome: 'Budesonida + Formoterol (Aerossol/Pó Inalatório)',
  nomesComerciais: ['Alenia', 'Symbicort', 'Foraseq'],
  viaAdministracao: 'Inalatória',
  formaFarmaceutica: 'Cápsula Inalatória ou Aerossol: 100+6, 200+6, 400+12 mcg',
  classe: { nome: 'Corticosteroide + Beta-2 agonista de longa duração' },
  categoria: 'inalatorios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '6-11 anos: 100+6 mcg 12/12h | ≥ 12 anos: 200+6 a 400+12 mcg 12/12h',
  doseMinima: '100+6 mcg 12/12h',
  doseMaxima: '400+12 mcg 12/12h (2 inalações)',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Por idade/gravidade',
  },
  restricaoIdade: { idadeMinima: '≥ 6 anos' },
  observacoes: 'Pode ser usado como terapia de manutenção e resgate (MART). Enxaguar boca após uso.',
  alertas: ['Não usar em crise aguda isoladamente', 'Enxaguar boca após uso'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let apresentacao = '100/6 mcg';
  let inalacoes = '1 inalação';
  if (idade && idade >= 12) {
    apresentacao = '200/6 mcg';
    inalacoes = '1-2 inalações';
  }
  return {
    doseCalculada: apresentacao,
    volumeCalculado: inalacoes,
    unidade: 'inalação(ões)',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
