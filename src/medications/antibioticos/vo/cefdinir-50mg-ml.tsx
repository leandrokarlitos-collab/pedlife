/**
 * Cefdinir 50 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefdinir-50mg-ml',
  nome: 'Cefdinir 50 mg/mL',
  nomesComerciais: ['Omnicef', 'Sefdin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '14 mg/kg/dia 12/12h ou 24/24h',
  doseMinima: '7 mg/kg/dia',
  doseMaxima: '14 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 14,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,14 mL 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 6 meses' },
  observacoes: 'Alta concentração. Pode alterar cor das fezes para vermelho.',
  alertas: ['Pode causar fezes avermelhadas (sem significado clínico)'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 14;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = dosePorTomadaMg / 50;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
