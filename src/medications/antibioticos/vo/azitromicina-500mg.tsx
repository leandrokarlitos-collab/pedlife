/**
 * Azitromicina 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'azitromicina-500mg',
  nome: 'Azitromicina 500 mg',
  nomesComerciais: ['Zitromax', 'Astro'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: {
    nome: 'Macrolídeo',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10 mg/kg/dia, por via oral em dose única diária (24/24h)',
  doseMinima: '10 mg/kg/dia',
  doseMaxima: '2000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    doseMaxDiariaMg: 2000,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 10 ÷ 500 = nº CP de 24/24h',
  },
  restricaoIdade: {
    pesoMinimo: '≥ 50 kg',
  },
  observacoes: 'Tomar 1h antes ou 2h após refeições.',
  alertas: ['Pode prolongar intervalo QT'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 10, 2000);
  const numComprimidos = doseDiariaMg / 500;

  const alertas: string[] = [];
  if (peso < 50) alertas.push('Peso < 50 kg: preferir suspensão');

  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '24/24 horas',
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
