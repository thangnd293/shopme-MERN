const fs = require('fs');
let id = fs.readFileSync('./data.txt', { encoding: 'utf-8' }).split('"');
let name = fs.readFileSync('./text.txt', { encoding: 'utf-8' }).split('"');
console.log(id.length, name.length);
const data = [];
for (let i = 0; i < id.length - 1; i++) {
  const t = {
    _id: `${id[i]}`,
    type: 'Colors',
    name: `${name[i]}`,
  };
  data.push(t);
}
console.log(JSON.stringify(data));
