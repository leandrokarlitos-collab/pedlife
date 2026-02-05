/**
 * Meropeném 500 mg - Pó para Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'meropenem-500mg-ev',
  nome: 'Meropeném 500 mg',
  nomesComerciais: ['Meronem', 'Meropeném Genérico'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Carbapenêmico',
    descricao: 'Antibiótico de amplo espectro para infecções graves',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água Destilada',
    volumeMl: 10,
    concentracaoFinal: '50 mg/mL',
    estabilidade: '3h em temperatura ambiente ou 16h refrigerada',
  },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100-200 mL',
    tempoInfusao: '15-30 min',
  },
  doseUsualTexto: '60 mg/kg/dia divididos a cada 8 horas',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '6 g/dia',
  parametrosCalculo: {
    doseMinMgKg: 20,
    doseMaxMgKg: 60,
    doseUsualMgKg: 60,
    doseMaxDiariaMg: 6000,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: '8/8h: Peso (kg) × 0,4 mL/dose (500 mg reconstituído/10 mL)',
  },
  observacoes: `Ajustar dose em insuficiência renal.
Não misturar com outros fármacos na mesma solução.
Administrar por bolus (5 min) ou infusão (15-30 min).`,
  alertas: [
    'Ajustar em insuficiência renal',
    'Pode causar convulsões em altas doses',
    'Não misturar com outros fármacos',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 60, 6000);
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = dosePorTomadaMg / 50;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (peso * 60 >= 6000) alertas.push('Dose máxima diária atingida');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído)`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Reconstituir com 10 mL AD', 'Infundir em 15-30 min'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
