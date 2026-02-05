/**
 * Timomodulina 20 mg/mL - Xarope (Leucogen)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'timomodulina',
  nome: 'Timomodulina 20 mg/mL (Leucogen Xarope)',
  nomesComerciais: ['Leucogen'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 20 mg/mL (100 mg/5 mL)',
  classe: { nome: 'Imunomodulador' },
  categoria: 'vitaminas',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1-6 anos: 2,5-5 mL/dia | > 6 anos: 5-10 mL/dia',
  doseMinima: '2,5 mL/dia',
  doseMaxima: '10 mL/dia',
  parametrosCalculo: {
    doseUsualMgKg: 2,
    intervalo: '24/24h',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 20,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Imunomodulador derivado do timo. Usado em infecções respiratórias de repetição.',
  alertas: ['Uso prolongado (60-90 dias)', 'Não usar em imunodeprimidos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl = 5;
  if (idade && idade >= 1 && idade < 6) {
    volumeMl = 2.5;
  } else if (idade && idade >= 6) {
    volumeMl = 5;
  }
  const doseMg = volumeMl * 20;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '1x ao dia',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
