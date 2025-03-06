import * as crypto from "crypto";
import {concatUint8Array, generateGcmKey} from "./utils.ts";

export class AesGcmSecret{
    private readonly secret: string;

    constructor(secret: string){
        if(secret.length < 10)
            throw new Error("Secret must be at least 10 characters long");
        this.secret = secret;
    }

    async cipher(data: Uint8Array): Promise<Uint8Array>{
        const salt: Uint8Array = crypto.randomBytes(16);
        const key: crypto.webcrypto.CryptoKey = await generateGcmKey(this.secret, salt);
        const iv: Uint8Array = crypto.randomBytes(12);
        const cipher: Uint8Array = new Uint8Array(await crypto.subtle.encrypt(
            {
                name: "AES-GCM",
                iv,
            },
            key,
            data,
        ));
        return concatUint8Array([salt, iv, Buffer.from(cipher)]);
    }

    async decipher(data: Uint8Array): Promise<Uint8Array>{
        const salt: Uint8Array = data.subarray(0, 16);
        const key: crypto.webcrypto.CryptoKey = await generateGcmKey(this.secret, salt);
        const iv: Uint8Array = data.subarray(16, 28);
        const cipherContent: Uint8Array = data.subarray(28);
        return new Uint8Array(await crypto.subtle.decrypt(
            {
                name: "AES-GCM",
                iv,
            },
            key,
            cipherContent,
        ));
    }
}
