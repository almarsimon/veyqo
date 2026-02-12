import "server-only";
import { redirect } from "next/navigation";
import { supabaseServerComponent } from "@/lib/supabase/server-component";

export async function requireUser() {
  const supabase = await supabaseServerComponent();
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
