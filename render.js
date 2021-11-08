const fs = require('fs');
let id = fs.readFileSync('./data.txt', { encoding: 'utf-8' }).split(';;;');
let name = fs.readFileSync('./text.txt', { encoding: 'utf-8' }).split('>');
const data = [];
for (let i = 0; i < id.length - 1; i++) {
  const t = {
    _id: `${id[i]}`,
    type: 'Categories',
    name: `${name[i]}`,
  };
  data.push(t);
}
console.log(JSON.stringify(data));
