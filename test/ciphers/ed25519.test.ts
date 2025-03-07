import {describe, expect, test} from "bun:test";
import {type CryptoKeyPair, generateEd25519Key} from "../../src/ciphers/utils.ts";
import {signEd25519, verifyEd25519} from "../../src/signatures/ed25519.ts";

describe("ed25519", () => {
    test("Sign", async() => {
        const key: CryptoKeyPair = await generateEd25519Key();
        const data: Uint8Array = new TextEncoder().encode("Hello World!");
        const signature: Uint8Array = await signEd25519(data, key.privateKey);
        expect(signature).not.toEqual(data);
    });

    test("Verify", async() => {
        const key: CryptoKeyPair = await generateEd25519Key();
        const data: Uint8Array = new TextEncoder().encode("Hello World!");
        const signature: Uint8Array = await signEd25519(data, key.privateKey);
        const valid: boolean = await verifyEd25519(data, signature, key.publicKey);
        expect(valid).toBe(true);
    });

    test("Verify invalid public key", async() => {
        const key: CryptoKeyPair = await generateEd25519Key();
        const data: Uint8Array = new TextEncoder().encode("Hello World!");
        const signature: Uint8Array = await signEd25519(data, key.privateKey);
        const key2: CryptoKeyPair = await generateEd25519Key();
        const valid: boolean = await verifyEd25519(data, signature, key2.publicKey);
        expect(valid).toBe(false);
    });
});
