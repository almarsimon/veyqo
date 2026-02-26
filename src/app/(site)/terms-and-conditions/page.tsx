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
        Vottally (the “Service”), including our website, surveys, and all
        related features and functionality. By accessing or using the Service,
        you agree to be bound by these Terms.
      </Typography>

      <Section title="1. Acceptance of Terms">
        <Typography paragraph>
          By using Vottally, you confirm that you are at least 13 years old (or
          the minimum age required in your jurisdiction) and have the legal
          capacity to enter into these Terms. If you do not agree to these
          Terms, you must not access or use the Service.
        </Typography>
      </Section>

      <Section title="2. Description of the Service">
        <Typography paragraph>
          Vottally provides a platform that enables users to create, distribute,
          participate in, and analyze surveys. We may modify, update, suspend,
          or discontinue any part of the Service at any time without prior
          notice.
        </Typography>
      </Section>

      <Section title="3. User Accounts">
        <Typography paragraph>
          Certain features require account registration. You are responsible for
          maintaining the confidentiality of your account credentials and for
          all activity under your account. You agree to provide accurate and
          current information and to notify us immediately of any unauthorized
          use.
        </Typography>
      </Section>

      <Section title="4. Acceptable Use">
        <Typography paragraph>You agree that you will not:</Typography>

        <ul>
          <li>Provide false, misleading, or fraudulent information</li>
          <li>Post unlawful, defamatory, abusive, or harmful content</li>
          <li>Collect personal data without appropriate consent</li>
          <li>Attempt to disrupt, hack, or interfere with the Service</li>
          <li>Use the Service for spam, harassment, or illegal activities</li>
        </ul>

        <Typography paragraph>
          We reserve the right to remove content or suspend accounts that
          violate these Terms.
        </Typography>
      </Section>

      <Section title="5. Surveys and User Content">
        <Typography paragraph>
          Users are solely responsible for the surveys and content they create
          or submit. You retain ownership of your content, but you grant
          Vottally a non-exclusive, worldwide license to host, display, and
          process such content solely for the purpose of operating and improving
          the Service.
        </Typography>

        <Typography paragraph>
          Vottally does not review or endorse user-generated content and is not
          responsible for its accuracy or legality.
        </Typography>
      </Section>

      <Section title="6. Intellectual Property">
        <Typography paragraph>
          All intellectual property related to the Vottally platform, including
          software, branding, design, and content (excluding user content), is
          owned by or licensed to Vottally and protected by applicable laws. You
          may not copy, modify, distribute, or create derivative works without
          prior written permission.
        </Typography>
      </Section>

      <Section title="7. Privacy and Data">
        <Typography paragraph>
          Your use of the Service is subject to our Privacy Policy, which
          describes how we collect, use, and safeguard information. By using
          Vottally, you consent to such practices.
        </Typography>
      </Section>

      <Section title="8. Third-Party Services">
        <Typography paragraph>
          Vottally may rely on third-party services (such as authentication,
          hosting, analytics, or payment providers). We are not responsible for
          the content, policies, or practices of these third parties.
        </Typography>
      </Section>

      <Section title="9. Termination">
        <Typography paragraph>
          We may suspend or terminate your access to the Service at our
          discretion if you violate these Terms or engage in conduct that harms
          the platform or other users.
        </Typography>
      </Section>

      <Section title="10. Disclaimer of Warranties">
        <Typography paragraph>
          The Service is provided on an “as is” and “as available” basis. We
          make no warranties, express or implied, regarding the reliability,
          availability, or suitability of the Service.
        </Typography>
      </Section>

      <Section title="11. Limitation of Liability">
        <Typography paragraph>
          To the maximum extent permitted by law, Vottally shall not be liable
          for indirect, incidental, consequential, special, or punitive damages
          arising out of or related to your use of the Service.
        </Typography>
      </Section>

      <Section title="12. Indemnification">
        <Typography paragraph>
          You agree to indemnify and hold harmless Vottally, its affiliates, and
          partners from any claims, damages, or expenses arising from your
          misuse of the Service or violation of these Terms.
        </Typography>
      </Section>

      <Section title="13. Governing Law">
        <Typography paragraph>
          These Terms are governed by the applicable laws of your jurisdiction,
          without regard to conflict-of-law principles.
        </Typography>
      </Section>

      <Section title="14. Changes to These Terms">
        <Typography paragraph>
          We may update these Terms from time to time. Continued use of the
          Service after changes become effective constitutes acceptance of the
          revised Terms.
        </Typography>
      </Section>

      <Section title="15. Contact Information">
        <Typography paragraph>
          If you have questions about these Terms, please contact us at:
        </Typography>

        <Typography sx={{ fontWeight: 600 }}>legal@Vottally.com</Typography>
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
