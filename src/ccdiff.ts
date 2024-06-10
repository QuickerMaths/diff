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

    const f1Length = file1.length;
    const f2Lenght = file2.length;

    const output = prepareOutput(inserted, deleted, f1Length, f2Lenght);

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

    return { inserted, deleted, lcs };
}

function readFiles(path1: string, path2: string) {
    const file1 = fs.readFileSync(path1).toString().split(/\r\n|\n/);
    const file2 = fs.readFileSync(path2).toString().split(/\r\n|\n/);

    return {
        file1,
        file2
    }
}

function prepareOutput(inserted: LineChange[], deleted: LineChange[], f1Length: number, f2Length: number): string {
    let output = ``;
    let x = 0;
    let y = 0;
    let insertedChangeRange = 0;
    let deletedChangeRange = 0;
    const length1 = inserted.length;
    const length2 = deleted.length;

    while (x < length1 && y < length2) {
        if(inserted[x + insertedChangeRange]?.index === deleted[y + deletedChangeRange]?.index){
            let insertedRange = 1;
            let deletedRange = 1;
            let insertOutput = `${inserted[x].string}\n`;
            let deletedOutput = `${deleted[y].string}\n`;

            while(inserted[x + insertedRange]?.index - inserted[x + insertedRange - 1].index === 1) {
                insertOutput = insertOutput + `${inserted[x + insertedRange].string}\n`; 
                insertedRange++;
            }

            while(deleted[y + deletedRange]?.index - deleted[y + deletedRange - 1].index === 1) {
                deletedOutput = deletedOutput + `${deleted[y + deletedRange].string}\n`; 
                deletedRange++;
            }

            output += `${inserted[x].index}${inserted[x].index !== inserted[x + insertedRange - 1]?.index && insertedRange > 1 ? `,${inserted[x + insertedRange - 1].index}` : ''}c${deleted[y].index}${deleted[y].index !== deleted[y + deletedRange - 1].index && deletedRange > 1 ? `,${deleted[y + deletedRange - 1].index}` : ''}\n`;
            output = output + insertOutput;
            output = output + '---\n';
            output = output + deletedOutput;

            insertedChangeRange += insertedRange;
            deletedChangeRange += deletedRange;
            x += insertedRange;
            y += deletedRange;
        } else { 
            if(inserted[x].index < deleted[y].index) {
                let range = 1;
                let insertedOutput = `${inserted[x].string}\n`;

                while(inserted[x + range]?.index - inserted[x + range - 1].index === 1) {
                    insertedOutput += `${inserted[x + range].string}\n`;
                    range++;
                }

                output += `${inserted[x].index}${inserted[x].index !== inserted[x + range - 1]?.index && range > 1 ? `,${inserted[x + range - 1].index}` : ''}d${inserted[x].index + deletedChangeRange - 1}\n`;
                output += insertedOutput;

                x += range;
                insertedChangeRange += range;
            } else {
                let range = 1;
                let deletedOutput = `${deleted[y].string}\n`;

                while(deleted[y + range]?.index - deleted[y + range - 1].index === 1) {
                    deletedOutput += `${deleted[y + range].string}\n`;
                    range++;
                }

                output += `${deleted[y].index + insertedChangeRange - 1}a${deleted[y].index}${deleted[y].index !== deleted[y + range - 1]?.index && range > 1 ? `,${deleted[y + range - 1].index}` : ''}\n`;
                output += deletedOutput;

                y += range;
                deletedChangeRange += range;
            }
        }
    }

    while(x < length1) {
                let range = 1;
                 let insertedOutput = `${inserted[x].string}\n`;

                while(inserted[x + range]?.index - inserted[x + range - 1].index === 1) {
                    insertedOutput += `${inserted[x + range].string}\n`;
                    range++;
                }

                output += `${inserted[x].index}${inserted[x].index !== inserted[x + range - 1]?.index && range > 1 ? `,${inserted[x + range - 1].index}` : ''}d${f2Length - 1}\n`;
                output += insertedOutput;

                x += range;
                insertedChangeRange += range;
    }

    while(y < length2) {
                let range = 1;
                let deletedOutput = `${deleted[y].string}\n`;

                while(deleted[y + range]?.index - deleted[y + range - 1].index === 1) {
                    deletedOutput += `${deleted[y + range].string}\n`;
                    range++;
                }

                output += `${f1Length - 1}a${deleted[y].index}${deleted[y].index !== deleted[y + range - 1]?.index && range > 1 ? `,${deleted[y + range - 1].index}` : ''}\n`;
                output += deletedOutput;

                y += range;
                deletedChangeRange += range;
    }

    return output; 
}
