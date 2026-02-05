/**
 * Dimenidrinato 3 mg/mL + Vit. B6 5 mg/mL (Dramin B6 DL)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'dimenidrinato-3mg-ml-dl',
    nome: 'Dimenidrinato 3 mg/mL + Vit. B6 (Dramin B6 DL)',
    nomesComerciais: ['Dramin B6 DL'],
    viaAdministracao: 'EV',
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Antiemético / Anti-histamínico',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças (>2 anos): 1,25 mg/kg/dose (de dimenidrinato) a cada 6 horas.',
    doseMinima: '1,25 mg/kg/dose',
    doseMaxima: '7,5 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 1.25,
        intervalo: '6/6h',
        dosesAoDia: 4,
        concentracaoNumeradorMg: 3,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,4 mL por dose',
    },
    diluicao: {
        solucao: 'SF 0,9%',
        volumeMl: '100 mL',
        tempoInfusao: '20 min',
    },
    restricaoIdade: {
        idadeMinima: '≥ 2 anos',
        observacao: 'Contraindicado para menores de 2 anos',
    },
    observacoes: 'Infusão lenta (mínimo 20 min). Causa sonolência.',
    alertas: [
        'Infusão lenta (mínimo 20 min)',
        'Contraindicado para menores de 2 anos',
        'Pode causar sonolência',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const doseMg = peso * 1.25;
    const volumeMl = doseMg / 3;
    const volumeArredondado = Math.round(volumeMl * 10) / 10;

    const alertas: string[] = [];
    if (idade !== undefined && idade < 2) {
        alertas.push('Contraindicado para menores de 2 anos');
    }

    return {
        doseCalculada: `${doseMg.toFixed(1)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '6/6 horas',
        observacoes: ['Diluir em 100 mL de SF 0,9%', 'Infundir em 20 min'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
