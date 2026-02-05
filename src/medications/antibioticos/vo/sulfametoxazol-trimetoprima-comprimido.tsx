/**
 * Sulfametoxazol + Trimetoprima 400/80 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'sulfametoxazol-trimetoprima-400-80mg',
  nome: 'Sulfametoxazol + Trimetoprima 400/80 mg',
  nomesComerciais: ['Bactrim', 'Infectrin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Sulfonamida + Inibidor da diidrofolato redutase' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '8-12 mg/kg/dia de TMP 12/12h',
  doseMinima: '8 mg/kg/dia de TMP',
  doseMaxima: '320 mg/dia de TMP',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Dose baseada em Trimetoprima (TMP)',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Manter boa hidratação. Evitar em < 2 meses (exceto P. jirovecii).',
  alertas: ['Manter hidratação adequada', 'G6PD: risco de hemólise'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  // Dose baseada em TMP (Trimetoprima)
  let doseTMPDiaria = peso * 10;
  if (doseTMPDiaria > 320) doseTMPDiaria = 320;
  const doseTMPPorTomada = doseTMPDiaria / 2;
  const numComprimidos = doseTMPPorTomada / 80;
  return {
    doseCalculada: `${doseTMPPorTomada.toFixed(0)} mg de TMP`,
    volumeCalculado: `${numComprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
