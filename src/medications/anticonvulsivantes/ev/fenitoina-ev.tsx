/**
 * Fenitoína 50 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'fenitoina-50mg-ml-ev',
  nome: 'Fenitoína 50 mg/mL (Solução Injetável)',
  nomesComerciais: ['Hidantal'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Anticonvulsivante (hidantoína)' },
  categoria: 'anticonvulsivantes',
  reconstituicao: { necessaria: false },
  diluicao: {
    volumeMinimo: 'SF 0,9% apenas',
    tempoInfusao: 'Máx 1 mg/kg/min (máx 50 mg/min)',
  },
  doseUsualTexto: 'Ataque: 15-20 mg/kg EV | Manutenção: 5-7 mg/kg/dia',
  doseMinima: '15 mg/kg (ataque)',
  doseMaxima: '1500 mg (ataque)',
  parametrosCalculo: {
    doseUsualMgKg: 20,
    intervalo: 'Dose única (ataque)',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,4 mL (ataque)',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Infundir em SF 0,9% APENAS. Velocidade máx 1 mg/kg/min.',
  alertas: ['Apenas SF 0,9%', 'Infundir muito lentamente', 'Monitorar ECG e PA'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 20;
  if (doseMg > 1500) doseMg = 1500;
  const volumeMl = doseMg / 50;
  const tempoInfusaoMin = doseMg / (peso * 1);
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg (ataque)`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mg',
    intervalo: `Infundir em ≥ ${Math.ceil(tempoInfusaoMin)} min`,
    alertas: ['Monitorar ECG durante infusão'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
