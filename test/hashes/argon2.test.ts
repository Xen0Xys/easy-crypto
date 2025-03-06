import {describe, expect, test} from "bun:test";
import {hashPassword, verifyPassword} from "../../src";

describe("Argon2", (): void => {
    test("Hash", async(): Promise<void> => {
        const password = "data";
        const hash: string = await hashPassword(password);
        expect(hash).toBeDefined();
        expect(hash).toContain("argon2id");
    });

    test("Hash is argon2id", async(): Promise<void> => {
        const password = "data";
        const hash: string = await hashPassword(password);
        expect(hash).toContain("argon2id");
    });

    test("Empty data", async(): Promise<void> => {
        const password = "";
        const hash: string = await hashPassword(password);
        expect(hash).toBeDefined();
    });

    test("Verify", async(): Promise<void> => {
        const password = "data";
        const hash: string = await hashPassword(password);
        const result: boolean = await verifyPassword(password, hash);
        expect(result).toBeTruthy();
    });
});
