/**
 * Amoxicilina + Clavulanato 500 + 125 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-clavulanato-500-125mg',
  nome: 'Amoxicilina + Clavulanato 500 + 125 mg',
  nomesComerciais: ['Clavulin', 'Clavulin BD'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: {
    nome: 'Penicilina + Inibidor de beta-lactamase',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '30 a 50 mg/kg/dia, por via oral a cada 12/12h',
  doseMinima: '30 mg/kg/dia',
  doseMaxima: '1500 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 40,
    doseMaxDiariaMg: 1500,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 25 ÷ 500 = nº CP de 12/12h',
  },
  restricaoIdade: {
    pesoMinimo: '≥ 20 kg',
  },
  observacoes: 'Administrar no início das refeições.',
  alertas: ['Verificar alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 40, 1500);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const numComprimidos = dosePorTomadaMg / 500;

  const alertas: string[] = [];
  if (peso < 20) alertas.push('Peso < 20 kg: preferir suspensão');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
