export class StringUtils {
    static truncate(text: string, maxLength: number= 20, suffix: string = "…"): string {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength).trimEnd() + suffix;
    }
}