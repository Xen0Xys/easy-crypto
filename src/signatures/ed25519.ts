import crypto from "crypto";
import {type CryptoKey} from "../ciphers/utils.ts";

export async function signEd25519(data: Uint8Array, privateKey: CryptoKey): Promise<Uint8Array>{
    const signature: Uint8Array = new Uint8Array(await crypto.subtle.sign(
        {
            name: "Ed25519",
        },
        privateKey,
        data,
    ));
    return new Uint8Array(signature);
}

export async function verifyEd25519(data: Uint8Array, signature: Uint8Array, publicKey: CryptoKey): Promise<boolean>{
    return await crypto.subtle.verify(
        {
            name: "Ed25519",
        },
        publicKey,
        signature,
        data,
    );
}
