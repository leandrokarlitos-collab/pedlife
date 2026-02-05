/**
 * Nitazoxanida 20 mg/mL - Solução Oral / 500 mg Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'nitazoxanida',
  nome: 'Nitazoxanida 20 mg/mL (Solução) / 500 mg (Comprimido)',
  nomesComerciais: ['Annita'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral / Comprimido',
  classe: { nome: 'Antiparasitário / Antidiarreico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '7,5 mg/kg/dose 12/12h por 3 dias',
  doseMinima: '100 mg/dose',
  doseMaxima: '500 mg/dose',
  parametrosCalculo: {
    doseUsualMgKg: 7.5,
    intervalo: '12/12h por 3 dias',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 20,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,375 mL 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Administrar com alimentos. Eficaz contra Giardia, Cryptosporidium.',
  alertas: ['Administrar com alimentos'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = peso * 7.5;
  if (doseMg > 500) doseMg = 500;
  const volumeMl = doseMg / 20;
  const useComprimido = idade && idade >= 12 && doseMg >= 500;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: useComprimido ? '1 comprimido' : `${volumeMl.toFixed(1)} mL`,
    unidade: useComprimido ? 'comprimido(s)' : 'mL',
    intervalo: '12/12 horas por 3 dias',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
