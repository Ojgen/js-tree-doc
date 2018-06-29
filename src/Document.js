const TextNode = require('./TextNode')
const CDataNode = require('./CDataNode')
const CommentNode = require('./CommentNode')
const ElementNode = require('./ElementNode')

const parsing = require('./parsing')
const toStringOpts = require('./utils/toStringOpts')
const getAll = require('./utils/getAll')


class Document {
    /**
     * 
     * @param {object|string} init Initial string or object. 
     * @param {object} opts Parameters for parsing if init is a string
     */
    constructor(init, opts={}) {
        if (!init)
            throw new Error("No data to initial");

        if(typeof init !== 'object') {
            init = parsing(init.toString().trim(), opts);
        }
        /**
         * @type {ElementNode} docElement
         */
        this.docElement = init.docElement;
        this.instruction = init.instruction;
        this.doctype = init.doctype;
    }


    getAll(name) {
        return getAll(this.docElement, ch => (ch.type === 'element' && ch.name === name));
    }
    getAllByCond(condFunc) {
        return getAll(this.docElement, condFunc);
    }

    toString(opts = {}) {
        opts = toStringOpts(opts);
        let res = '';
        if(this.instruction) {
            res += `<?${this.instruction.name} ${this.instruction.body}?>`
                + opts.linebreak;
        }
        if(this.doctype) {
            res += `<!DOCTYPE ${this.doctype.trim()}>`
                //.toLowerCase()
                + opts.linebreak;
        }
        res += this.docElement.toString(opts);
        return res;
    }

    static create(text, opts = {}) {
        return parsing(text, opts).docElement;
    }
}

Document.prototype.Document = Document;

Document.ElementNode = ElementNode;
Document.TextNode = TextNode;
Document.CDataNode = CDataNode;
Document.CommentNode = CommentNode;

module.exports = Document;