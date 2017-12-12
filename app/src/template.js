var fs = require('fs');
const DIRECTORY = './app/src/templates/';

class Template {

  constructor(name) {
    this.path = DIRECTORY + name + '.html';
  }

  get html() {
    return fs.readFileSync(this.path);
  }
}

exports.Template = Template;
