/**
 * Domperidona 1 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'domperidona-1mg-ml',
  nome: 'Domperidona 1 mg/mL (Suspensão Oral)',
  nomesComerciais: ['Motilium'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: {
    nome: 'Procinético/Antiemético',
    descricao: 'Antagonista dopaminérgico periférico',
  },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Crianças e adolescentes (<12 anos ou <35 kg): 0,25 mg/kg/dose, 3 a 4 vezes ao dia',
  doseMinima: '0,25 mg/kg/dose',
  doseMaxima: '0,75 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 0.25,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 1,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,25 mL por dose',
  },
  observacoes: 'Administrar antes das refeições.',
  alertas: ['Administrar antes das refeições', 'Raro: prolongamento QT'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = peso * 0.25;
  const volumeMl = dosePorTomadaMg / 1;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(2)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas (antes das refeições)',
    observacoes: ['Administrar 15-30 min antes das refeições'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
