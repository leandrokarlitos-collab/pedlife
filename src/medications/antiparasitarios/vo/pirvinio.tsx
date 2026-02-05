/**
 * Pamoato de Pirvínio 10 mg/mL - Suspensão (Pyr-pam)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'pirvinio',
  nome: 'Pamoato de Pirvínio 10 mg/mL (Pyr-pam)',
  nomesComerciais: ['Pyr-pam'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral 10 mg/mL (50 mg/5 mL)',
  classe: { nome: 'Anti-helmíntico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '5 mg/kg dose única (máx 350 mg)',
  doseMinima: '5 mg/kg',
  doseMaxima: '350 mg (dose única)',
  parametrosCalculo: {
    doseUsualMgKg: 5,
    intervalo: 'Dose única',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 10,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 5 mg/kg',
  },
  restricaoIdade: { idadeMinima: '≥ 3 meses' },
  observacoes: 'Específico para oxiuríase (Enterobius vermicularis). Repetir após 2 semanas. CORA AS FEZES DE VERMELHO.',
  alertas: ['Cora fezes de vermelho (normal)', 'Repetir em 14 dias'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 5;
  if (doseMg > 350) doseMg = 350;
  const volumeMl = doseMg / 10;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: 'Dose única (repetir em 14 dias)',
    alertas: ['Fezes ficarão vermelhas - é normal'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
