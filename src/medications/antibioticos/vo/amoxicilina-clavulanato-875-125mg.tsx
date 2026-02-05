/**
 * Amoxicilina + Clavulanato 875 + 125 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-clavulanato-875-125mg',
  nome: 'Amoxicilina + Clavulanato 875 + 125 mg',
  nomesComerciais: ['Clavulin BD'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: {
    nome: 'Penicilina + Inibidor de beta-lactamase',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '50 mg/kg/dia, por via oral a cada 12/12h',
  doseMinima: '50 mg/kg/dia',
  doseMaxima: '1750 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 1750,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 25 ÷ 875 = nº CP de 12/12h',
  },
  restricaoIdade: {
    pesoMinimo: '≥ 35 kg',
    observacao: '≥ 30kg',
  },
  observacoes: 'Administrar no início das refeições.',
  alertas: ['Verificar alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 50, 1750);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const numComprimidos = dosePorTomadaMg / 875;

  const alertas: string[] = [];
  if (peso < 35) alertas.push('Peso < 35 kg: preferir outra apresentação');

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
