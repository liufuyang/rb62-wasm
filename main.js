const fs = require('fs');
const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
const env = {
    'abortStackOverflow': _ => { throw new Error('overflow'); },
    'table': new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
    'tableBase': 0,
    'memory': memory,
    'memoryBase': 1024,
    'STACKTOP': 0,
    'STACK_MAX': memory.buffer.byteLength,
};
const imports = { env };
fs.readFile('pkg/rb62_wasm_bg.wasm', (err, bytes) => {
    WebAssembly.instantiate(bytes, imports).then(wa => {
        const exports = wa.instance.exports;
        const sum = exports.sum;
        console.log(sum(39, 3));

        let b62 = newStr(exports, "6GGODyP2LIdbxIfYxy5UbN");
        const output_ptr = exports.get_integer(b62);
        let hex = getStr(exports, output_ptr, 32);
        console.log(hex)

        let hex_input = newStr(exports, "dbc3d5ebe344484da3e2448712a02213");
        const b62_output_ptr2 = exports.get_b62(hex_input);
        let b62_output = getStr(exports, b62_output_ptr2, 22);
        console.log(b62_output)

    }).catch(console.error);
});

function newStr(module, str) {
    const utf8Encoder = new TextEncoder("UTF-8");
    let string_buffer = utf8Encoder.encode(str)
    let len = string_buffer.length
    let ptr = module.alloc(len+1)

    let memory = new Uint8Array(module.memory.buffer);
    for (i = 0; i < len; i++) {
        memory[ptr+i] = string_buffer[i]
    }

    memory[ptr+len] = 0;

    return ptr;
}

function getStr(module, ptr, len) {
    const getData = function* (ptr, len) {
        let memory = new Uint8Array(module.memory.buffer);
        for (let index = 0; index < len; index++) {
            if (memory[ptr] === undefined) { throw new Error(`Tried to read undef mem at ${ptr}`) }
            yield memory[ptr + index]
        }
    }
    const buffer_as_u8 = new Uint8Array(getData(ptr, len));
    const utf8Decoder = new TextDecoder("UTF-8");
    const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8);
    return buffer_as_utf8;
}

// https://stackoverflow.com/questions/47529643/how-to-return-a-string-or-similar-from-rust-in-webassembly
// https://github.com/WebAssembly/design/blob/master/Semantics.md#types
// https://github.com/badboy/hellorust/tree/master/demos