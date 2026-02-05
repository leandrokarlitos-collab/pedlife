/**
 * Óleo Mineral - Nujol
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'oleo-mineral',
  nome: 'Óleo Mineral (Nujol)',
  nomesComerciais: ['Nujol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Emulsão Oral',
  classe: { nome: 'Laxativo lubrificante' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1-3 mL/kg/dia 1-2x/dia (máx 45 mL/dia)',
  doseMinima: '1 mL/kg/dia',
  doseMaxima: '45 mL/dia',
  parametrosCalculo: {
    intervalo: '24/24h ou 12/12h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 1-3 mL/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Evitar uso prolongado. Não usar em < 1 ano (risco de aspiração).',
  alertas: ['Contraindicado em < 1 ano', 'Risco de aspiração', 'Evitar uso prolongado'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let volumeMl = peso * 1.5;
  if (volumeMl > 45) volumeMl = 45;
  return {
    doseCalculada: `${volumeMl.toFixed(0)} mL`,
    volumeCalculado: `${volumeMl.toFixed(0)} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (preferencialmente ao deitar)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
