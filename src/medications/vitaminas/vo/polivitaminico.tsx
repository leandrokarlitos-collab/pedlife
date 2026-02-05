/**
 * Polivitamínico (Protovit Plus) - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'polivitaminico',
  nome: 'Polivitamínico (Protovit Plus) Gotas',
  nomesComerciais: ['Protovit Plus', 'Ad-til', 'Lavitan Infantil'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas) - Complexo vitamínico A, D, C, B1, B2, B6, Nicotinamida',
  classe: { nome: 'Suplemento vitamínico' },
  categoria: 'vitaminas',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '< 1 ano: 10-12 gotas/dia | 1-3 anos: 12-15 gotas/dia | > 3 anos: 15-20 gotas/dia',
  doseMinima: '10 gotas/dia',
  doseMaxima: '20 gotas/dia',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: 'Lactentes' },
  observacoes: 'Suplementação vitamínica. Pode ser dado diretamente ou diluído em leite/suco.',
  alertas: ['Não exceder dose recomendada', 'Guardar em local fresco'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let gotas = 15;
  if (idade !== undefined && idade < 1) {
    gotas = 10;
  } else if (idade && idade >= 1 && idade < 3) {
    gotas = 12;
  } else if (idade && idade >= 3) {
    gotas = 15;
  }
  return {
    doseCalculada: `${gotas} gotas`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '1x ao dia',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
