/**
 * Paracetamol 200 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'paracetamol-200mg-ml',
  nome: 'Paracetamol 200 mg/mL (Gotas)',
  nomesComerciais: ['Tylenol Gotas', 'Paracetamol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas)',
  classe: { nome: 'Analgésico / Antitérmico' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10-15 mg/kg/dose 4/4h ou 6/6h (máx 75 mg/kg/dia)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '75 mg/kg/dia ou 4000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '1 gota = 10 mg | Peso (kg) × 1,5 gotas/dose',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: '1 gota = 10 mg. Máximo 5 doses/dia.',
  alertas: ['Hepatotóxico em superdose', '1 gota = 10 mg'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 15;
  if (doseMg > 1000) doseMg = 1000;
  const gotas = Math.round(doseMg / 10);
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
