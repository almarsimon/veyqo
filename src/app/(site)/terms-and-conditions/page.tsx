import { Typography, Box, Divider } from "@mui/material";

export default function TermsPage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Terms and Conditions
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Last updated: {new Date().toLocaleDateString()}
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Typography paragraph>
        These Terms and Conditions (“Terms”) govern your access to and use of
        Veyqo (the “Service”), including our website, surveys, and related
        features. By accessing or using Veyqo, you agree to be bound by these
        Terms.
      </Typography>

      <Section title="1. Acceptance of Terms">
        <Typography paragraph>
          By using Veyqo, you confirm that you are at least 13 years old and
          have the legal capacity to enter into these Terms. If you do not agree
          with any part of these Terms, you must not use the Service.
        </Typography>
      </Section>

      <Section title="2. Description of the Service">
        <Typography paragraph>
          Veyqo provides a platform for creating, distributing, participating
          in, and analyzing surveys. Features may change, be updated, or be
          discontinued at any time without notice.
        </Typography>
      </Section>

      <Section title="3. User Accounts">
        <Typography paragraph>
          To access certain features, you may need to create an account. You are
          responsible for maintaining the confidentiality of your account and
          for all activities that occur under your account.
        </Typography>
      </Section>

      <Section title="4. User Responsibilities">
        <Typography paragraph>You agree not to:</Typography>

        <ul>
          <li>Provide false or misleading information</li>
          <li>Submit unlawful, abusive, or harmful content</li>
          <li>Collect personal data without proper consent</li>
          <li>Attempt to interfere with the platform’s security</li>
          <li>Use the Service for spam, fraud, or harassment</li>
        </ul>
      </Section>

      <Section title="5. Surveys and Content">
        <Typography paragraph>
          Survey creators are responsible for the content of their surveys and
          for complying with applicable laws, including data protection and
          consent requirements. Veyqo does not endorse or verify survey content.
        </Typography>
      </Section>

      <Section title="6. Intellectual Property">
        <Typography paragraph>
          All platform content, including software, branding, and design, is
          owned by or licensed to Veyqo and is protected by intellectual
          property laws. You may not copy, modify, or distribute our content
          without permission.
        </Typography>
      </Section>

      <Section title="7. Data and Privacy">
        <Typography paragraph>
          Your use of the Service is also governed by our Privacy Policy. By
          using Veyqo, you consent to the collection and use of information as
          described there.
        </Typography>
      </Section>

      <Section title="8. Third-Party Services">
        <Typography paragraph>
          Veyqo may integrate third-party services such as authentication
          providers or analytics tools. We are not responsible for the content
          or practices of third-party services.
        </Typography>
      </Section>

      <Section title="9. Termination">
        <Typography paragraph>
          We reserve the right to suspend or terminate your access to the
          Service at any time if you violate these Terms or misuse the platform.
        </Typography>
      </Section>

      <Section title="10. Disclaimer of Warranties">
        <Typography paragraph>
          The Service is provided “as is” and “as available” without warranties
          of any kind. We do not guarantee uninterrupted or error-free
          operation.
        </Typography>
      </Section>

      <Section title="11. Limitation of Liability">
        <Typography paragraph>
          To the fullest extent permitted by law, Veyqo shall not be liable for
          any indirect, incidental, or consequential damages arising from your
          use of the Service.
        </Typography>
      </Section>

      <Section title="12. Indemnification">
        <Typography paragraph>
          You agree to indemnify and hold harmless Veyqo from any claims,
          damages, or expenses arising from your misuse of the Service or
          violation of these Terms.
        </Typography>
      </Section>

      <Section title="13. Governing Law">
        <Typography paragraph>
          These Terms shall be governed by and construed in accordance with
          applicable laws, without regard to conflict-of-law principles.
        </Typography>
      </Section>

      <Section title="14. Changes to These Terms">
        <Typography paragraph>
          We may update these Terms from time to time. Continued use of the
          Service after changes means you accept the revised Terms.
        </Typography>
      </Section>

      <Section title="15. Contact Information">
        <Typography paragraph>
          If you have questions about these Terms, please contact us at:
        </Typography>

        <Typography paragraph sx={{ fontWeight: 500 }}>
          Email: legal@veyqo.com
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
