import crypto from "crypto";

export function concatUint8Array(arrays: Uint8Array[]): Uint8Array{
    let length: number = 0;
    for(const array of arrays)
        length += array.length;
    const result: Uint8Array = new Uint8Array(length);
    let offset: number = 0;
    for(const array of arrays){
        result.set(array, offset);
        offset += array.length;
    }
    return result;
}

export async function generateGcmKey(secret: string, salt: Uint8Array, extractable: boolean = false): Promise<crypto.webcrypto.CryptoKey>{
    if(secret.length < 10)
        throw new Error("Secret must be at least 10 characters long");
    if(salt && salt.length < 16)
        throw new Error("Salt must be 16 bytes long");
    const encoder = new TextEncoder();
    const keyMaterial: crypto.webcrypto.CryptoKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        {
            name: "PBKDF2"
        },
        false,
        ["deriveKey"]
    );
    return await crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt,
            iterations: 210000,
            hash: "SHA-512",
        },
        keyMaterial,
        {
            name: "AES-GCM",
            length: 256,
        },
        extractable,
        ["encrypt", "decrypt"]
    );
}
