/**
 * Zinco 2 mg/mL - Unizinco Suspensão
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'zinco-2mg-ml',
  nome: 'Zinco 2 mg/mL (Suspensão Oral)',
  nomesComerciais: ['Unizinco'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Suplemento mineral' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '<6 meses: 10 mg/dia | ≥6 meses: 20 mg/dia (por 10-14 dias)',
  doseMinima: '10 mg/dia',
  doseMaxima: '20 mg/dia',
  parametrosCalculo: {
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 2,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '<6m: 5 mL/dia | ≥6m: 10 mL/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Usar por 10-14 dias em diarreia aguda. OMS recomenda.',
  alertas: ['Tratar por 10-14 dias'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = 20;
  let volumeMl = 10;
  if (idade !== undefined && idade < 0.5) {
    doseMg = 10;
    volumeMl = 5;
  }
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (por 10-14 dias)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
