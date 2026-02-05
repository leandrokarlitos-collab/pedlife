/**
 * Cefixima 100 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefixima-100mg-5ml',
  nome: 'Cefixima 100 mg/5 mL',
  nomesComerciais: ['Pananixime', 'Cefixima Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Cefalosporina (3ª geração)',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '8-10 mg/kg/dia 12/12h',
  doseMinima: '8 mg/kg/dia',
  doseMaxima: '12 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 100,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,5 mL (para 10 mg/kg/dia)',
  },
  restricaoIdade: { idadeMinima: '≥ 6 meses' },
  observacoes: 'Uso prático 1-2x/dia. Pode ser tomado com ou sem alimentos.',
  alertas: ['Verificar alergia a cefalosporinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 10;
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 100) * 5;
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
