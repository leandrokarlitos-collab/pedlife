/**
 * Glucagon 1 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'glucagon-1mg',
  nome: 'Glucagon 1 mg (Solução Injetável)',
  nomesComerciais: ['GlucaGen'],
  viaAdministracao: ['EV', 'IM', 'SC'],
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Antídoto / Hormônio hiperglicemiante' },
  categoria: 'antidotos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Diluente próprio',
    volumeReconstituicao: '1 mL',
    concentracaoFinal: '1 mg/mL',
  },
  doseUsualTexto: 'Hipoglicemia: 0,025-0,1 mg/kg (máx 1 mg) | Intoxicação betabloq: 50-150 mcg/kg',
  doseMinima: '0,025 mg/kg',
  doseMaxima: '1 mg/dose (hipoglicemia)',
  parametrosCalculo: {
    doseUsualMgKg: 0.03,
    intervalo: 'Dose única ou infusão contínua',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 0,03 mg/dose',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Hipoglicemia: < 20 kg = 0,5 mg; ≥ 20 kg = 1 mg. Administrar glicose assim que possível.',
  alertas: ['Efeito transitório - fornecer glicose depois', 'Não funciona se depleção de glicogênio'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso < 20 ? 0.5 : 1;
  const volumeMl = doseMg;
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mg',
    intervalo: 'Dose única (fornecer glicose após)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
