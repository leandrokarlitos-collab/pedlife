/**
 * Sulfato de Magnésio 50% (500 mg/mL)
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'sulfato-magnesio-50',
    nome: 'Sulfato de Magnésio 50% (500 mg/mL)',
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
        concentracaoNumeradorMg: 500,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,1 mL por dose (para 50 mg/kg)',
    },
    observacoes: 'NUNCA administrar sem diluir por via EV. A administração deve ser LENTA (20-30 min).',
    alertas: [
        'OBRIGATÓRIO DILUIR PARA USO EV (concentração ≤ 20%)',
        'ADMINISTRAÇÃO EV DEVE SER LENTA (20-30 min)',
        'Monitorar reflexos e frequência respiratória',
    ],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = Math.min(peso * 50, 2000);
    const volumeMl = doseMg / 500;
    const volumeArredondado = Math.round(volumeMl * 100) / 100;

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: 'dose única',
        observacoes: ['DILUIÇÃO OBRIGATÓRIA PARA EV', 'Administrar em 20-30 minutos'],
        alertas: ['Nunca aplicar puro na veia'],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
