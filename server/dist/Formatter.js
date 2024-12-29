"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
const Formatter = (data, chunks, tag) => {
    let arr = data.split(chunks);
    let final = "";
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
            final += arr[i];
        }
        else {
            final += `<${tag}>${arr[i]}</${tag}>`;
        }
    }
    return final;
};
exports.Formatter = Formatter;
