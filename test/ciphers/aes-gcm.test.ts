import {describe, expect, test} from "bun:test";
import {AesGcmSecret} from "../../src/ciphers/aes-gcm.ts";

describe("AES-GCM secret", () => {
    test("Cipher", async(): Promise<void> =>{
        const cipher: AesGcmSecret = new AesGcmSecret("super-secret");
        const data: Uint8Array = new TextEncoder().encode("data");
        const encrypted: Uint8Array = await cipher.cipher(data);
        expect(encrypted).not.toEqual(data);
    });

    test("Cipher & decipher", async(): Promise<void> => {
        const cipher: AesGcmSecret = new AesGcmSecret("super-secret");
        const data: Uint8Array = new TextEncoder().encode("data");
        const encrypted: Uint8Array = await cipher.cipher(data);
        const decrypted: Uint8Array = await cipher.decipher(encrypted);
        expect(decrypted).toEqual(data);
    });

    test.todo("Decipher with wrong key", async(): Promise<void> => {
        let cipher: AesGcmSecret = new AesGcmSecret("super-secret");
        const data: Uint8Array = new TextEncoder().encode("data");
        const encrypted: Uint8Array = await cipher.cipher(data);
        cipher = new AesGcmSecret("wrong-secret");
        return expect(await cipher.decipher(encrypted)).rejects.toThrowError();
    });
});

