/**
 * Amoxicilina 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-500mg',
  nome: 'Amoxicilina 500 mg',
  nomesComerciais: ['Amoxil', 'Novamox'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: {
    nome: 'Penicilina',
    descricao: 'Antibiótico beta-lactâmico de amplo espectro',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '50 a 90 mg/kg/dia, por via oral a cada 12/12h',
  doseMinima: '50 mg/kg/dia',
  doseMaxima: '2000 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 50,
    doseMaxMgKg: 90,
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 2000,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 25 ÷ 500 = nº CP de 12/12h',
  },
  restricaoIdade: {
    pesoMinimo: '≥ 20 kg',
    observacao: 'Para crianças com peso ≥ 20 kg que conseguem deglutir comprimidos',
  },
  observacoes: 'Pode ser tomado com ou sem alimentos.',
  alertas: ['Verificar histórico de alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 50, 2000);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const numComprimidos = dosePorTomadaMg / 500;

  const alertas: string[] = [];
  if (peso < 20) alertas.push('Peso < 20 kg: preferir suspensão oral');
  if (peso * 50 >= 2000) alertas.push('Dose máxima diária atingida');

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
