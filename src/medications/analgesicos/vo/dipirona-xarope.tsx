/**
 * Dipirona 50 mg/mL - Xarope
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'dipirona-xarope',
    nome: 'Dipirona 50 mg/mL (Xarope)',
    nomesComerciais: ['Novalgina', 'Dipirona Genérico'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Xarope',
    classe: {
        nome: 'Analgésico e Antipirético',
    },
    categoria: 'analgesicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: '10 a 12 mg/kg/dose, até 6/6 horas.',
    doseMinima: '10 mg/kg/dose',
    doseMaxima: '500 mg por x dose',
    parametrosCalculo: {
        doseUsualMgKg: 10,
        intervalo: '6/6h',
        dosesAoDia: 4,
        concentracaoNumeradorMg: 50,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,2 mL por dose (para 10 mg/kg)',
    },
    restricaoIdade: {
        idadeMinima: '≥ 3 meses',
        pesoMinimo: '≥ 5 kg',
    },
    observacoes: 'Pode ser usado para febre e dor.',
    alertas: [
        'Contraindicado para < 3 meses ou < 5 kg',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = Math.min(peso * 10, 500);
    const volumeMl = doseMg / 50;
    const volumeArredondado = Math.round(volumeMl * 10) / 10;

    const alertas: string[] = [];
    if (peso < 5) alertas.push('Contraindicado para menores de 5 kg');

    return {
        doseCalculada: `${doseMg.toFixed(0)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '6/6 horas',
        observacoes: [],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
