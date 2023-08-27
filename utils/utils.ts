export async function streamToString(stream) {
    const chunks = []
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk))
    }

    return Buffer.concat(chunks).toString("utf-8")
}

export async function streamToJson(stream) {
    return JSON.parse(await streamToString(stream))
}

export async function streamToBase64(stream) {
    const chunks = []
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk))
    }

    return Buffer.concat(chunks).toString("base64")
}
