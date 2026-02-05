/**
 * Mebendazol 20 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'mebendazol-20mg-ml',
  nome: 'Mebendazol 20 mg/mL (Suspensão Oral)',
  nomesComerciais: ['Pantelmin', 'Necamin'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Anti-helmíntico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '100 mg 12/12h por 3 dias (5 mL 12/12h)',
  doseMinima: '100 mg/dose',
  doseMaxima: '200 mg/dia',
  parametrosCalculo: {
    intervalo: '12/12h por 3 dias',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 20,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '5 mL 12/12h por 3 dias',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Dose fixa independente do peso. Repetir tratamento em 2-3 semanas.',
  alertas: ['Contraindicado em < 1 ano', 'Evitar na gestação'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  return {
    doseCalculada: '100 mg',
    volumeCalculado: '5 mL',
    unidade: 'mL',
    intervalo: '12/12 horas por 3 dias',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
