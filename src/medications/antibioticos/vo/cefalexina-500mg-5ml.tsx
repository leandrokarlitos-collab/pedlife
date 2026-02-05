/**
 * Cefalexina 500 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefalexina-500mg-5ml',
  nome: 'Cefalexina 500 mg/5 mL',
  nomesComerciais: ['Keflex'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Cefalosporina (1ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '30-50 mg/kg/dia 6/6h ou 8/8h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '100 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 50,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 500,
    concentracaoDenominadorMl: 5,
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 50;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = (dosePorTomadaMg / 500) * 5;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
