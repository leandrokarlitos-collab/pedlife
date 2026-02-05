/**
 * Dexametasona 2 mg/mL - Solução Injetável EV/IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dexametasona-2mg-ml-ev',
  nome: 'Fosfato Dissódico de Dexametasona 2 mg/mL',
  nomesComerciais: ['Decadron'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Solução Injetável',
  classe: {
    nome: 'Corticosteroide',
    descricao: 'Corticoide de longa ação e alta potência',
  },
  categoria: 'corticoides',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100-1000 mL',
    tempoInfusao: 'Conforme indicação',
  },
  doseUsualTexto: 'Dose Pediátrica: 0,02 a 0,3 mg/kg/dia, dividida em 3 ou 4 doses',
  doseMinima: '0,02 mg/kg/dia',
  doseMaxima: '0,3 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 0.02,
    doseMaxMgKg: 0.3,
    doseUsualMgKg: 0.05,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 2,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,025 mL por dose (para dose de 0,05 mg/kg)',
  },
  observacoes: `Injeção EV deve ser lenta.
O uso prolongado pode suprimir crescimento em crianças.
Pode mascarar sinais de infecção.`,
  alertas: [
    'Uso prolongado suprime crescimento',
    'Pode mascarar infecção',
    'Supressão adrenal',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 0.05;
  const volumeMl = dosePorTomadaMg / 2;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(2)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Administração EV lenta'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
