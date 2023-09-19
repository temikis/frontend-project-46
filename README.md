### Hexlet tests and linter status:
[![Actions Status](https://github.com/temikis/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/temikis/frontend-project-46/actions)
[![Actions Status](https://github.com/temikis/frontend-project-46/workflows/test-check/badge.svg)](https://github.com/temikis/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/b0a34b8ba326437ea76d/maintainability)](https://codeclimate.com/github/temikis/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b0a34b8ba326437ea76d/test_coverage)](https://codeclimate.com/github/temikis/frontend-project-46/test_coverage)

---
# Project "Difference Calculator"
### Description
The Difference Calculator helps you find the differences between two files.

---
### Requirements:
Node.js: 13.2.0 and above

---
### Installation: 
Download the program and run the following commands in its root directory:
```
make install
npm link
```
---
### Program capabilities:
input data formats:
- .json
- .yaml, .yml

output data formatters:
- "stylish" - displays the result in a tree view, where differences are marked with "-" and "+"
- "plain" - displays the result in string form with a description of the changes
- "json" - outputs the result in string JSON format with a description of changes in the "state" key

## Example:
**output usage information:**
```
gendiff -h
```
[![asciicast](https://asciinema.org/a/609056.png)](https://asciinema.org/a/609056)

**program launch:**

The default formatter is “stylish”. To select the correct format, use the format selection option: -f or --format, with arguments:
- stylish
- plain
- json
```
gendiff __fixtures__/file1.json __fixtures__/file2.json
gendiff __fixtures__/file1.yml __fixtures__/file2.yaml
```
or
```
gendiff -f stylish __fixtures__/file1.json __fixtures__/file2.json
gendiff --format stylish __fixtures__/file1.yml __fixtures__/file2.yaml
```
[![asciicast](https://asciinema.org/a/609062.png)](https://asciinema.org/a/609062)
---
```
gendiff -f plain __fixtures__/file1.json __fixtures__/file2.json
gendiff --format plain __fixtures__/file1.yml __fixtures__/file2.yaml
```
[![asciicast](https://asciinema.org/a/609064.png)](https://asciinema.org/a/609064)
---
```
gendiff -f json __fixtures__/file1.json __fixtures__/file2.json
gendiff --format json __fixtures__/file1.yml __fixtures__/file2.yaml
```
[![asciicast](https://asciinema.org/a/609066.png)](https://asciinema.org/a/609066)
---