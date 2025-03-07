import crypto from "crypto";

export type CryptoKey = crypto.webcrypto.CryptoKey;
export type CryptoKeyPair = crypto.webcrypto.CryptoKeyPair;

export function generateRandomBytes(length: number): Uint8Array{
    const array: Uint8Array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return array;
}

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

export async function generateGcmKey(secret: string, salt: Uint8Array, extractable: boolean = false): Promise<CryptoKey>{
    if(secret.length < 10)
        throw new Error("Secret must be at least 10 characters long");
    if(salt && salt.length < 16)
        throw new Error("Salt must be 16 bytes long");
    const encoder = new TextEncoder();
    const keyMaterial: crypto.webcrypto.CryptoKey = await crypto.subtle.importKey(
        "raw",
        encoder.encode(secret),
        {
            name: "PBKDF2",
        },
        false,
        ["deriveKey"],
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
        ["encrypt", "decrypt"],
    );
}

export async function generateEcdhKey(): Promise<CryptoKeyPair>{
    return await crypto.subtle.generateKey(
        {
            name: "ECDH",
            namedCurve: "P-521",
        },
        false,
        ["deriveKey"],
    );
}

export async function generateEd25519Key(): Promise<CryptoKeyPair>{
    return await crypto.subtle.generateKey(
        {
            name: "Ed25519",
        },
        false,
        ["sign", "verify"],
    ) as CryptoKeyPair;
}
