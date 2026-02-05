/**
 * Cefadroxila 250 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefadroxila-250mg-5ml',
  nome: 'Cefadroxila 250 mg/5 mL',
  nomesComerciais: ['Cefamox', 'Cefadroxila Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Cefalosporina (1ª geração)',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
    estabilidade: 'Válido por 14 dias sob refrigeração',
  },
  doseUsualTexto: '30-50 mg/kg/dia 12/12h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '100 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 30,
    doseMaxMgKg: 50,
    doseUsualMgKg: 30,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1 mL (para 30 mg/kg/dia, 2x/dia)',
  },
  restricaoIdade: {
    idadeMinima: '≥ 1 ano',
  },
  observacoes: 'Alternativa à cefalexina. Pode ser tomada com ou sem alimentos.',
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 30;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 250) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
