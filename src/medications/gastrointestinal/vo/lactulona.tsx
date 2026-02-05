/**
 * Lactulona - Xarope Laxativo
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'lactulona',
  nome: 'Lactulona (Xarope)',
  nomesComerciais: ['Lactulona', 'Farlac'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope',
  classe: { nome: 'Laxativo osmótico' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1-3 mL/kg/dia 1-2x/dia',
  doseMinima: '1 mL/kg/dia',
  doseMaxima: '60 mL/dia',
  parametrosCalculo: {
    intervalo: '24/24h ou 12/12h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 1-3 mL/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Ajustar dose conforme consistência das fezes. Pode causar flatulência inicial.',
  alertas: ['Pode causar flatulência e cólicas inicialmente'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let volumeMl = peso * 1.5;
  if (volumeMl > 60) volumeMl = 60;
  return {
    doseCalculada: `${volumeMl.toFixed(0)} mL`,
    volumeCalculado: `${volumeMl.toFixed(0)} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (ajustar conforme resposta)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
