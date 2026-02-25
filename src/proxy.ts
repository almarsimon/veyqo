import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export default async function proxy(req: NextRequest) {
  // IMPORTANT: use a mutable response so cookies always land on the final response
  let res = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Read user (this may trigger refresh)
  const { data, error } = await supabase.auth.getUser();

  // ✅ Treat refresh_token_not_found as "logged out", NOT as "redirect to /login"
  const user = error?.code === "refresh_token_not_found" ? null : data.user;

  const pathname = req.nextUrl.pathname;

  // 1) Logged-in required for /surveys/:id/participate
  if (pathname.match(/^\/surveys\/[^/]+\/participate$/)) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      res = NextResponse.redirect(url);
      return res;
    }
  }

  // 2) Admin-only for /surveys/new/*
  if (pathname.startsWith("/surveys/new")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      res = NextResponse.redirect(url);
      return res;
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdmin =
      !!adminEmail && user.email?.toLowerCase() === adminEmail.toLowerCase();

    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/403";
      res = NextResponse.redirect(url);
      return res;
    }
  }

  return res;
}

export const config = {
  matcher: ["/surveys/:id/participate", "/surveys/new/:path*"],
};
