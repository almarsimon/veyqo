import { Typography, Box, Divider, Stack } from "@mui/material";

export default function AboutPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        About Veyqo
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Open access to opinions. Real insights from real people.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Section title="Our Mission">
        <Typography paragraph color="text.secondary">
          Veyqo was created to make surveys more accessible and engaging. We
          believe everyone should have the opportunity to share their voice and
          gain insights from collective perspectives — without complicated tools
          or barriers to participation.
        </Typography>
        <Typography color="text.secondary">
          Our platform focuses on simplicity, transparency, and meaningful data
          — helping individuals, communities, and organizations better
          understand trends, opinions, and public sentiment.
        </Typography>
      </Section>

      <Section title="What Makes Veyqo Different">
        <Stack spacing={1.5}>
          <Typography color="text.secondary">
            • Clean and simple experience — no unnecessary complexity.
          </Typography>
          <Typography color="text.secondary">
            • Public engagement — surveys designed to encourage broader
            participation.
          </Typography>
          <Typography color="text.secondary">
            • Insight-driven — results presented in a way that highlights
            meaningful trends.
          </Typography>
          <Typography color="text.secondary">
            • Built for modern communities — optimized for accessibility and
            clarity.
          </Typography>
        </Stack>
      </Section>

      <Section title="Our Vision">
        <Typography color="text.secondary">
          We envision a platform where opinions are easier to gather,
          understand, and act upon. By lowering the barrier to creating and
          participating in surveys, Veyqo aims to foster informed conversations
          and data-driven decisions across communities and organizations.
        </Typography>
      </Section>
    </Box>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
