/**
 * Bromoprida 5 mg/mL - Ampola 2 mL
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'bromoprida-5mg-ml',
    nome: 'Bromoprida 5 mg/mL',
    nomesComerciais: ['Digesan', 'Plamet'],
    viaAdministracao: ['EV', 'IM'],
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Antiemético / Procinético',
    },
    categoria: 'gastrointestinal',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças (>1 ano): 0,5 a 1 mg/kg/dia, divididos em 2 a 3 tomadas.',
    doseMinima: '0,5 mg/kg/dia',
    doseMaxima: '1 mg/kg/dia',
    parametrosCalculo: {
        doseUsualMgKg: 0.3, // Dose por tomada (para 3x/dia)
        intervalo: '8/8h',
        dosesAoDia: 3,
        concentracaoNumeradorMg: 5,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,06 mL por dose (para 0,3 mg/kg)',
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
    const doseMg = peso * 0.3;
    const volumeMl = doseMg / 5;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    const alertas: string[] = [];
    if (idade !== undefined && idade < 1) {
        alertas.push('Contraindicado para menores de 1 ano');
    }

    return {
        doseCalculada: `${doseMg.toFixed(1)} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '8/8 horas',
        observacoes: ['EV lento ou IM', 'Risco de sonolência'],
        alertas,
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
