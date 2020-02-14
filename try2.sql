CREATE TEMP FUNCTION `magic_function`(x INT64, y INT64) RETURNS INT64
  LANGUAGE js
  OPTIONS (
        library=[
        "gs://fh-bigquery/js/inexorabletash.encoding.js",
        "gs://liufuyang/public/rb62-wasm/base62.js"
    ]
  )
  AS '''
    return wasm.then(() => {
        return wasm_bindgen.sum(x, y);
    });
  ''';

SELECT magic_function(x, y) sum
FROM (
  select 1 as x , 44 as y
  union all
  select 2 as x , 3 as y
)
