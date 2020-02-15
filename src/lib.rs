use wasm_bindgen::prelude::*;
use rb62;
use js_sys::Array;

#[wasm_bindgen]
pub fn sum(a: f64, b: f64) -> f64 {
    a + b
}


#[wasm_bindgen]
pub fn get_integer(base62: &str) -> String {
    match rb62::get_hex(base62) {
        Some(hex) => {
            std::str::from_utf8(&hex).unwrap().to_string()
        },
        None => {
            "Not Valid Input                ".to_string()
        },
    }
}

#[wasm_bindgen]
pub fn get_integer_batch(base62s: Array) -> Array {
    base62s.iter()
        .map(|base62|
            match rb62::get_hex(&base62.as_string().unwrap()) {
                Some(hex) => {
                    JsValue::from(std::str::from_utf8(&hex).unwrap())
                },
                None => {
                    JsValue::from("Not Valid Input                ")
                },
            }
        ).collect()

}


#[wasm_bindgen]
pub fn get_b62(hex: &str) -> String {
    match rb62::get_b62(hex) {
        Some(b62) => {
            std::str::from_utf8(&b62).unwrap().to_string()
        },
        None => {
            "Not Valid Input       ".to_string()
        },
    }
}
