import hljs from "highlight.js";

export const Highlight = (data: string, chunks: string, tag: string) => {

    let arr = data.split(chunks);
    let final: string = "";
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
            final += arr[i];
        } else {
            let highlight = hljs.highlightAuto(arr[i]).value;
            final += `<${tag}>${highlight}</${tag}>`;
        }
    }

    return final;
}

