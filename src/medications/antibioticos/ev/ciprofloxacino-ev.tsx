/**
 * Ciprofloxacino 200 mg/100 mL - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ciprofloxacino-200mg-100ml-ev',
  nome: 'Ciprofloxacino 200 mg/100 mL EV',
  nomesComerciais: ['Cipro IV'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução para Infusão',
  classe: { nome: 'Fluoroquinolona' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  diluicao: {
    volumeMinimo: '100 mL',
    volumeMaximo: '200 mL',
    tempoInfusao: '60 min',
  },
  doseUsualTexto: '10-15 mg/kg/dose 8/8h ou 12/12h (máx 400 mg/dose)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '800 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 100,
    formulaCalculo: 'Peso (kg) × 10 mg/dose',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Uso restrito em pediatria. Infundir em pelo menos 60 min.',
  alertas: ['Uso restrito em pediatria (risco articular)', 'Infundir em 60 min'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let dosePorTomadaMg = peso * 10;
  if (dosePorTomadaMg > 400) dosePorTomadaMg = 400;
  const volumeMl = (dosePorTomadaMg / 200) * 100;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl)} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: ['Fluoroquinolona: uso restrito em pediatria'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
