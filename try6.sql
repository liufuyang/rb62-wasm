CREATE TEMP FUNCTION `b62_to_hex`(b62 STRING) RETURNS STRING LANGUAGE js AS '''
  return wasm_bindgen(bytes).then(() => {
  	return wasm_bindgen.run(b62);
  });
'''
OPTIONS (
  library=[
    "gs://bq-udfs/v0.0.3-30/base62.js"
  ]
);

SELECT b62_to_hex(b62)
FROM (
  select '3MxtKWdpxTVvxnAYPDJuKV' as b62
  union all
  select '6GGODyP2LIdbxIfYxy5UbN' as b62
)
