/**
 * Naloxona 0,4 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'naloxona-0-4mg-ml',
  nome: 'Cloridrato de Naloxona 0,4 mg/mL (Solução Injetável)',
  nomesComerciais: ['Narcan'],
  viaAdministracao: ['EV', 'IM', 'SC', 'Intranasal'],
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Antídoto (antagonista opioide)' },
  categoria: 'antidotos',
  reconstituicao: { necessaria: false },
  diluicao: {
    tempoInfusao: 'Bolus rápido',
  },
  doseUsualTexto: '0,01-0,1 mg/kg EV (máx 2 mg/dose)',
  doseMinima: '0,01 mg/kg',
  doseMaxima: '2 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0.1,
    intervalo: 'Pode repetir a cada 2-3 min',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 0.4,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,25 mL/dose',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Intoxicação opioide: titular dose. Meia-vida curta - pode necessitar repetir.',
  alertas: ['Pode precipitar abstinência em dependentes', 'Efeito curto - monitorar'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 0.1;
  if (doseMg > 2) doseMg = 2;
  const volumeMl = doseMg / 0.4;
  return {
    doseCalculada: `${doseMg.toFixed(2)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: 'Pode repetir a cada 2-3 min',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
