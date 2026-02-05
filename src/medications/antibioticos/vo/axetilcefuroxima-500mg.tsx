/**
 * Axetilcefuroxima 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'axetilcefuroxima-500mg',
  nome: 'Axetilcefuroxima 500 mg',
  nomesComerciais: ['Zinnat'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Cefalosporina (2ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '20-30 mg/kg/dia 12/12h',
  parametrosCalculo: {
    doseUsualMgKg: 25,
    intervalo: '12/12h',
    dosesAoDia: 2,
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Administrar com alimentos.',
  alertas: ['Administrar com alimentos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 25;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const numComprimidos = dosePorTomadaMg / 500;
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
