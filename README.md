# Diff Command Line Tool

This project is my solution to one of [John Crickett’s](https://www.linkedin.com/in/johncrickett/?originalSubdomain=uk) coding challenges. It implements the [Longest Common Subsequence (LCS)](https://en.wikipedia.org/wiki/Longest_common_subsequence) algorithm using a dynamic programming approach.

## Overview
The project consists of two main files:

1. **`lcs-two-strings.ts`**: This file implements the LCS algorithm to identify the longest common subsequence between two given strings. It serves as a demonstration and is not directly tied to the CLI command.

2. **`ccdiff.ts`**: This file contains the LCS algorithm implementation for detecting differences between two files. It generates an output string displayed in the command line as a result of executing the command.

Both implementations of the algorithm are covered by tests written in Jest. To run tests for both algorithms, use the `npm run test` script.

## Testing the Command on Your Machine

```bash
# Clone this repository
git clone https://github.com/QuickerMaths/diff

# Navigate to the cloned repository
cd /path/to/cloned/repo

# Run the build command
npm run dev

# Test the command using test files
ccdiff test-files/original.txt test-files/new.txt
