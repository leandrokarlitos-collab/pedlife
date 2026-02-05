/**
 * Pelargonium sidoides 825 mg/mL - Gotas (Kaloba)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'pelargonium-gotas',
  nome: 'Pelargonium sidoides 825 mg/mL (Kaloba Gotas)',
  nomesComerciais: ['Kaloba Gotas'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) 825 mg/mL de extrato de raiz de Pelargonium',
  classe: { nome: 'Fitoterápico / Imunomodulador' },
  categoria: 'vitaminas',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1-5 anos: 10 gotas 8/8h | 6-12 anos: 20 gotas 8/8h | > 12 anos: 30 gotas 8/8h',
  doseMinima: '10 gotas 8/8h',
  doseMaxima: '30 gotas 8/8h',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Fitoterápico para IVAS. Uso por 5-7 dias. Pode diluir em água ou suco.',
  alertas: ['Fitoterápico', 'Usar por 5-7 dias'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let gotas = 20;
  if (idade && idade >= 1 && idade < 6) {
    gotas = 10;
  } else if (idade && idade >= 6 && idade < 12) {
    gotas = 20;
  } else if (idade && idade >= 12) {
    gotas = 30;
  }
  return {
    doseCalculada: `${gotas} gotas`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
