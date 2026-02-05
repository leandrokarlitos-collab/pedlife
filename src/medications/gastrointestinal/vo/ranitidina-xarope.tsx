/**
 * Ranitidina 15 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ranitidina-15mg-ml-xarope',
  nome: 'Cloridrato de Ranitidina 15 mg/mL (150 mg/10 mL)',
  nomesComerciais: ['Antak Xarope', 'Label'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope',
  classe: { nome: 'Antagonista H2' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '4-8 mg/kg/dia VO 12/12h (máx 300 mg/dia)',
  doseMinima: '4 mg/kg/dia',
  doseMaxima: '300 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 5,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 15,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,17 mL 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Pode ser dado com ou sem alimentos.',
  alertas: [],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 5;
  if (doseDiariaMg > 300) doseDiariaMg = 300;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = dosePorTomadaMg / 15;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
