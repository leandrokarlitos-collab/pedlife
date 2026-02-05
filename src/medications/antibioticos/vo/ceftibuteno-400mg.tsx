/**
 * Ceftibuteno 400 mg - Cápsula
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ceftibuteno-400mg',
  nome: 'Ceftibuteno 400 mg',
  nomesComerciais: ['Cedax'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula Oral',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '9 mg/kg/dia 24/24h (máx 400 mg/dia)',
  doseMinima: '9 mg/kg/dia',
  doseMaxima: '400 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 9,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 9 mg/dia (máx 400 mg)',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 45 kg' },
  observacoes: 'Administrar 2h antes ou 1h após refeições para melhor absorção.',
  alertas: ['Administrar longe das refeições'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 9;
  if (doseDiariaMg > 400) doseDiariaMg = 400;
  const numCapsulas = doseDiariaMg / 400;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${numCapsulas.toFixed(1)} cápsula(s)`,
    unidade: 'cápsula(s)',
    intervalo: '24/24 horas',
    alertas: peso < 45 ? ['Peso < 45 kg: preferir suspensão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
