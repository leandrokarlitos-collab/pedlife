/**
 * Nitrofurantoína 100 mg - Cápsula
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'nitrofurantoina-100mg',
  nome: 'Nitrofurantoína 100 mg',
  nomesComerciais: ['Macrodantina'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula Oral',
  classe: { nome: 'Nitrofurano' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '5-7 mg/kg/dia 6/6h (máx 400 mg/dia)',
  doseMinima: '5 mg/kg/dia',
  doseMaxima: '400 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 6,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 1,5 mg 6/6h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Uso exclusivo para ITU. Administrar com alimentos.',
  alertas: ['Uso exclusivo para infecção urinária', 'Administrar com alimentos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 6;
  if (doseDiariaMg > 400) doseDiariaMg = 400;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const numCapsulas = dosePorTomadaMg / 100;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numCapsulas.toFixed(1)} cápsula(s)`,
    unidade: 'cápsula(s)',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
