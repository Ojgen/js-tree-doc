const Node = require('./Node')
const toStringOpts = require('./utils/toStringOpts') 

class CDataNode extends Node {
    constructor(value) { 
        super({value});
    }
    toString(opts = {}) {
        if(!opts.level) {
            opts = toStringOpts(opts);
        }
        let value = opts.valueFormat ? opts.valueFormat(this.value, opts) : this.value;
        return opts.indent + '<![CDATA[' + value + ']]>';
    }
}
CDataNode.prototype.type = 'cdata';

module.exports = CDataNode;