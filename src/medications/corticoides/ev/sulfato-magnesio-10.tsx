/**
 * Sulfato de Magnésio 10% (100 mg/mL)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'sulfato-magnesio-10',
    nome: 'Sulfato de Magnésio 10% (100 mg/mL)',
    viaAdministracao: ['EV', 'IM'],
    formaFarmaceutica: 'Solução Injetável',
    classe: {
        nome: 'Eletrólito / Adjuvante na Asma',
    },
    categoria: 'corticoides',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Asma (Crise Aguda): 25 a 75 mg/kg/dose (dose usual de 50 mg/kg).',
    doseMinima: '25 mg/kg/dose',
    doseMaxima: '2000 mg (2 g)',
    parametrosCalculo: {
        doseUsualMgKg: 50,
        intervalo: 'dose única',
        concentracaoNumeradorMg: 100,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,5 mL por dose (para 50 mg/kg)',
    },
    observacoes: 'A administração EV deve ser LENTA (20-30 min) para evitar parada cardiorrespiratória.',
    alertas: [
        'ADMINISTRAÇÃO EV DEVE SER LENTA (20-30 min)',
        'Risco de parada cardiorrespiratória se rápido',
        'Monitorar reflexos e frequência respiratória',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = Math.min(peso * 50, 2000);
    const volumeMl = doseMg / 100;
    const volumeArredondado = Math.round(volumeMl * 10) / 10;

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: 'dose única',
        observacoes: ['Administrar em 20-30 minutos', 'Diluir em SF 0,9% para EV'],
        alertas: [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
