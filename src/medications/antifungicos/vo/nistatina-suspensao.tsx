/**
 * Nistatina 100.000 UI/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'nistatina-suspensao',
  nome: 'Nistatina Suspensão Oral 100.000 UI/mL',
  nomesComerciais: ['Micostatin', 'Nistatina Genérico'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Suspensão Oral',
  classe: {
    nome: 'Antifúngico poliênico',
    descricao: 'Antifúngico para candidíase oral (sapinho)',
  },
  categoria: 'antifungicos',
  reconstituicao: { necessaria: false },
  doseUsualTexto: '100.000 UI (1 mL) a cada 6h, manter por no mínimo 48h após desaparecimento das lesões',
  doseMinima: '400.000 UI/dia (4 mL/dia)',
  doseMaxima: '1.000.000 UI/dia (10 mL/dia)',
  parametrosCalculo: {
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: 'Peso (kg) × 1 mL/dose ÷ 4 doses/dia (equivalente a 100.000 UI/dose)',
  },
  observacoes: `Agitar antes de usar.
Administrar lentamente na boca, mantendo contato com as lesões antes de engolir.
Não ingerir líquidos ou alimentos por 10-15 min após a dose.
Uso apenas tópico-oral — não engolir grandes volumes para evitar absorção sistêmica.`,
  alertas: [
    'Manter em contato com lesões por alguns minutos',
    'Não comer/beber por 10-15 min após',
    'Continuar 48h após cura das lesões',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  // Dose usual: 1 mL (100.000 UI) por dose, 4x/dia
  const volumeMl = 1;
  const doseUI = 100000;

  return {
    doseCalculada: `${doseUI.toLocaleString()} UI`,
    volumeCalculado: `${volumeMl} mL`,
    unidade: 'mL',
    intervalo: '6/6 horas (4x/dia)',
    observacoes: [
      'Agitar bem antes de usar',
      'Manter na boca por alguns minutos antes de engolir',
      'Não comer/beber por 10-15 min após',
    ],
    alertas: ['Dose fixa independente do peso'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
