/**
 * Morfina 1 mg/mL e 10 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'morfina-ev',
  nome: 'Sulfato de Morfina (1 mg/mL e 10 mg/mL)',
  nomesComerciais: ['Dimorf', 'Morfina Genérico'],
  viaAdministracao: ['EV', 'IM', 'SC'],
  formaFarmaceutica: 'Solução Injetável',
  classe: {
    nome: 'Opioide forte',
    descricao: 'Analgésico opioide potente',
  },
  categoria: 'analgesicos',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9%',
    volumeMl: '5 mL (para EV direto)',
    tempoInfusao: '4-5 min',
  },
  doseUsualTexto: 'Dose Pediátrica (IV): 0,05 a 0,1 mg/kg/dose a cada 4 horas',
  doseMinima: '0,05 mg/kg/dose',
  doseMaxima: '0,1 mg/kg/dose (não exceder 15 mg por dose)',
  parametrosCalculo: {
    doseMinMgKg: 0.05,
    doseMaxMgKg: 0.1,
    doseUsualMgKg: 0.1,
    doseMaxDiariaMg: 15,
    intervalo: '4/4h',
    dosesAoDia: 6,
    formulaCalculo: `1 mg/mL: Peso (kg) × 0,1 mL por dose (0,1 mg/kg)
10 mg/mL: Peso (kg) × 0,01 mL por dose (0,1 mg/kg)`,
  },
  observacoes: `Administração EV deve ser LENTA (4-5 minutos).
Risco de depressão respiratória grave.
Pode causar sonolência e náuseas.
Antídoto: Naloxona.`,
  alertas: [
    'Risco de DEPRESSÃO RESPIRATÓRIA GRAVE',
    'Administração EV lenta (4-5 min)',
    'Ter naloxona disponível',
    'Monitorar saturação e FR',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = Math.min(peso * 0.1, 15);
  const volumeMl1mgml = dosePorTomadaMg / 1;
  const volumeMl10mgml = dosePorTomadaMg / 10;

  const alertas = ['RISCO DE DEPRESSÃO RESPIRATÓRIA', 'Ter naloxona disponível'];
  if (peso * 0.1 >= 15) {
    alertas.push('Dose máxima por tomada atingida (15 mg)');
  }

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(2)} mg`,
    volumeCalculado: `1 mg/mL: ${volumeMl1mgml.toFixed(2)} mL | 10 mg/mL: ${volumeMl10mgml.toFixed(3)} mL`,
    unidade: 'mL',
    intervalo: '4/4 horas',
    observacoes: [
      'Administrar EV lenta (4-5 min)',
      'Pode diluir em 5 mL SF 0,9%',
      'Monitorar sinais vitais',
    ],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
