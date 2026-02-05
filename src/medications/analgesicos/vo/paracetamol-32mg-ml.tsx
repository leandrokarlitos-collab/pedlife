/**
 * Paracetamol 32 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'paracetamol-32mg-ml',
  nome: 'Paracetamol 32 mg/mL (Suspensão Oral)',
  nomesComerciais: ['Tylenol Criança'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral 32 mg/mL (160 mg/5 mL)',
  classe: { nome: 'Analgésico / Antitérmico' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10-15 mg/kg/dose 4/4h a 6/6h (máx 75 mg/kg/dia ou 4 g/dia)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '15 mg/kg/dose (máx 1 g/dose)',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 32,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 15 mg/kg ÷ 32 mg/mL',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Formulação para crianças maiores. Sabor agradável. Não exceder 5 doses em 24h.',
  alertas: ['Hepatotóxico em superdose', 'Máx 5 doses/dia'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 15;
  if (doseMg > 1000) doseMg = 1000;
  const volumeMl = doseMg / 32;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas (máx 4 doses/dia)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
