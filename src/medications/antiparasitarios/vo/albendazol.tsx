/**
 * Albendazol 40 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'albendazol-40mg-ml',
  nome: 'Albendazol 40 mg/mL (Solução Oral)',
  nomesComerciais: ['Zentel', 'Albendazol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: { nome: 'Anti-helmíntico' },
  categoria: 'antiparasitarios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '400 mg dose única (>2 anos) | 200 mg (1-2 anos)',
  doseMinima: '200 mg/dose',
  doseMaxima: '400 mg/dose',
  parametrosCalculo: {
    intervalo: 'Dose única',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 40,
    concentracaoDenominadorMl: 1,
    formulaCalculo: '> 2 anos: 10 mL | 1-2 anos: 5 mL',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Dose única para maioria das helmintíases. Repetir em 2-4 semanas se necessário.',
  alertas: ['Contraindicado em < 1 ano', 'Evitar na gestação'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = 400;
  let volumeMl = 10;
  if (idade !== undefined && idade < 2) {
    doseMg = 200;
    volumeMl = 5;
  }
  return {
    doseCalculada: `${doseMg} mg`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: 'Dose única',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
