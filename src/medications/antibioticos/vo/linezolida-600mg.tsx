/**
 * Linezolida 600 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'linezolida-600mg',
  nome: 'Linezolida 600 mg',
  nomesComerciais: ['Zyvox'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Oxazolidinona' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '10 mg/kg/dose 8/8h (máx 600 mg/dose)',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '1200 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 10 mg 8/8h (máx 600 mg/dose)',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 40 kg' },
  observacoes: 'Monitorar hemograma semanal. Evitar tiramina na dieta.',
  alertas: ['Monitorar hemograma semanalmente', 'Evitar alimentos com tiramina'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let dosePorTomadaMg = peso * 10;
  if (dosePorTomadaMg > 600) dosePorTomadaMg = 600;
  const numComprimidos = dosePorTomadaMg / 600;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '8/8 horas',
    alertas: peso < 40 ? ['Peso < 40 kg: preferir suspensão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
