/**
 * Pirazinamida 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'pirazinamida-500mg',
  nome: 'Pirazinamida 500 mg',
  nomesComerciais: ['Pirazinamida'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
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
    formulaCalculo: 'Peso (kg) × 35 mg/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Uso no esquema de tratamento da tuberculose. Hepatotóxico.',
  alertas: ['Monitorar função hepática', 'Pode elevar ácido úrico'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 35;
  if (doseDiariaMg > 2000) doseDiariaMg = 2000;
  const numComprimidos = doseDiariaMg / 500;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
