/**
 * Acetilcisteína 40 mg/mL - Xarope Adulto
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'acetilcisteina-xarope-adulto',
  nome: 'Acetilcisteína 40 mg/mL (Xarope Adulto)',
  nomesComerciais: ['Fluimucil Adulto', 'Acetilcisteína'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 40 mg/mL (200 mg/5 mL)',
  classe: { nome: 'Mucolítico' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '> 12 anos e adultos: 200 mg (5 mL) 8/8h ou 600 mg (15 mL) 1x/dia',
  doseMinima: '200 mg/dose',
  doseMaxima: '600 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '8/8h ou 24/24h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 40,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '200 mg 8/8h ou 600 mg 1x/dia',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Mucolítico potente. Pode ser usado 600 mg dose única diária.',
  alertas: ['Aumentar ingestão de líquidos', 'Usar formulação pediátrica em < 12 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMg = 200;
  const volumeMl = 5;
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas (ou 600 mg 1x/dia)',
    alertas: idade && idade < 12 ? ['Usar formulação pediátrica'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
