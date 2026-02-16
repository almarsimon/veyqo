import { Typography, Box } from "@mui/material";

export default function AboutPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        About Veyqo
      </Typography>
      <Typography paragraph>
        Veyqo is a platform designed to make surveys more accessible, allowing
        people to share opinions and insights with ease. Our goal is to empower
        users with data and insights while keeping the experience simple and
        engaging.
      </Typography>
    </Box>
  );
}
