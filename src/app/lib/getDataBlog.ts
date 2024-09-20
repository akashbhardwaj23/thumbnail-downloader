


export async function toDataURL(url : string) {
    const blob = await fetch(url, {
        mode : "no-cors"
    }).then(res => res.blob());
    return URL.createObjectURL(blob);
}