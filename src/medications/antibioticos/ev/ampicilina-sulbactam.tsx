/**
 * Ampicilina + Sulbactam 1,5 g - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ampicilina-sulbactam-1-5g',
  nome: 'Ampicilina + Sulbactam 1,5 g',
  nomesComerciais: ['Unasyn'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Penicilina + Inibidor de beta-lactamase' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'SF 0,9% ou SG 5%',
    volumeReconstituicao: '50-100 mL',
    concentracaoFinal: '15-30 mg/mL',
    estabilidade: '8h em temperatura ambiente',
  },
  diluicao: {
    volumeMinimo: '50 mL',
    volumeMaximo: '100 mL',
    tempoInfusao: '15-30 min',
  },
  doseUsualTexto: '100-200 mg/kg/dia de ampicilina 6/6h',
  doseMinima: '100 mg/kg/dia',
  doseMaxima: '8000 mg/dia de ampicilina',
  parametrosCalculo: {
    doseUsualMgKg: 150,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × ~38 mg 6/6h (de ampicilina)',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Proporção 2:1 (ampicilina:sulbactam). Infundir em 15-30 min.',
  alertas: ['Verificar alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaAmpMg = peso * 150;
  if (doseDiariaAmpMg > 8000) doseDiariaAmpMg = 8000;
  const dosePorTomadaAmpMg = doseDiariaAmpMg / 4;
  return {
    doseCalculada: `${dosePorTomadaAmpMg.toFixed(0)} mg de ampicilina`,
    volumeCalculado: 'Conforme reconstituição',
    unidade: 'mg',
    intervalo: '6/6 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
