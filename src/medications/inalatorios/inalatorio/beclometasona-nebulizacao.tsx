/**
 * Beclometasona 400 mcg/mL - Solução para Nebulização
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'beclometasona-nebulizacao',
  nome: 'Dipropionato de Beclometasona 400 mcg/mL (Solução para Nebulização)',
  nomesComerciais: ['Clenil A'],
  viaAdministracao: 'Inalatória',
  formaFarmaceutica: 'Solução para Nebulização 400 mcg/mL (flaconete 2 mL = 800 mcg)',
  classe: { nome: 'Corticosteroide inalatório' },
  categoria: 'inalatorios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '800-1600 mcg/dia (1-2 flaconetes 12/12h)',
  doseMinima: '400 mcg/dia',
  doseMaxima: '2000 mcg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: '1 flaconete (800 mcg) 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 4 anos' },
  observacoes: 'Diluir com 2-3 mL de SF 0,9%. Nebulizar por 10-15 minutos. Enxaguar a boca após uso.',
  alertas: ['Enxaguar boca após nebulização', 'Não usar em crise aguda de asma'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMcg = 800;
  if (idade && idade >= 12) doseMcg = 800;
  return {
    doseCalculada: `${doseMcg} mcg/dose`,
    volumeCalculado: '1 flaconete (2 mL)',
    unidade: 'flaconete(s)',
    intervalo: '12/12 horas',
    alertas: ['Diluir com SF 0,9%', 'Enxaguar boca após'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
