/**
 * Midazolam 1 mg/mL e 5 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'midazolam-ev',
  nome: 'Cloridrato de Midazolam (1 mg/mL e 5 mg/mL)',
  nomesComerciais: ['Dormonid', 'Midazolam'],
  viaAdministracao: ['EV', 'IM', 'Intranasal', 'Bucal'],
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Benzodiazepínico' },
  categoria: 'anticonvulsivantes',
  reconstituicao: { necessaria: false },
  diluicao: {
    volumeMinimo: '10 mL',
    volumeMaximo: '50 mL',
    tempoInfusao: '2-5 min (bolus) ou contínuo',
  },
  doseUsualTexto: 'Status: 0,1-0,2 mg/kg EV | Sedação: 0,05-0,1 mg/kg',
  doseMinima: '0,05 mg/kg',
  doseMaxima: '10 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0.15,
    intervalo: 'SOS ou infusão contínua',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 0,15 mg/dose',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Status epilepticus: 0,15-0,2 mg/kg. Ter flumazenil disponível.',
  alertas: ['Depressão respiratória', 'Ter flumazenil disponível', 'Monitorar SatO2'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 0.15;
  if (doseMg > 10) doseMg = 10;
  const volumeMl1mg = doseMg / 1;
  const volumeMl5mg = doseMg / 5;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeMl5mg.toFixed(1)} mL (5 mg/mL) ou ${volumeMl1mg.toFixed(1)} mL (1 mg/mL)`,
    unidade: 'mg',
    intervalo: 'SOS (pode repetir em 5-10 min)',
    alertas: ['Monitorar respiração'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
