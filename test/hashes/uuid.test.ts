import {describe, expect, test} from "bun:test";
import {generateUuid} from "../../src";

describe("UUID", () => {
    test("V4", async(): Promise<void> => {
        const uuid: string = generateUuid(4);
        expect(uuid).toBeDefined();
        expect(uuid.length).toBe(36);
        expect(uuid[14]).toBe("4");
    });

    test("V7", async(): Promise<void> => {
        const uuid: string = generateUuid(7);
        expect(uuid).toBeDefined();
        expect(uuid.length).toBe(36);
        expect(uuid[14]).toBe("7");
    });

    test("Default (V7)", async(): Promise<void> => {
        const uuid: string = generateUuid();
        expect(uuid).toBeDefined();
        expect(uuid.length).toBe(36);
        expect(uuid[14]).toBe("7");
    });

    test("Invalid Version", async(): Promise<void> => {
        try{
            // @ts-ignore
            generateUuid(5);
            expect(true).toBe(false);
        }catch(e: any){
            expect(e).toBeDefined();
        }
    });
});
