export function elementCache(dom: HTMLElement, record: Record<string, unknown>): boolean {
    /// @ts-expect-error The _cache_ field is not standard.
    let cache: Record<string, unknown> = dom._cache_
    if (cache == null) {
        cache = {}
        /// @ts-expect-error The _cache_ field is not standard.
        dom._cache_ = cache
    }
    let changed = false
    for (const [key, value] of Object.entries(record)) {
        if (cache[key] != value) {
            changed = true
            cache[key] = value
        }
    }
    return changed
}
