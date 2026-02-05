/**
 * Polimixina B 500.000 UI - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'polimixina-b-500000ui',
  nome: 'Polimixina B 500.000 UI',
  nomesComerciais: ['Polymyxin B'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Polimixina' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'SF 0,9% ou SG 5%',
    volumeReconstituicao: '300-500 mL',
    concentracaoFinal: '1.000-1.667 UI/mL',
    estabilidade: '72h refrigerado',
  },
  diluicao: {
    volumeMinimo: '300 mL',
    volumeMaximo: '500 mL',
    tempoInfusao: '60-90 min',
  },
  doseUsualTexto: '25.000-30.000 UI/kg/dia 12/12h',
  doseMinima: '15.000 UI/kg/dia',
  doseMaxima: '30.000 UI/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 25000,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 12.500 UI 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Nefrotóxico e neurotóxico. Monitorar função renal rigorosamente.',
  alertas: ['Nefrotóxico - monitorar função renal', 'Neurotóxico - monitorar sinais'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaUI = peso * 25000;
  const dosePorTomadaUI = doseDiariaUI / 2;
  return {
    doseCalculada: `${dosePorTomadaUI.toFixed(0)} UI`,
    volumeCalculado: 'Calcular conforme diluição',
    unidade: 'UI',
    intervalo: '12/12 horas',
    alertas: ['Monitorar função renal'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
