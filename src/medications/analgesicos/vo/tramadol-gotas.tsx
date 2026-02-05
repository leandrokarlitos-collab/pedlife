/**
 * Tramadol 100 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'tramadol-gotas',
  nome: 'Cloridrato de Tramadol 100 mg/mL (Gotas)',
  nomesComerciais: ['Tramal Gotas', 'Tramadol Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral 100 mg/mL (1 mL = 40 gotas = 100 mg)',
  classe: {
    nome: 'Opioide fraco',
    descricao: 'Analgésico opioide de ação central',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1-2 mg/kg/dose 6/6h (máx 400 mg/dia)',
  doseMinima: '1 mg/kg/dose',
  doseMaxima: '8 mg/kg/dia (máx 400 mg/dia)',
  parametrosCalculo: {
    doseMinMgKg: 1,
    doseMaxMgKg: 2,
    doseUsualMgKg: 1.5,
    doseMaxDiariaMg: 400,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 100,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 1-2 mg/kg ÷ 100 mg/mL × 40 gotas/mL',
  },
  restricaoIdade: {
    idadeMinima: '> 1 ano',
    observacao: 'Não recomendado para menores de 1 ano',
  },
  observacoes: `1 gota = 2,5 mg.
Risco de náuseas, vômitos e constipação.
Pode causar sonolência.
Evitar uso prolongado (risco de dependência).`,
  alertas: [
    'Risco de depressão respiratória',
    'Pode causar convulsões',
    'Náuseas/vômitos frequentes',
    'Risco de dependência',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMgKg = 1.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 100) doseMg = 100;
  
  const volumeMl = doseMg / 100;
  const gotas = Math.round(volumeMl * 40);
  
  const alertas: string[] = [];
  if (idade && idade < 1) alertas.push('Não recomendado em < 1 ano');

  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotas} gotas (${volumeMl.toFixed(2)} mL)`,
    unidade: 'gotas',
    intervalo: '6/6 horas',
    observacoes: ['1 gota = 2,5 mg'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
