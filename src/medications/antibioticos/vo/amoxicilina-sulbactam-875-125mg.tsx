/**
 * Amoxicilina + Sulbactam 875 + 125 mg - Comprimido
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-sulbactam-875-125mg',
  nome: 'Amoxicilina + Sulbactam 875 + 125 mg',
  nomesComerciais: ['Trifamox IBL'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Comprimido Oral',
  classe: { nome: 'Penicilina + Inibidor de beta-lactamase' },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '1 comprimido 12/12h',
  doseMinima: '875 mg/dia de amoxicilina',
  doseMaxima: '1750 mg/dia de amoxicilina',
  parametrosCalculo: {
    doseUsualMgKg: 45,
    intervalo: '12/12h',
    dosesAoDia: 2,
    formulaCalculo: 'Dose fixa: 875 mg 12/12h',
  },
  restricaoIdade: { idadeMinima: '≥ 12 anos', pesoMinimo: '≥ 40 kg' },
  observacoes: 'Administrar no início das refeições.',
  alertas: ['Verificar alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  return {
    doseCalculada: '875 mg de amoxicilina',
    volumeCalculado: '1 comprimido',
    unidade: 'comprimido(s)',
    intervalo: '12/12 horas',
    alertas: peso < 40 ? ['Peso < 40 kg: preferir suspensão'] : [],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
