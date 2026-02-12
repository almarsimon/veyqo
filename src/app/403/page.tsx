import { Container, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ py: 8 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Access denied
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 1 }}>
          You don’t have permission to view this page.
        </Typography>

        <Button component={Link} href="/" variant="contained" sx={{ mt: 3 }}>
          Go home
        </Button>
      </Box>
    </Container>
  );
}
