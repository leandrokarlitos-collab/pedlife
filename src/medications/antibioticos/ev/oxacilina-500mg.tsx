/**
 * Oxacilina 500 mg - Pó para Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'oxacilina-500mg-ev',
  nome: 'Oxacilina 500 mg',
  nomesComerciais: ['Staficilin-N', 'Oxacilina Genérico'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Penicilina antiestafilocócica',
    descricao: 'Penicilina resistente a penicilinase',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água Destilada',
    volumeMl: 5,
    concentracaoFinal: '100 mg/mL',
    estabilidade: 'Até 6h sob refrigeração',
  },
  diluicao: {
    solucao: 'SF 0,9%',
    volumeMl: '50-100 mL',
    tempoInfusao: '30-60 min',
  },
  doseUsualTexto: `50 mg/kg/dia de 6/6h (infecções leves a moderadas)
100 mg/kg/dia de 6/6h (infecções graves)`,
  doseMinima: '25 mg/kg/dia',
  doseMaxima: '200 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 50,
    doseMaxMgKg: 100,
    doseUsualMgKg: 100,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 0,25 mL de 6/6h (para 100 mg/kg/dia)',
  },
  observacoes: `Ajustar dose em neonatos pela função renal.
Evitar administração rápida — risco de convulsões.
Estabilidade da solução reconstituída: até 6h sob refrigeração.`,
  alertas: [
    'Administração EV rápida pode causar convulsões',
    'Verificar alergia a penicilinas',
    'Ajustar em neonatos',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 100;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = dosePorTomadaMg / 100;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído)`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Reconstituir com 5 mL AD', 'Infundir lentamente'],
    alertas: ['Administração rápida: risco de convulsões'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
