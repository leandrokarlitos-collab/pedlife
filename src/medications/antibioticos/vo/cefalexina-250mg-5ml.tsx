/**
 * Cefalexina 250 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefalexina-250mg-5ml',
  nome: 'Cefalexina 250 mg/5 mL',
  nomesComerciais: ['Keflex', 'Cefalexina Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Cefalosporina (1ª geração)',
    descricao: 'Cefalosporina de primeira geração para infecções de pele e ITU',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
    estabilidade: 'Válido por 14 dias sob refrigeração',
  },
  doseUsualTexto: '30-50 mg/kg/dia 6/6h ou 8/8h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '100 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 30,
    doseMaxMgKg: 50,
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 4000,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1 mL (para 50 mg/kg/dia, 4x/dia)',
  },
  restricaoIdade: {
    idadeMinima: '≥ 1 ano',
  },
  observacoes: 'Amplo uso em ITU e infecções de pele. Pode ser tomada com ou sem alimentos.',
  alertas: ['Verificar alergia a cefalosporinas e penicilinas (reação cruzada)'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 50, 4000);
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = (dosePorTomadaMg / 250) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Agitar bem antes de usar'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
