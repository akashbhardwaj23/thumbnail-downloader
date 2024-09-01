


export async function toDataURL(url : string) {
    console.log("Url ", url)
    const blob = await fetch(url, {
        mode : "no-cors"
    }).then(res => res.blob());
    console.log(blob)
    return URL.createObjectURL(blob);
}