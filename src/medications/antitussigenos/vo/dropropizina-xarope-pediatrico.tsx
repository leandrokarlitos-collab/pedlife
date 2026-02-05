/**
 * Dropropizina 1,5 mg/mL - Xarope Pediátrico
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dropropizina-xarope-pediatrico',
  nome: 'Dropropizina 1,5 mg/mL (Xarope Pediátrico)',
  nomesComerciais: ['Vibral Pediátrico', 'Notuss Pediátrico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Xarope 1,5 mg/mL (7,5 mg/5 mL)',
  classe: { nome: 'Antitussígeno não opioide' },
  categoria: 'antitussigenos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2-3 anos: 2,5-5 mL 6/6h | 4-6 anos: 5 mL 6/6h | 7-12 anos: 5-10 mL 6/6h',
  doseMinima: '2,5 mL/dose',
  doseMaxima: '10 mL/dose',
  parametrosCalculo: {
    doseUsualMgKg: 1,
    intervalo: '6/6h ou 8/8h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 1.5,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 1 mg/kg ÷ 1,5 mg/mL',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Formulação pediátrica com menor concentração. Indicado para tosse seca.',
  alertas: ['Contraindicado em < 2 anos', 'Não usar em tosse produtiva'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 1;
  if (doseMg > 15) doseMg = 15;
  const volumeMl = doseMg / 1.5;
  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: '6/6h ou 8/8h',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
