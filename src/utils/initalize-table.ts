export function initalizeLcsTable(n: number, m: number) {
    const table = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        table[i][0] = 0;
    }

    for (let j = 0; j <= n; j++) {
        table[0][j] = 0;
    }

    return table;
}
