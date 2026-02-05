/**
 * Rifampicina 20 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'rifampicina-20mg-ml',
  nome: 'Rifampicina 20 mg/mL',
  nomesComerciais: ['Rifaldin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Rifamicina' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10-20 mg/kg/dia 12/12h ou 24/24h (máx 600 mg/dia)',
  doseMinima: '10 mg/kg/dia',
  doseMaxima: '600 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 20,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,75 mL/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Administrar em jejum. Urina, fezes e secreções ficam alaranjadas.',
  alertas: ['Administrar em jejum', 'Colore fluidos corporais de laranja', 'Múltiplas interações medicamentosas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 15;
  if (doseDiariaMg > 600) doseDiariaMg = 600;
  const volumeMl = doseDiariaMg / 20;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
