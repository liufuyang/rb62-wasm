CREATE TEMP FUNCTION `b62_to_hex`(b62 STRING) RETURNS STRING
  LANGUAGE js
  OPTIONS (
        library=[
        "gs://fh-bigquery/js/inexorabletash.encoding.js",
        "gs://fuyang-draper-1/base62.js"
    ]
  )
  AS '''
    return wasm.then(() => {
        return wasm_bindgen.get_integer(b62);
    });
  ''';

SELECT b62_to_hex(b62) hex
FROM (
  select '3MxtKWdpxTVvxnAYPDJuKV' as b62
  union all
  select '6GGODyP2LIdbxIfYxy5UbN' as b62
)
