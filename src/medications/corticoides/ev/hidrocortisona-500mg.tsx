/**
 * Hidrocortisona 500 mg - EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'hidrocortisona-500mg',
    nome: 'Hidrocortisona 500 mg',
    nomesComerciais: ['Solu-Cortef'],
    viaAdministracao: 'EV',
    formaFarmaceutica: 'Pó para Solução Injetável',
    classe: {
        nome: 'Corticoide',
    },
    categoria: 'corticoides',
    reconstituicao: {
        necessaria: true,
        diluente: 'Água Destilada',
        volumeMl: 4,
        concentracaoFinal: '125 mg/mL',
    },
    doseUsualTexto: 'Dose pediátrica variável (ex: 4-8 mg/kg como dose de ataque na asma).',
    doseMinima: '25 mg/dia',
    doseMaxima: '8 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 4,
        intervalo: '6/6h ou 8/8h',
        concentracaoNumeradorMg: 500,
        concentracaoDenominadorMl: 4,
        formulaCalculo: 'Peso (kg) × 0,032 mL por dose (para 4 mg/kg)',
    },
    observacoes: 'Injeção EV direta deve ser lenta (até 10 min). Infusão em 20-30 min.',
    alertas: [
        'Administração IV rápida pode causar colapso cardiovascular',
        'Infundir em 20-30 min',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = peso * 4;
    const volumeMl = doseMg / 125;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    return {
        doseCalculada: `${doseMg.toFixed(1)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '6/6 ou 8/8 horas',
        observacoes: ['Reconstituir com 4 mL de AD', 'Infundir lentamente'],
        alertas: [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
