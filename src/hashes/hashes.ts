import {v4 as uuidv4, v7 as uuidv7} from "uuid";
import argon2 from "argon2";
import crypto from "crypto";

export function toSha256(data: crypto.BinaryLike): Uint8Array{
    return crypto.createHash("sha256").update(data).digest();
}

export function generateUuid(version: 4 | 7 = 7): string{
    switch (version){
        case 4:
            return uuidv4();
        case 7:
            return uuidv7();
        default:
            throw new Error("Please use version 4 (random) or 7 (time-based) for UUIDs");
    }
}

export async function hashPassword(password: string, timeCost: number = 12): Promise<string>{
    return await argon2.hash(password, {timeCost});
}

export async function verifyPassword(password: string, hash: string): Promise<boolean>{
    return await argon2.verify(hash, password);
}
