const fs = window.require('fs');

export const readFile = (path) => {
  return fs.readFileSync(path, 'utf8');
}

export const convertCsvTo2DArray = (content) => {
  content ? content.split("\n").map(function (row) { return row.split(","); }) : [];
}