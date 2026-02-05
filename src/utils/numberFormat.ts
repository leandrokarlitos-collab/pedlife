/**
 * Utilitários para formatação de números no padrão brasileiro
 */

/**
 * Formata número com vírgula decimal (padrão BR)
 * @param num Número a ser formatado
 * @param decimals Número de casas decimais (padrão: 1)
 * @returns String formatada (ex: "4,5")
 */
export function formatarNumeroBR(num: number, decimals: number = 1): string {
  return num.toFixed(decimals).replace('.', ',');
}

/**
 * Formata volume em mL no padrão brasileiro
 * @param volumeMl Volume em mL
 * @returns String formatada (ex: "4,5 mL")
 */
export function formatarVolumeBR(volumeMl: number): string {
  return `${formatarNumeroBR(volumeMl, 1)} mL`;
}

/**
 * Formata dose em mg no padrão brasileiro
 * @param doseMg Dose em mg
 * @returns String formatada (ex: "250,5 mg")
 */
export function formatarDoseBR(doseMg: number, decimals: number = 0): string {
  return `${formatarNumeroBR(doseMg, decimals)} mg`;
}

/**
 * Formata gotas no padrão brasileiro
 * @param gotas Número de gotas
 * @returns String formatada (ex: "15 gotas" ou "15,5 gotas")
 */
export function formatarGotasBR(gotas: number): string {
  // Se for número inteiro, não mostrar decimais
  if (gotas === Math.floor(gotas)) {
    return `${Math.round(gotas)} gotas`;
  }
  return `${formatarNumeroBR(gotas, 1)} gotas`;
}

/**
 * Formata intervalo de doses no padrão brasileiro
 * Converte "8/8h" ou "8/8 horas" para "8 em 8 horas"
 * Suporta múltiplas opções: "6/6h ou 8/8h" → "6 em 6 horas OU 8 em 8 horas"
 * @param intervalo Intervalo original
 * @returns String formatada (ex: "8 em 8 horas" ou "6 em 6 horas OU 8 em 8 horas")
 */
export function formatarIntervaloBR(intervalo: string): string {
  if (!intervalo) return intervalo;
  
  // Verificar se há múltiplas opções separadas por "ou" ou "a"
  if (intervalo.toLowerCase().includes(' ou ') || intervalo.match(/\s+a\s+\d+\/\d+/)) {
    const partes = intervalo.split(/\s+(?:ou|a)\s+/i);
    const partesFormatadas = partes.map(parte => {
      const match = parte.trim().match(/(\d+)\/(\d+)\s*(h|horas?)?/i);
      if (match) {
        return `${match[1]} em ${match[2]} horas`;
      }
      return parte.trim();
    });
    return partesFormatadas.join(' OU ');
  }
  
  // Padrão simples: "8/8h" ou "8/8 horas" → "8 em 8 horas"
  const match = intervalo.match(/(\d+)\/(\d+)\s*(h|horas?)?/i);
  if (match) {
    return `${match[1]} em ${match[2]} horas`;
  }
  
  // Se não corresponder, retornar original
  return intervalo;
}
