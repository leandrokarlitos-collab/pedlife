/**
 * Imipenem + Cilastatina 500 mg - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'imipenem-cilastatina-500mg',
  nome: 'Imipenem + Cilastatina 500 mg',
  nomesComerciais: ['Tienam'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Carbapenêmico' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'SF 0,9% ou SG 5%',
    volumeReconstituicao: '100 mL',
    concentracaoFinal: '5 mg/mL',
    estabilidade: '4h em temperatura ambiente',
  },
  diluicao: {
    volumeMinimo: '100 mL',
    volumeMaximo: '250 mL',
    tempoInfusao: '30-60 min',
  },
  doseUsualTexto: '60-100 mg/kg/dia 6/6h (máx 4 g/dia)',
  doseMinima: '60 mg/kg/dia',
  doseMaxima: '4000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 80,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 20 mg 6/6h',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'Infundir lentamente (30-60 min). Risco de convulsão em altas doses.',
  alertas: ['Risco de convulsão em doses elevadas', 'Infundir lentamente'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 80;
  if (doseDiariaMg > 4000) doseDiariaMg = 4000;
  const dosePorTomadaMg = doseDiariaMg / 4;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${(dosePorTomadaMg / 5).toFixed(0)} mL (após diluição)`,
    unidade: 'mg',
    intervalo: '6/6 horas',
    alertas: dosePorTomadaMg > 500 ? ['Dose elevada: atenção ao risco de convulsão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
