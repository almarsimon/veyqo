import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();

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

  const { data, error } = await supabase.auth.getUser();
  if (error) {
    // If something goes wrong reading auth, treat as logged out
    // (prevents accidental access)
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  const user = data.user;
  const pathname = req.nextUrl.pathname;

  // 1) Logged-in required for /surveys/:id/participate
  if (pathname.match(/^\/surveys\/[^/]+\/participate$/)) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
  }

  // 2) Admin-only for /surveys/new/*
  if (pathname.startsWith("/surveys/new")) {
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const isAdmin =
      !!adminEmail && user.email?.toLowerCase() === adminEmail.toLowerCase();

    if (!isAdmin) {
      const url = req.nextUrl.clone();
      url.pathname = "/403";
      return NextResponse.redirect(url);
    }
  }

  return res;
}

export const config = {
  matcher: ["/surveys/:id/participate", "/surveys/new/:path*"],
};
