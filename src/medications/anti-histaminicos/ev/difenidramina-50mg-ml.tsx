/**
 * Difenidramina 50 mg/mL - Solução Injetável
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'difenidramina-50mg-ml',
    nome: 'Difenidramina 50 mg/mL',
    nomesComerciais: ['Dimedrol'],
    viaAdministracao: ['EV', 'IM'],
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Anti-histamínico de 1ª geração',
    },
    categoria: 'anti-histaminicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças (>2 anos): 1,25 mg/kg/dose, 3 a 4 vezes ao dia.',
    doseMinima: '1,25 mg/kg/dose',
    doseMaxima: '300 mg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 1.25,
        intervalo: '6/6h ou 8/8h',
        dosesAoDia: 4,
        concentracaoNumeradorMg: 50,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,025 mL por dose',
    },
    restricaoIdade: {
        idadeMinima: '≥ 2 anos',
        observacao: 'Contraindicado para menores de 2 anos',
    },
    observacoes: 'A administração EV deve ser lenta. Não injetar por via subcutânea.',
    alertas: [
        'Administração EV deve ser lenta',
        'Causa sonolência acentuada',
        'Contraindicado para menores de 2 anos',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number, idade?: number): ResultadoCalculo {
    const doseMg = peso * 1.25;
    const volumeMl = doseMg / 50;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    const alertas: string[] = [];
    if (idade !== undefined && idade < 2) {
        alertas.push('Contraindicado para menores de 2 anos');
    }
    if (doseMg * 4 > 300) {
        alertas.push('Dose diária excede o máximo de 300 mg/dia');
    }

    return {
        doseCalculada: `${doseMg.toFixed(1)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '6/6 ou 8/8 horas',
        observacoes: ['EV lento ou IM', 'Causa sonolência acentuada'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
