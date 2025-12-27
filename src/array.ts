export function zip<A, B>(a: readonly A[], b: readonly B[]): Array<[A, B]> {
    const n = Math.min(a.length, b.length)
    return Array.from({length: n}, (_, i) => [a[i], b[i]] as [A, B])
}
