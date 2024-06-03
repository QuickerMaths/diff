import fs from 'fs';
import { initalizeLcsTable } from './utils/initalize-table';

type LineChange = { index: number, string: string };
type LCSReturnType = {
    inserted: LineChange[];
    deleted: LineChange[];
    lcs: string[];
}

export function ccdiff(path1: string, path2: string): string {
    const { file1, file2 } = readFiles(path1, path2);

    const { inserted, deleted } = lcs(file1, file2); 

    const output = prepareOutput(inserted, deleted);

    return output; 
}

export function lcs(lines1: string[], lines2: string[]): LCSReturnType{
    const n = lines1.length;
    const m = lines2.length; 

    const table = initalizeLcsTable(n, m);

    for(let ind1 = 1; ind1 <= n; ind1++) {
        for(let ind2 = 1; ind2 <= m; ind2++) {
            if(lines1[ind1 - 1] === lines2[ind2 - 1]) {
                table[ind1][ind2] = 1 + table[ind1 - 1][ind2 - 1];
            } else {
                table[ind1][ind2] = Math.max(table[ind1 - 1][ind2], table[ind1][ind2 - 1]);
            }
        }
    }

    let i = n;
    let j = m;
    const lcs: string[] = [];
    const inserted = new Array<LineChange>;
    const deleted = new Array<LineChange>;

    while(i > 0 && j > 0) {
        if(lines1[i - 1] === lines2[j - 1]) {
            lcs.unshift(lines1[i - 1])
            i--;
            j--;
        } else {
            if(table[i][j - 1] > table[i - 1][j]) {
                deleted.unshift({ index: j, string: `> ${lines2[j - 1]}` });
                j--;
            } else {
                inserted.unshift({ index: i, string: `< ${lines1[i - 1]}` });
                i--;
            }
        }
    }

    while(j > 0) {
        deleted.unshift({ index: j, string: `> ${lines2[j - 1]}` });
        j--;
    }

    while(i > 0) {
        inserted.unshift({ index: i, string: `< ${lines1[i - 1]}` });
        i--;
    }

    return { inserted: inserted.reverse(), deleted: deleted.reverse(), lcs };
}

function readFiles(path1: string, path2: string) {
    // handle file not found
    const file1 = fs.readFileSync(path1).toString().split(/\r\n|\n/);
    const file2 = fs.readFileSync(path2).toString().split(/\r\n|\n/);

    return {
        file1,
        file2
    }
}

function prepareOutput(inserted: LineChange[], deleted: LineChange[]) {
    let output = ``;

    let x = 0;
    let y = 0;
    const length1 = inserted.length;
    const length2 = deleted.length;

    while (x < length1 && y < length2) {
        if(inserted[x].index === deleted[y].index){
            output = output + `${inserted[x].index}c${deleted[y].index}\n`;
            output = output + `${inserted[x].string}\n`;
            output = output + '---\n';
            output = output + `${deleted[y].string}\n`;
            x++;
            y++;
        } else { 
            if(inserted[x].index < deleted[y].index) {
                output = output + `${inserted[x].index}a${inserted[y].index}\n`;
                output = output + `${inserted[x].string}\n`;
                x++;
            } else {
                output = output + `${deleted[x].index}a${deleted[y].index}\n`;
                output = output + `${deleted[x].string}\n`;
                y++;
            }
        }
    }

    return output; 
}
