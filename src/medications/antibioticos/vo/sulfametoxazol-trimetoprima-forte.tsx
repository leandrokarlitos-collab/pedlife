/**
 * Sulfametoxazol + Trimetoprima F 800/160 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'sulfametoxazol-trimetoprima-800-160mg',
  nome: 'Sulfametoxazol + Trimetoprima F 800/160 mg',
  nomesComerciais: ['Bactrim F', 'Infectrin F'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Sulfonamida + Inibidor da diidrofolato redutase' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1 comprimido 12/12h (adultos)',
  doseMinima: '160 mg/dia de TMP',
  doseMaxima: '320 mg/dia de TMP',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Dose baseada em Trimetoprima (TMP)',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 40 kg' },
  observacoes: 'Manter boa hidratação. Formulação "Forte" com dose dobrada.',
  alertas: ['Manter hidratação adequada', 'G6PD: risco de hemólise'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseTMPPorTomada = 160;
  const numComprimidos = 1;
  return {
    doseCalculada: `${doseTMPPorTomada} mg de TMP`,
    volumeCalculado: `${numComprimidos} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    alertas: peso < 40 ? ['Peso < 40 kg: usar formulação normal ou suspensão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
