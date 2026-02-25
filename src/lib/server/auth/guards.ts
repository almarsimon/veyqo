import "server-only";
import { redirect } from "next/navigation";
import { supabaseServerClient } from "@/lib/supabase/supabaseServerClient";

export async function requireUser() {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  if (!data.user) redirect("/login");
  return data.user;
}

export async function requireAdmin() {
  const user = await requireUser();

  const adminEmail = process.env.ADMIN_EMAIL;
  const isAdmin =
    adminEmail && user.email?.toLowerCase() === adminEmail.toLowerCase();

  if (!isAdmin) redirect("/403");
  return user;
}
