import { Container } from "@mui/material";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 4,
        pb: 4,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </Container>
  );
}
