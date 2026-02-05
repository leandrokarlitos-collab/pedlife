/**
 * Morfina 10 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'morfina-10mg-ml-ev',
  nome: 'Sulfato de Morfina 10 mg/mL',
  nomesComerciais: ['Dimorf', 'Morfina'],
  viaAdministracao: 'EV/IM/SC',
  formaFarmaceutica: 'Ampola 10 mg/mL (1 mL)',
  classe: {
    nome: 'Opioide forte',
    descricao: 'Analgésico opioide potente',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '10-20 mL',
    tempoInfusao: '4-5 min (bolus lento) ou infusão contínua',
  },
  doseUsualTexto: '0,05-0,1 mg/kg/dose 4/4h (EV lento)',
  doseMinima: '0,05 mg/kg/dose',
  doseMaxima: '0,2 mg/kg/dose',
  parametrosCalculo: {
    doseMinMgKg: 0.05,
    doseMaxMgKg: 0.1,
    doseUsualMgKg: 0.1,
    intervalo: '4/4h',
    dosesAoDia: 6,
    concentracaoNumeradorMg: 10,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,05-0,1 mg/kg',
  },
  restricaoIdade: {
    idadeMinima: 'Neonatos (com cautela)',
  },
  observacoes: `Potente analgésico opioide.
Infusão EV DEVE SER LENTA (4-5 minutos).
Risco significativo de depressão respiratória.
Manter antagonista (naloxona) disponível.
Dose neonatal reduzida: 0,025-0,05 mg/kg.`,
  alertas: [
    'Infusão EV muito lenta (4-5 min)',
    'ALTO RISCO de depressão respiratória',
    'Manter naloxona disponível',
    'Monitorar saturação e respiração',
    'Controlado pela Portaria 344 (receita A)',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMgKg = 0.1;
  const doseMg = peso * doseMgKg;
  const volumeMl = doseMg / 10;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  return {
    doseCalculada: `${doseMg.toFixed(2)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '4/4 horas',
    observacoes: [
      'Diluir em 10-20 mL SF 0,9%',
      'Infundir MUITO LENTAMENTE (4-5 min)',
      'Monitorar respiração continuamente',
    ],
    alertas: ['Manter naloxona disponível'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
