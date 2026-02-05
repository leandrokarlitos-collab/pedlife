/**
 * Dexclorfeniramina 0,4 mg/mL - Solução Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dexclorfeniramina-0-4mg-ml',
  nome: 'Maleato de Dexclorfeniramina 0,4 mg/mL',
  nomesComerciais: ['Polaramine'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral',
  classe: {
    nome: 'Anti-histamínico de 1ª geração',
    descricao: 'Anti-histamínico com efeito sedativo',
  },
  categoria: 'anti-histaminicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: `Dose fixa por idade:
- > 12 anos: 5 mL, 3 a 4 vezes por dia
- 6 a 12 anos: 2,5 mL, 3 vezes por dia
- 2 a 6 anos: 1,25 mL, 3 vezes por dia`,
  doseMinima: '1,25 mL (3x/dia)',
  doseMaxima: '> 12a: 12 mg/dia | 6-12a: 6 mg/dia | 2-6a: 3 mg/dia',
  parametrosCalculo: {
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 0.4,
    concentracaoDenominadorMl: 1,
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 anos',
    observacao: 'Contraindicado para menores de 2 anos',
  },
  observacoes: 'Pode causar sonolência; evitar dirigir ou operar máquinas.',
  alertas: ['Causa sonolência', 'Contraindicado < 2 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl: number;
  let doseMg: number;

  if (idade !== undefined && idade >= 12) {
    volumeMl = 5; doseMg = 2;
  } else if (idade !== undefined && idade >= 6) {
    volumeMl = 2.5; doseMg = 1;
  } else {
    volumeMl = 1.25; doseMg = 0.5;
  }

  const alertas: string[] = ['Causa sonolência'];
  if (idade !== undefined && idade < 2) {
    alertas.push('CONTRAINDICADO para menores de 2 anos');
  }

  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas (3x/dia)',
    observacoes: ['Dose fixa por idade'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
