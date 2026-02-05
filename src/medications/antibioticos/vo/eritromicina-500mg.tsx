/**
 * Eritromicina 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'eritromicina-500mg',
  nome: 'Eritromicina 500 mg',
  nomesComerciais: ['Eritrex', 'Ilosone'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Macrolídeo' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '30-50 mg/kg/dia 6/6h (máx 2g/dia)',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '2000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 40,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 10 mg 6/6h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Administrar 1h antes ou 2h após refeições.',
  alertas: ['Administrar longe das refeições'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 40;
  if (doseDiariaMg > 2000) doseDiariaMg = 2000;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const numComprimidos = dosePorTomadaMg / 500;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
