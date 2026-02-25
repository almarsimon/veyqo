// components/home/modules/views/ProductCTA.tsx
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function ProductCTA() {
  return (
    <Container component="section" sx={{ mt: 10, mb: 10 }}>
      <Grid
        container
        sx={{
          borderRadius: 4,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ p: { xs: 4, md: 6 }, height: "100%" }}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Start a conversation that matters.
            </Typography>
            <Typography sx={{ mt: 2 }} color="text.secondary">
              Use Veyqo to run quick public polls, gather feedback, and see what
              people think—fast.
            </Typography>

            <Box sx={{ mt: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Link href="/surveys/new" style={{ textDecoration: "none" }}>
                <Button variant="contained" size="large">
                  Create your first survey
                </Button>
              </Link>
              <Link href="/surveys" style={{ textDecoration: "none" }}>
                <Button variant="outlined" size="large">
                  Browse live surveys
                </Button>
              </Link>
            </Box>

            <Typography variant="body2" sx={{ mt: 2 }} color="text.secondary">
              Tip: share the link to your Facebook/X page to build momentum.
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={12} md={6} sx={{ display: { xs: "none", md: "block" } }}>
          <Box
            sx={{
              height: "100%",
              minHeight: 260,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1551836022-deb4988cc6c0?auto=format&fit=crop&w=1200)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
