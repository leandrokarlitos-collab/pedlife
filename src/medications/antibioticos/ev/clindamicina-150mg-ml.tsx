/**
 * Clindamicina 150 mg/mL - Solução Injetável EV/IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'clindamicina-150mg-ml-ev',
  nome: 'Clindamicina 150 mg/mL',
  nomesComerciais: ['Dalacin C'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Solução Injetável',
  classe: {
    nome: 'Lincosamida',
    descricao: 'Antibiótico para anaeróbios e gram-positivos',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100-200 mL',
    tempoInfusao: '≥ 60 min',
  },
  doseUsualTexto: '20-40 mg/kg/dia divididos em 3-4 doses',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '2,7 g/dia',
  parametrosCalculo: {
    doseMinMgKg: 20,
    doseMaxMgKg: 40,
    doseUsualMgKg: 20,
    doseMaxDiariaMg: 2700,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 150,
    concentracaoDenominadorMl: 1,
    formulaCalculo: `3 doses/dia: Peso (kg) × 0,044 mL/dose (20 mg/kg/dia)
3 doses/dia: Peso (kg) × 0,089 mL/dose (40 mg/kg/dia)`,
  },
  observacoes: `Não administrar em bolus EV.
Pode causar colite pseudomembranosa e diarreia associada a C. difficile.
Monitorar função hepática, renal e hemograma em uso prolongado.`,
  alertas: [
    'Não administrar em bolus EV',
    'Risco de colite pseudomembranosa',
    'Monitorar se diarreia',
    'Evitar durante amamentação',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 20, 2700);
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = dosePorTomadaMg / 150;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Diluir em 100-200 mL', 'Infundir em ≥ 60 min'],
    alertas: ['Não administrar em bolus'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
