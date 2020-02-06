
function fetchAndInstantiate(url, importObject) {
    return fetch(url).then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
    ).then(results =>
        results.instance
    );
}

function newStr(module, str) {
    const utf8Encoder = new TextEncoder("UTF-8");
    let string_buffer = utf8Encoder.encode(str);
    let len = string_buffer.length;
    let ptr = module.alloc(len + 1);

    let memory = new Uint8Array(module.memory.buffer);
     memory.set(string_buffer, ptr);

    memory[ptr + len] = 0;

    return ptr;
}

// will clean up ptr
function getStr(module, ptr, len) {

    const buffer_as_u8 = new Uint8Array(module.memory.buffer).slice(ptr, ptr + len);
    const utf8Decoder = new TextDecoder("UTF-8");
    const buffer_as_utf8 = utf8Decoder.decode(buffer_as_u8);
    // Added by me, clean the input data
    module.dealloc_str(ptr);
    return buffer_as_utf8;
}


// https://stackoverflow.com/questions/47529643/how-to-return-a-string-or-similar-from-rust-in-webassembly
// https://github.com/WebAssembly/design/blob/master/Semantics.md#types
// https://github.com/badboy/hellorust/tree/master/demos