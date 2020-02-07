const RB62 = require('./base62.js')

console.log(RB62);

RB62.wasm.then(() => {
    console.log(wasm_bindgen.sum(1, 2));
    console.log(wasm_bindgen.get_integer("6GGODyP2LIdbxIfYxy5UbN"))
});