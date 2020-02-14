CREATE TEMP FUNCTION `hex_to_b62`(hex STRING) RETURNS STRING LANGUAGE js AS '''

return wasm.then(() => {
        return wasm_bindgen.get_b62(hex);
    });
'''
OPTIONS (
  library=[
    "gs://fh-bigquery/js/inexorabletash.encoding.js",
    "gs://liufuyang/public/rb62-wasm/base62.js"
  ]
);


SELECT hex_to_b62(hex) b62
FROM (
  select 'dbc3d5ebe344484da3e2448712a02213' as hex
  union all
  select 'ffffffffffffffffffffffffffffffff' as hex
)


CREATE TEMP FUNCTION `b62_to_hex`(b62 STRING) RETURNS STRING
  LANGUAGE js
  OPTIONS (
        library=[
        "gs://fh-bigquery/js/inexorabletash.encoding.js",
        "gs://liufuyang/public/rb62-wasm/base62.js"
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
