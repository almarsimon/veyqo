// components/home/modules/views/ProductSmokingHero.tsx
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function ProductSmokingHero() {
  return (
    <Container
      component="section"
      id="contact"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        my: 10,
      }}
    >
      <Button
        sx={{
          border: "2px solid currentColor",
          borderRadius: 2,
          height: "auto",
          py: 2,
          px: 5,
        }}
      >
        <Typography variant="h4" component="span" sx={{ fontWeight: 900 }}>
          Contact us
        </Typography>
      </Button>

      <Typography
        variant="subtitle1"
        sx={{ my: 3, textAlign: "center" }}
        color="text.secondary"
      >
        Questions, feedback, or partnership ideas? Email us and we’ll get back
        to you.
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Button
          variant="contained"
          component="a"
          href="mailto:support@yourdomain.com"
          sx={{ borderRadius: 999, px: 3 }}
        >
          support@yourdomain.com
        </Button>
        <Button
          variant="outlined"
          component="a"
          href="mailto:partnerships@yourdomain.com"
          sx={{ borderRadius: 999, px: 3 }}
        >
          partnerships@yourdomain.com
        </Button>
      </Box>
    </Container>
  );
}
