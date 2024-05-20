import { ccdiff } from '../src/ccdiff';

describe('finds longest common subsequence', () => {
    it('should return ABCDEF', () => {
        const string1 = 'ABCDEF';
        const string2 = 'ABCDEF';

        const result = ccdiff(string1, string2);

        expect(result).toBe('ABCDEF');
    });

    it('should return ""', () => {
        const string1 = 'ABC';
        const string2 = 'XYZ';

        const result = ccdiff(string1, string2);

        expect(result).toBe('');
    });

    it('should return ""', () => {
        const string1 = 'ABBCXY';
        const string2 = 'XY';

        const result = ccdiff(string1, string2);

        expect(result).toBe('XY');
    });

    it('should return ""', () => {
        const string1 = '';
        const string2 = '';

        const result = ccdiff(string1, string2);

        expect(result).toBe('');
    });

    it('should return ""', () => {
        const string1 = 'ABCD';
        const string2 = 'AC';

        const result = ccdiff(string1, string2);

        expect(result).toBe('AC');
    });
});
