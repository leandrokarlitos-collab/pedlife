/**
 * Metronidazol 400 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'metronidazol-400mg',
  nome: 'Metronidazol 400 mg',
  nomesComerciais: ['Flagyl'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Nitroimidazol' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '30-40 mg/kg/dia 8/8h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '2000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 35,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × ~12 mg 8/8h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Administrar com alimentos. Evitar álcool durante tratamento.',
  alertas: ['Evitar álcool (efeito antabuse)', 'Administrar com alimentos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 35;
  if (doseDiariaMg > 2000) doseDiariaMg = 2000;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const numComprimidos = dosePorTomadaMg / 400;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
