/**
 * Cefotaxima 1000 mg - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefotaxima-1000mg',
  nome: 'Cefotaxima 1000 mg',
  nomesComerciais: ['Claforan'],
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
    tempoInfusao: '20-30 min',
  },
  doseUsualTexto: '100-200 mg/kg/dia 6/6h ou 8/8h (máx 12 g/dia)',
  doseMinima: '100 mg/kg/dia',
  doseMaxima: '12000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 150,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 50 mg 8/8h',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Boa penetração no SNC. Opção para meningite bacteriana.',
  alertas: ['Reação cruzada com penicilinas (~10%)'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 150;
  if (doseDiariaMg > 12000) doseDiariaMg = 12000;
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
