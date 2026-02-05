/**
 * Tramadol 50 mg - Cápsula
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'tramadol-capsula-50mg',
  nome: 'Cloridrato de Tramadol 50 mg (Cápsula)',
  nomesComerciais: ['Tramal', 'Tramadol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula 50 mg',
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
    formulaCalculo: 'Peso (kg) × 1-2 mg/kg/dose',
  },
  restricaoIdade: {
    idadeMinima: '> 12 anos ou > 40 kg',
    observacao: 'Preferir gotas para crianças menores',
  },
  observacoes: `Indicado para dor moderada a intensa.
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
  
  const capsulas = Math.round(doseMg / 50);
  const doseReal = capsulas * 50;
  
  const alertas: string[] = [];
  if (peso < 40) alertas.push('Para < 40 kg, preferir apresentação em gotas');

  return {
    doseCalculada: `${doseReal} mg`,
    volumeCalculado: `${capsulas} cápsula(s)`,
    unidade: 'cápsula(s)',
    intervalo: '6/6 horas',
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
