
```
wasm-pack build --scope fuyangl

# Do some test run
node main.js
# Or simply open the index.html in browser

# Generation text for upload to bigquery
go run main.go < pkg/rb62_wasm_bg.wasm > wasm.txt

```