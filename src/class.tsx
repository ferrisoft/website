export function names(...classes: unknown[]) {
    return classes.filter(Boolean).join(' ')
}
