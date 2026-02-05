/**
 * Vancomicina 500 mg - Pó para Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'vancomicina-500mg-ev',
  nome: 'Vancomicina 500 mg',
  nomesComerciais: ['Vancocina', 'Vancomicina Genérico'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Glicopeptídeo',
    descricao: 'Antibiótico para gram-positivos resistentes (MRSA)',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água Destilada',
    volumeMl: 3,
    concentracaoFinal: '166,7 mg/mL',
  },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100-200 mL',
    tempoInfusao: '≥ 60 min',
  },
  doseUsualTexto: '10 mg/kg/dose a cada 6-8h (total: 60 mg/kg/dia)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '2 g/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    doseMaxDiariaMg: 2000,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    formulaCalculo: `8/8h → Peso (kg) × 0,12 mL/dose
6/6h → Peso (kg) × 0,09 mL/dose`,
  },
  observacoes: `Infundir lentamente para evitar "síndrome do homem vermelho".
Ajustar dose em insuficiência renal.
Monitorar níveis séricos (pico e vale) em tratamentos prolongados.
Não usar via IM.`,
  alertas: [
    'Síndrome do homem vermelho se infusão rápida',
    'Nefrotóxico - monitorar função renal',
    'Ajustar dose em insuficiência renal',
    'Monitorar níveis séricos',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = Math.min(peso * 10, 500);
  const volumeMlReconstituido = dosePorTomadaMg / 166.7;
  const volumeArredondado = Math.round(volumeMlReconstituido * 100) / 100;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído)`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: [
      'Reconstituir com 3 mL AD',
      'Diluir em 100-200 mL SF 0,9% ou SG 5%',
      'Infundir em pelo menos 60 minutos',
    ],
    alertas: ['Infundir LENTAMENTE (mín. 60 min)'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
