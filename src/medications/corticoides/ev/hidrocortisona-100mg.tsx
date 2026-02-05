/**
 * Hidrocortisona 100 mg - Pó para Solução Injetável EV/IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'hidrocortisona-100mg-ev',
  nome: 'Succinato Sódico de Hidrocortisona 100 mg',
  nomesComerciais: ['Solu-Cortef', 'Flebocortid'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Corticosteroide',
    descricao: 'Corticoide de ação curta para situações agudas',
  },
  categoria: 'corticoides',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para Injetáveis',
    volumeMl: 2,
    concentracaoFinal: '50 mg/mL',
    estabilidade: 'Estável por 3 dias',
  },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100-1000 mL',
    tempoInfusao: '20-30 min',
  },
  doseUsualTexto: 'Dose pediátrica variável (ex: 4-8 mg/kg como dose de ataque na asma)',
  doseMinima: '25 mg/dia',
  doseMaxima: '8 mg/kg/dia divididas em 3-4 doses',
  parametrosCalculo: {
    doseMinMgKg: 4,
    doseMaxMgKg: 8,
    doseUsualMgKg: 4,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 0,08 mL por dose (para dose de 4 mg/kg)',
  },
  observacoes: `Injeção EV direta deve ser lenta (mínimo 30 seg).
Infusão em 20-30 min.
Pode mascarar sinais de infecção.
Solução reconstituída estável por 3 dias.`,
  alertas: [
    'Administração EV lenta',
    'Pode mascarar infecção',
    'Hiperglicemia',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 4;
  const volumeMl = dosePorTomadaMg / 50;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído)`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Reconstituir com 2 mL AD', 'Administrar EV lenta (mín. 30 seg)'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
