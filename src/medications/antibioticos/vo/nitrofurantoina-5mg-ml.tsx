/**
 * Nitrofurantoína 5 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'nitrofurantoina-5mg-ml',
  nome: 'Nitrofurantoína 5 mg/mL',
  nomesComerciais: ['Macrodantina'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: {
    nome: 'Nitrofurano',
    descricao: 'Antibiótico específico para ITU',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '5-7 mg/kg/dia 6/6h',
  doseMinima: '4 mg/kg/dia',
  doseMaxima: '8 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 4,
    doseMaxMgKg: 7,
    doseUsualMgKg: 6,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 5,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,3 mL (para 6 mg/kg/dia)',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Usar somente para ITU. Tomar com alimentos para melhor absorção.',
  alertas: ['Usar apenas para ITU', 'Pode causar coloração da urina'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 6;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = dosePorTomadaMg / 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Tomar com alimentos'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
