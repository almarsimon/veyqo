import { Typography, Box, Divider } from "@mui/material";

export default function PrivacyPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Privacy Policy
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Last updated: {new Date().toLocaleDateString()}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography paragraph>
        Veyqo (“we,” “our,” or “us”) respects your privacy and is committed to
        protecting your personal information. This Privacy Policy explains how
        we collect, use, store, share, and protect information when you use our
        website, services, and surveys (the “Services”).
      </Typography>

      <Typography paragraph>
        By using Veyqo, you agree to the practices described in this Privacy
        Policy.
      </Typography>

      <Section title="1. Information We Collect">
        <Typography paragraph>
          We collect information to provide, improve, and secure our Services.
        </Typography>

        <SubSection title="Information You Provide Directly">
          <Typography paragraph>
            You may provide information when you create an account, complete
            surveys, contact us, or edit your profile. This may include your
            name, email address, optional profile details, and survey responses.
          </Typography>
        </SubSection>

        <SubSection title="Authentication Information">
          <Typography paragraph>
            If you sign in using third-party providers (such as Google,
            Facebook, or X), we may receive basic profile information such as
            your name, email address, and profile image. We never receive your
            passwords.
          </Typography>
        </SubSection>

        <SubSection title="Automatically Collected Information">
          <Typography paragraph>
            We may collect technical data such as device type, browser, IP
            address, pages visited, and timestamps to improve performance and
            security.
          </Typography>
        </SubSection>
      </Section>

      <Section title="2. How We Use Your Information">
        <Typography paragraph>
          We use information to operate the Services, authenticate users,
          display surveys and results, respond to support requests, improve
          functionality, and comply with legal obligations.
        </Typography>
      </Section>

      <Section title="3. Survey Data and Responses">
        <Typography paragraph>
          Survey responses may be stored, analyzed, and displayed in aggregated
          or anonymized form. We recommend avoiding sensitive personal
          information unless explicitly requested.
        </Typography>
      </Section>

      <Section title="4. Cookies and Similar Technologies">
        <Typography paragraph>
          We use cookies to maintain sessions, remember preferences, and analyze
          site usage. You can control cookies through your browser settings.
        </Typography>
      </Section>

      <Section title="5. Data Sharing and Disclosure">
        <Typography paragraph>
          We do not sell personal data. Information may be shared only with
          trusted service providers, to comply with legal requirements, or to
          protect users and the platform.
        </Typography>
      </Section>

      <Section title="6. Data Storage and Security">
        <Typography paragraph>
          We use reasonable technical and organizational measures to protect
          your data, including secure authentication and encrypted connections.
        </Typography>
      </Section>

      <Section title="7. Data Retention">
        <Typography paragraph>
          We retain personal information only as long as necessary to provide
          the Services or comply with legal obligations. Anonymized survey data
          may be retained for analytics.
        </Typography>
      </Section>

      <Section title="8. Your Rights and Choices">
        <Typography paragraph>
          Depending on your location, you may have the right to access, correct,
          or delete your personal data. You may manage your information through
          your account or contact us directly.
        </Typography>
      </Section>

      <Section title="9. Children’s Privacy">
        <Typography paragraph>
          Veyqo is not intended for children under 13. We do not knowingly
          collect personal information from children.
        </Typography>
      </Section>

      <Section title="10. International Users">
        <Typography paragraph>
          Your data may be processed or stored outside your country of
          residence. Appropriate safeguards are applied where required.
        </Typography>
      </Section>

      <Section title="11. Changes to This Policy">
        <Typography paragraph>
          We may update this Privacy Policy from time to time. Updates will be
          posted on this page with a revised date.
        </Typography>
      </Section>

      <Section title="12. Contact Us">
        <Typography paragraph>
          If you have questions about this Privacy Policy, please contact us at:
        </Typography>

        <Typography paragraph sx={{ fontWeight: 500 }}>
          Email: privacy@veyqo.com
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

function SubSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" component="h3" gutterBottom>
        {title}
      </Typography>
      {children}
    </Box>
  );
}
