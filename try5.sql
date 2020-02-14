CREATE TEMP FUNCTION `hex_to_b62`(hex ARRAY<STRING>) RETURNS ARRAY<STRING>
  LANGUAGE js
  OPTIONS (
    library=[
        "gs://fh-bigquery/js/inexorabletash.encoding.js",
        "gs://liufuyang/public/rb62-wasm/base62.js"
        -- "gs://bq-udfs/v0.0.3-30/base62.js"
    ]
  )
  AS '''
    return wasm.then(() => {
        return hex.map((val) => {
            return wasm_bindgen.get_b62(val);
        });
    });
  ''';

SELECT grp, b62
FROM (
SELECT FLOOR(RAND()*10) grp, hex_to_b62(ARRAY_AGG(gid)) b62_array
FROM(
    SELECT track.gid AS gid FROM `spotify-entities.entities.entities20200205` WHERE track IS NOT NULL
    LIMIT 1000000
  )
GROUP BY grp
) , UNNEST(b62_array) b62
