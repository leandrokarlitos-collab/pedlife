/**
 * Tinidazol 500 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'tinidazol',
  nome: 'Tinidazol 500 mg (Comprimido)',
  nomesComerciais: ['Pletil', 'Tinidazol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido 500 mg',
  classe: { nome: 'Antiprotozoário / Nitroimidazólico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Giardíase: 50 mg/kg dose única (máx 2 g) | Amebíase: 50 mg/kg/dia por 3 dias',
  doseMinima: '50 mg/kg',
  doseMaxima: '2000 mg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 50,
    intervalo: 'Dose única ou 24/24h por 3 dias',
    dosesAoDia: 1,
    formulaCalculo: 'Peso (kg) × 50 mg/kg',
  },
  restricaoIdade: { idadeMinima: '≥ 3 anos' },
  observacoes: 'Giardíase: dose única. Amebíase intestinal: 3 dias. Administrar com alimentos.',
  alertas: ['Administrar com alimentos', 'Evitar álcool durante e 3 dias após'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 50;
  if (doseMg > 2000) doseMg = 2000;
  const comprimidos = doseMg / 500;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${comprimidos.toFixed(1)} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: 'Dose única (giardíase) ou 1x/dia por 3 dias (amebíase)',
    alertas: ['Evitar álcool'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
