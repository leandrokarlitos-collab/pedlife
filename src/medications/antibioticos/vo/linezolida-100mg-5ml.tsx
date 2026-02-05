/**
 * Linezolida 100 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'linezolida-100mg-5ml',
  nome: 'Linezolida 100 mg/5 mL',
  nomesComerciais: ['Zyvox'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Oxazolidinona' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '10 mg/kg/dose 8/8h (máx 600 mg/dose)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '600 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 100,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,5 mL 8/8h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Monitorar hemograma semanal. Evitar tiramina na dieta.',
  alertas: ['Monitorar hemograma semanalmente', 'Evitar alimentos com tiramina'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let dosePorTomadaMg = peso * 10;
  if (dosePorTomadaMg > 600) dosePorTomadaMg = 600;
  const volumeMl = (dosePorTomadaMg / 100) * 5;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
