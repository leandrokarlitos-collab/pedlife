/**
 * Nimesulida 100 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'nimesulida-comprimido-100mg',
  nome: 'Nimesulida 100 mg (Comprimido)',
  nomesComerciais: ['Nisulid', 'Scaflam'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido 100 mg',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '2,5 mg/kg/dose 12/12h (máx 5 mg/kg/dia ou 200 mg/dia)',
  doseMinima: '2,5 mg/kg/dose',
  doseMaxima: '5 mg/kg/dia (máx 100 mg/dose)',
  parametrosCalculo: {
    doseUsualMgKg: 2.5,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 2,5 mg/kg/dose',
  },
  restricaoIdade: { 
    idadeMinima: '≥ 12 anos (ANVISA)',
    observacao: 'Contraindicado em < 12 anos pela ANVISA'
  },
  observacoes: `ANVISA: contraindicado em < 12 anos devido a risco hepatotóxico.
Uso por no máximo 15 dias.
Administrar após as refeições.`,
  alertas: [
    'CONTRAINDICADO em < 12 anos (ANVISA)',
    'Risco hepatotóxico',
    'Máximo 15 dias de uso',
    'Monitorar função hepática',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  let doseMg = peso * 2.5;
  if (doseMg > 100) doseMg = 100;
  
  const comprimidos = Math.round(doseMg / 100);
  const doseReal = comprimidos * 100;
  
  const alertas: string[] = [];
  if (idade && idade < 12) alertas.push('ATENÇÃO: CONTRAINDICADO em < 12 anos pela ANVISA');
  if (peso < 40) alertas.push('Para < 40 kg, preferir apresentação em gotas');

  return {
    doseCalculada: `${doseReal} mg`,
    volumeCalculado: `${comprimidos} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    observacoes: ['Administrar após refeições', 'Máximo 15 dias'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
