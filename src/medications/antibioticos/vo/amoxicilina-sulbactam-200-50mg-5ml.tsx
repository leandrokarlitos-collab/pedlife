/**
 * Amoxicilina + Sulbactam 200 + 50 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-sulbactam-200-50mg-5ml',
  nome: 'Amoxicilina + Sulbactam 200 + 50 mg/5 mL',
  nomesComerciais: ['Trifamox IBL'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Penicilina + Inibidor de beta-lactamase',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '30 a 50 mg/kg/dia, por via oral a cada 8/8h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '100 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 30,
    doseMaxMgKg: 50,
    doseUsualMgKg: 40,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 1 mL (para 40 mg/kg/dia, 3x/dia)',
  },
  restricaoIdade: { idadeMinima: '≥ 2 meses' },
  observacoes: 'Uso menos comum. Alternativa à amoxicilina+clavulanato.',
  alertas: ['Verificar alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 40;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = (dosePorTomadaMg / 200) * 5;
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
