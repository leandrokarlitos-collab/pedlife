/**
 * Flumazenil 0,1 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'flumazenil-0-1mg-ml',
  nome: 'Flumazenil 0,1 mg/mL (Solução Injetável)',
  nomesComerciais: ['Lanexat'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Antídoto (antagonista benzodiazepínico)' },
  categoria: 'antidotos',
  reconstituicao: { necessaria: false },
  diluicao: {
    tempoInfusao: '15-30 segundos por dose',
  },
  doseUsualTexto: '0,01 mg/kg EV (máx 0,2 mg/dose inicial)',
  doseMinima: '0,01 mg/kg',
  doseMaxima: '1 mg total',
  parametrosCalculo: {
    doseUsualMgKg: 0.01,
    intervalo: 'Pode repetir a cada 1 min',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 0.1,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,1 mL/dose',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Pode repetir a cada 1 minuto se necessário. Dose máxima total 1 mg.',
  alertas: ['Pode precipitar convulsões em dependentes', 'Efeito curto - monitorar ressedação'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 0.01;
  if (doseMg > 0.2) doseMg = 0.2;
  const volumeMl = doseMg / 0.1;
  return {
    doseCalculada: `${(doseMg * 1000).toFixed(0)} mcg (${doseMg.toFixed(2)} mg)`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: 'Pode repetir a cada 1 min (máx 1 mg total)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
