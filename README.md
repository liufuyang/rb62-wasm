```
wasm-pack build --release --target no-modules
node generate.js 
# above commend will generate a base62.js file
```

Then replace the word `self` to `this` in `base62.js`

Now upload the `base62.js` file to BigQuery. Then you can test out some queries
like `try1.sql`.


Note:
* It seems for now to let the JS script work on Bigquery you would need 
this `"gs://fh-bigquery/js/inexorabletash.encoding.js"` package. As mentioned here
https://stackoverflow.com/questions/60094731/can-i-use-textencoder-in-bigquery-js-udf/60102710#60102710