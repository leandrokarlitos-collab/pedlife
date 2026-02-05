/**
 * Metoclopramida 5 mg/mL - Ampola 2 mL
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'metoclopramida-5mg-ml',
    nome: 'Metoclopramida 5 mg/mL',
    nomesComerciais: ['Plasil'],
    viaAdministracao: ['EV', 'IM'],
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Antiemético / Procinético',
    },
    categoria: 'gastrointestinal',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças (>1 ano): 0,1 a 0,15 mg/kg/dose, até 3 vezes ao dia.',
    doseMinima: '0,1 mg/kg/dose',
    doseMaxima: '0,5 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 0.15,
        intervalo: '8/8h',
        dosesAoDia: 3,
        concentracaoNumeradorMg: 5,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,03 mL por dose (para 0,15 mg/kg)',
    },
    restricaoIdade: {
        idadeMinima: '≥ 1 ano',
        observacao: 'Contraindicado para menores de 1 ano',
    },
    observacoes: 'Administração EV deve ser LENTA (mínimo 3 min). Risco de reações extrapiramidais.',
    alertas: [
        'Administração EV deve ser LENTA (mínimo 3 min)',
        'Risco de reações extrapiramidais (espasmos)',
        'Contraindicado para menores de 1 ano',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const doseMg = peso * 0.15;
    const volumeMl = doseMg / 5;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    const alertas: string[] = [];
    if (idade !== undefined && idade < 1) {
        alertas.push('Contraindicado para menores de 1 ano');
    }

    return {
        doseCalculada: `${doseMg.toFixed(2)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '8/8 horas',
        observacoes: ['EV lento ou IM', 'Risco de sonolência e acatisia'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
