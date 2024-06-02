export function lscTwoStrings(string1: string, string2: string): string {
    return lcs(string1, string2);
}

function initalizeLcsTable(n: number, m: number) {
    const table = new Array(n + 1).fill(null).map(() => new Array(m + 1).fill(0));

    for (let i = 0; i <= m; i++) {
        table[i][0] = 0;
    }

    for (let j = 0; j <= n; j++) {
        table[0][j] = 0;
    }

    return table;
}

function lcs(string1: string, string2: string): string {
    const n = string1.length;
    const m = string2.length;

    const table = initalizeLcsTable(n, m);

    for(let ind1 = 1; ind1 <= n; ind1++) {
        for(let ind2 = 1; ind2 <= m; ind2++) {
            if(string1[ind1 - 1] === string2[ind2 - 1]) {
                table[ind1][ind2] = 1 + table[ind1 - 1][ind2 -1];
            } else {
                table[ind1][ind2] = Math.max(table[ind1 - 1][ind2], table[ind1][ind2 - 1]);
            }
        }
    }

    let lcs = '';

    let i = n;
    let j = m;

    while(i > 0 && j > 0) {
        if(string1[i - 1] == string2[j - 1]) {
            lcs = string1[i - 1] + lcs;
            i--;
            j--;
        } else {
            if (table[i][j - 1] > table[i - 1][j]) {
                j--;
            } else {
                i--;
            }
        }
    } 

    return lcs;
}
