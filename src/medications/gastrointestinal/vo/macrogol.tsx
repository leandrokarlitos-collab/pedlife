/**
 * Macrogol - Pó para Solução Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'macrogol',
  nome: 'Macrogol (Pó para Solução Oral)',
  nomesComerciais: ['Muvinlax', 'Movicol'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó para Solução Oral',
  classe: { nome: 'Laxativo osmótico' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: true },
  doseUsualTexto: '0,5-1 sachê/dia (crianças) | 1-3 sachês/dia (adultos)',
  doseMinima: '0,5 sachê/dia',
  doseMaxima: '8 sachês/dia (impactação fecal)',
  parametrosCalculo: {
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: 'Dose por idade/peso',
  },
  restricaoIdade: { idadeMinima: '≥ 2 anos' },
  observacoes: 'Dissolver em água conforme bula. Manter hidratação adequada.',
  alertas: ['Manter boa hidratação'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let saches = 1;
  if (idade && idade < 7) saches = 0.5;
  if (idade && idade >= 12) saches = 2;
  return {
    doseCalculada: `${saches} sachê(s)`,
    volumeCalculado: `${saches} sachê(s)`,
    unidade: 'sachê(s)',
    intervalo: '24/24 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
