const Node = require('./Node')

class TextNode extends Node {
    constructor(value) { 
        super({value});
    }
}
TextNode.prototype.type = 'text';

module.exports = TextNode;