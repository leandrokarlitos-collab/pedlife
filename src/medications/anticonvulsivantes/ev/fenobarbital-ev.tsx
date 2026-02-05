/**
 * Fenobarbital 100 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'fenobarbital-100mg-ml-ev',
  nome: 'Fenobarbital 100 mg/mL (Solução Injetável)',
  nomesComerciais: ['Gardenal'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Solução Injetável',
  classe: { nome: 'Anticonvulsivante (barbitúrico)' },
  categoria: 'anticonvulsivantes',
  reconstituicao: { necessaria: false },
  diluicao: {
    tempoInfusao: 'Máx 1 mg/kg/min (máx 100 mg/min)',
  },
  doseUsualTexto: 'Ataque: 15-20 mg/kg EV | Manutenção: 3-5 mg/kg/dia',
  doseMinima: '15 mg/kg (ataque)',
  doseMaxima: '1000 mg (ataque)',
  parametrosCalculo: {
    doseUsualMgKg: 20,
    intervalo: 'Dose única (ataque)',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 100,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,2 mL (ataque)',
  },
  restricaoIdade: { idadeMinima: 'Neonatos' },
  observacoes: 'Primeira escolha em convulsão neonatal. Pode repetir 5-10 mg/kg.',
  alertas: ['Depressão respiratória', 'Infundir lentamente', 'Monitorar SatO2'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 20;
  if (doseMg > 1000) doseMg = 1000;
  const volumeMl = doseMg / 100;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg (ataque)`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mg',
    intervalo: 'Dose única (pode repetir 5-10 mg/kg)',
    alertas: ['Monitorar respiração'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
