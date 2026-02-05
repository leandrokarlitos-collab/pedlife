/**
 * Cloperastina 35,4 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cloperastina-suspensao',
  nome: 'Cloperastina 35,4 mg/mL (Suspensão Oral)',
  nomesComerciais: ['Sekisan Suspensão'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral 35,4 mg/mL (1 mL = 20 gotas)',
  classe: { nome: 'Antitussígeno de ação central' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-6 anos: 5-10 gotas 8/8h | 6-12 anos: 10-20 gotas 8/8h | > 12 anos: 20-40 gotas 8/8h',
  doseMinima: '5 gotas/dose',
  doseMaxima: '40 gotas/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 35.4,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Concentração 10x maior que o xarope. Usar com cuidado na dosagem.',
  alertas: ['Atenção: concentração alta', 'Pode causar sonolência'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let gotas = 10;
  if (idade && idade >= 2 && idade < 6) {
    gotas = 8;
  } else if (idade && idade >= 6 && idade < 12) {
    gotas = 15;
  } else if (idade && idade >= 12) {
    gotas = 30;
  }
  const volumeMl = gotas / 20;
  const doseMg = volumeMl * 35.4;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${gotas} gotas`,
    unidade: 'gotas',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
