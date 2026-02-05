/**
 * Axetilcefuroxima 250 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'axetilcefuroxima-250mg-5ml',
  nome: 'Axetilcefuroxima 250 mg/5 mL',
  nomesComerciais: ['Zinnat'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Cefalosporina (2ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '20-30 mg/kg/dia 12/12h',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '60 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 25,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1 mL (para 25 mg/kg/dia)',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'Melhor absorção com alimentos.',
  alertas: ['Administrar com alimentos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 25;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 250) * 5;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes: ['Administrar com alimentos'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
