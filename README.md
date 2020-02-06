```
wasm-pack build --scope fuyangl --release --target no-modules
node generate-sql.js
```

Now upload the `base62.sql` file to BigQuery
