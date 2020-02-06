// wasm-pack build --scope fuyangl --release --target no-modules

use wasm_bindgen::prelude::*;
use rb62;


#[wasm_bindgen]
pub fn run(hex: &str) -> String {
    match rb62::get_b62(hex) {
        Some(b62) => {
            std::str::from_utf8(&b62).unwrap().to_string()
        },
        None => {
            "Not Valid Input       ".to_string()
        }
    }
}
