/**
 * Ranitidina 25 mg/mL - Ampola 2 mL (Injetável)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ranitidina-25mg-ml-ev',
  nome: 'Cloridrato de Ranitidina 25 mg/mL (Ampola 2 mL)',
  nomesComerciais: ['Antak', 'Label'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Antagonista H2' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  diluicao: {
    volumeMinimo: '20 mL',
    volumeMaximo: '50 mL',
    tempoInfusao: '15-20 min',
  },
  doseUsualTexto: '2-4 mg/kg/dia EV 8/8h ou 12/12h (máx 200 mg/dia)',
  doseMinima: '2 mg/kg/dia',
  doseMaxima: '200 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 3,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 25,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,04 mL 8/8h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Ampola de 2 mL = 50 mg. Infundir diluído em 15-20 min.',
  alertas: ['EV lento - diluir antes de usar'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 3;
  if (doseDiariaMg > 200) doseDiariaMg = 200;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = dosePorTomadaMg / 25;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeMl.toFixed(2)} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
