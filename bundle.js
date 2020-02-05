module.exports = {
    newStr: function (module, str) {
        const utf8Encoder = new TextEncoder("UTF-8");
        let string_buffer = utf8Encoder.encode(str);
        let len = string_buffer.length;
        let ptr = module.alloc(len + 1);

        let memory = new Uint8Array(module.memory.buffer);
        for (i = 0; i < len; i++) {
            memory[ptr + i] = string_buffer[i]
        }

        memory[ptr + len] = 0;

        return ptr;
    },

    // will clean up ptr
    getStr: function (module, ptr, len) {
        const getData = function* (ptr, len) {
            let memory = new Uint8Array(module.memory.buffer);
            for (let index = 0; index < len; index++) {
                if (memory[ptr] === undefined) {
                    throw new Error(`Tried to read undef mem at ${ptr}`)
                }
                yield memory[ptr + index]
            }
        };
        const buffer_as_u8 = new Uint8Array(getData(ptr, len));
        const utf8Decoder = new TextDecoder("UTF-8");
        const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8);
        // Added by me, clean the input data
        module.dealloc_str(ptr);
        return buffer_as_utf8;
    }
};

// https://developer.mozilla.org/en-US/docs/WebAssembly/Rust_to_wasm

// https://stackoverflow.com/questions/47529643/how-to-return-a-string-or-similar-from-rust-in-webassembly
// https://github.com/WebAssembly/design/blob/master/Semantics.md#types
// https://github.com/badboy/hellorust/tree/master/demos