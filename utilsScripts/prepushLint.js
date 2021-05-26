const { ESLint } = require("eslint");
const _ = require("lodash");

const OPERATION_FAILED_CODE = 1;
const MAX_WARNINGS_COUNT = 0;

async function main() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(["src/**/?*.{ts,tsx}"]);
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);
  const warningsCount = results.reduce((acc, result) => result.warningCount + acc, 0);
  if (warningsCount !== MAX_WARNINGS_COUNT) {
    process.exitCode = OPERATION_FAILED_CODE;      
  }
}


main().catch((error) => {
  process.exitCode = OPERATION_FAILED_CODE;
  console.error(error);
});