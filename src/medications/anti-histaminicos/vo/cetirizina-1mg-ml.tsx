/**
 * Cetirizina 1 mg/mL - Solução Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cetirizina-1mg-ml',
  nome: 'Dicloridrato de Cetirizina 1 mg/mL',
  nomesComerciais: ['Zyrtec', 'Cetrizin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral',
  classe: {
    nome: 'Anti-histamínico de 2ª geração',
  },
  categoria: 'anti-histaminicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: `Dose fixa por idade:
- > 12 anos: 10 mL (10 mg), 1x ao dia
- 6 a 12 anos: 5 mL (5 mg), 2x ao dia
- 2 a 6 anos: 2,5 mL (2,5 mg), 2x ao dia`,
  doseMinima: '5 mg/dia',
  doseMaxima: '10 mg/dia',
  parametrosCalculo: {
    intervalo: '24/24h ou 12/12h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 1,
    concentracaoDenominadorMl: 1,
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 anos',
  },
  observacoes: 'Pode ser tomado com ou sem alimentos. Pode causar sonolência. Não ingerir álcool.',
  alertas: ['Pode causar sonolência', 'Evitar álcool'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl: number;
  let doseMg: number;
  let intervalo: string;

  if (idade !== undefined && idade >= 12) {
    volumeMl = 10; doseMg = 10; intervalo = '24/24h';
  } else if (idade !== undefined && idade >= 6) {
    volumeMl = 5; doseMg = 5; intervalo = '12/12h (2x/dia)';
  } else {
    volumeMl = 2.5; doseMg = 2.5; intervalo = '12/12h (2x/dia)';
  }

  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo,
    observacoes: ['Dose fixa por idade'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
