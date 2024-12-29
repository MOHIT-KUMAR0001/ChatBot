export const Formatter = (data: string, chunks: string, tag: string) => {

    let arr = data.split(chunks);
    let final: string = "";
    for (let i = 0; i < arr.length; i++) {
        if (i % 2 == 0) {
            final += arr[i];
        } else {
            final += `<${tag}>${arr[i]}</${tag}>`;
        }
    }

    return final;
}
