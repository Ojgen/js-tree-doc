const sax = require('sax');

const TextNode = require('./TextNode')
const CDataNode = require('./CDataNode')
const CommentNode = require('./CommentNode')
const ElementNode = require('./ElementNode')

const unEscape = require('./utils/unEscape')


const parsing = (str, opts = {}) => {
    var xml = opts.type === undefined ? 'xml' : opts.type;
    var saxOpts = {
        trim : true,
        lowercase : true
    }


    var parser = sax.parser(xml, saxOpts);
    var nodeStack = [];
    const doc = {
        instruction : null,
        doctype : null,
        docElement : []
    }

    const addSimpleNode = (Type, value, scope) => {
        let el = nodeStack[nodeStack.length-1];
        if(el)
            el.addChild(new Type(value));
    }

    addEvents(parser, {
        doctype : str => {
            doc.doctype = str;
        },
        processinginstruction : obj => { doc.instruction = obj },

        text : function(str) { addSimpleNode(TextNode, unEscape(str), this) },
        cdata : function(str) { addSimpleNode(CDataNode, str, this) },
        comment : function(str) { addSimpleNode(CommentNode, str, this) },

        opentag : function(obj) {
            // this.startTagPosition

            let attrs = {};
            for(let key in obj.attributes) {
                attrs[key] = unEscape(obj.attributes[key]);
            }
            var el = new ElementNode({ name : obj.name, attrs });    

            if(nodeStack.length === 0) {
                //doc.docElement.push(el);
                doc.docElement = el; 
            }
            else {
                let parentEl = nodeStack[nodeStack.length-1];
                parentEl.addChild(el);
            }
            nodeStack.push(el);
        },
        closetag : name => {
            var el = nodeStack.pop();
        },
        
        error : err => { throw err },
        end : () => {
            // [...]
        }
    })

    parser.write(str).close();
    return doc;
}

const addEvents = (parser, events) => {
    if(!parser || !events)
        return;

    for(let key in events) {
        parser['on'+key] = events[key];
    }
}

module.exports = parsing;