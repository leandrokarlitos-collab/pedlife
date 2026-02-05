/**
 * Ampicilina 500/1000 mg - Pó para Solução Injetável EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ampicilina-ev',
  nome: 'Ampicilina 500/1000 mg',
  nomesComerciais: ['Binotal', 'Ampicilina Genérico'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável',
  classe: {
    nome: 'Penicilina',
    descricao: 'Aminopenicilina de amplo espectro',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água Destilada',
    volumeMl: 3,
    concentracaoFinal: '333,3 mg/mL (1000mg/3mL)',
  },
  diluicao: {
    solucao: 'SF 0,9%',
    volumeMl: '50-100 mL',
    tempoInfusao: '30-60 min',
  },
  doseUsualTexto: '200 mg/kg/dia, dividido a cada 6/6 horas (4x/dia) → 50 mg/kg/dose',
  doseMinima: '100 mg/kg/dia',
  doseMaxima: '12.000 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 100,
    doseMaxMgKg: 200,
    doseUsualMgKg: 200,
    doseMaxDiariaMg: 12000,
    intervalo: '6/6h',
    dosesAoDia: 4,
    formulaCalculo: `1000 mg em 3 mL = 333,3 mg/mL
Peso (kg) × 0,15 mL por dose (6/6h)
Ampicilina 500 mg: Peso (kg) × 0,3 mL a cada 6 horas`,
  },
  observacoes: 'Estável por 1 hora após reconstituição. Utilizar dose média para infecções moderadas.',
  alertas: [
    'Verificar alergia a penicilinas',
    'Estabilidade limitada após preparo',
    'Pode causar diarreia',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseDiariaMg = Math.min(peso * 200, 12000);
  const dosePorTomadaMg = doseDiariaMg / 4;
  const volumeMl = dosePorTomadaMg / 333.3;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  const alertas: string[] = [];
  if (peso * 200 >= 12000) alertas.push('Dose máxima diária atingida');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL (reconstituído 1g/3mL)`,
    unidade: 'mL',
    intervalo: '6/6 horas',
    observacoes: ['Reconstituir com 3 mL AD', 'Diluir em 50-100 mL SF 0,9%'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
