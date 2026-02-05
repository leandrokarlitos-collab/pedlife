/**
 * Ácido Nalidíxico 50 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'acido-nalidixico-50mg-ml',
  nome: 'Ácido Nalidíxico 50 mg/mL',
  nomesComerciais: ['Wintomylon'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Quinolona (1ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '55 mg/kg/dia 6/6h (máx 4 g/dia)',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '4000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 55,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,275 mL 6/6h',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'Uso exclusivo para ITU. Primeira quinolona desenvolvida.',
  alertas: ['Uso exclusivo para infecção urinária', 'Fotossensibilidade'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 55;
  if (doseDiariaMg > 4000) doseDiariaMg = 4000;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = dosePorTomadaMg / 50;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
