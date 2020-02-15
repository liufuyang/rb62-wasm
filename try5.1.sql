CREATE TEMP FUNCTION `hex_to_b62`(hex STRING) RETURNS STRING
  LANGUAGE js
  OPTIONS (
    library=[
        "gs://fh-bigquery/js/inexorabletash.encoding.js",
        "gs://liufuyang/public/rb62-wasm/base62.js",
        "gs://bq-udfs/latest/base62.js" -- Internal JS base62 libarary - providing Base62.fromHex function
    ]
  )
  AS '''
    return wasm.then(() => wasm_bindgen.get_b62(hex));  // 22.7 sec total of 138328003 element
    // return Base62.fromHex(hex);                      // 15.4 sec total of 138328003 element
  ''';

 SELECT hex_to_b62(track.gid) AS hex 
 FROM `spotify-entities.entities.entities20200205` 
 WHERE track.gid IS NOT NULL
 # LIMIT 10000000
