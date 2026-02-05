/**
 * Claritromicina 250 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'claritromicina-250mg-5ml',
  nome: 'Claritromicina 250 mg/5 mL',
  nomesComerciais: ['Klaricid', 'Claritromicina Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Macrolídeo',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água filtrada',
    estabilidade: 'Válido por 14 dias sob refrigeração',
  },
  doseUsualTexto: '7,5 mg/kg/dose, por via oral a cada 12/12h',
  doseMinima: '7,5 mg/kg/dose',
  doseMaxima: '1000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 7.5,
    doseMaxDiariaMg: 1000,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 250,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,15 mL = "mL" de 12/12h',
  },
  restricaoIdade: {
    idadeMinima: '≥ 3 meses',
  },
  observacoes: 'Pode ser tomado com ou sem alimentos.',
  alertas: ['Pode prolongar intervalo QT'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = Math.min(peso * 7.5, 500);
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
