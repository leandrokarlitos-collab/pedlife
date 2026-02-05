/**
 * Ertapenem 1 g - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ertapenem-1g',
  nome: 'Ertapenem 1 g',
  nomesComerciais: ['Invanz'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Carbapenêmico' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'SF 0,9%',
    volumeReconstituicao: '50 mL',
    concentracaoFinal: '20 mg/mL',
    estabilidade: '6h em temperatura ambiente',
  },
  diluicao: {
    volumeMinimo: '50 mL',
    volumeMaximo: '100 mL',
    tempoInfusao: '30 min',
  },
  doseUsualTexto: '15 mg/kg 12/12h (máx 1 g/dia)',
  doseMinima: '15 mg/kg/dia',
  doseMaxima: '1000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 15 mg 12/12h (máx 500 mg/dose)',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'Dose única diária em adultos. Crianças: 12/12h.',
  alertas: ['Infundir em 30 minutos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let dosePorTomadaMg = peso * 15;
  if (dosePorTomadaMg > 500) dosePorTomadaMg = 500;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${(dosePorTomadaMg / 20).toFixed(1)} mL (após diluição)`,
    unidade: 'mg',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
