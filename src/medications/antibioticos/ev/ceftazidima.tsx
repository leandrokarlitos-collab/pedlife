/**
 * Ceftazidima 1 g - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ceftazidima-1g',
  nome: 'Ceftazidima 1 g',
  nomesComerciais: ['Fortaz', 'Kefadim'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para injeção ou SF 0,9%',
    volumeReconstituicao: '10 mL',
    concentracaoFinal: '100 mg/mL',
    estabilidade: '24h refrigerado',
  },
  diluicao: {
    volumeMinimo: '50 mL',
    volumeMaximo: '100 mL',
    tempoInfusao: '15-30 min',
  },
  doseUsualTexto: '100-150 mg/kg/dia 8/8h (máx 6 g/dia)',
  doseMinima: '100 mg/kg/dia',
  doseMaxima: '6000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 150,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 50 mg 8/8h',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Excelente cobertura para Pseudomonas aeruginosa. Boa penetração no SNC.',
  alertas: ['Reação cruzada com penicilinas (~10%)', 'Boa opção para Pseudomonas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 150;
  if (doseDiariaMg > 6000) doseDiariaMg = 6000;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = dosePorTomadaMg / 100;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mg',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
