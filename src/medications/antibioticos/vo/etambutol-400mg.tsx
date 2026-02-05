/**
 * Etambutol 400 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'etambutol-400mg',
  nome: 'Etambutol 400 mg',
  nomesComerciais: ['Etambutol', 'Myambutol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Tuberculostático' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '15-25 mg/kg/dia 24/24h (máx 1,2 g/dia)',
  doseMinima: '15 mg/kg/dia',
  doseMaxima: '1200 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 20,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 20 mg/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 6 anos' },
  observacoes: 'Uso no esquema de tratamento da tuberculose. Risco de neurite óptica.',
  alertas: ['Monitorar acuidade visual', 'Neurite óptica dose-dependente'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 20;
  if (doseDiariaMg > 1200) doseDiariaMg = 1200;
  const numComprimidos = doseDiariaMg / 400;
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '24/24 horas',
    alertas: ['Monitorar visão periodicamente'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
