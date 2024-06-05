export function initalizeLcsTable(n: number, m: number) {
    const table = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(0));

    for (let i = 0; i <= n; i++) {
        table[i][0] = 0;
    }

    for (let j = 0; j <= m; j++) {
        table[0][j] = 0;
    }

    return table;
}
