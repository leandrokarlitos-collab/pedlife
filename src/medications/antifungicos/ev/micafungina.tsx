/**
 * Micafungina 50/100 mg - Pó para Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'micafungina',
  nome: 'Micafungina 50/100 mg (Pó para Solução Injetável)',
  nomesComerciais: ['Mycamine'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável 50 mg / 100 mg',
  classe: { nome: 'Antifúngico equinocandina' },
  categoria: 'antifungicos',
  reconstituicao: {
    necessaria: true,
    diluente: 'SF 0,9% ou SG 5%',
    volumeReconstituicao: '5 mL (50 mg) ou 5 mL (100 mg)',
    concentracaoFinal: '10 mg/mL (50 mg) ou 20 mg/mL (100 mg)',
  },
  diluicao: {
    diluente: 'SF 0,9% ou SG 5%',
    concentracaoFinal: '0,5-1,5 mg/mL',
    tempoInfusao: '1 hora',
  },
  doseUsualTexto: 'Candidíase invasiva: 2-4 mg/kg/dia (máx 100 mg) | Profilaxia: 1 mg/kg/dia',
  doseMinima: '1 mg/kg/dia',
  doseMaxima: '4 mg/kg/dia (máx 200 mg/dia)',
  parametrosCalculo: {
    doseUsualMgKg: 2,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 2 mg/kg/dia',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Neonatos e < 4 meses: 10 mg/kg/dia para candidíase invasiva. Infundir em 1 hora.',
  alertas: ['Monitorar função hepática', 'Infusão em 1 hora'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idadeMeses?: number): ResultadoCalculo {
  let doseMgKg = 2;
  if (idadeMeses !== undefined && idadeMeses < 4) {
    doseMgKg = 10;
  }
  let doseMg = peso * doseMgKg;
  if (doseMg > 100) doseMg = 100;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${(doseMg / 10).toFixed(1)} mL (após reconstituição 10 mg/mL)`,
    unidade: 'mg',
    intervalo: '24/24 horas',
    alertas: idadeMeses !== undefined && idadeMeses < 4 ? ['< 4 meses: dose maior (10 mg/kg/dia)'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
