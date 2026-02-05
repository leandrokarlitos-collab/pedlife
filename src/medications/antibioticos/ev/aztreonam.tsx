/**
 * Aztreonam 1000 mg - Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'aztreonam-1000mg',
  nome: 'Aztreonam 1000 mg',
  nomesComerciais: ['Azactam'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Monobactâmico' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para injeção ou SF 0,9%',
    volumeReconstituicao: '10 mL',
    concentracaoFinal: '100 mg/mL',
    estabilidade: '48h refrigerado',
  },
  diluicao: {
    volumeMinimo: '50 mL',
    volumeMaximo: '100 mL',
    tempoInfusao: '20-60 min',
  },
  doseUsualTexto: '90-120 mg/kg/dia 6/6h ou 8/8h (máx 8 g/dia)',
  doseMinima: '90 mg/kg/dia',
  doseMaxima: '8000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 120,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 40 mg 8/8h',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Espectro apenas para Gram-negativos aeróbios. Seguro em alérgicos a penicilina.',
  alertas: ['Sem cobertura para Gram-positivos', 'Seguro em alérgicos a penicilina'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseDiariaMg = peso * 120;
  if (doseDiariaMg > 8000) doseDiariaMg = 8000;
  const dosePorTomadaMg = doseDiariaMg / 3;
  const volumeMl = dosePorTomadaMg / 100;
  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mg',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
