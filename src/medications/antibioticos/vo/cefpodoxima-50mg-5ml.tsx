/**
 * Cefpodoxima 50 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefpodoxima-50mg-5ml',
  nome: 'Cefpodoxima 50 mg/5 mL',
  nomesComerciais: ['Orelox'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '8-10 mg/kg/dia 12/12h',
  doseMinima: '8 mg/kg/dia',
  doseMaxima: '20 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1 mL (para 10 mg/kg/dia)',
  },
  restricaoIdade: { idadeMinima: '≥ 2 meses' },
  observacoes: 'Ingerir com alimentos.',
  alertas: ['Administrar com alimentos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 10;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 50) * 5;
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
