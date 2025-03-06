import jwt, {type JwtPayload} from "jsonwebtoken";

export function signJwt(payload: JwtPayload, secret: string, duration: string = "7d"): string{
    // @ts-ignore
    return jwt.sign(payload, secret, {
        expiresIn: duration,
        algorithm: "HS512",
        allowInsecureKeySizes: false,
    });
}

export function verifyJwt(token: string, secret: string): JwtPayload{
    return jwt.verify(token, secret, {
        algorithms: ["HS512"],
    }) as JwtPayload;
}
