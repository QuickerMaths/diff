import fs from 'fs';
import { ccdiff } from './ccdiff';

export function cli(argv: string[]){
    const filePath1 = argv[2];
    const filePath2 = argv[3];

    if(!filePath1 || !filePath2) {
        process.stderr.write('Usage: ccdiff <filePath1> <filePath2>\n');
        process.exit(1);
    }

    if(fs.existsSync(filePath1)) {
        process.stderr.write(`ccdiff: ${filePath1}: No such file or directory\n`);
        process.exit(1);
    }

    if(fs.existsSync(filePath2)) {
        process.stderr.write(`ccdiff: ${filePath2}: No such file or directory\n`);
        process.exit(1);
    }

    const result = ccdiff(filePath1, filePath2);

    process.stdout.write(result);
}
