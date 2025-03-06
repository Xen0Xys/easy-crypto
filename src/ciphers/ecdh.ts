import {AesGcmKey} from "./aes-gcm.ts";
import type {CryptoKey} from "./utils.ts";

export class Ecdh{
    private aesGcmKey?: AesGcmKey;
    private readonly keyPromise: Promise<void>;

    constructor(internalPrivateKey: CryptoKey, externalPublicKey: CryptoKey){
        this.keyPromise = new Promise<void>(async(resolve: () => void): Promise<void> => {
            const key: CryptoKey = await crypto.subtle.deriveKey(
                {
                    name: "ECDH",
                    // @ts-ignore
                    public: externalPublicKey,
                },
                internalPrivateKey,
                {
                    name: "AES-GCM",
                    length: 256,
                },
                false,
                ["encrypt", "decrypt"],
            );
            this.aesGcmKey = new AesGcmKey(key);
            resolve();
        });
    }

    async cipher(data: Uint8Array): Promise<Uint8Array>{
        if(!this.aesGcmKey)
            await this.keyPromise;
        return await this.aesGcmKey!.cipher(data);
    }

    async decipher(data: Uint8Array): Promise<Uint8Array>{
        if(!this.aesGcmKey)
            await this.keyPromise;
        return await this.aesGcmKey!.decipher(data);
    }
}
