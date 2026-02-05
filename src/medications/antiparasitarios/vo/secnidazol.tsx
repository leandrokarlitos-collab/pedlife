/**
 * Secnidazol 30 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'secnidazol',
  nome: 'Secnidazol 30 mg/mL (Suspensão Oral)',
  nomesComerciais: ['Secnidal', 'Secnidazol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral 30 mg/mL (900 mg/30 mL)',
  classe: { nome: 'Antiprotozoário / Nitroimidazólico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Amebíase/Giardíase: 30 mg/kg dose única (máx 2 g)',
  doseMinima: '30 mg/kg',
  doseMaxima: '2000 mg (dose única)',
  parametrosCalculo: {
    doseUsualMgKg: 30,
    intervalo: 'Dose única',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 30,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 30 mg/kg',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Dose única para amebíase e giardíase. Administrar com alimentos.',
  alertas: ['Dose única', 'Administrar com alimentos', 'Evitar álcool'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 30;
  if (doseMg > 2000) doseMg = 2000;
  const volumeMl = doseMg / 30;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: 'Dose única',
    alertas: ['Evitar bebidas alcoólicas'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
