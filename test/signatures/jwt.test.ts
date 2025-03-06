import {describe, expect, test} from "bun:test";
import {signJwt, verifyJwt} from "../../src";
import {type JwtPayload} from "jsonwebtoken";

describe("Jwt", () => {
    test("Sign", () => {
        const jwt: string = signJwt({
            sub: "user_id",
            aud: "audience",
            iss: "issuer",
            jti: "jwt_id",
        } as JwtPayload, "super-secret");
        expect(jwt).toBeDefined();
    });

    test("Verify", () => {
        const jwt: string = signJwt({
            sub: "user_id",
            aud: "audience",
            iss: "issuer",
            jti: "jwt_id",
        } as JwtPayload, "super-secret");
        const payload: JwtPayload = verifyJwt(jwt, "super-secret");
        expect(payload.sub).toBe("user_id");
        expect(payload.aud).toBe("audience");
        expect(payload.iss).toBe("issuer");
        expect(payload.jti).toBe("jwt_id");
    });

    test("Expired", async() => {
        const jwt: string = signJwt({
            sub: "user_id",
            aud: "audience",
            iss: "issuer",
            jti: "jwt_id",
        } as JwtPayload, "super-secret", "0");
        try{
            verifyJwt(jwt, "super-secret");
            expect(true).toBe(false);
        }catch(e: any){
            expect(e).toBeDefined();
        }
    });
});
