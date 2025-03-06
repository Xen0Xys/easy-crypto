import {type AesGcm, AesGcmKey, AesGcmSecret} from "../../src/ciphers/aes-gcm.ts";
import {type CryptoKey, generateGcmKey, generateRandomBytes} from "../../src";
import {describe, expect, test} from "bun:test";

describe("AES-GCM secret", () => {
    describe("Secret", () => {
        test("Cipher", async(): Promise<void> =>{
            const cipher: AesGcm = new AesGcmSecret("super-secret");
            const data: Uint8Array = new TextEncoder().encode("data");
            const encrypted: Uint8Array = await cipher.cipher(data);
            expect(encrypted).not.toEqual(data);
        });

        test("Cipher & decipher", async(): Promise<void> => {
            const cipher: AesGcm = new AesGcmSecret("super-secret");
            const data: Uint8Array = new TextEncoder().encode("data");
            const encrypted: Uint8Array = await cipher.cipher(data);
            const decrypted: Uint8Array = await cipher.decipher(encrypted);
            expect(decrypted).toEqual(data);
        });

        test.todo("Decipher with wrong key", async(): Promise<void> => {
            let cipher: AesGcm = new AesGcmSecret("super-secret");
            const data: Uint8Array = new TextEncoder().encode("data");
            const encrypted: Uint8Array = await cipher.cipher(data);
            cipher = new AesGcmSecret("wrong-secret");
            return expect(await cipher.decipher(encrypted)).rejects.toThrowError();
        });
    });

    describe("Key", () => {
        test("Cipher", async(): Promise<void> =>{
            const key: CryptoKey = await generateGcmKey("super-secret", generateRandomBytes(32));
            const cipher: AesGcm = new AesGcmKey(key);
            const data: Uint8Array = new TextEncoder().encode("data");
            const encrypted: Uint8Array = await cipher.cipher(data);
            expect(encrypted).not.toEqual(data);
        });

        test("Cipher & decipher", async(): Promise<void> => {
            const key: CryptoKey = await generateGcmKey("super-secret", generateRandomBytes(32));
            const cipher: AesGcm = new AesGcmKey(key);
            const data: Uint8Array = new TextEncoder().encode("data");
            const encrypted: Uint8Array = await cipher.cipher(data);
            const decrypted: Uint8Array = await cipher.decipher(encrypted);
            expect(decrypted).toEqual(data);
        });

        test.todo("Decipher with wrong key", async(): Promise<void> => {
            const salt: Uint8Array = generateRandomBytes(32);
            let key: CryptoKey = await generateGcmKey("super-secret", salt);
            let cipher: AesGcm = new AesGcmKey(key);
            const data: Uint8Array = new TextEncoder().encode("data");
            const encrypted: Uint8Array = await cipher.cipher(data);
            key = await generateGcmKey("wrong-secret", salt);
            cipher = new AesGcmKey(key);
            return expect(await cipher.decipher(encrypted)).rejects.toThrowError();
        });
    });
});

