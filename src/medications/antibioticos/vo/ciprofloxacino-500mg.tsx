/**
 * Ciprofloxacino 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ciprofloxacino-500mg',
  nome: 'Ciprofloxacino 500 mg',
  nomesComerciais: ['Cipro', 'Ciflocin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Fluoroquinolona' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '20-30 mg/kg/dia 12/12h (máx 1,5 g/dia)',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '1500 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 25,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 12,5 mg 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 18 anos' },
  observacoes: 'Uso restrito em pediatria. Evitar antiácidos e laticínios.',
  alertas: ['Uso restrito em pediatria (risco articular)', 'Evitar antiácidos 2h antes/depois'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 25;
  if (doseDiariaMg > 1500) doseDiariaMg = 1500;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const numComprimidos = dosePorTomadaMg / 500;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    alertas: ['Fluoroquinolona: uso restrito em pediatria'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
