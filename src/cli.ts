import { ccdiff } from './ccdiff';

export function cli(argv: string[]){
    const string1 = argv[2];
    const string2 = argv[3];

    const result = ccdiff(string1, string2);

    process.stdout.write(result);
}
