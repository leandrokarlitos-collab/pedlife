/**
 * Dropropizina 3 mg/mL - Xarope Adulto
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dropropizina-xarope-adulto',
  nome: 'Dropropizina 3 mg/mL (Xarope Adulto)',
  nomesComerciais: ['Vibral Xarope', 'Notuss Xarope'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 3 mg/mL (15 mg/5 mL)',
  classe: { nome: 'Antitussígeno não opioide' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '> 12 anos e adultos: 15-30 mg (5-10 mL) 6/6h ou 8/8h',
  doseMinima: '15 mg/dose',
  doseMaxima: '30 mg/dose (máx 120 mg/dia)',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 3,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '5-10 mL por dose',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos' },
  observacoes: 'Antitussígeno de ação periférica. Indicado para tosse seca.',
  alertas: ['Não usar em tosse produtiva', 'Uso em ≥ 12 anos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMg = 15;
  const volumeMl = 5;
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '6/6h ou 8/8h',
    alertas: idade && idade < 12 ? ['Usar formulação pediátrica para < 12 anos'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
