/**
 * Naproxeno - Comprimidos
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'naproxeno-comprimido',
  nome: 'Naproxeno 250/275/500/550 mg (Comprimido)',
  nomesComerciais: ['Flanax', 'Naprosyn', 'Naprelan'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido 250 mg, 275 mg (sódico), 500 mg, 550 mg (sódico)',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '5-10 mg/kg/dose 12/12h (máx 1000 mg/dia)',
  doseMinima: '5 mg/kg/dose',
  doseMaxima: '15 mg/kg/dia (máx 1000 mg/dia)',
  parametrosCalculo: {
    doseMinMgKg: 5,
    doseMaxMgKg: 10,
    doseUsualMgKg: 7.5,
    doseMaxDiariaMg: 1000,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Peso (kg) × 5-10 mg/kg/dose',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 anos',
  },
  observacoes: `Administrar com alimentos.
Comprimidos de 275 mg e 550 mg são naproxeno sódico (mais rápida absorção).
Meia-vida longa permite uso 2x/dia.`,
  alertas: [
    'Risco gastrointestinal',
    'Administrar com alimentos',
    'Cautela em asma e alergia a AINEs',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMgKg = 7.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 500) doseMg = 500;
  
  let comprimidos = 0;
  let apresentacao = '';
  
  if (doseMg <= 250) {
    comprimidos = Math.round(doseMg / 250);
    apresentacao = '250 mg';
  } else {
    comprimidos = Math.round(doseMg / 500);
    apresentacao = '500 mg';
  }
  
  const doseReal = comprimidos * (apresentacao === '250 mg' ? 250 : 500);
  
  const alertas: string[] = [];
  if (idade && idade < 2) alertas.push('Não recomendado em < 2 anos');

  return {
    doseCalculada: `${doseReal} mg`,
    volumeCalculado: `${comprimidos} comprimido(s) de ${apresentacao}`,
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    observacoes: ['Administrar com alimentos ou leite'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
