/**
 * Macrogol 3350 + Eletrólitos - Pó para Solução Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'macrogol-3350-eletrolitos',
  nome: 'Macrogol 3350 + Eletrólitos',
  nomesComerciais: ['Muvinlax', 'Novalax'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó para Solução Oral (sachê)',
  classe: { nome: 'Laxativo osmótico' },
  categoria: 'gastrointestinal',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água',
    volumeMl: 125,
    concentracaoFinal: '1 sachê em 125 mL de água',
  },
  doseUsualTexto: 'Crianças <12 anos: 1 sachê/dia. ≥12 anos: 1-2 sachês/dia',
  doseMinima: '1 sachê/dia',
  doseMaxima: '2 sachês/dia',
  parametrosCalculo: {
    intervalo: '24/24h',
    dosesAoDia: 1,
    formulaCalculo: '1 sachê dissolvido em 125 mL de água',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 anos',
  },
  observacoes: `Dissolver 1 sachê em 125 mL de água.
Pode levar 24-48h para efeito pleno.
Manter hidratação adequada durante o uso.
Preferir uso pela manhã.`,
  alertas: [
    'Garantir boa hidratação',
    'Pode causar flatulência inicial',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let saches = 1;
  const alertas: string[] = [];
  
  if (idade && idade < 2) {
    alertas.push('Não recomendado em < 2 anos');
  }
  
  if (idade && idade >= 12 && peso > 50) {
    saches = 2;
  }

  return {
    doseCalculada: `${saches} sachê(s)`,
    volumeCalculado: `${saches * 125} mL (após diluição)`,
    unidade: 'sachê(s)',
    intervalo: '24/24 horas',
    observacoes: [`Dissolver ${saches} sachê(s) em ${saches * 125} mL de água`, 'Tomar pela manhã'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
