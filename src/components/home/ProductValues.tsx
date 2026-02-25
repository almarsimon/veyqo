// components/home/modules/views/ProductValues.tsx
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import PollIcon from "@mui/icons-material/Poll";
import BoltIcon from "@mui/icons-material/Bolt";
import PublicIcon from "@mui/icons-material/Public";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 4,
  textAlign: "center",
};

export default function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: "flex", overflow: "hidden", bgcolor: "grey.50" }}
    >
      <Container sx={{ mt: 10, mb: 10 }} component="section" id="about">
        <Typography variant="h4" sx={{ fontWeight: 900, textAlign: "center" }}>
          About Veyqo
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 1, mb: 6 }}
        >
          A modern, public-first survey platform built for speed, sharing, and
          live results.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <PollIcon sx={{ fontSize: 48 }} />
              <Typography variant="h6" sx={{ my: 2, fontWeight: 800 }}>
                Public opinion, instantly
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Publish a question and start collecting responses right away.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <BoltIcon sx={{ fontSize: 48 }} />
              <Typography variant="h6" sx={{ my: 2, fontWeight: 800 }}>
                Real-time results
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Watch the vote counts update as people respond.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <PublicIcon sx={{ fontSize: 48 }} />
              <Typography variant="h6" sx={{ my: 2, fontWeight: 800 }}>
                Share anywhere
              </Typography>
              <Typography variant="body1" color="text.secondary">
                One link works on mobile, desktop, and social platforms.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
