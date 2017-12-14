const fs = window.require('fs');

export function readFile() {
  return fs.readFileSync('C:/Users/peng/Desktop/a.csv', 'utf8');
}

export function convertCsvTo2DArray(content) {
  content ? content.split("\n").map(function (row) { return row.split(","); }) : [];
}