/**
 * Cefdinir 300 mg - Cápsula
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cefdinir-300mg',
  nome: 'Cefdinir 300 mg',
  nomesComerciais: ['Omnicef', 'Sefdin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula Oral',
  classe: { nome: 'Cefalosporina (3ª geração)' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '300 mg 12/12h ou 600 mg 24/24h',
  doseMinima: '300 mg/dia',
  doseMaxima: '600 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 14,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Dose fixa: 300 mg 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 40 kg' },
  observacoes: 'Pode ser administrado com ou sem alimentos.',
  alertas: ['Pode causar fezes avermelhadas (sem significado clínico)'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = 300;
  const numCapsulas = 1;
  return {
    doseCalculada: `${dosePorTomadaMg} mg`,
    volumeCalculado: `${numCapsulas} cápsula(s)`,
    unidade: 'cápsula(s)',
    intervalo: '12/12 horas',
    alertas: peso < 40 ? ['Peso < 40 kg: preferir suspensão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
