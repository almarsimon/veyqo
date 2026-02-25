// components/home/modules/views/ProductHowItWorks.tsx
import Link from "next/link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const item = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  px: 4,
  textAlign: "center",
};

const number = {
  fontSize: 28,
  color: "primary.main",
  fontWeight: 900,
};

export default function ProductHowItWorks() {
  return (
    <Box component="section" sx={{ display: "flex", bgcolor: "common.white" }}>
      <Container
        sx={{
          mt: 10,
          mb: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 6 }}>
          How it works
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={number}>1</Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 800 }}>
                Create
              </Typography>
              <Typography color="text.secondary">
                Write a question, add choices, and publish in seconds.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={number}>2</Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 800 }}>
                Share
              </Typography>
              <Typography color="text.secondary">
                Post the link anywhere—friends, groups, or social media.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Box sx={number}>3</Box>
              <Typography variant="h6" sx={{ mt: 2, fontWeight: 800 }}>
                Analyze
              </Typography>
              <Typography color="text.secondary">
                Track responses and see the crowd’s opinion shift live.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Link href="/surveys/new" style={{ textDecoration: "none" }}>
          <Button variant="contained" size="large" sx={{ mt: 6, px: 5 }}>
            Get started
          </Button>
        </Link>
      </Container>
    </Box>
  );
}
