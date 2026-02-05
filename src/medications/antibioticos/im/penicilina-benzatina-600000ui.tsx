/**
 * Penicilina Benzatina 600.000 UI - Pó para Suspensão Injetável IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'penicilina-benzatina-600000ui',
  nome: 'Penicilina Benzatina 600.000 UI',
  nomesComerciais: ['Benzetacil'],
  viaAdministracao: 'IM',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Penicilina de depósito',
    descricao: 'Antibiótico de ação prolongada para profilaxia e tratamento',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água Destilada',
    volumeMl: 2,
    estabilidade: 'Usar imediatamente após preparo',
  },
  doseUsualTexto: 'Para pacientes < 27 kg: 600.000 UI (dose única)',
  doseMinima: '600.000 UI',
  doseMaxima: '600.000 UI',
  parametrosCalculo: {
    intervalo: 'Dose única',
    dosesAoDia: 1,
    formulaCalculo: 'Administrar o volume total do frasco após reconstituição',
  },
  restricaoIdade: {
    pesoMinimo: '< 27 kg',
  },
  observacoes: `NUNCA administrar EV (risco fatal).
Aplicar em músculo profundo (glúteo).
Agitar vigorosamente. Usar imediatamente.`,
  alertas: [
    'NUNCA ADMINISTRAR VIA EV - RISCO FATAL',
    'Aplicar apenas via IM profunda',
    'Verificar alergia a penicilinas antes',
    'Usar imediatamente após preparo',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const alertas: string[] = ['APENAS VIA IM PROFUNDA'];

  if (peso >= 27) {
    alertas.push('Peso ≥ 27 kg: usar apresentação de 1.200.000 UI');
  }

  return {
    doseCalculada: '600.000 UI',
    volumeCalculado: '2 mL (volume total do frasco)',
    unidade: 'mL',
    intervalo: 'Dose única',
    observacoes: [
      'Reconstituir com 2 mL de Água Destilada',
      'Agitar vigorosamente',
      'Aplicar em glúteo (músculo profundo)',
    ],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
