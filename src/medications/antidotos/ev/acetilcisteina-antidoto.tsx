/**
 * Acetilcisteína - Antídoto para Intoxicação por Paracetamol
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'acetilcisteina-antidoto',
  nome: 'Acetilcisteína 200 mg/mL (Antídoto EV)',
  nomesComerciais: ['Fluimucil Antídoto', 'Acetilcisteína EV'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução Injetável 200 mg/mL (ampola 5 mL = 1000 mg)',
  classe: { nome: 'Antídoto' },
  categoria: 'antidotos',
  reconstituicao: { necessaria: false },
  diluicao: {
    diluente: 'SG 5%',
    tempoInfusao: 'Protocolo 21h (3 etapas)',
  },
  doseUsualTexto: 'Protocolo 21h: 150 mg/kg em 1h → 50 mg/kg em 4h → 100 mg/kg em 16h',
  doseMinima: '150 mg/kg (dose de ataque)',
  doseMaxima: '300 mg/kg (dose total protocolo)',
  parametrosCalculo: {
    doseUsualMgKg: 150,
    intervalo: 'Protocolo de 21 horas',
    dosesAoDia: 1,
    concentracaoNumeradorMg: 200,
    concentracaoDenominadorMl: 1,
    formulaCalculo: 'Peso (kg) × 150 mg/kg (ataque)',
  },
  restricaoIdade: { idadeMinima: 'Todas as idades' },
  observacoes: 'ANTÍDOTO PARA INTOXICAÇÃO POR PARACETAMOL. Protocolo 21h (3 bolsas). Iniciar até 8h da ingestão (máx. benefício).',
  alertas: [
    'Intoxicação por paracetamol',
    'Iniciar preferencialmente até 8h',
    'Pode causar reações anafilactoides',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseAtaqueMg = peso * 150;
  const dose2Mg = peso * 50;
  const dose3Mg = peso * 100;
  const volumeAtaque = doseAtaqueMg / 200;
  const volume2 = dose2Mg / 200;
  const volume3 = dose3Mg / 200;
  return {
    doseCalculada: `1ª: ${doseAtaqueMg.toFixed(0)} mg | 2ª: ${dose2Mg.toFixed(0)} mg | 3ª: ${dose3Mg.toFixed(0)} mg`,
    volumeCalculado: `1ª: ${volumeAtaque.toFixed(1)} mL em 1h | 2ª: ${volume2.toFixed(1)} mL em 4h | 3ª: ${volume3.toFixed(1)} mL em 16h`,
    unidade: 'mL',
    intervalo: 'Protocolo único de 21 horas',
    alertas: ['Diluir em SG 5%', 'Monitorar reações anafilactoides'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
