/**
 * Claritromicina 500 mg - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'claritromicina-500mg-ev',
  nome: 'Claritromicina 500 mg EV',
  nomesComerciais: ['Klaricid IV'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Macrolídeo' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para injeção (reconstituir) + SF 0,9% (diluir)',
    volumeReconstituicao: '10 mL',
    concentracaoFinal: '2 mg/mL (após diluição final)',
    estabilidade: '24h refrigerado',
  },
  diluicao: {
    volumeMinimo: '250 mL',
    volumeMaximo: '500 mL',
    tempoInfusao: '60 min',
  },
  doseUsualTexto: '15 mg/kg/dia 12/12h (máx 1 g/dia)',
  doseMinima: '7,5 mg/kg/dia',
  doseMaxima: '1000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 7,5 mg 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 6 meses' },
  observacoes: 'Infundir lentamente em 60 min. Não administrar em bolus.',
  alertas: ['Infundir em 60 minutos', 'Não fazer bolus'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 15;
  if (doseDiariaMg > 1000) doseDiariaMg = 1000;
  const dosePorTomadaMg = doseDiariaMg / 2;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${(dosePorTomadaMg / 2).toFixed(0)} mL (concentração 2 mg/mL)`,
    unidade: 'mg',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
