/**
 * Amicacina (50, 125, 250 mg) - Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amicacina-ev',
  nome: 'Amicacina (50/125/250 mg/2 mL)',
  nomesComerciais: ['Novamin', 'Amicacina Genérico'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Solução Injetável',
  classe: {
    nome: 'Aminoglicosídeo',
    descricao: 'Antibiótico para infecções graves por gram-negativos',
  },
  categoria: 'antibioticos',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9%',
    volumeMl: '50-100 mL',
    tempoInfusao: '30 min',
  },
  doseUsualTexto: '15 a 20 mg/kg/dia, por via EV, divididos a cada 8/8 horas',
  doseMinima: '15 mg/kg/dia',
  doseMaxima: '20 mg/kg/dia',
  parametrosCalculo: {
    doseMinMgKg: 15,
    doseMaxMgKg: 20,
    doseUsualMgKg: 15,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: `50 mg/2 mL = 25 mg/mL → Peso × 0,2 mL (15 mg/kg/dia)
125 mg/2 mL = 62,5 mg/mL → Peso × 0,08 mL (15 mg/kg/dia)
250 mg/2 mL = 125 mg/mL → Peso × 0,04 mL (15 mg/kg/dia)`,
  },
  observacoes: `Monitorar função renal e níveis séricos (pico e vale).
Ajustar dose em prematuros e neonatos.
Evitar uso com outros nefrotóxicos.
Infusão deve ser feita em 30 minutos.
Conservar sob refrigeração.`,
  alertas: [
    'Nefrotóxico - monitorar função renal',
    'Ototóxico - monitorar audição',
    'Evitar uso com outros aminoglicosídeos',
    'Ajustar em insuficiência renal',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = peso * 15;
  const dosePorTomadaMg = doseDiariaMg / 3;

  // Calcular volume para cada apresentação
  const vol50mg = (dosePorTomadaMg / 25);  // 50mg/2mL = 25mg/mL
  const vol125mg = (dosePorTomadaMg / 62.5); // 125mg/2mL = 62.5mg/mL
  const vol250mg = (dosePorTomadaMg / 125); // 250mg/2mL = 125mg/mL

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `50mg/2mL: ${vol50mg.toFixed(1)} mL | 125mg/2mL: ${vol125mg.toFixed(2)} mL | 250mg/2mL: ${vol250mg.toFixed(2)} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Diluir em 50-100 mL SF 0,9%', 'Infundir em 30 min'],
    alertas: ['Monitorar função renal', 'Verificar níveis séricos'],
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
