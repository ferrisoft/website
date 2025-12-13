export async function withTimeout(url: string, timeout = 5000) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    try {
        const res = await fetch(url, { signal: controller.signal })
        return await res.json()
    } finally {
        clearTimeout(id)
    }
}
