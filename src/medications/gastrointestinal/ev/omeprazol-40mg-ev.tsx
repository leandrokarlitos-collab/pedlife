/**
 * Omeprazol 40 mg - EV
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'omeprazol-40mg-ev',
    nome: 'Omeprazol 40 mg',
    nomesComerciais: ['Losec', 'Omeprazol Genérico'],
    viaAdministracao: 'EV',
    formaFarmaceutica: 'Pó para Solução Injetável',
    classe: {
        nome: 'Inibidor de Bomba de Prótons',
    },
    categoria: 'gastrointestinal',
    reconstituicao: {
        necessaria: true,
        diluente: 'Diluente próprio (10 mL)',
        volumeMl: 10,
        concentracaoFinal: '4 mg/mL',
    },
    doseUsualTexto: '1 mg/kg/dia, administrado 1 a 2 vezes ao dia.',
    doseMinima: '0,5 mg/kg/dia',
    doseMaxima: '40 mg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 1,
        intervalo: '12/12h ou 24/24h',
        dosesAoDia: 1,
        concentracaoNumeradorMg: 40,
        concentracaoDenominadorMl: 10,
        formulaCalculo: 'Peso (kg) × 0,25 mL (para a dose total de 1 mg/kg)',
    },
    observacoes: 'Injeção EV direta deve ser lenta (mínimo 2,5 minutos). Proteger da luz.',
    alertas: [
        'Injeção EV lenta (mínimo 2,5 min)',
        'Usar em até 4h após reconstituição',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = Math.min(peso * 1, 40);
    const volumeMl = doseMg / 4;
    const volumeArredondado = Math.round(volumeMl * 10) / 10;

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '24/24 horas (uma vez ao dia)',
        observacoes: ['Reconstituir com 10 mL de diluente', 'Injetar lentamente'],
        alertas: [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
