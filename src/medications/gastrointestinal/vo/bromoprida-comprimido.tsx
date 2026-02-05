/**
 * Bromoprida 10 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'bromoprida-comprimido',
  nome: 'Bromoprida 10 mg (Comprimido)',
  nomesComerciais: ['Digesan', 'Plamet'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido 10 mg',
  classe: {
    nome: 'Procinético/Antiemético',
  },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5-1 mg/kg/dose até 3x/dia (máx 30 mg/dia)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '1 mg/kg/dose (máx 10 mg/dose)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Peso (kg) × 0,5-1 mg/kg/dose',
  },
  restricaoIdade: {
    idadeMinima: '> 1 ano',
    observacao: 'Contraindicado em menores de 1 ano',
  },
  observacoes: `Risco de reações extrapiramidais (espasmos), principalmente em crianças.
Administrar 30 min antes das refeições.
Uso geralmente indicado em crianças maiores (>30 kg).`,
  alertas: [
    'Risco de reações extrapiramidais',
    'Contraindicado em < 1 ano',
    'Uso preferencial: adolescentes',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMgKg = 0.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 10) doseMg = 10;
  
  const comprimidos = Math.round((doseMg / 10) * 2) / 2; // Arredondar para meio comprimido
  
  const alertas: string[] = [];
  if (peso < 30) alertas.push('Preferir apresentação em gotas para < 30 kg');
  if (idade && idade < 1) alertas.push('CONTRAINDICADO em < 1 ano');

  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${comprimidos} comprimido(s)`,
    unidade: 'comprimido(s)',
    intervalo: '8/8 horas',
    observacoes: ['Administrar 30 min antes das refeições'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
