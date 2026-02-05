/**
 * Cefalexina 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefalexina-500mg',
  nome: 'Cefalexina 500 mg',
  nomesComerciais: ['Keflex', 'Cefalexina Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: {
    nome: 'Cefalosporina (1ª geração)',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '30-50 mg/kg/dia 6/6h ou 8/8h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '100 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 4000,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 50 ÷ 500 = nº CP/dia',
  },
  restricaoIdade: {
    idadeMinima: '≥ 5 anos',
    observacao: 'Para crianças que conseguem deglutir comprimidos',
  },
  observacoes: 'Uso em ITU e pele.',
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 50, 4000);
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
