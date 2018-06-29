const Node = require('./Node')
const toStringOpts = require('./utils/toStringOpts') 

class CommentNode extends Node {
    constructor(value) { 
        super({value});
    }
    toString(opts = {}) {
        if(!opts.level) {
            opts = toStringOpts(opts);
		}
		let value = opts.valueFormat ? opts.valueFormat(this.value, opts) : this.value;
        return opts.indent + '<!--' + value + '-->';
    }
}
CommentNode.prototype.type = 'comment';

module.exports = CommentNode;