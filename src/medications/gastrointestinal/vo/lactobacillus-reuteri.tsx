/**
 * Lactobacillus reuteri DSM 17938 - Colidis
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'lactobacillus-reuteri',
  nome: 'Lactobacillus reuteri DSM 17938',
  nomesComerciais: ['Colidis'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral (Gotas)',
  classe: { nome: 'Probiótico' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '5 gotas 1x/dia',
  doseMinima: '5 gotas/dia',
  doseMaxima: '5 gotas/dia',
  parametrosCalculo: {
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Dose fixa: 5 gotas/dia',
  },
  restricaoIdade: { idadeMinima: 'Recém-nascido' },
  observacoes: 'Útil para cólicas do lactente. Agitar antes de usar.',
  alertas: ['Agitar antes de usar', 'Manter refrigerado após aberto'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  return {
    doseCalculada: '5 gotas',
    volumeCalculado: '5 gotas',
    unidade: 'gotas',
    intervalo: '24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
