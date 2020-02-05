const fs = require('fs');
const bundle = require('./bundle');

const memory = new WebAssembly.Memory({initial: 256, maximum: 256});
const env = {
    'abortStackOverflow': _ => {
        throw new Error('overflow');
    },
    'table': new WebAssembly.Table({initial: 0, maximum: 0, element: 'anyfunc'}),
    'tableBase': 0,
    'memory': memory,
    'memoryBase': 1024,
    'STACKTOP': 0,
    'STACK_MAX': memory.buffer.byteLength,
};
const imports = {env};
fs.readFile('pkg/rb62_wasm_bg.wasm', (err, bytes) => {
    WebAssembly.instantiate(bytes, imports).then(wa => {
        const exports = wa.instance.exports;
        const sum = exports.sum;
        console.log(sum(39, 3));

        let b62 = bundle.newStr(exports, "6GGODyP2LIdbxIfYxy5UbN");
        const output_ptr = exports.get_integer(b62);
        let hex = bundle.getStr(exports, output_ptr, 32);
        console.log(hex);

        let hex_input = bundle.newStr(exports, "dbc3d5ebe344484da3e2448712a02213");
        const b62_output_ptr2 = exports.get_b62(hex_input);
        let b62_output = bundle.getStr(exports, b62_output_ptr2, 22);
        console.log(b62_output);

    }).catch(console.error);
});
