import { lcs } from '../src/ccdiff';

describe('finds lcs in 2 files', () => {

    it('should return "this is the lcs"', () => {
        const lines1 = ["This is a test which contains:", "this is the lcs"];
        const lines2 = ["this is the lcs", "we're testing"];

        const { lcs: result } = lcs(lines1, lines2);

        expect(result).toStrictEqual(['this is the lcs']);
    });

    it('should return ["I share a weekly coding challenge aimed at helping software engineers level up their skills through deliberate practice.", "Each challenge will have you writing a full application or tool. Most of which will be based on real world tools and utilities."]', () => {
        const lines1 = ["Coding Challenges helps you become a better software engineer through that build real applications.",
         "I share a weekly coding challenge aimed at helping software engineers level up their skills through deliberate practice.",
         "I’ve used or am using these coding challenges as exercise to learn a new programming language or technology.",
         "Each challenge will have you writing a full application or tool. Most of which will be based on real world tools and utilities."];
        const lines2 = ["Helping you become a better software engineer through coding challenges that build real applications.",
         "I share a weekly coding challenge aimed at helping software engineers level up their skills through deliberate practice.",
         "These are challenges that I’ve used or am using as exercises to learn a new programming language or technology.",
         "Each challenge will have you writing a full application or tool. Most of which will be based on real world tools and utilities."];

        const { lcs: result } = lcs(lines1, lines2);

        expect(result).toStrictEqual([
            "I share a weekly coding challenge aimed at helping software engineers level up their skills through deliberate practice.",
            "Each challenge will have you writing a full application or tool. Most of which will be based on real world tools and utilities."
        ]);
    });
});
