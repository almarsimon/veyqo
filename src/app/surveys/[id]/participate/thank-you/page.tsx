import { Container, Typography, Box, Stack, Button } from "@mui/material";
import Link from "next/link";

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Box
      sx={{
        minHeight: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            p: 4,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 3,
          }}
        >
          <Stack spacing={3}>
            <Typography variant="h4" sx={{ fontWeight: 800 }}>
              Thank you!
            </Typography>

            <Typography color="text.secondary">
              Your response has been successfully recorded.
            </Typography>

            <Stack direction="row" spacing={2} justifyContent="center">
              <Link href={`/surveys/${id}`} style={{ textDecoration: "none" }}>
                <Button variant="contained">View Results</Button>
              </Link>

              <Link href="/" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Back to Home</Button>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
