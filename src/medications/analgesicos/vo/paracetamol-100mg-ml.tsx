/**
 * Paracetamol 100 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'paracetamol-100mg-ml',
  nome: 'Paracetamol 100 mg/mL (Suspensão)',
  nomesComerciais: ['Tylenol Baby', 'Tylenol Criança'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: {
    nome: 'Analgésico/Antipirético',
    descricao: 'Analgésico e antipirético de primeira linha em pediatria',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10 a 15 mg/kg/dose, a cada 4 a 6 horas',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '75 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 10,
    doseMaxMgKg: 15,
    doseUsualMgKg: 15,
    doseMaxDiariaMg: 4000,
    intervalo: '4/4h ou 6/6h',
    dosesAoDia: 5,
    concentracaoNumeradorMg: 100,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,15 mL por dose (para 15 mg/kg)',
  },
  observacoes: `Risco de hepatotoxicidade em superdosagem.
Não exceder 5 doses em 24 horas.`,
  alertas: [
    'Não exceder 5 doses/dia',
    'Risco de hepatotoxicidade em superdose',
    'Máximo 75 mg/kg/dia',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 15;
  const volumeMl = dosePorTomadaMg / 100;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 15 * 5 > 4000) {
    alertas.push('Atenção: dose diária máxima pode ser atingida com 5 doses');
  }

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas (máx. 5 doses/dia)',
    observacoes: ['Não exceder 5 doses em 24 horas'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
