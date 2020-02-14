CREATE TEMP FUNCTION `hex_to_b62`(hex STRING) RETURNS STRING LANGUAGE js AS
'''
   return Base62.fromHex(hex);
'''
OPTIONS (
  library=[
    "gs://bq-udfs/latest/base62.js"
  ]
);
SELECT hex_to_b62(hex) b62
FROM (
  select 'dbc3d5ebe344484da3e2448712a02213' as hex
  union all
  select 'ffffffffffffffffffffffffffffffff' as hex
)
