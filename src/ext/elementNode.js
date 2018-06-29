
module.exports = (ElementNode) => {

    /**
     * Replace current node into a nodes tree
     * @function
     * @param {ElementNode} node 
     */
    ElementNode.prototype.replace = function(node) {
        var parent = this._parent;
        if(!parent)
            return false;

        parent.children[this._childInd] = node;
        node._setParent(parent, this._childInd);
        this._unsetParent();
        return true;
    }

    ElementNode.prototype.removeFromTree = function() {
        var parent = this._parent;
        if(!parent)
            return;

        parent.children.splice(this._childInd, 1, ...this.children);
        parent._fixChildrenProps(this._childInd);

        this.children = [];
        this._unsetParent();
        return this;
    }



    ElementNode.prototype.deepForEach = function(func, flag) {
        if(!func)
            return;

        if(flag) {
            dfeUp(this, func);
            func(this);
        }
        else {
            func(this);
            dfeDown(this, func);
        }
    }
    const dfeUp = (node, func) => {
        if(!node.children)
            return;
        for(var i=0, ch; ch = node.children[i]; i++) {
            dfeUp(ch, func);
            if(func(ch))
                return;
        }
    }
    const dfeDown = (node, func) => {
        if(!node.children)
            return;
        for(var i=0, ch; ch = node.children[i]; i++) {
            if(func(ch))
                return;
            dfeDown(ch, func);
        }
    }
    
}
