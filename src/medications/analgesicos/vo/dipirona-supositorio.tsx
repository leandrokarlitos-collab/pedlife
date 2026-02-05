/**
 * Dipirona 300 mg - Supositório
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'dipirona-supositorio',
  nome: 'Dipirona 300 mg (Supositório)',
  nomesComerciais: ['Novalgina Supositório'],
  viaAdministracao: 'Retal',
  formaFarmaceutica: 'Supositório 300 mg',
  classe: { nome: 'Analgésico / Antitérmico' },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '15 mg/kg/dose 6/6h',
  doseMinima: '10 mg/kg/dose',
  doseMaxima: '25 mg/kg/dose (máx 1 supositório/dose em crianças)',
  parametrosCalculo: {
    doseUsualMgKg: 15,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Por peso - geralmente 1 supositório',
  },
  restricaoIdade: { idadeMinima: '≥ 4 anos', pesoMinimo: '≥ 12 kg' },
  observacoes: 'Via alternativa quando VO não é possível. Manter refrigerado antes do uso.',
  alertas: ['Risco de agranulocitose (raro)', 'Manter refrigerado'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMg = 300;
  const indicado = peso >= 12 && peso <= 20;
  return {
    doseCalculada: `${doseMg} mg (1 supositório)`,
    volumeCalculado: '1 supositório',
    unidade: 'supositório',
    intervalo: '6/6 horas',
    alertas: indicado ? [] : ['Verificar se dose é adequada para o peso'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
