/**
 * Ondansetrona 2 mg/mL - Solução Injetável EV/IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'ondansetrona-2mg-ml-ev',
  nome: 'Ondansetrona 2 mg/mL',
  nomesComerciais: ['Zofran', 'Vonau'],
  viaAdministracao: ['EV', 'IM'],
  formaFarmaceutica: 'Solução Injetável',
  classe: {
    nome: 'Antiemético',
    descricao: 'Antagonista 5-HT3 para náuseas e vômitos',
  },
  categoria: 'gastrointestinal',
  reconstituicao: { necessaria: false },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '50-100 mL',
    tempoInfusao: '15 min',
  },
  doseUsualTexto: `(>1 mês): 0,1 mg/kg (máx. 4 mg)
0,15 mg/kg (máx. 8 mg)`,
  doseMinima: '0,1 mg/kg/dose',
  doseMaxima: '8 mg por dose',
  parametrosCalculo: {
    doseMinMgKg: 0.1,
    doseMaxMgKg: 0.15,
    doseUsualMgKg: 0.1,
    doseMaxDiariaMg: 24,
    intervalo: '8/8h ou 12/12h',
    dosesAoDia: 3,
    concentracaoNumeradorMg: 2,
    concentracaoDenominadorMl: 1,
    formulaCalculo: `Peso (kg) × 0,05 mL (para dose de 0,1 mg/kg)
Peso (kg) × 0,075 mL (para dose de 0,15 mg/kg)`,
  },
  observacoes: `Injeção EV direta deve ser lenta (2-5 min); infusão em 15 min.
Risco de prolongamento do intervalo QT.
Ajustar dose em insuficiência hepática grave.`,
  alertas: [
    'Risco de prolongamento QT',
    'Administração EV lenta',
    'Ajustar em insuficiência hepática',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const dosePorTomadaMg = Math.min(peso * 0.1, 4);
  const volumeMl = dosePorTomadaMg / 2;
  const volumeArredondado = Math.round(volumeMl * 100) / 100;

  const alertas: string[] = [];
  if (peso * 0.1 >= 4) alertas.push('Dose máxima por tomada atingida (4 mg)');

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(1)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: ['Administração EV lenta (2-5 min)', 'Pode diluir em 50-100 mL'],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
