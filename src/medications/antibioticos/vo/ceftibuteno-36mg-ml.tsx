/**
 * Ceftibuteno 36 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ceftibuteno-36mg-ml',
  nome: 'Ceftibuteno 36 mg/mL',
  nomesComerciais: ['Cedax'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '9 mg/kg/dia 24/24h (máx 400 mg/dia)',
  doseMinima: '9 mg/kg/dia',
  doseMaxima: '400 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 9,
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 36,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,25 mL/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 6 meses' },
  observacoes: 'Administrar 2h antes ou 1h após refeições para melhor absorção.',
  alertas: ['Administrar longe das refeições'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 9;
  if (doseDiariaMg > 400) doseDiariaMg = 400;
  const volumeMl = doseDiariaMg / 36;
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
