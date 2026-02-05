/**
 * Metilprednisolona 125 mg - EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'metilprednisolona-125mg',
    nome: 'Metilprednisolona 125 mg',
    nomesComerciais: ['Solu-Medrol'],
    viaAdministracao: 'EV',
    formaFarmaceutica: 'Pó para Solução Injetável',
    classe: {
        nome: 'Corticoide',
    },
    categoria: 'corticoides',
    reconstituicao: {
        necessaria: true,
        diluente: 'Diluente próprio',
        volumeMl: 2,
        concentracaoFinal: '62,5 mg/mL',
    },
    doseUsualTexto: 'Dose pediátrica variável (ex: 1-2 mg/kg/dia para asma).',
    doseMinima: '0,5 mg/kg/dia',
    doseMaxima: '30 mg/kg/dia (pulsoterapia)',
    parametrosCalculo: {
        doseUsualMgKg: 1,
        intervalo: '6/6h ou 12/12h',
        concentracaoNumeradorMg: 125,
        concentracaoDenominadorMl: 2,
        formulaCalculo: 'Peso (kg) × 0,016 mL por dose (para 1 mg/kg)',
    },
    observacoes: 'Infusão de altas doses deve ser lenta (≥ 30 min). Solução estável por 48h.',
    alertas: [
        'Infusão de altas doses deve ser lenta (≥ 30 min)',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = peso * 1;
    const volumeMl = doseMg / 62.5;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    return {
        doseCalculada: `${doseMg.toFixed(1)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: 'conforme orientação',
        observacoes: ['Reconstituir com 2 mL de diluente', 'Infundir lentamente'],
        alertas: [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
