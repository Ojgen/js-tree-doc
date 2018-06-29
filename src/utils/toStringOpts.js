const toStringOpts = (opts = {}) => {
    const defs = {
        escape : true,
        sn : '"',
        indent : '',
        level : 0,
        indentStepStr : '  ',
        linebreak : '\n',
        pretify : true
    }
    
    for(let key in defs) {
        if(opts[key] === undefined) 
            opts[key] = defs[key];
    }

    if(opts.compress) {
        opts.linebreak = '';
        opts.indent = '';
        opts.indentStepStr = '';
        opts.level = 0;
    }

    return opts;
}

module.exports = toStringOpts;