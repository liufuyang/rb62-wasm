// wasm-pack build --scope fuyangl

extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;
use rb62;

use std::ffi::{CString, CStr};
use std::os::raw::{c_char, c_void};
use std::mem;
use std::str;


// Helper functions - https://github.com/badboy/hellorust/blob/master/demos/sha1/sha1-digest.rs
#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub extern "C" fn dealloc(ptr: *mut c_void, cap: usize) {
    unsafe  {
        let _buf = Vec::from_raw_parts(ptr, 0, cap);
    }
}

#[no_mangle]
pub extern "C" fn dealloc_str(ptr: *mut c_char) {
    unsafe {
        let _ = CString::from_raw(ptr);
    }
}

#[wasm_bindgen]
pub fn sum(a: isize, b: isize) -> isize {
    return a + b;
}

#[wasm_bindgen]
pub fn hello() -> *mut c_char {
    let s = CString::new("hello").unwrap();
    s.into_raw()
}

#[wasm_bindgen]
pub fn get_integer(base62: *mut c_char) -> *mut c_char {
    unsafe {
        let base62 = CStr::from_ptr(base62).to_str().unwrap();
        let hex_as_u128 = rb62::get_integer(base62).unwrap();
        let hex = format!("{:032x}", hex_as_u128);
        let s = CString::new(hex).unwrap();
        s.into_raw()
    }
}

#[wasm_bindgen]
pub fn get_b62(hex: *mut c_char) -> *mut c_char {
    unsafe {
        let hex = CStr::from_ptr(hex).to_str().unwrap();
        let b62 = rb62::get_b62(hex).unwrap();
        let b62 = str::from_utf8(&b62).unwrap();
        let s = CString::new(b62).unwrap();
        s.into_raw()
    }
}

#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
