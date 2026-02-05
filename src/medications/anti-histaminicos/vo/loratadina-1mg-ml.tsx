/**
 * Loratadina 1 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'loratadina-1mg-ml',
  nome: 'Loratadina 1 mg/mL (Xarope)',
  nomesComerciais: ['Claritin', 'Loratadina Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope',
  classe: {
    nome: 'Anti-histamínico de 2ª geração',
    descricao: 'Anti-histamínico não sedativo',
  },
  categoria: 'anti-histaminicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: `Dose única diária:
- > 12 anos: 10 mL (10 mg)
- 2 a 12 anos (>30 kg): 10 mL (10 mg)
- 2 a 12 anos (<30 kg): 5 mL (5 mg)`,
  doseMinima: '5 mg/dia (5 mL)',
  doseMaxima: '10 mg/dia (10 mL)',
  parametrosCalculo: {
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 1,
    concentracaoDenominadorMl: 1,
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 anos',
  },
  observacoes: 'Pode ser tomado com ou sem alimentos. Não administrar em crianças menores de 2 anos.',
  alertas: ['Não usar em < 2 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl: number;
  let doseMg: number;

  if (peso >= 30 || (idade !== undefined && idade >= 12)) {
    volumeMl = 10;
    doseMg = 10;
  } else {
    volumeMl = 5;
    doseMg = 5;
  }

  const alertas: string[] = [];
  if (idade !== undefined && idade < 2) {
    alertas.push('Não recomendado para < 2 anos');
  }

  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (dose única diária)',
    observacoes: ['Dose fixa por peso/idade'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
