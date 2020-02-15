CREATE TEMP FUNCTION `b62_to_hex`(b62 STRING) RETURNS STRING
  LANGUAGE js
  OPTIONS (
        library=[
        "gs://fh-bigquery/js/inexorabletash.encoding.js",
        "gs://liufuyang/public/rb62-wasm/base62.js",
        "gs://bq-udfs/latest/base62.js" -- Internal JS base62 libarary, providing Base62.toHex function
    ]
  )
  AS '''
    return wasm.then(() => wasm_bindgen.get_integer(b62));  // 26.8 sec, total 138328004 values
    // return Base62.toHex(b62);                            // 20.2 sec, total 138328004 values
  ''';

SELECT b62_to_hex(b62_array[ORDINAL(ARRAY_LENGTH(b62_array))]) hex
FROM(
    SELECT  SPLIT(uri, ':') b62_array
    FROM `spotify-entities.track.20200205`
    # LIMIT 1000000
  )
