"use server";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UsuarioEnMemoria } from "./app/lib/definitions";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

type SessionPayload = { user: UsuarioEnMemoria; expires: Date };

export async function encryptCookies(payload: any) {
    return await new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("1 year").sign(key);
}

export async function decryptSession(input: string): Promise<SessionPayload> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload as SessionPayload;
}

export async function clearCookies() {
    // Destroy the session
    cookies().set("session", "", { expires: new Date(0) });
    cookies().delete("connect.sid");
}

export async function getLocalSession(): Promise<SessionPayload | null> {
    /**
     * Get's the local session payload from the cookies
     */
    const session = cookies().get("session")?.value;

    if (!session) return null;

    return await decryptSession(session);
}

export async function setLocalCookies(user: UsuarioEnMemoria) {
    // Create the session
    const expires = new Date(Date.now() + 31536000 * 1000);
    const session = await encryptCookies({ user, expires });

    // Save the session in a cookie
    cookies().set("session", session, { expires, httpOnly: true });
}

export async function updateSessionCookies(request: NextRequest) {
    /**
     * Sets the session from the backend's request into the client's cookies
     * To authenticate the future requests
     */
    const sessionFromRequest = request.cookies.get("session")?.value;

    if (!sessionFromRequest) return;

    // Refresh the session so it doesn't expire
    const newSession = await decryptSession(sessionFromRequest);

    newSession.expires = new Date(Date.now() + 31536000 * 1000);

    const res = NextResponse.next();

    res.cookies.set({
        name: "session",
        value: await encryptCookies(newSession),
        httpOnly: true,
        expires: newSession.expires,
    });

    return res;
}
