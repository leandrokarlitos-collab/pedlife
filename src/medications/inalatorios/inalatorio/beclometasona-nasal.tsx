/**
 * Beclometasona - Suspensão Nasal
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'beclometasona-nasal',
  nome: 'Dipropionato de Beclometasona (Suspensão Nasal)',
  nomesComerciais: ['Clenil Nasal', 'Beclosol Nasal'],
  viaAdministracao: 'Nasal',
  formaFarmaceutica: 'Suspensão Nasal 50 mcg/dose ou 100 mcg/dose',
  classe: { nome: 'Corticosteroide nasal' },
  categoria: 'inalatorios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '6-12 anos: 100-200 mcg/dia (1-2 jatos/narina 12/12h) | > 12 anos: 200-400 mcg/dia',
  doseMinima: '100 mcg/dia',
  doseMaxima: '400 mcg/dia',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '12/12h ou 24/24h',
    dosesAoDia: 2,
    formulaCalculo: 'Por idade',
  },
  restricaoIdade: { idadeMinima: '≥ 6 anos' },
  observacoes: 'Agitar antes de usar. Limpar narinas antes da aplicação. Não usar se epistaxe ativa.',
  alertas: ['Agitar antes de usar', 'Limpar narinas antes'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMcg = 100;
  let esquema = '1 jato de 50 mcg em cada narina';
  if (idade && idade >= 12) {
    doseMcg = 200;
    esquema = '2 jatos de 50 mcg ou 1 jato de 100 mcg em cada narina';
  }
  return {
    doseCalculada: `${doseMcg} mcg/dose`,
    volumeCalculado: esquema,
    unidade: 'jato(s)/narina',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
