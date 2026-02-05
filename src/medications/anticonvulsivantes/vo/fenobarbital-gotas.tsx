/**
 * Fenobarbital 40 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'fenobarbital-40mg-ml-gotas',
  nome: 'Fenobarbital 40 mg/mL (Gotas)',
  nomesComerciais: ['Gardenal Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas)',
  classe: { nome: 'Anticonvulsivante (barbitúrico)' },
  categoria: 'anticonvulsivantes',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '3-5 mg/kg/dia VO 12/12h ou 24/24h',
  doseMinima: '3 mg/kg/dia',
  doseMaxima: '300 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 4,
    intervalo: '12/12h ou 24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 40,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '1 gota = 1 mg | Peso (kg) × 4 gotas/dia',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: '1 gota = 1 mg. Causa sonolência. Nível terapêutico: 15-40 mcg/mL.',
  alertas: ['Causa sonolência', '1 gota = 1 mg', 'Monitorar nível sérico'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 4;
  if (doseDiariaMg > 300) doseDiariaMg = 300;
  const gotas = Math.round(doseDiariaMg);
  return {
    doseCalculada: `${doseDiariaMg.toFixed(0)} mg/dia`,
    volumeCalculado: `${gotas} gotas/dia`,
    unidade: 'gotas',
    intervalo: '24/24 horas (ou dividir 12/12h)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
