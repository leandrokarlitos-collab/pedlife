/**
 * Beclometasona - Aerossol Dosimetrado (Spray)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'beclometasona-spray',
  nome: 'Dipropionato de Beclometasona (Aerossol Dosimetrado)',
  nomesComerciais: ['Clenil HFA', 'Beclosol'],
  viaAdministracao: 'Inalatória',
  formaFarmaceutica: 'Aerossol 50 mcg/jato, 200 mcg/jato, 250 mcg/jato',
  classe: { nome: 'Corticosteroide inalatório' },
  categoria: 'inalatorios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Asma leve: 100-200 mcg 12/12h | Asma moderada: 200-400 mcg 12/12h',
  doseMinima: '100 mcg/dia',
  doseMaxima: '800 mcg/dia (crianças) / 2000 mcg/dia (adultos)',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Por idade/gravidade',
  },
  restricaoIdade: { idadeMinima: '≥ 5 anos' },
  observacoes: 'Usar com espaçador em crianças. Enxaguar boca após uso para prevenir candidíase oral.',
  alertas: ['Usar com espaçador', 'Enxaguar boca após uso'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMcg = 100;
  let jatos = '1 jato de 50 mcg ou spray de 100 mcg';
  if (idade && idade >= 12) {
    doseMcg = 200;
    jatos = '1 jato de 200 mcg ou 2 jatos de 100 mcg';
  }
  return {
    doseCalculada: `${doseMcg} mcg/dose`,
    volumeCalculado: jatos,
    unidade: 'jato(s)',
    intervalo: '12/12 horas',
    alertas: ['Usar espaçador em crianças'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
