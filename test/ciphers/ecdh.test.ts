import {describe, expect, test} from "bun:test";
import {type CryptoKeyPair, generateEcdhKey} from "../../src/ciphers/utils.ts";
import {Ecdh} from "../../src/ciphers/ecdh.ts";

describe("Ecdh", (): void => {
    test("Cipher", async(): Promise<void> => {
        const bobKeyPair: CryptoKeyPair = await generateEcdhKey();
        const aliceKeyPair: CryptoKeyPair = await generateEcdhKey();
        const aliceEcdh: Ecdh = new Ecdh(aliceKeyPair.privateKey, bobKeyPair.publicKey);
        const data: Uint8Array = new TextEncoder().encode("Hello World!");
        const encrypted: Uint8Array = await aliceEcdh.cipher(data);
        expect(encrypted).not.toEqual(data);
    });

    test("Cipher with empty data", async(): Promise<void> => {
        const bobKeyPair: CryptoKeyPair = await generateEcdhKey();
        const aliceKeyPair: CryptoKeyPair = await generateEcdhKey();
        const aliceEcdh: Ecdh = new Ecdh(aliceKeyPair.privateKey, bobKeyPair.publicKey);
        const data: Uint8Array = new Uint8Array(0);
        const encrypted: Uint8Array = await aliceEcdh.cipher(data);
        expect(encrypted).not.toEqual(data);
    });

    test("Decipher", async(): Promise<void> => {
        const bobKeyPair: CryptoKeyPair = await generateEcdhKey();
        const aliceKeyPair: CryptoKeyPair = await generateEcdhKey();
        const bobEcdh: Ecdh = new Ecdh(bobKeyPair.privateKey, aliceKeyPair.publicKey);
        const aliceEcdh: Ecdh = new Ecdh(aliceKeyPair.privateKey, bobKeyPair.publicKey);
        const data: Uint8Array = new TextEncoder().encode("Hello World!");
        const encrypted: Uint8Array = await aliceEcdh.cipher(data);
        const decrypted: Uint8Array = await bobEcdh.decipher(encrypted);
        expect(decrypted).toEqual(data);
    });
});
