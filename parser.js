const fs = require('fs');

function parser(component, reader) {
    this.reader = reader;
    this.componentname = component;
    try {
	    this.index = /<mask>([\s\S]{1,}?)<\/mask>/g
                    .exec(
                        this.reader.readFileSync("components/"+ component +"/index.html", "utf8").replace(/\s+/g, ' ')
                    );
                }
    catch {
        this.index = '<h1>' + component + ' NOT FOUND<h1>';
    }
    this.index == null ? this.index = '<h1>' + component + ' NOT FOUND<h2>' : this.index = this.index[1];
}

parser.prototype.readModules = function() {
    const regex = /<component\$([\s\S]{1,}?)\$ \/>/g; 
    let m;
    let modules = [];

    while ( (m = regex.exec(this.index)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex ++;
        };
        
        let c = false;
        m.forEach(match => c == true ? 
                    modules.push(new parser(match, this.reader)) :
                    c = !c);
        
    }

    return modules;
}

parser.prototype.render = function() {
    this.readModules().forEach(item => {
        this.index = this.index.replace("<component\$"+ item.componentname +"\$ \/>" ,item.render());
    });

    return this.index;
}

module.exports = parser;