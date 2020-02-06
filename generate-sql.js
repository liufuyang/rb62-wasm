const fs = require('fs');

const glue = fs.readFileSync("./pkg/rb62_wasm.js", { encoding: "utf8" });
const buffer = fs.readFileSync("./pkg/rb62_wasm_bg.wasm");

const bytes = Array.from(new Uint8Array(buffer.buffer));

fs.writeFileSync("base62.sql", `\
CREATE TEMP FUNCTION \`b62_to_hex\`(b62 STRING) RETURNS STRING LANGUAGE js AS '''
${glue}
const bytes = new Uint8Array(${JSON.stringify(bytes)});

return wasm_bindgen(bytes).then(() => {
    return wasm_bindgen.run(b62);
});
''';

SELECT b62_to_hex(b62) hex
FROM (
  select '3MxtKWdpxTVvxnAYPDJuKV' as b62
  union all
  select '6GGODyP2LIdbxIfYxy5UbN' as b62
)`);
