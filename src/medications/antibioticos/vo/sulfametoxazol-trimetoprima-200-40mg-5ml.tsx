/**
 * Sulfametoxazol + Trimetoprima 200 + 40 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'sulfametoxazol-trimetoprima-200-40mg-5ml',
  nome: 'Sulfametoxazol + Trimetoprima 200 + 40 mg/5 mL',
  nomesComerciais: ['Bactrim', 'Bactrim F'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Sulfonamida',
    descricao: 'Antibiótico para ITU e infecções respiratórias',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
  },
  doseUsualTexto: '8-12 mg/kg/dia (base trimetoprima)',
  doseMinima: '6 mg/kg/dia',
  doseMaxima: '20 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 6,
    doseMaxMgKg: 12,
    doseUsualMgKg: 8,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 40, // Trimetoprima
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1 mL (para 8 mg/kg/dia de TMP)',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 meses',
    observacao: 'Evitar em menores de 2 meses',
  },
  observacoes: 'Manter boa hidratação. Evitar exposição solar prolongada.',
  alertas: ['Evitar em menores de 2 meses', 'Risco de reações cutâneas', 'Manter hidratação'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  // Dose baseada em trimetoprima: 8 mg/kg/dia
  const doseDiariaTMP = peso * 8;
  const dosePorTomadaTMP = doseDiariaTMP / 2;
  const volumeMl = (dosePorTomadaTMP / 40) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaTMP.toFixed(0)} mg (de TMP)`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes: ['Tomar com bastante água'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
