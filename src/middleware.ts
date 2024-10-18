import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UserRole, UsuarioEnMemoria } from "./app/lib/definitions";
import { decrypt, updateSession } from "./authlib";

const protectedRoutes: String[] = [];
const adminOnlyRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
    /// ACTUALIZA LA SESSION

    await updateSession(request);

    /// AUTH RUTAS

    // 2. Check if the current route is protected or public
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isAdminRoute = adminOnlyRoutes.includes(path);

    // 3. Decrypt the session from the cookie
    const cookie = cookies().get("session")?.value;

    let usuarioEnSesion: UsuarioEnMemoria | undefined = undefined;

    if (cookie != undefined) {
        const session = await decrypt(cookie);

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
