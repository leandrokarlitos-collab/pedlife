/**
 * Cefalotina 1000 mg - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefalotina-1000mg',
  nome: 'Cefalotina 1000 mg',
  nomesComerciais: ['Keflin'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Cefalosporina (1ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para injeção ou SF 0,9%',
    volumeReconstituicao: '10 mL',
    concentracaoFinal: '100 mg/mL',
    estabilidade: '12h refrigerado',
  },
  diluicao: {
    volumeMinimo: '50 mL',
    volumeMaximo: '100 mL',
    tempoInfusao: '20-30 min',
  },
  doseUsualTexto: '80-160 mg/kg/dia 6/6h (máx 12 g/dia)',
  doseMinima: '80 mg/kg/dia',
  doseMaxima: '12000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 100,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 25 mg 6/6h',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Cefalosporina de 1ª geração. Boa cobertura para Gram-positivos.',
  alertas: ['Reação cruzada com penicilinas (~10%)'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 100;
  if (doseDiariaMg > 12000) doseDiariaMg = 12000;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = dosePorTomadaMg / 100;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mg',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
