# React Performance Issues Scanner (RPIS)

The React Performance Issue Scanner is a small but powerful tool that helps you identify common performance issues in your React application code. It scans your project files for problematic code patterns and generates a report of any issues found.


## Installation

To install the React Error Scanner, simply clone the repository and install the required dependencies:

git clone https://github.com/orbit2c/React-PIS.git
cd rpis
npm install


## How to Use 1 

    Clone or download the repository to your local machine.
    Install the required packages by running npm install in the project directory.
    Run the script with the command node rpis.js [options] [path], where [options] are any command line options you want to pass to the script (see below), and [path] is the path to the directory you want to scan (defaults to ./src).
    The scanner will output any detected issues to the console.

Command Line Options

The following options are available:

    -e, --extensions <extensions>: A comma-separated list of file extensions to scan (defaults to .js,.jsx).
    -h, --help: Display help information.
    -v, --version: Display the version number.

## How to Use 2

To use the React Error Scanner, navigate to the project directory and run the following command:
npm run scan <folderPath> <fileTypes>

Replace <folderPath> with the path to the directory you want to scan, and <fileTypes> with a comma-separated list of file extensions to include in the scan (e.g. js,jsx,ts,tsx).

By default, the scanner will search for the following common issues:

    Use of setState, which can cause performance issues
    Use of bind, which can cause performance issues
    Large render methods, which can cause slow rendering times
    Large component trees, which can cause slow rendering times

If the scanner detects any of these issues, it will output a report of the files and lines of code that contain them.


## API
    
    You can then use this function in your API by requiring it in your Node.js 
    server file and calling it with the desired directory path. Here's an example:
    
    const express = require('express');
const rpis = require('./rpis');

const app = express();
const PORT = 3000;

app.get('/analyze', (req, res) => {
  const { directory } = req.query;

  if (!directory) {
    return res.status(400).json({
      error: 'Directory path is required.'
    });
  }

  const result = rpis(directory);

  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
    
## Customization

If you want to customize the scanner to search for additional issues, you can modify the checkForErrors function in the index.js file. You can also customize the list of file extensions to scan by modifying the fileExtensions array in the index.js file.
Contributing

If you find a bug or want to suggest a new feature, feel free to open an issue or submit a pull request. Contributions are always welcome!


## Conclusion

This React Performance Issues Scanner can be a useful tool to quickly detect common performance issues in a React project. However, it should be noted that it is not a replacement for more thorough profiling and optimization techniques, and should be used in conjunction with other tools and methods for optimal performance.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
