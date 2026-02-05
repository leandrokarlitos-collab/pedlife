/**
 * Acetilcisteína 20 mg/mL - Xarope Pediátrico
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'acetilcisteina-xarope-pediatrico',
  nome: 'Acetilcisteína 20 mg/mL (Xarope Pediátrico)',
  nomesComerciais: ['Fluimucil Pediátrico', 'Acetilcisteína'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 20 mg/mL (100 mg/5 mL)',
  classe: { nome: 'Mucolítico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-6 anos: 100 mg (5 mL) 8/8h | 7-12 anos: 200 mg (10 mL) 8/8h',
  doseMinima: '100 mg/dose',
  doseMaxima: '200 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '8/8h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 20,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Por faixa etária',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Mucolítico potente. Tomar preferencialmente longe das refeições. Aumentar ingestão hídrica.',
  alertas: ['Aumentar ingestão de líquidos', 'Tomar longe das refeições'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = 100;
  if (idade && idade >= 2 && idade < 7) {
    doseMg = 100;
  } else if (idade && idade >= 7 && idade < 12) {
    doseMg = 200;
  } else if (idade && idade >= 12) {
    doseMg = 200;
  }
  const volumeMl = doseMg / 20;
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
