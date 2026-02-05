/**
 * Cefixima 200 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefixima-200mg-5ml',
  nome: 'Cefixima 200 mg/5 mL',
  nomesComerciais: ['Pananixime'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '8-10 mg/kg/dia 12/12h',
  doseMinima: '8 mg/kg/dia',
  doseMaxima: '12 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,25 mL (para 10 mg/kg/dia)',
  },
  restricaoIdade: { idadeMinima: '≥ 6 meses' },
  observacoes: 'Alta concentração.',
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 10;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 200) * 5;
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
