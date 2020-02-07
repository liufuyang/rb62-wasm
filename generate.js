const fs = require('fs');

const glue = fs.readFileSync("./pkg/rb62_wasm.js", { encoding: "utf8" });
const buffer = fs.readFileSync("./pkg/rb62_wasm_bg.wasm");

const bytes = Array.from(new Uint8Array(buffer.buffer));

fs.writeFileSync("base62.js", `\
${glue}
self.wasm = wasm_bindgen(new Uint8Array(${JSON.stringify(bytes)}));
`);
