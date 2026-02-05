/**
 * Itraconazol - Cápsulas / Solução Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'itraconazol',
  nome: 'Itraconazol (Cápsulas / Solução Oral)',
  nomesComerciais: ['Sporanox', 'Itraconazol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsulas 100 mg / Solução Oral 10 mg/mL',
  classe: { nome: 'Antifúngico triazólico' },
  categoria: 'antifungicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '5 mg/kg/dia em 1-2 doses (máx 200-400 mg/dia)',
  doseMinima: '2,5 mg/kg/dia',
  doseMaxima: '10 mg/kg/dia (máx 400 mg/dia)',
  parametrosCalculo: {
    doseUsualMgKg: 5,
    intervalo: '12/12h ou 24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 10,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 5 mg/kg/dia',
  },
  restricaoIdade: { idadeMinima: '> 1 ano (uso limitado em < 18 anos)' },
  observacoes: 'Cápsulas: tomar com alimentos. Solução oral: tomar em jejum. Não são intercambiáveis.',
  alertas: [
    'Cápsulas e solução não são intercambiáveis',
    'Múltiplas interações medicamentosas',
    'Evitar em ICC',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 5;
  if (doseMg > 200) doseMg = 200;
  const volumeMl = doseMg / 10;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL da solução 10 mg/mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (ou 12/12h se dividir)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
