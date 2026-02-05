/**
 * Cetoprofeno 20 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cetoprofeno-gotas',
  nome: 'Cetoprofeno 20 mg/mL (Gotas)',
  nomesComerciais: ['Profenid Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 20 mg/mL (1 mL = 20 gotas)',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5-1 mg/kg/dose 6/6h a 8/8h (máx 4 mg/kg/dia)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '1 mg/kg/dose (máx 50 mg/dose)',
  parametrosCalculo: {
    doseUsualMgKg: 1,
    intervalo: '6/6h a 8/8h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 20,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 1 mg/kg ÷ 20 mg/mL × 20 gotas/mL',
  },
  restricaoIdade: { idadeMinima: '≥ 6 meses' },
  observacoes: 'Administrar após refeições para reduzir irritação gástrica.',
  alertas: ['Administrar com alimentos', 'Cuidado em asmáticos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 1;
  if (doseMg > 50) doseMg = 50;
  const volumeMl = doseMg / 20;
  const gotas = Math.round(volumeMl * 20);
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${gotas} gotas (${volumeMl.toFixed(2)} mL)`,
    unidade: 'gotas',
    intervalo: '6/6h ou 8/8h',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
