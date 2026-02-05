/**
 * Dexametasona 4 mg/mL - EV/IM
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'dexametasona-4mg-ml',
    nome: 'Dexametasona 4 mg/mL',
    nomesComerciais: ['Decadron'],
    viaAdministracao: ['EV', 'IM'],
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Corticoide',
    },
    categoria: 'corticoides',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Dose Pediátrica: 0,02 a 0,3 mg/kg/dia, dividida em 3 ou 4 doses.',
    doseMinima: '0,02 mg/kg/dia',
    doseMaxima: '0,3 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 0.1,
        intervalo: '6/6h ou 8/8h',
        concentracaoNumeradorMg: 4,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,0125 mL por dose (para 0,05 mg/kg)',
    },
    observacoes: 'Injeção EV deve ser lenta. O uso prolongado pode suprimir o crescimento.',
    alertas: [
        'Injeção EV lenta',
        'Pode mascarar sinais de infecção',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = peso * 0.1;
    const volumeMl = doseMg / 4;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    return {
        doseCalculada: `${doseMg.toFixed(2)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '6/6 ou 8/8 horas',
        observacoes: ['Uso EV ou IM'],
        alertas: [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
