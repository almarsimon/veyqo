"use client";

import * as React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Typography,
  Container,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type NavbarProps = {
  user: unknown;
  avatarUrl: string | null;
  fullName: string | null;
  email?: string | null;
};

type NavLink =
  | { label: string; href: string; kind: "route" }
  | { label: string; href: string; kind: "section"; id: "about" | "contact" };

const navLinks: NavLink[] = [
  { label: "Home", href: "/", kind: "route" },
  { label: "Surveys", href: "/surveys", kind: "route" },
  { label: "About", href: "/#about", kind: "section", id: "about" },
  { label: "Contact", href: "/#contact", kind: "section", id: "contact" },
];

const rightLinkBase = {
  fontSize: 14,
  borderRadius: 999,
  textTransform: "none" as const,
};

export default function Navbar({
  user,
  avatarUrl,
  fullName,
  email,
}: NavbarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // ✅ scrollspy state (only used on "/")
  const [activeSection, setActiveSection] = React.useState<
    "top" | "about" | "contact"
  >("top");

  React.useEffect(() => {
    if (pathname !== "/") return;

    const aboutEl = document.getElementById("about");
    const contactEl = document.getElementById("contact");

    // If sections don't exist yet, do nothing.
    if (!aboutEl && !contactEl) return;

    // "top sentinel" (an invisible element at very top of page)
    let topSentinel = document.getElementById("nav-top-sentinel");
    if (!topSentinel) {
      topSentinel = document.createElement("div");
      topSentinel.id = "nav-top-sentinel";
      topSentinel.style.position = "absolute";
      topSentinel.style.top = "0px";
      topSentinel.style.left = "0px";
      topSentinel.style.height = "1px";
      topSentinel.style.width = "1px";
      document.body.prepend(topSentinel);
    }

    const targets: Array<{
      id: "top" | "about" | "contact";
      el: Element | null;
    }> = [
      { id: "top", el: topSentinel },
      { id: "about", el: aboutEl },
      { id: "contact", el: contactEl },
    ];

    // Observe which section is in view.
    // rootMargin pushes the "active" area down so it feels right with a sticky navbar.
    const observer = new IntersectionObserver(
      (entries) => {
        // pick the most "visible" intersecting entry
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
          )[0];

        if (!visible) return;

        const id = (visible.target as HTMLElement).id;

        if (id === "nav-top-sentinel") setActiveSection("top");
        if (id === "about") setActiveSection("about");
        if (id === "contact") setActiveSection("contact");
      },
      {
        // tweak if needed
        threshold: [0.15, 0.3, 0.6],
        rootMargin: "-88px 0px -55% 0px",
      },
    );

    targets.forEach((t) => {
      if (t.el) observer.observe(t.el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // ✅ full current URL path + query (so you return to the exact page)
  const returnTo = React.useMemo(() => {
    const qs = searchParams?.toString();
    return `${pathname}${qs ? `?${qs}` : ""}`;
  }, [pathname, searchParams]);

  const loginHref = `/login?returnTo=${encodeURIComponent(returnTo)}`;

  // Profile dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(anchorEl);

  // Left nav drawer
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => setAnchorEl(null);

  const handleSignOut = async () => {
    handleProfileClose();

    await fetch("/auth/signout", { method: "POST" });

    // If you're on /surveys/[id]/participate -> go to /surveys/[id]
    const participateMatch = pathname.match(
      /^\/surveys\/([^/]+)\/participate\/?$/,
    );
    if (participateMatch) {
      const surveyId = participateMatch[1];
      router.replace(`/surveys/${surveyId}`);
      router.refresh();
      return;
    }

    router.refresh();
  };

  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  // Active rule:
  // - For normal routes: pathname match
  // - For section links on home: highlight only when that section is active
  // - For Home link: highlight only when activeSection === "top"
  const isActive = (link: NavLink) => {
    if (link.kind === "route") {
      if (link.href === "/") return pathname === "/" && activeSection === "top";
      return pathname === link.href || pathname.startsWith(link.href + "/");
    }

    // section link
    if (pathname !== "/") return false;
    return activeSection === link.id;
  };

  const pillLinkSx = (active: boolean) => ({
    ...rightLinkBase,
    px: 1.75,
    ...(active
      ? { bgcolor: "rgba(255,255,255,0.12)" }
      : {
          bgcolor: "transparent",
          "&:hover": { bgcolor: "rgba(255,255,255,0.10)" },
        }),
  });

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          color: "#fff",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: "space-between", px: 0 }}>
            {/* Left: mobile hamburger + logo */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <IconButton
                edge="start"
                onClick={openDrawer}
                sx={{
                  display: { xs: "inline-flex", md: "none" },
                  color: "inherit",
                }}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>

              <Link
                href="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography sx={{ fontWeight: 900, letterSpacing: 0.5 }}>
                  Vottally
                </Typography>
              </Link>
            </Box>

            {/* Right cluster: links (md+) + auth */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Links (md+) */}
              <Box
                sx={{
                  display: { xs: "none", md: "flex" },
                  alignItems: "center",
                }}
              >
                {navLinks.map((l) => {
                  const active = isActive(l);
                  return (
                    <Link
                      key={l.href}
                      href={l.href}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        color="inherit"
                        sx={{ ...pillLinkSx(active), ml: 0.75 }}
                        aria-current={active ? "page" : undefined}
                      >
                        {l.label}
                      </Button>
                    </Link>
                  );
                })}
              </Box>

              {/* Auth UI (no extra Surveys link here anymore) */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {!user ? (
                  <>
                    <Link href={loginHref} style={{ textDecoration: "none" }}>
                      <Button
                        color="inherit"
                        sx={{ ...rightLinkBase, ml: 0.75 }}
                      >
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/register" style={{ textDecoration: "none" }}>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ ...rightLinkBase, ml: 1, px: 2.5 }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={handleProfileOpen}
                      color="inherit"
                      sx={{
                        ...rightLinkBase,
                        ml: 0.75,
                        px: 1.25,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.10)" },
                      }}
                      aria-haspopup="menu"
                      aria-expanded={profileOpen ? "true" : undefined}
                    >
                      <Avatar
                        src={avatarUrl ?? undefined}
                        alt={fullName ?? "Profile"}
                        sx={{ width: 32, height: 32 }}
                      >
                        {(fullName?.[0] ?? email?.[0] ?? "?").toUpperCase()}
                      </Avatar>

                      <Typography
                        sx={{
                          fontSize: 14,
                          display: { xs: "none", sm: "block" },
                          maxWidth: 180,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {fullName ?? email ?? "Account"}
                      </Typography>
                    </Button>

                    <Menu
                      anchorEl={anchorEl}
                      open={profileOpen}
                      onClose={handleProfileClose}
                      transformOrigin={{ horizontal: "right", vertical: "top" }}
                      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    >
                      <MenuItem
                        disabled
                        sx={{ opacity: 1, cursor: "default", minWidth: 240 }}
                      >
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>
                            {fullName ?? "User"}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "0.85rem",
                              color: "text.secondary",
                            }}
                          >
                            {email}
                          </Typography>
                        </Box>
                      </MenuItem>

                      <Divider />

                      <MenuItem onClick={handleSignOut}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Sign out
                      </MenuItem>
                    </Menu>
                  </>
                )}
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for nav (mobile) */}
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 280 }} role="presentation" onClick={closeDrawer}>
          <Box sx={{ px: 2, py: 2 }}>
            <Typography
              sx={{ fontSize: "1.2rem", fontWeight: 900, letterSpacing: 0.5 }}
            >
              Vottally
            </Typography>
          </Box>
          <Divider />
          <List>
            {navLinks.map((l) => {
              const active = isActive(l);
              return (
                <ListItemButton
                  key={l.href}
                  component={Link}
                  href={l.href}
                  selected={active}
                  aria-current={active ? "page" : undefined}
                >
                  <ListItemText primary={l.label} />
                </ListItemButton>
              );
            })}

            {!user ? (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItemButton
                  component={Link}
                  href={loginHref}
                  selected={pathname.startsWith("/login")}
                >
                  <ListItemText primary="Sign In" />
                </ListItemButton>

                <ListItemButton
                  component={Link}
                  href="/register"
                  selected={pathname.startsWith("/register")}
                >
                  <ListItemText primary="Sign Up" />
                </ListItemButton>
              </>
            ) : (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItemButton onClick={handleSignOut}>
                  <ListItemText primary="Sign out" />
                </ListItemButton>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
