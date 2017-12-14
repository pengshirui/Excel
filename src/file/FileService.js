const fs = window.require('fs');

export function readFile() {
  return fs.readFileSync('C:/Users/peng/Desktop/a.csv', 'utf8');
}