// "use client";
// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Box,
//   Container,
//   Link as MuiLink,
// } from "@mui/material";
// import Link from "next/link";
// import Image from "next/image";
// import VeyqoLogo from "../public/VeyqoLogo.png";
// import { Space_Grotesk } from "next/font/google";

// const logoFont = Space_Grotesk({
//   subsets: ["latin"],
//   weight: ["600"],
// });

// type NavbarProps = {
//   user: any;
//   avatarUrl: string | null;
//   fullName: string | null;
// };

// export default function Navbar({ user, avatarUrl, fullName }: NavbarProps) {
//   return (
//     <AppBar
//       position="static"
//       sx={{
//         backgroundColor: "#fff",
//         color: "#000",
//         borderBottom: "1px solid #e0e0e0",
//       }}
//       elevation={0}
//     >
//       <Container maxWidth="xl">
//         <Toolbar sx={{ paddingLeft: 0, paddingRight: 0 }}>
//           {/* <Button component={Link} href="/" sx={{ color: "#000" }}> */}
//           <Typography
//             component={Link}
//             href="/"
//             className={logoFont.className}
//             sx={{
//               flexGrow: 1,
//               fontSize: "1.2rem",
//               letterSpacing: "0.06em",
//             }}
//           >
//             veyqo
//           </Typography>
//           {/* </Button> */}

//           <Button component={Link} href="/" sx={{ color: "#000" }}>
//             Home
//           </Button>
//           <Button component={Link} href="/about" sx={{ color: "#000" }}>
//             About
//           </Button>
//           <Button component={Link} href="/contact" sx={{ color: "#000" }}>
//             Contact
//           </Button>
//           <Button
//             component={Link}
//             href="/login"
//             variant="outlined"
//             sx={{ ml: 2, color: "#000", borderColor: "#666" }}
//           >
//             Login
//           </Button>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Space_Grotesk } from "next/font/google";
// import { supabaseBrowser } from "@/lib/supabase-browser";
// import { createClient } from "@/lib/supabase/client";

const logoFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600"],
});

type NavbarProps = {
  user: any;
  avatarUrl: string | null;
  fullName: string | null;
};

export default function Navbar({ user, avatarUrl, fullName }: NavbarProps) {
  const router = useRouter();

  // Profile dropdown
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const profileOpen = Boolean(anchorEl);

  // Left nav drawer
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleProfileOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => setAnchorEl(null);

  // const handleSignOut = async () => {
  //   handleProfileClose();
  //   await createClient.auth.signOut();
  //   router.refresh();
  //   router.push("/login");
  // };

  const closeDrawer = () => setDrawerOpen(false);
  const openDrawer = () => setDrawerOpen(true);

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#fff",
          color: "#000",
          borderBottom: "1px solid #e0e0e0",
        }}
        elevation={0}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ paddingLeft: 0, paddingRight: 0, gap: 1 }}>
            {/* Burger (collapses left nav on small screens) */}
            <IconButton
              edge="start"
              onClick={openDrawer}
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#000" }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Typography
              component={Link}
              href="/"
              className={logoFont.className}
              sx={{
                flexGrow: 1,
                fontSize: "1.2rem",
                letterSpacing: "0.06em",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              veyqo
            </Typography>

            {/* Left links (visible on md+) */}
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 0.5 }}>
              <Button component={Link} href="/" sx={{ color: "#000" }}>
                Home
              </Button>
              <Button component={Link} href="/about" sx={{ color: "#000" }}>
                About
              </Button>
              <Button component={Link} href="/contact" sx={{ color: "#000" }}>
                Contact
              </Button>
            </Box>

            {/* Right side auth UI */}
            {!user ? (
              <Button
                component={Link}
                href="/login"
                variant="outlined"
                sx={{ ml: 1, color: "#000", borderColor: "#666" }}
              >
                Login
              </Button>
            ) : (
              <Box sx={{ ml: 1, display: "flex", alignItems: "center" }}>
                <Button
                  onClick={handleProfileOpen}
                  sx={{
                    color: "#000",
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    borderRadius: 999,
                    px: 1,
                  }}
                >
                  <Avatar
                    src={avatarUrl ?? undefined}
                    alt={fullName ?? "Profile"}
                    sx={{ width: 32, height: 32 }}
                  >
                    {(fullName?.[0] ?? user?.email?.[0] ?? "?").toUpperCase()}
                  </Avatar>

                  <Typography
                    sx={{
                      fontSize: "0.95rem",
                      display: { xs: "none", sm: "block" },
                      maxWidth: 180,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {fullName ?? user?.email ?? "Account"}
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
                        sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                      >
                        {user?.email}
                      </Typography>
                    </Box>
                  </MenuItem>

                  <Divider />

                  <MenuItem>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Sign out
                  </MenuItem>
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer for left nav (mobile) */}
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <Box sx={{ width: 260 }} role="presentation" onClick={closeDrawer}>
          <Box sx={{ px: 2, py: 2 }}>
            <Typography
              className={logoFont.className}
              sx={{ fontSize: "1.2rem" }}
            >
              veyqo
            </Typography>
          </Box>
          <Divider />
          <List>
            <ListItemButton component={Link} href="/">
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton component={Link} href="/about">
              <ListItemText primary="About" />
            </ListItemButton>
            <ListItemButton component={Link} href="/contact">
              <ListItemText primary="Contact" />
            </ListItemButton>
            {!user ? (
              <>
                <Divider sx={{ my: 1 }} />
                <ListItemButton component={Link} href="/login">
                  <ListItemText primary="Login" />
                </ListItemButton>
              </>
            ) : null}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
