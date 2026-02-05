/**
 * Clindamicina 300 mg - Cápsula
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'clindamicina-300mg',
  nome: 'Clindamicina 300 mg',
  nomesComerciais: ['Dalacin C'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula Oral',
  classe: { nome: 'Lincosamida' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '20-40 mg/kg/dia 6/6h ou 8/8h',
  doseMinima: '20 mg/kg/dia',
  doseMaxima: '1800 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 30,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 10 mg 8/8h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 40 kg' },
  observacoes: 'Ingerir com bastante água. Pode causar colite pseudomembranosa.',
  alertas: ['Risco de colite pseudomembranosa', 'Ingerir com bastante água'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 30;
  if (doseDiariaMg > 1800) doseDiariaMg = 1800;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const numCapsulas = dosePorTomadaMg / 300;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${numCapsulas.toFixed(1)} cápsula(s)`,
    unidade: 'cápsula(s)',
    intervalo: '8/8 horas',
    alertas: peso < 40 ? ['Peso < 40 kg: considerar cápsula de 150mg'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
