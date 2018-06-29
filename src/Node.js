const toStringOpts = require('./utils/toStringOpts')
const escape = require('./utils/escape')

class Node {
	constructor(init = {}) {
		this.value = init.value;
		
		this._parent = undefined;
		this._childInd = undefined;
    }
    toString(opts = {}) {
		if(!opts.level) {
            opts = toStringOpts(opts);
		}
		let value = opts.valueFormat ? opts.valueFormat(this.value, opts) : this.value;
		if(opts.pretify) {
			if(!value.trim())
				return '';
		}
        return opts.indent + (opts.escape ? escape(value) : value);
    }
	
	getParent() {
		return this._parent;
	}


	_setParent(node, childInd) {
		this._parent = node;
		this._childInd = childInd;
	}
	_unsetParent() {
		this._parent = undefined;
		this._childInd = undefined;
	}
}
Node.prototype.type = 'node';

module.exports = Node;