// components/home/modules/views/ProductHero.tsx
import Link from "next/link";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const backgroundImage =
  "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600";

export default function ProductHero() {
  return (
    <Box
      sx={{
        minHeight: { xs: 520, md: 640 },
        color: "common.white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        px: 2,
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.55)",
        }}
      />
      <Box sx={{ position: "relative", maxWidth: 900 }}>
        <Typography variant="h2" sx={{ fontWeight: 900 }}>
          See what people really think.
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, opacity: 0.9 }}>
          Create public surveys, share instantly, and watch results update in
          real time.
        </Typography>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/surveys/new" style={{ textDecoration: "none" }}>
            <Button variant="contained" size="large" sx={{ minWidth: 220 }}>
              Create a survey
            </Button>
          </Link>
          <Link href="/surveys" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              size="large"
              sx={{
                minWidth: 220,
                borderColor: "rgba(255,255,255,0.6)",
                color: "common.white",
              }}
            >
              Explore live surveys
            </Button>
          </Link>
        </Box>

        <Typography variant="body2" sx={{ mt: 2, opacity: 0.85 }}>
          No app install. Just a link.
        </Typography>
      </Box>
    </Box>
  );
}
