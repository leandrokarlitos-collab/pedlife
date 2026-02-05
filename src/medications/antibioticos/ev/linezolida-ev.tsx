/**
 * Linezolida 600 mg/300 mL - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'linezolida-600mg-300ml-ev',
  nome: 'Linezolida 600 mg/300 mL EV',
  nomesComerciais: ['Zyvox IV'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução para Infusão',
  classe: { nome: 'Oxazolidinona' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  diluicao: {
    volumeMinimo: '300 mL',
    tempoInfusao: '30-120 min',
  },
  doseUsualTexto: '10 mg/kg/dose 8/8h (máx 600 mg/dose)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '1200 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 600,
    concentracaoDenominadorMl: 300,
    formulaCalculo: 'Peso (kg) × 10 mg/dose',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Monitorar hemograma semanal. Evitar tiramina na dieta.',
  alertas: ['Monitorar hemograma semanalmente', 'Evitar alimentos com tiramina'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let dosePorTomadaMg = peso * 10;
  if (dosePorTomadaMg > 600) dosePorTomadaMg = 600;
  const volumeMl = (dosePorTomadaMg / 600) * 300;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl)} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
