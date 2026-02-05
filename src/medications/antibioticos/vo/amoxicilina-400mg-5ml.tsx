/**
 * Amoxicilina tri-hidratada 400 mg/5 mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
  id: 'amoxicilina-400mg-5ml',
  nome: 'Amoxicilina tri-hidratada 400 mg/5 mL',
  nomesComerciais: ['Amoxil BD', 'Novamox BD'],
  viaAdministracao: 'VO',
  formaFarmaceutica: 'Pó/Suspensão Oral',
  classe: {
    nome: 'Penicilina',
    descricao: 'Antibiótico beta-lactâmico de amplo espectro',
  },
  categoria: 'antibioticos',
  reconstituicao: {
    necessaria: true,
    diluente: 'Diluente próprio',
    estabilidade: 'Válido por até 14 dias após reconstituição',
  },
  doseUsualTexto: '50 a 90 mg/kg/dia, por via oral a cada 12/12h',
  doseMinima: '50 mg/kg/dia',
  doseMaxima: '1750 mg/dia',
  parametrosCalculo: {
    doseMinMgKg: 50,
    doseMaxMgKg: 90,
    doseUsualMgKg: 50,
    doseMaxDiariaMg: 1750,
    intervalo: '12/12h',
    dosesAoDia: 2,
    concentracaoNumeradorMg: 400,
    concentracaoDenominadorMl: 5,
    formulaCalculo: 'Peso (kg) × 0,3125 mL = volume de 12/12h',
  },
  restricaoIdade: {
    idadeMinima: '≥ 2 meses',
  },
  observacoes: 'Preferencialmente 1h após refeição. Após reconstituído: Válido por até 14 dias.',
  alertas: ['Verificar histórico de alergia a penicilinas'],
  ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
  const alertas: string[] = [];
  const observacoes: string[] = ['Agitar bem antes de usar'];

  // 1. Verificar restrição de idade (idade em meses)
  console.log(`[DEBUG] Amoxicilina 400mg atingiu calcularDose: peso=${peso}, idadeMeses=${idade}`);
  if (idade !== undefined && idade < 2) {
    alertas.push('Uso restrito: medicamento não recomendado para menores de 2 meses.');
  }

  // Dose usual: 50 mg/kg/dia dividido em 2 doses
  const doseDiariaMg = Math.min(peso * 50, 1750);
  const dosePorTomadaMg = doseDiariaMg / 2;
  const volumeMl = (dosePorTomadaMg / 400) * 5;
  const volumeArredondado = Math.round(volumeMl * 10) / 10;

  // 2. Verificar se atingiu dose máxima
  if (peso * 50 >= 1750) {
    alertas.push('Dose máxima diária atingida (1750 mg/dia)');
  }

  return {
    doseCalculada: `${dosePorTomadaMg.toFixed(0)} mg`,
    volumeCalculado: `${volumeArredondado} mL`,
    unidade: 'mL',
    intervalo: '12/12 horas',
    observacoes,
    alertas,
  };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
