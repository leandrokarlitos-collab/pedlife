/**
 * Fluticasona - Aerossol Dosimetrado (Spray)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'fluticasona-spray',
  nome: 'Propionato de Fluticasona (Aerossol Dosimetrado)',
  nomesComerciais: ['Flixotide', 'Fluticaps'],
  viaAdministracao: 'Inalatória',
  formaFarmaceutica: 'Aerossol 50 mcg/jato ou 250 mcg/jato',
  classe: { nome: 'Corticosteroide inalatório' },
  categoria: 'inalatorios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '< 4 anos: 100 mcg 12/12h | 4-16 anos: 50-200 mcg 12/12h | > 16 anos: 100-500 mcg 12/12h',
  doseMinima: '100 mcg/dia',
  doseMaxima: '500 mcg/dia (crianças) / 1000 mcg/dia (adultos)',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Por idade/gravidade',
  },
  restricaoIdade: { idadeMinima: '≥ 1 ano' },
  observacoes: 'Usar com espaçador em crianças < 6 anos. Enxaguar boca após uso. Mais potente que beclometasona.',
  alertas: ['Usar com espaçador em < 6 anos', 'Enxaguar boca após uso'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMcg = 50;
  let jatos = '1 jato de 50 mcg';
  if (idade && idade < 4) {
    doseMcg = 100;
    jatos = '2 jatos de 50 mcg';
  } else if (idade && idade >= 4 && idade < 12) {
    doseMcg = 100;
    jatos = '2 jatos de 50 mcg';
  } else if (idade && idade >= 12) {
    doseMcg = 250;
    jatos = '1 jato de 250 mcg';
  }
  return {
    doseCalculada: `${doseMcg} mcg/dose`,
    volumeCalculado: jatos,
    unidade: 'jato(s)',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
