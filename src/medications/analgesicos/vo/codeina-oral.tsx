/**
 * Codeína 3 mg/mL - Solução Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'codeina-solucao-oral',
  nome: 'Fosfato de Codeína 3 mg/mL (Solução Oral)',
  nomesComerciais: ['Codein', 'Codeína Xarope'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Solução Oral 3 mg/mL',
  classe: {
    nome: 'Opioide fraco',
    descricao: 'Analgésico e antitussígeno opioide',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '0,5-1 mg/kg/dose 4/4h ou 6/6h (máx 60 mg/dose)',
  doseMinima: '0,5 mg/kg/dose',
  doseMaxima: '1 mg/kg/dose (máx 60 mg/dose)',
  parametrosCalculo: {
    doseMinMgKg: 0.5,
    doseMaxMgKg: 1,
    doseUsualMgKg: 0.5,
    intervalo: '4/4h ou 6/6h',
    dosesAoDia: 4,
    concentracaoNumeradorMg: 3,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 0,5-1 mg/kg ÷ 3 mg/mL',
  },
  restricaoIdade: {
    idadeMinima: '≥ 12 anos (FDA)',
    observacao: 'FDA contraindicou em < 12 anos (risco respiratório)',
  },
  observacoes: `FDA e EMA contraindicam em < 12 anos devido a risco de depressão respiratória grave.
Metabolização variável (polimorfismo CYP2D6).
Risco de constipação.
Controlado - Portaria 344 (receita B1).`,
  alertas: [
    'CONTRAINDICADO em < 12 anos (FDA/EMA)',
    'Risco de depressão respiratória',
    'Constipação frequente',
    'Náuseas e vômitos',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const doseMgKg = 0.5;
  let doseMg = peso * doseMgKg;
  if (doseMg > 60) doseMg = 60;
  
  const volumeMl = doseMg / 3;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;
  
  const alertas: string[] = [];
  if (idade && idade < 12) alertas.push('ATENÇÃO: FDA/EMA contraindicam em < 12 anos');

  return {
    doseCalculada: `${doseMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '4/4 ou 6/6 horas',
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
