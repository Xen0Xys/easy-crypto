import {toSha256} from "../../src";
import {describe, expect, test} from "bun:test";

describe("sha256", (): void => {
    test("Data", (): void => {
        const data = "data";
        const hash: Uint8Array = toSha256(data);
        expect(hash).toBeDefined();
    });

    test("Without data", (): void => {
        const data = "";
        const hash: Uint8Array = toSha256(data);
        expect(hash).toBeDefined();
    });

    test("Type", (): void => {
        const data = "data";
        const hash: Uint8Array = toSha256(data);
        expect(hash).toBeInstanceOf(Uint8Array);
    });

    test("Length", (): void => {
        const data = "";
        const hash: Uint8Array = toSha256(data);
        expect(hash.length).toBe(32);
    });

    test("Value", (): void => {
        const data = "";
        const hash: Uint8Array = toSha256(data);
        expect(hash.toHex()).toBe("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855");
    });
});

