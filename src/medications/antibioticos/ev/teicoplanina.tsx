/**
 * Teicoplanina 400 mg - Injetável EV/IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'teicoplanina-400mg',
  nome: 'Teicoplanina 400 mg',
  nomesComerciais: ['Targocid'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: { nome: 'Glicopeptídeo' },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para injeção',
    volumeReconstituicao: '3 mL',
    concentracaoFinal: '133 mg/mL',
    estabilidade: '24h refrigerado',
  },
  diluicao: {
    volumeMinimo: '50 mL',
    volumeMaximo: '100 mL',
    tempoInfusao: '30 min',
  },
  doseUsualTexto: '10 mg/kg 12/12h (3 doses), depois 10 mg/kg/dia',
  doseMinima: '6 mg/kg/dia',
  doseMaxima: '12 mg/kg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 10,
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 10 mg/dia (manutenção)',
  },
  restricaoIdade: { idadeMinima: '≥ 1 mês' },
  observacoes: 'Dose de ataque: 10 mg/kg 12/12h × 3 doses. Monitorar função renal.',
  alertas: ['Dose de ataque necessária', 'Monitorar função renal'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseManutencaoMg = peso * 10;
  const volumeMl = doseManutencaoMg / 133;
  return {
    doseCalculada: `${doseManutencaoMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mg',
    intervalo: '24/24 horas (manutenção)',
    observacoes: ['Ataque: mesma dose 12/12h × 3 doses'],
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
