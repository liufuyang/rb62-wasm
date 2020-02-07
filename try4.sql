CREATE TEMP FUNCTION `b62_to_hex`(b62 ARRAY<STRING>) RETURNS ARRAY<STRING>
  LANGUAGE js
  OPTIONS (
    library=["gs://bq-udfs/v0.0.3-30/base62.js"]
  )
  AS '''
    return wasm.then(() => {
        return b62.map((val) => {
            return wasm_bindgen.get_integer(val);
        });
    });
  ''';

SELECT grp, hex
FROM (
SELECT FLOOR(RAND()*10) grp, b62_to_hex(ARRAY_AGG(b62_array[ORDINAL(ARRAY_LENGTH(b62_array))])) hex_array
FROM(
    SELECT  SPLIT(uri, ':') b62_array
    FROM `spotify-entities.track.20200205`
    LIMIT 1000000
  )
GROUP BY grp
) , UNNEST(hex_array) hex
