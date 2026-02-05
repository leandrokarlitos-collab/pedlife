/**
 * Rifampicina 300 mg - Cápsula
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'rifampicina-300mg',
  nome: 'Rifampicina 300 mg',
  nomesComerciais: ['Rifaldin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula Oral',
  classe: { nome: 'Rifamicina' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10-20 mg/kg/dia 12/12h ou 24/24h (máx 600 mg/dia)',
  doseMinima: '10 mg/kg/dia',
  doseMaxima: '600 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 15 mg/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Administrar em jejum. Urina, fezes e secreções ficam alaranjadas.',
  alertas: ['Administrar em jejum', 'Colore fluidos corporais de laranja', 'Múltiplas interações medicamentosas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 15;
  if (doseDiariaMg > 600) doseDiariaMg = 600;
  const numCapsulas = doseDiariaMg / 300;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${numCapsulas.toFixed(1)} cápsula(s)`,
    unidade: 'cápsula(s)',
    intervalo: '24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
