/**
 * Tiabendazol 50 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'tiabendazol',
  nome: 'Tiabendazol 50 mg/mL (Suspensão Oral)',
  nomesComerciais: ['Thiaben', 'Tiabendazol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral 50 mg/mL (250 mg/5 mL)',
  classe: { nome: 'Anti-helmíntico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Estrongiloidíase/Larva migrans: 25 mg/kg/dose 12/12h por 2-5 dias (máx 3 g/dia)',
  doseMinima: '25 mg/kg/dose',
  doseMaxima: '1500 mg/dose (3 g/dia)',
  parametrosCalculo: {
    doseUsualMgKg: 25,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 50,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 25 mg/kg',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Administrar após refeições. Estrongiloidíase: 2 dias. Larva migrans cutânea: 2-5 dias.',
  alertas: ['Administrar após refeições', 'Pode causar tontura e náuseas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  let doseMg = peso * 25;
  if (doseMg > 1500) doseMg = 1500;
  const volumeMl = doseMg / 50;
  return {
    doseCalculada: `${doseMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeMl.toFixed(1)} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas por 2-5 dias',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
