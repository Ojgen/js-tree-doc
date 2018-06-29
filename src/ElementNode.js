const Node = require('./Node')

const toStringOpts = require('./utils/toStringOpts')
const escape = require('./utils/escape')
const getAll = require('./utils/getAll')


class ElementNode extends Node {
	constructor(init = {}) {
        super(init);
        /**
         * @type {string} Tag name
         */
        this.name = init.name;
        /**
         * @type {Object.<string,string>} Dictionary of node attributes
         */
        this.attrs = init.attrs || {};
        /**
         * @type {Array<Node>} Array of child nodes
         */
        this.children = init.children || [];
        if(this.children.length > 0) {
            this._fixChildrenProps();
        }
	}
    
    
    // #region with children
    hasChildren() {
        return this.children.length > 0;
    }
	getFirstChild() {
		return this.children[0];
	}
	getLastChild() {
		let len = this.children.length;
		return this.children[len-1];
	}
    
    /**
    * @param {Node} node
    */
	addChild(node) {
        let len = this.children.push(node);
        node._setParent(this, len-1);
	}
	removeChild(node) {
        let ind = node._childInd;
        if(node !== this.children[ind])
            return;

        if(this.children.splice(ind, 1)) {
            node._unsetParent();
            this._fixChildrenInds(ind);
        }
        return node;
    }
    removeChildren() {
        var res = this.children;
        for(var i=0; i < res.length; i++) {
            res[i]._unsetParent();
        }
        this.children = [];
        return res;
    }
    // #endregion


    /**
     * 
     * @param {string} name Node name
     * @return {Array<ElementNode>}
     */
    getAll(name) {
        return getAll(this, ch => (ch.type === 'element' && ch.name === name));
    }
    /**
     * 
     * @param {function} condFunc Cond function
     * @return {Array<ElementNode>}
     */
    getAllByCond(condFunc) {
        return getAll(this, condFunc);
    }


    removeAttr(name) {
        let attr = this.attrs[name];
        if(attr !== undefined) {
            delete this.attrs[name];
        }
        return attr;
    }
    toString(opts = {}) {
        if(!opts.level) {
            opts = toStringOpts(opts);
        }

        const attrs = () => {
            var attrs = '';
            for(var key in this.attrs) {
                let value = opts.attrFormat ? opts.attrFormat(this.attrs[key], opts) : this.attrs[key];
                value = opts.escape ? escape(value) : value;
                //
                if(opts.compress) {
                    value = value.replace(/\n(\s{2,})/gmi, ' ')
                }
                //
                attrs += ` ${key}=${opts.sn}${value}${opts.sn}`;
            }
            return attrs;
        }
        const children = () => {
            var res = '';
            for(var i=0, ch; ch = this.children[i]; i++) {
                var value = ch.toString(opts);
                if(value) {
                    res += value + (ch.type !== 'element' ? opts.linebreak : '')
                }
            }
            return res;
        }

        var otE, ctE;
        if(this.children.length > 0) {
            otE = '>' + opts.linebreak;
            ctE = opts.indent + `</${this.name}>` + (opts.level === 0 ? '' : opts.linebreak);
        }
        else {
            otE = '/>' + opts.linebreak;
            ctE = '';
        }

        var res = opts.indent + `<${this.name}${attrs()}${otE}`;
        if(this.children.length > 0) {
            opts.level++;
            opts.indent += opts.indentStepStr;
            res += children() + ctE;
            opts.level--;
            opts.indent = opts.indent.replace(opts.indentStepStr, '');
        }
        return res;
    }


    _fixChildrenInds(ind = 0) {
        for(var i=ind; i < this.children.length; i++) {
            this.children[i]._childInd = i;
        }
    }
    _fixChildrenProps(ind = 0) {
        for(var i=ind; i < this.children.length; i++) {
            this.children[i]._parent = this;
            this.children[i]._childInd = i;
        } 
    }

}
ElementNode.prototype.type = 'element';


require('./ext/elementNode')(ElementNode);


module.exports = ElementNode;