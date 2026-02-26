import { supabaseServerClientWithSetAllCookies } from "@/lib/supabase/supabaseServerClientWithSetAllCookies";
import { NextResponse } from "next/server";

function getSafePath(value: string | null) {
  const v = value ?? "/";
  return v.startsWith("/") ? v : "/";
}

function readCookie(request: Request, name: string) {
  const raw = request.headers.get("cookie") ?? "";
  const match = raw.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const { searchParams, origin } = url;

  const code = searchParams.get("code");

  const cookieReturnTo = readCookie(request, "Vottally_returnTo");
  const redirectPath = getSafePath(
    searchParams.get("returnTo") ?? cookieReturnTo ?? searchParams.get("next"),
  );

  if (code) {
    const supabase = await supabaseServerClientWithSetAllCookies();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host");
      const isLocalEnv = process.env.NODE_ENV === "development";

      const redirectUrl = isLocalEnv
        ? `${origin}${redirectPath}`
        : forwardedHost
          ? `https://${forwardedHost}${redirectPath}`
          : `${origin}${redirectPath}`;

      const res = NextResponse.redirect(redirectUrl);

      // ✅ clear cookie after use
      res.headers.append(
        "Set-Cookie",
        "Vottally_returnTo=; Path=/; Max-Age=0; SameSite=Lax",
      );

      return res;
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
