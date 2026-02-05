/**
 * Tramadol 50 mg/mL - Solução Injetável EV/IM/SC
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'tramadol-50mg-ml-ev',
  nome: 'Cloridrato de Tramadol 50 mg/mL',
  nomesComerciais: ['Tramal', 'Tramadol Genérico'],
  viaAdministracao: ['EV', 'IM', 'SC'],
  formaFarmaceutica: 'Solução Injetável',
  classe: {
    nome: 'Opioide fraco',
    descricao: 'Analgésico opioide de ação central',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '100 mL',
    tempoInfusao: '15-30 min',
  },
  doseUsualTexto: 'Crianças (>1 ano): 1 a 2 mg/kg/dose, a cada 6 horas',
  doseMinima: '1 mg/kg/dose',
  doseMaxima: '2 mg/kg/dose (ou 8 mg/kg/dia). Não exceder 400 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 1,
    doseMaxMgKg: 2,
    doseUsualMgKg: 1,
    doseMaxDiariaMg: 400,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,02 mL por dose (para dose de 1 mg/kg)',
  },
  restricaoIdade: {
    idadeMinima: '> 1 ano',
    observacao: 'Não recomendado para menores de 1 ano',
  },
  observacoes: `Administração EV deve ser LENTA (2-3 minutos).
Risco de depressão respiratória, sonolência e convulsões.
Frequentemente associado a vômitos.`,
  alertas: [
    'Administração EV lenta (2-3 min)',
    'Risco de depressão respiratória',
    'Pode causar convulsões',
    'Náuseas/vômitos frequentes',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 1;
  const volumeMl = dosePorTomadaMg / 50;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  const alertas: string[] = ['Administração EV lenta'];
  if (idade !== undefined && idade < 1) {
    alertas.push('Não recomendado para < 1 ano');
  }

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Pode diluir em 100 mL para infusão'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
