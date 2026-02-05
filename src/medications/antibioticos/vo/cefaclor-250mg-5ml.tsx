/**
 * Cefaclor 250 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefaclor-250mg-5ml',
  nome: 'Cefaclor 250 mg/5 mL',
  nomesComerciais: ['Ceclor'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Cefalosporina (2ª geração)',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
  },
  doseUsualTexto: '20-40 mg/kg/dia 8/8h',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '60 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 20,
    doseMaxMgKg: 40,
    doseUsualMgKg: 30,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1 mL (para 30 mg/kg/dia, 3x/dia)',
  },
  restricaoIdade: {
    idadeMinima: '≥ 6 meses',
  },
  observacoes: 'Pode causar rash cutâneo. Tomar com alimentos.',
  alertas: ['Pode causar rash cutâneo', 'Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 30;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = (dosePorTomadaMg / 250) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
