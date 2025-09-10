export function parsePercentage(value?: string): number {
    if (!value) return 0
    const num = Number(value.replace('%', ''))
    return isNaN(num) ? 0 : num
}

export function parsePercentages(values: (string | undefined)[], count = 3): number[] {
    return Array.from({ length: count }, (_, i) => parsePercentage(values[i]))
}