/**
 * Hidróxido de Magnésio - Leite de Magnésia
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'hidroxido-magnesio',
  nome: 'Hidróxido de Magnésio ~85.5 mg/mL (Leite de Magnésia)',
  nomesComerciais: ['Leite de Magnésia Phillips'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Laxativo osmótico / Antiácido' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Laxante: 0,5 mL/kg/dose | Antiácido: 2,5-5 mL/dose',
  doseMinima: '2,5 mL/dose',
  doseMaxima: '30 mL/dose',
  parametrosCalculo: {
    intervalo: 'SOS ou 8/8h',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 0,5 mL/dose (laxante)',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Agitar antes de usar. Efeito laxante em 30 min a 6h.',
  alertas: ['Evitar uso prolongado', 'Pode causar diarreia'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let volumeMl = peso * 0.5;
  if (volumeMl > 30) volumeMl = 30;
  return {
    doseCalculada: `${volumeMl.toFixed(0)} mL`,
    volumeCalculado: `${volumeMl.toFixed(0)} mL`,
    unidade: 'mL',
    intervalo: 'SOS (efeito laxante)',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
