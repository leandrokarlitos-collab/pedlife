/**
 * Pirazinamida 150 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'pirazinamida-150mg-5ml',
  nome: 'Pirazinamida 150 mg/5 mL',
  nomesComerciais: ['Pirazinamida'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Tuberculostático' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '30-40 mg/kg/dia 24/24h (máx 2 g/dia)',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '2000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 35,
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 150,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1,17 mL/dia',
  },
  restricaoIdade: { idadeMinima: 'Todas as idades' },
  observacoes: 'Uso no esquema de tratamento da tuberculose. Hepatotóxico.',
  alertas: ['Monitorar função hepática', 'Pode elevar ácido úrico'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 35;
  if (doseDiariaMg > 2000) doseDiariaMg = 2000;
  const volumeMl = (doseDiariaMg / 150) * 5;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
