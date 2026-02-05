/**
 * Eritromicina Etilsuccinato 200 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'eritromicina-etilsuccinato-200mg-5ml',
  nome: 'Eritromicina Etilsuccinato 200 mg/5 mL',
  nomesComerciais: ['Eritrex', 'Pantomicina'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: { nome: 'Macrolídeo' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '30-50 mg/kg/dia 6/6h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '50 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 40,
    intervalo: '6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,25 mL 6/6h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Pode ser administrado com alimentos (melhor tolerância GI que estearato).',
  alertas: ['Pode causar desconforto gastrointestinal'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 40;
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = (dosePorTomadaMg / 200) * 5;
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
