/**
 * Fluconazol - Via Oral (Suspensão e Cápsulas)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'fluconazol-vo',
  nome: 'Fluconazol (Solução Oral / Cápsulas)',
  nomesComerciais: ['Zoltec', 'Fluconazol', 'Diflucan'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral 10 mg/mL / Cápsulas 50, 100, 150 mg',
  classe: { nome: 'Antifúngico triazólico' },
  categoria: 'antifungicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Candidíase orofaríngea: 6 mg/kg no 1º dia, depois 3 mg/kg/dia | Candidíase sistêmica: 6-12 mg/kg/dia',
  doseMinima: '3 mg/kg/dia',
  doseMaxima: '12 mg/kg/dia (máx 400 mg/dia)',
  parametrosCalculo: {
    doseUsualMgKg: 6,
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 10,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 6 mg/kg/dia',
  },
  restricaoIdade: { idadeMinima: 'Neonatos (com cautela)' },
  observacoes: 'Candidíase orofaríngea: 14-21 dias. Candidíase esofágica: 14-21 dias. Candidíase sistêmica: mínimo 14 dias.',
  alertas: ['Ajustar dose na insuficiência renal', 'Interações com varfarina, fenitoína'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 6;
  if (doseMg > 400) doseMg = 400;
  const volumeMl = doseMg / 10;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL da suspensão 10 mg/mL`,
    unidade: 'mL',
    intervalo: '24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
