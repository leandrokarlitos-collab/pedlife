/**
 * Dipirona 500 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'dipirona-500mg-ml-ev',
    nome: 'Dipirona 500 mg/mL (Injetável)',
    nomesComerciais: ['Novalgina', 'Dipirona Genérico'],
    viaAdministracao: ['EV', 'IM'],
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Analgésico e Antipirético',
    },
    categoria: 'analgesicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Dose por peso (aprox. 25 mg/kg), até 6/6 horas.',
    doseMinima: '10 mg/kg/dose',
    doseMaxima: '25 mg/kg/dose',
    parametrosCalculo: {
        doseUsualMgKg: 20,
        intervalo: '6/6h',
        dosesAoDia: 4,
        concentracaoNumeradorMg: 500,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,04 mL por dose (para 20 mg/kg)',
    },
    restricaoIdade: {
        idadeMinima: '≥ 3 meses',
        pesoMinimo: '≥ 5 kg',
    },
    observacoes: 'Em crianças < 1 ano, administrar apenas por via IM.',
    alertas: [
        'Contraindicado para < 3 meses ou < 5 kg',
        'Menores de 1 ano: apenas via IM',
        'Risco de hipotensão se administrado rapidamente via EV',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const doseMg = peso * 20;
    const volumeMl = doseMg / 500;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    const alertas: string[] = [];
    if (peso < 5) alertas.push('Contraindicado para menores de 5 kg');
    if (idade !== undefined && idade < 1) alertas.push('Para menores de 1 ano, usar apenas via IM');

    return {
        doseCalculada: `${doseMg.toFixed(0)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '6/6 horas',
        observacoes: ['Injetar lentamente'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
