/**
 * Cetoprofeno 100 mg - Pó para Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cetoprofeno-ev',
  nome: 'Cetoprofeno 100 mg (Pó para Solução Injetável)',
  nomesComerciais: ['Profenid EV', 'Cetoprofeno'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Pó para Solução Injetável 100 mg',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água para injeção ou SF 0,9%',
    volumeReconstituicao: '5 mL (IM) ou 100-150 mL (EV)',
    concentracaoFinal: '20 mg/mL (IM)',
  },
  diluicao: {
    diluente: 'SF 0,9% ou SG 5%',
    tempoInfusao: '20-30 minutos (EV)',
  },
  doseUsualTexto: '1-2 mg/kg/dose 8/8h ou 12/12h (máx 100 mg/dose)',
  doseMinima: '1 mg/kg/dose',
  doseMaxima: '2 mg/kg/dose (máx 100 mg/dose, 300 mg/dia)',
  parametrosCalculo: {
    doseUsualMgKg: 1,
    intervalo: '8/8h ou 12/12h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 1-2 mg/kg',
  },
  restricaoIdade: { idadeMinima: '≥ 15 anos (uso pediátrico off-label)' },
  observacoes: 'AINE potente. Uso pediátrico limitado. Preferir vias VO quando possível.',
  alertas: ['Uso limitado em pediatria', 'Risco GI e renal', 'Infundir lentamente'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 1;
  if (doseMg > 100) doseMg = 100;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${(doseMg / 20).toFixed(1)} mL (após reconstituição)`,
    unidade: 'mg',
    intervalo: '8/8h ou 12/12h',
    alertas: ['Infundir em 20-30 min se EV'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
