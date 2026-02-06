import { Typography, Box, Button } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Box sx={{ textAlign: "center", py: 10 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Veyqo
      </Typography>
      <Typography variant="h6" gutterBottom>
        Participate in surveys, share your voice, and see results instantly.
      </Typography>
      {/* <Button
        component={Link}
        href="/survey"
        variant="contained"
        sx={{ mt: 4 }}
      >
        Take a Survey
      </Button> */}
    </Box>
  );
}
