const getAll = (node, condFunc, res = []) => {
    if(node.children) {
        for(let i=0, ch; ch = node.children[i]; i++) {
            getAll(ch, condFunc, res);
            if(condFunc(ch)) {
                res.push(ch);
            }
        }
    }
    return res;
}

module.exports = getAll;