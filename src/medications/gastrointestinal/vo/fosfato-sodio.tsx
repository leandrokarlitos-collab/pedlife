/**
 * Fosfato de Sódio - Enema (Phosfoenema)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'fosfato-sodio-enema',
  nome: 'Fosfato de Sódio (Phosfoenema)',
  nomesComerciais: ['Phosfoenema', 'Fleet Enema'],
  viaAdministracao: 'Retal',
  formaFarmaceutica: 'Solução Retal (Enema)',
  classe: { nome: 'Laxativo osmótico (via retal)' },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Crianças 2-11 anos: 1 frasco pediátrico (60 mL). ≥12 anos: 1 frasco adulto (130 mL)',
  parametrosCalculo: {
    intervalo: 'Dose única',
    dosesAoDia: 1,
    formulaCalculo: '2-11 anos: 60 mL. ≥12 anos: 130 mL',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 anos',
    observacao: 'Contraindicado em < 2 anos',
  },
  observacoes: `Aplicação retal única. Efeito em 2-5 minutos.
Não usar em casos de dor abdominal intensa, náuseas, vômitos ou alteração no trânsito intestinal sem causa conhecida.
Contraindicado em insuficiência renal e cardíaca.`,
  alertas: [
    'Contraindicado em < 2 anos',
    'Não usar em insuficiência renal',
    'Risco de distúrbios hidroeletrolíticos',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const alertas: string[] = [];
  let volumeMl = 130;
  let tipo = 'adulto';
  
  if (idade && idade < 2) {
    alertas.push('CONTRAINDICADO em < 2 anos');
    volumeMl = 0;
  } else if (idade && idade < 12) {
    volumeMl = 60;
    tipo = 'pediátrico';
  }

  return {
    doseCalculada: `${volumeMl} mL`,
    volumeCalculado: `1 frasco ${tipo} (${volumeMl} mL)`,
    unidade: 'frasco',
    intervalo: 'Dose única',
    observacoes: ['Aplicação retal', 'Efeito em 2-5 minutos'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
