/**
 * Cefadroxila 500 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefadroxila-500mg-5ml',
  nome: 'Cefadroxila 500 mg/5 mL',
  nomesComerciais: ['Cefamox'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Cefalosporina (1ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '30-50 mg/kg/dia 12/12h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '100 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 30,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 500,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,5 mL (para 30 mg/kg/dia)',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Concentração alta.',
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 30;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 500) * 5;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
