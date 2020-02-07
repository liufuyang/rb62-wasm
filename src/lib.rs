use wasm_bindgen::prelude::*;
use rb62;


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
pub fn get_integer2(base62: &str) -> String {
    match rb62::get_integer(&base62) {
        Some(hex_as_u128) => {
            format!("{:032x}", hex_as_u128)
        },
        None => {
            "Not Valid Input                ".to_string()
        },
    }
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
