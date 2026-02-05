/**
 * Claritromicina 250 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'claritromicina-250mg',
  nome: 'Claritromicina 250 mg',
  nomesComerciais: ['Klaricid', 'Claritrom'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Macrolídeo' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '15 mg/kg/dia 12/12h (máx 1g/dia)',
  doseMinima: '7,5 mg/kg/dia',
  doseMaxima: '1000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 7,5 mg 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Pode ser administrado com ou sem alimentos.',
  alertas: ['Interação com várias medicações - verificar'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 15;
  if (doseDiariaMg > 1000) doseDiariaMg = 1000;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const numComprimidos = dosePorTomadaMg / 250;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
