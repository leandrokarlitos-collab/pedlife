/**
 * Sulfametoxazol + Trimetoprima 400 + 80 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'sulfametoxazol-trimetoprima-400-80mg-5ml',
  nome: 'Sulfametoxazol + Trimetoprima 400 + 80 mg/5 mL',
  nomesComerciais: ['Bactrim F', 'Infectrin F'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Sulfonamida + Inibidor da diidrofolato redutase' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '8-12 mg/kg/dia de TMP 12/12h',
  doseMinima: '8 mg/kg/dia de TMP',
  doseMaxima: '320 mg/dia de TMP',
  parametrosCalculo: {
    doseUsualMgKg: 8,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 80,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,25 mL 12/12h (baseado em TMP)',
  },
  restricaoIdade: { idadeMinima: '≥ 2 meses' },
  observacoes: 'Formulação "Forte" com concentração dobrada. Manter boa hidratação.',
  alertas: ['Manter hidratação adequada', 'G6PD: risco de hemólise', 'Evitar em < 2 meses'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseTMPDiaria = peso * 8;
  if (doseTMPDiaria > 320) doseTMPDiaria = 320;
  const doseTMPPorTomada = doseTMPDiaria / 2;
  const volumeMl = (doseTMPPorTomada / 80) * 5;
  return {
    doseCalculada: `${doseTMPPorTomada.toFixed(0)} mg de TMP`,
    volumeCalculado: `${Math.round(volumeMl * 10) / 10} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
