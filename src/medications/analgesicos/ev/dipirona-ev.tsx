/**
 * Dipirona 500 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dipirona-500mg-ml-ev',
  nome: 'Dipirona 500 mg/mL (Solução Injetável)',
  nomesComerciais: ['Novalgina'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Analgésico / Antitérmico' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  diluicao: {
    volumeMinimo: '20 mL',
    volumeMaximo: '100 mL',
    tempoInfusao: '15-30 min',
  },
  doseUsualTexto: '15-25 mg/kg/dose EV 6/6h (máx 1 g/dose)',
  doseMinima: '15 mg/kg/dose',
  doseMaxima: '1000 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 20,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 500,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,04 mL/dose',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'EV lento (15-30 min). Risco de hipotensão se infusão rápida.',
  alertas: ['EV lento - risco de hipotensão', 'Risco de agranulocitose (raro)'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 20;
  if (doseMg > 1000) doseMg = 1000;
  const volumeMl = doseMg / 500;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    alertas: ['Diluir e infundir lentamente'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
