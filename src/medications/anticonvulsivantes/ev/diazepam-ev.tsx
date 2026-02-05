/**
 * Diazepam 5 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'diazepam-5mg-ml-ev',
  nome: 'Diazepam 5 mg/mL (Solução Injetável)',
  nomesComerciais: ['Valium'],
  viaAdministracao: ['EV', 'Retal'],
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Benzodiazepínico' },
  categoria: 'anticonvulsivantes',
  reconstituicao: { necessaria: false },
  diluicao: {
    tempoInfusao: '1-2 min (máximo 5 mg/min)',
  },
  doseUsualTexto: '0,2-0,5 mg/kg EV (máx 10 mg/dose)',
  doseMinima: '0,2 mg/kg',
  doseMaxima: '10 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0.3,
    intervalo: 'SOS',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 5,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,06 mL/dose',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'EV lento (máx 5 mg/min). Via retal: 0,5 mg/kg.',
  alertas: ['EV muito lento', 'Depressão respiratória', 'NÃO diluir em soro'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 0.3;
  if (doseMg > 10) doseMg = 10;
  const volumeMl = doseMg / 5;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: 'SOS (pode repetir em 10-15 min)',
    alertas: ['EV lento - máx 5 mg/min'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
