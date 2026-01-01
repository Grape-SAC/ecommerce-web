import { NextRequest, NextResponse } from "next/server";
import appConfig from "@/config/config";

const PROTECTED_ROUTES = ["/mis-pedidos", "/mi-cuenta"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  console.log("🔵 [MW] Request a:", pathname);

  // Si no es ruta protegida → continuar
  if (!PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    console.log("⚪ [MW] Ruta pública. Se permite el acceso.");
    return NextResponse.next();
  }

  console.log("🟣 [MW] Ruta protegida detectada.");

  const access = req.cookies.get("access_token")?.value;
  const refresh = req.cookies.get("refresh_token")?.value;

  console.log("🍪 [MW] Cookies recibidas:");
  console.log("   access_token:", access ? "(present)" : "(NO presente)");
  console.log("   refresh_token:", refresh ? "(present)" : "(NO presente)");

  // Si no tiene refresh → login
  if (!refresh) {
    console.log("⛔ [MW] No hay refresh_token. Redirigiendo al login.");
    return NextResponse.redirect(
      new URL(`/iniciar-sesion?next=${pathname}`, req.url)
    );
  }

  // Si ya hay access → seguimos
  if (access) {
    console.log("🟢 [MW] Access token válido. Permitir acceso.");
    return NextResponse.next();
  }

  // ✔ TOKEN EXPIRADO → intentar refrescar
  console.log("🟠 [MW] Access token ausente → intentando REFRESH…");

  let refreshRes: Response;

  try {
    refreshRes = await fetch(`${appConfig.apiBaseUrlServer}/auth/refresh`, {
      method: "POST",
      headers: {
        Cookie: `refresh_token=${refresh}`,
      },
    });
  } catch (error) {
    console.log("🔥 [MW] Error al contactar el backend:", error);
    return NextResponse.redirect(
      new URL(`/iniciar-sesion?next=${pathname}`, req.url)
    );
  }

  console.log("🎛 [MW] Respuesta refresh status:", refreshRes.status);

  if (!refreshRes.ok) {
    console.log("❌ [MW] Refresh falló. Redirigiendo al login.");
    return NextResponse.redirect(
      new URL(`/iniciar-sesion?next=${pathname}`, req.url)
    );
  }

  const setCookie = refreshRes.headers.get("set-cookie") ?? "";
  console.log("📨 [MW] Set-Cookie recibido desde backend:", setCookie || "(vacío)");

  // 🔍 Extraemos solo los valores de access_token y refresh_token
  const accessMatch = setCookie.match(/access_token=([^;]+)/);
  const refreshMatch = setCookie.match(/refresh_token=([^;]+)/);

  const response = NextResponse.next();

  if (accessMatch) {
    const newAccess = accessMatch[1];
    console.log("🍪 [MW] Guardando access_token en respuesta.");
    response.cookies.set("access_token", newAccess, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 900 segundos = 15 minutos
    });
  }

  if (refreshMatch) {
    const newRefresh = refreshMatch[1];
    console.log("🍪 [MW] Guardando refresh_token en respuesta.");
    response.cookies.set("refresh_token", newRefresh, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días (igual que backend)
    });
  }

  console.log("✅ [MW] Refresh exitoso. Permitiendo acceso.");
  return response;
}

// Solo aplicamos a rutas protegidas (o si quieres, deja "/:path*")
export const config = {
  matcher: [
    "/mis-pedidos",
    "/mis-pedidos/:path*",
    "/mi-cuenta",
    "/mi-cuenta/:path*",
  ],
};

// export const config = {
//   matcher: ["/:path*"],  // aplica a TODAS las rutas
// };
