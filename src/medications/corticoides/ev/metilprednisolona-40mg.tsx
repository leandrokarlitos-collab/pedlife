/**
 * Metilprednisolona 40 mg - Pó para Solução Injetável EV/IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'metilprednisolona-40mg-ev',
  nome: 'Succinato Sódico de Metilprednisolona 40 mg',
  nomesComerciais: ['Solu-Medrol'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Corticosteroide',
    descricao: 'Corticoide de ação intermediária',
  },
  categoria: 'corticoides',
  reconstituicao: {
    necessaria: true,
    diluente: 'Diluente próprio',
    volumeMl: 1,
    concentracaoFinal: '40 mg/mL',
    estabilidade: 'Estável por 48h',
  },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100-1000 mL',
    tempoInfusao: '≥ 30 min (altas doses)',
  },
  doseUsualTexto: 'Dose pediátrica variável (ex: 1-2 mg/kg/dia para asma)',
  doseMinima: '0,5 mg/kg/dia',
  doseMaxima: '30 mg/kg/dia (pulsoterapia, até 3 dias)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 2,
    doseUsualMgKg: 1,
    intervalo: '12/12h ou 24/24h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 0,025 mL por dose (para dose de 1 mg/kg)',
  },
  observacoes: `Infusão de altas doses deve ser lenta (≥ 30 min).
Pode mascarar sinais de infecção e suprimir crescimento com uso crônico.
Solução estável por 48h.`,
  alertas: [
    'Infusão lenta em altas doses',
    'Supressão adrenal com uso prolongado',
    'Hiperglicemia',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 1;
  const volumeMl = dosePorTomadaMg / 40;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído)`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes: ['Reconstituir com 1 mL diluente', 'Infusão lenta se alta dose'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
