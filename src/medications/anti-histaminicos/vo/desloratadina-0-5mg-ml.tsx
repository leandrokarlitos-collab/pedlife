/**
 * Desloratadina 0,5 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'desloratadina-0-5mg-ml',
  nome: 'Desloratadina 0,5 mg/mL (Xarope)',
  nomesComerciais: ['Desalex', 'Esalerg'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope',
  classe: {
    nome: 'Anti-histamínico de 2ª geração',
    descricao: 'Anti-histamínico não sedativo',
  },
  categoria: 'anti-histaminicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: `Dose fixa por idade, 1x ao dia:
- 6 a 11 meses: 2 mL (1 mg)
- 1 a 5 anos: 2,5 mL (1,25 mg)
- 6 a 11 anos: 5 mL (2,5 mg)
- ≥ 12 anos: 10 mL (5 mg)`,
  doseMinima: '1 mg/dia (2 mL)',
  doseMaxima: '5 mg/dia (10 mL)',
  parametrosCalculo: {
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 0.5,
    concentracaoDenominadorMl: 1,
  },
  observacoes: 'Pode ser administrado com ou sem alimentos. Usar com cuidado em pacientes com histórico de convulsão ou insuficiência renal grave.',
  alertas: ['Cautela em insuficiência renal grave'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  // Dose fixa por faixa etária
  let volumeMl: number;
  let doseMg: number;
  let faixaEtaria: string;

  if (idade === undefined) {
    // Se idade não fornecida, estimar pela peso
    if (peso < 8) {
      volumeMl = 2; doseMg = 1; faixaEtaria = '6-11 meses';
    } else if (peso < 20) {
      volumeMl = 2.5; doseMg = 1.25; faixaEtaria = '1-5 anos';
    } else if (peso < 40) {
      volumeMl = 5; doseMg = 2.5; faixaEtaria = '6-11 anos';
    } else {
      volumeMl = 10; doseMg = 5; faixaEtaria = '≥ 12 anos';
    }
  } else {
    if (idade < 1) {
      volumeMl = 2; doseMg = 1; faixaEtaria = '6-11 meses';
    } else if (idade < 6) {
      volumeMl = 2.5; doseMg = 1.25; faixaEtaria = '1-5 anos';
    } else if (idade < 12) {
      volumeMl = 5; doseMg = 2.5; faixaEtaria = '6-11 anos';
    } else {
      volumeMl = 10; doseMg = 5; faixaEtaria = '≥ 12 anos';
    }
  }

  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '24/24 horas (dose única diária)',
    observacoes: [`Faixa etária estimada: ${faixaEtaria}`, 'Dose fixa por idade'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
