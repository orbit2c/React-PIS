const fs = require('fs');
const path = require('path');
const minimist = require('minimist');

// Parse command line arguments
const argv = minimist(process.argv.slice(2));
const folderPath = argv.folder || './src';
const fileExt = argv.ext || '.js';

const errors = [];

const checkForErrors = (filePath, content) => {
  // Search for common issues in the file content
  if (/setState\s*\(/g.test(content)) {
    errors.push(`File ${filePath} uses setState, which can cause performance issues.`);
  }

  if (/bind\s*\(/g.test(content)) {
    errors.push(`File ${filePath} uses bind, which can cause performance issues.`);
  }

  // ... add more checks as needed
};

const scanFolder = (folderPath, fileExt) => {
  fs.readdirSync(folderPath).forEach((fileName) => {
    const filePath = path.join(folderPath, fileName);
    const fileStats = fs.statSync(filePath);

    if (fileStats.isDirectory()) {
      // Recursively scan subfolders
      scanFolder(filePath, fileExt);
    } else {
      // Check for errors in the file
      if (path.extname(fileName) === fileExt) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        checkForErrors(filePath, fileContent);
      }
    }
  });
};

// Start the scan
scanFolder(folderPath, fileExt);

// Output the results
if (errors.length === 0) {
  console.log('No errors found.');
} else {
  console.log('The following errors were found:');
  errors.forEach((error) => console.log(`- ${error}`));
}
