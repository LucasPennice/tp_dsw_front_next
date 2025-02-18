import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UserRole, UsuarioEnMemoria } from "./app/lib/definitions";
import { decryptSession, updateSessionCookies } from "./authlib";

const protectedRoutes: string[] = [];
const adminOnlyRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
    /// 1. Update the session cookies from the request

    await updateSessionCookies(request);

    // 2. Check if the current route is protected or public
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.find((route) => path.includes(route)) !== undefined;
    const isAdminRoute = adminOnlyRoutes.find((route) => path.includes(route)) !== undefined;

    // 3. Decrypt the session from the cookie
    const sessionInCookies = cookies().get("session")?.value;

    let usuarioEnSesion: UsuarioEnMemoria | undefined = undefined;

    if (sessionInCookies != undefined) {
        const session = await decryptSession(sessionInCookies);

        if (session.user) {
            usuarioEnSesion = session.user;
        }
    }

    // 4. Redirect to /login if the user is not authenticated
    if (isAdminRoute && usuarioEnSesion?.rol != UserRole.Administrador) {
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }

    // 4. Redirect to /login if the user is not authenticated
    if (isProtectedRoute && !usuarioEnSesion) {
        return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
    }

    return NextResponse.next();
}
