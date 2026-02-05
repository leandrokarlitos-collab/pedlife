/**
 * Fluconazol 10 mg/mL - Suspensão Oral
 */

import { MedicamentoData, MedicamentoExport, ResultadoCalculo } from '../../types';

export const data: MedicamentoData = {
    id: 'fluconazol-suspensao',
    nome: 'Fluconazol 10 mg/mL (Suspensão Oral)',
    nomesComerciais: ['Zoltec'],
    viaAdministracao: 'VO',
    formaFarmaceutica: 'Suspensão Oral',
    classe: {
        nome: 'Antifúngico',
    },
    categoria: 'antifungicos',
    reconstituicao: { necessaria: false },
    doseUsualTexto: 'Crianças: 6 a 12 mg/kg/dia, em dose única diária.',
    doseMinima: '6 mg/kg/dia',
    doseMaxima: '12 mg/kg/dia (máx 600 mg/dia)',
    parametrosCalculo: {
        doseUsualMgKg: 6,
        intervalo: '24/24h',
        dosesAoDia: 1,
        concentracaoNumeradorMg: 10,
        concentracaoDenominadorMl: 1,
        formulaCalculo: 'Peso (kg) × 0,6 mL (para 6 mg/kg)',
    },
    observacoes: 'Pode ser tomado com ou sem alimentos.',
    alertas: ['Monitorar função hepática em uso prolongado'],
    ultimaAtualizacao: '2026-02-02',
};

export function calcularDose(peso: number): ResultadoCalculo {
    const doseMg = Math.min(peso * 6, 600);
    const volumeMl = doseMg / 10;
    const volumeArredondado = Math.round(volumeMl * 10) / 10;

    return {
        doseCalculada: `${doseMg} mg`,
        volumeCalculado: `${volumeArredondado} mL`,
        unidade: 'mL',
        intervalo: '24/24 horas (dose única)',
        observacoes: [],
        alertas: [],
    };
}

const medicamento: MedicamentoExport = { data, calcularDose };
export default medicamento;
