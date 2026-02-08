import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { supabaseServer } from "@/lib/supabase/server";

export async function GET(request: Request) {
  //   const requestUrl = new URL(request.url);
  //   const code = requestUrl.searchParams.get("code");
  //   console.log("🚀 ~ GET ~ code:", code);
  //   console.log("callback almar");
  //   console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);
  //   if (code) {
  //     const supabase = createClient(
  //       process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //       process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  //     );

  //     await supabase.auth.exchangeCodeForSession(code);
  //   }

  //   return NextResponse.redirect(new URL("/dashboard", requestUrl.origin));

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  console.log("🚀 ~ GET ~ code:", code);
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }
  if (code) {
    const supabase = await supabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    console.log("🚀 ~ GET ~ error:", error);

    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }
  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
