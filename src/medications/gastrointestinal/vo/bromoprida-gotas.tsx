/**
 * Bromoprida 4 mg/mL - Gotas
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'bromoprida-gotas',
  nome: 'Bromoprida 4 mg/mL (Gotas)',
  nomesComerciais: ['Digesan'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Gotas',
  classe: {
    nome: 'Procinético/Antiemético',
  },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  doseUsualTexto: 'Crianças (>1 ano): 1 a 2 gotas por kg de peso, divididas em 3 tomadas diárias',
  doseMinima: '1 gota/kg/dose',
  doseMaxima: '2 gotas/kg/dose',
  parametrosCalculo: {
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: '1 a 2 gotas por kg de peso por dose',
  },
  restricaoIdade: {
    idadeMinima: '> 1 ano',
    observacao: 'Contraindicado em menores de 1 ano',
  },
  observacoes: `Risco de reações extrapiramidais (espasmos), principalmente em crianças.
Causa sonolência.
Contraindicada em crianças menores de 1 ano.`,
  alertas: [
    'Risco de reações extrapiramidais',
    'Causa sonolência',
    'Contraindicado < 1 ano',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const gotasPorDose = peso; // 1 gota/kg

  const alertas: string[] = [];
  if (idade !== undefined && idade < 1) {
    alertas.push('CONTRAINDICADO em menores de 1 ano');
  }

  return {
    doseCalculada: `${gotasPorDose} gotas`,
    volumeCalculado: `${gotasPorDose} gotas`,
    unidade: 'gotas',
    intervalo: '8/8 horas (3x/dia)',
    observacoes: ['1 gota/kg por dose', 'Pode usar até 2 gotas/kg se necessário'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
