import { lscTwoStrings } from './lcs-two-strings';

export function cli(argv: string[]){
    const string1 = argv[2];
    const string2 = argv[3];
    
    const result = lscTwoStrings(string1, string2);

    process.stdout.write(result + '\n');
}
