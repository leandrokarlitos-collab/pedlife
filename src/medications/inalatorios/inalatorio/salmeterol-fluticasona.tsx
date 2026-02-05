/**
 * Salmeterol + Fluticasona - Combinação (Seretide)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'salmeterol-fluticasona',
  nome: 'Salmeterol + Fluticasona (Seretide Spray/Diskus)',
  nomesComerciais: ['Seretide', 'Salmeterol + Fluticasona'],
  viaAdministracao: 'Inalatória',
  formaFarmaceutica: 'Aerossol/Diskus: 25+50, 25+125, 25+250, 50+100, 50+250, 50+500 mcg',
  classe: { nome: 'Beta-2 agonista de longa duração + Corticosteroide' },
  categoria: 'inalatorios',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '4-11 anos: 25+50 a 25+125 mcg 12/12h | ≥ 12 anos: 25+125 a 25+250 mcg 12/12h',
  doseMinima: '25+50 mcg 12/12h',
  doseMaxima: '50+500 mcg 12/12h',
  parametrosCalculo: {
    doseUsualMgKg: 0,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Por idade/gravidade',
  },
  restricaoIdade: { idadeMinima: '≥ 4 anos' },
  observacoes: 'Spray: usar com espaçador. Diskus: não requer espaçador. Enxaguar boca após uso.',
  alertas: ['Spray: usar espaçador em crianças', 'Enxaguar boca após uso'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let apresentacao = '25/50 mcg (Spray) ou 50/100 mcg (Diskus)';
  if (idade && idade >= 12) {
    apresentacao = '25/125 mcg (Spray) ou 50/250 mcg (Diskus)';
  }
  return {
    doseCalculada: apresentacao,
    volumeCalculado: '1 inalação',
    unidade: 'inalação(ões)',
    intervalo: '12/12 horas',
    alertas: [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
