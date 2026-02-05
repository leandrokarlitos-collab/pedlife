/**
 * Cetoprofeno 50 mg - Cápsula
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'cetoprofeno-capsula-50mg',
  nome: 'Cetoprofeno 50 mg (Cápsula)',
  nomesComerciais: ['Profenid', 'Cetoprofeno'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Cápsula 50 mg',
  classe: { nome: 'Anti-inflamatório não esteroidal (AINE)' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5-1 mg/kg/dose 8/8h ou 12/12h (máx 150-300 mg/dia)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '2 mg/kg/dia (máx 300 mg/dia)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    intervalo: '8/8h ou 12/12h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 0,5-1 mg/kg/dose',
  },
  restricaoIdade: {
    idadeMinima: '≥ 6 anos ou > 20 kg',
  },
  observacoes: `Administrar com alimentos para reduzir desconforto gástrico.
Uso em crianças geralmente > 20 kg.
Não ultrapassar 300 mg/dia.`,
  alertas: [
    'Risco gastrointestinal',
    'Administrar com alimentos',
    'Cautela em asma',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMgKg = 0.75;
  let doseMg = peso * doseMgKg;
  if (doseMg > 100) doseMg = 100;
  
  const capsulas = Math.round(doseMg / 50);
  const doseReal = capsulas * 50;
  
  const alertas: string[] = [];
  if (peso < 20) alertas.push('Preferir apresentação em gotas para < 20 kg');

  return {
    doseCalculada: `${doseReal} mg`,
    volumeCalculado: `${capsulas} cápsula(s)`,
    unidade: 'cápsula(s)',
    intervalo: '8/8 horas ou 12/12 horas',
    observacoes: ['Administrar com alimentos'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
