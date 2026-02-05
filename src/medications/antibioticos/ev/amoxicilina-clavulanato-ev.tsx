/**
 * Amoxicilina + Clavulanato EV - Pó para Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-clavulanato-ev',
  nome: 'Amoxicilina + Clavulanato EV',
  nomesComerciais: ['Clavulin EV', 'Clavulam'],
  viaAdministracao: 'EV',
  formaFarmaceutica: 'Pó para Solução Injetável (500+100 mg, 1000+200 mg)',
  classe: {
    nome: 'Penicilina + Inibidor de β-lactamase',
    descricao: 'Antibiótico de amplo espectro',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Água Destilada',
    volumeMl: 10,
    concentracaoFinal: '100 mg/mL (1000+200mg/10mL)',
  },
  diluicao: {
    solucao: 'SF 0,9% ou SG 5%',
    volumeMl: '50-100 mL',
    tempoInfusao: '30-40 min',
  },
  doseUsualTexto: '50 mg/kg/dose (componente amoxicilina) a cada 6-8 horas',
  doseMinima: '25 mg/kg/dose',
  doseMaxima: '100 mg/kg/dia (máx 6000 mg/dia)',
  parametrosCalculo: {
    doseMinMgKg: 25,
    doseMaxMgKg: 50,
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 6000,
    intervalo: '8/8h',
    dosesAoDia: 3,
    formulaCalculo: 'Dose baseada no componente amoxicilina: 50 mg/kg/dose',
  },
  observacoes: 'Dose baseada no componente amoxicilina. Estável por 4h após reconstituição. Usar em até 1h após diluição.',
  alertas: [
    'Verificar alergia a penicilinas',
    'Reconstituir e usar rapidamente',
    'Não congelar',
  ],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
  const doseMgKg = 50;
  const dosePorTomadaMg = peso * doseMgKg;
  const doseMaxTomada = 2000;
  const doseReal = Math.min(dosePorTomadaMg, doseMaxTomada);
  
  // Usando frasco 1000+200 mg reconstituído em 10 mL
  const volumeMl = doseReal / 100;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  const alertas: string[] = [];
  if (dosePorTomadaMg > doseMaxTomada) alertas.push('Dose máxima por tomada: 2000 mg');

  return {
    doseCalculada: `${doseReal.toFixed(0)} mg (amoxicilina)`,
    volumeCalculado: `${volumeArredondado} mL (frasco 1000+200mg/10mL)`,
    unidade: 'mL',
    intervalo: '8/8 horas',
    observacoes: [
      'Reconstituir com 10 mL AD',
      'Diluir em 50-100 mL SF 0,9%',
      'Infundir em 30-40 min',
    ],
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
