/**
 * Metronidazol 200 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'metronidazol-200mg-5ml',
  nome: 'Metronidazol 200 mg/5 mL',
  nomesComerciais: ['Flagyl'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Imidazólico',
    descricao: 'Antibiótico/antiparasitário para anaeróbios e protozoários',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
  },
  doseUsualTexto: '30 mg/kg/dia 8/8h',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '50 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 20,
    doseMaxMgKg: 50,
    doseUsualMgKg: 30,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,75 mL (para 30 mg/kg/dia)',
  },
  restricaoIdade: {
    idadeMinima: '≥ 1 mês',
  },
  observacoes: 'Gosto metálico forte. Evitar álcool durante o tratamento.',
  alertas: ['Gosto metálico', 'Evitar álcool (efeito dissulfiram)', 'Pode causar náuseas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 30;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = (dosePorTomadaMg / 200) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Evitar álcool durante tratamento'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
