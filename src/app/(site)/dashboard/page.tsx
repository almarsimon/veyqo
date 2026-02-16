import { redirect } from "next/navigation";
import Link from "next/link";
import { supabaseServerClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  console.log("almar");
  const supabase = await supabaseServerClient();

  const { data, error } = await supabase.auth.getSession();
  console.log("🚀 ~ DashboardPage ~ data:", data);
  if (error) throw error;

  const user = data.session?.user ?? null;

  console.log("🚀 ~ DashboardPage ~ user:", user);

  // Protect the page
  //   if (!user) redirect("/login");

  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ?? null;
  const fullName =
    (user?.user_metadata?.full_name as string | undefined) ?? null;
  const email = user?.email ?? "Unknown email";

  // MVP placeholders — swap these with real queries later
  const stats = {
    surveys: 0,
    responses: 0,
    last7Days: 0,
  };

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "32px 16px" }}>
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>
            {fullName ? `Welcome, ${fullName}` : "Welcome"}
          </h1>
          <p style={{ margin: "8px 0 0", opacity: 0.8 }}>{email}</p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt="Profile"
              width={40}
              height={40}
              style={{ borderRadius: 999, objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 999,
                background: "#eee",
              }}
            />
          )}

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                border: "1px solid #ddd",
                background: "white",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </form>
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <StatCard label="Surveys" value={stats.surveys} />
        <StatCard label="Total responses" value={stats.responses} />
        <StatCard label="Responses (7d)" value={stats.last7Days} />
      </section>

      <section
        style={{
          border: "1px solid #eee",
          borderRadius: 16,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 18 }}>Your surveys</h2>
          <Link
            href="/surveys/new"
            style={{
              padding: "10px 12px",
              borderRadius: 10,
              background: "black",
              color: "white",
              textDecoration: "none",
              fontSize: 14,
            }}
          >
            + Create survey
          </Link>
        </div>

        <div style={{ marginTop: 12 }}>
          <EmptyState />
        </div>
      </section>

      <p style={{ opacity: 0.7, fontSize: 13 }}>
        MVP tip: next step is to store surveys with{" "}
        <code>user_id = auth.uid()</code> and use RLS so users only see their
        own.
      </p>
    </main>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        border: "1px solid #eee",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <div style={{ opacity: 0.7, fontSize: 13 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6 }}>{value}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div
      style={{
        border: "1px dashed #ddd",
        borderRadius: 14,
        padding: 16,
        opacity: 0.9,
      }}
    >
      <p style={{ margin: 0 }}>
        No surveys yet. Click <b>Create survey</b> to make your first one.
      </p>
      <p style={{ margin: "10px 0 0", opacity: 0.75, fontSize: 13 }}>
        Keep the first version super simple: 1 question + share link.
      </p>
    </div>
  );
}
