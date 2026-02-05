/**
 * Zinco 10 mg/mL - Biozinc Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'zinco-10mg-ml-gotas',
  nome: 'Zinco 10 mg/mL (Gotas)',
  nomesComerciais: ['Biozinc'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas)',
  classe: { nome: 'Suplemento mineral' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '<6 meses: 10 mg/dia | ≥6 meses: 20 mg/dia (por 10-14 dias)',
  doseMinima: '10 mg/dia',
  doseMaxima: '20 mg/dia',
  parametrosCalculo: {
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 10,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '<6m: 1 mL/dia | ≥6m: 2 mL/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Usar por 10-14 dias em diarreia aguda. 1 mL = 20 gotas.',
  alertas: ['Tratar por 10-14 dias', '1 mL = 20 gotas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = 20;
  let volumeMl = 2;
  if (idade !== undefined && idade < 0.5) {
    doseMg = 10;
    volumeMl = 1;
  }
  const gotas = volumeMl * 20;
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL (${gotas} gotas)`,
    unidade: 'mL',
    intervalo: '24/24 horas (por 10-14 dias)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
