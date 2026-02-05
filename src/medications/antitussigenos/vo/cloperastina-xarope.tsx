/**
 * Cloperastina 3,54 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cloperastina-xarope',
  nome: 'Cloperastina 3,54 mg/mL (Xarope)',
  nomesComerciais: ['Sekisan Xarope'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 3,54 mg/mL (17,7 mg/5 mL)',
  classe: { nome: 'Antitussígeno de ação central' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-6 anos: 2,5 mL 8/8h | 6-12 anos: 5 mL 8/8h | > 12 anos: 10 mL 8/8h',
  doseMinima: '2,5 mL/dose',
  doseMaxima: '10 mL/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 3.54,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Antitussígeno de ação central não narcótico. Pode causar leve sedação.',
  alertas: ['Pode causar sonolência', 'Não usar em tosse produtiva'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let volumeMl = 5;
  if (idade && idade >= 2 && idade < 6) {
    volumeMl = 2.5;
  } else if (idade && idade >= 6 && idade < 12) {
    volumeMl = 5;
  } else if (idade && idade >= 12) {
    volumeMl = 10;
  }
  const doseMg = volumeMl * 3.54;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
