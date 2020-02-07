const RB62 = require('./base62.js')

console.log(RB62);

RB62.wasm.then(() => {
    console.log(wasm_bindgen.sum(1, 2));
    console.log(wasm_bindgen.get_integer("6GGODyP2LIdbxIfYxy5UbN"))
    console.log(wasm_bindgen.get_integer_batch(["6GGODyP2LIdbxIfYxy5UbN", "6GGODyP2LIdbxIfYxy5Ub2", "6GGODyP2LIdbxIfYxy5Ub3"]))
});