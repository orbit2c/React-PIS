const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse command line arguments
const argv = minimist(process.argv.slice(2));
const folderPath = argv.folder || './src';
const fileExt = argv.ext || '.js';

const errors = [];
const warnings = [];


const checkForErrors = (filePath, content) => {
  // Search for common issues in the file content
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (/setState\s*\(/g.test(line)) {
      errors.push({
        file: filePath,
        line: i + 1,
        message: 'uses setState, which can cause performance issues.',
        severity: 'warning',
      });
    }

    if (/bind\s*\(/g.test(line)) {
      errors.push({
        file: filePath,
        line: i + 1,
        message: 'uses bind, which can cause performance issues.',
        severity: 'warning',
    });
  }
    if (/console\.(log|warn|error)/g.test(line)) {
      errors.push({
        file: filePath,
        line: i + 1,
        message: 'uses console.log, which can cause performance issues.',
        severity: 'error',
      });
    }

    if (/var\s/g.test(line)) {
      errors.push(`File ${filePath}, line ${i + 1}: uses var declaration, use let or const instead.`);
    }

    if (/(\bfunction\b|\((.*)\)\s*=>)/g.test(line) && /(\+|\-|\*|\/|%|&&|\|\||!=|==|<=|>=|<|>)/g.test(line)) {
      errors.push(`File ${filePath}, line ${i + 1}: contains a function with a complex expression, consider refactoring.`);
    }

    if (/\.(forEach|map|filter|reduce)\s*\(/g.test(line)) {
      errors.push(`File ${filePath}, line ${i + 1}: uses array iteration method, consider using for-of loop for small arrays.`);
    }
  }
};

const checkForAnalysis = (filePath, content) =>{

};



const scanFolder = (folderPath) => {
  fs.readdirSync(folderPath).forEach((fileName) => {
    const filePath = path.join(folderPath, fileName);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      // Recursively scan subfolders
      scanFolder(filePath);
    } else {
      // Check for errors in the file
      if (fileName.endsWith('.js') || fileName.endsWith('.jsx')) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        checkForErrors(filePath, fileContent);
      }
    }
  });
};

// Start the scan
scanFolder(folderPath, fileExt);

// Output the results
const results = {
  errors,
  warnings
};
fs.writeFileSync('./scan-results.json', JSON.stringify(results, null, 2));


if (errors.length === 0) {
  console.log('No errors found.');
} else {
  console.log('The following errors were found:');
  errors.forEach((error) => console.log(`- ${error}`));
  console.log('The following warnings were found:');
  warnings.forEach((warning) => console.warn(`- ${warning}`));
  console.log(JSON.stringify(errors, null, 2));
}
