"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highlight = void 0;
const highlight_js_1 = __importDefault(require("highlight.js"));
const Highlight = (data, chunks, tag) => {
    let arr = data.split(chunks);
    let final = "";
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
            final += arr[i];
        }
        else {
            let highlight = highlight_js_1.default.highlightAuto(arr[i]).value;
            final += `<${tag}>${highlight}</${tag}>`;
        }
    }
    return final;
};
exports.Highlight = Highlight;
