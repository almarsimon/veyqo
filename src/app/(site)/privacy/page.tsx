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
        Vottally (“we,” “our,” or “us”) is committed to protecting your privacy
        and handling personal information responsibly and transparently. This
        Privacy Policy explains how we collect, use, disclose, store, and
        safeguard information when you use our website, surveys, and related
        services (the “Services”).
      </Typography>

      <Typography paragraph>
        This Policy applies globally and is designed to comply with applicable
        data protection laws, including the General Data Protection Regulation
        (GDPR), UK GDPR, Canada’s PIPEDA, and the California Consumer Privacy
        Act (CCPA/CPRA), where applicable.
      </Typography>

      <Typography paragraph>
        By accessing or using Vottally, you acknowledge that you have read and
        understood this Privacy Policy.
      </Typography>

      <Section title="1. Information We Collect">
        <Typography paragraph>
          We collect information necessary to operate, secure, and improve our
          Services.
        </Typography>

        <SubSection title="Information You Provide Directly">
          <Typography paragraph>
            When you create an account, participate in surveys, contact us, or
            update your profile, you may provide personal information such as
            your name, email address, profile details, and survey responses.
          </Typography>
        </SubSection>

        <SubSection title="Authentication Information">
          <Typography paragraph>
            If you sign in using third-party authentication providers (such as
            Google, Facebook, or X), we may receive basic profile information
            including your name, email address, and profile image. We do not
            receive or store your passwords from these providers.
          </Typography>
        </SubSection>

        <SubSection title="Automatically Collected Information">
          <Typography paragraph>
            We automatically collect certain technical and usage information
            such as IP address, browser type, device information, timestamps,
            and pages visited. This data helps us maintain security, improve
            performance, and detect fraud.
          </Typography>
        </SubSection>
      </Section>

      <Section title="2. How We Use Your Information">
        <Typography paragraph>We use your information to:</Typography>
        <ul>
          <li>Provide, operate, and maintain the Services</li>
          <li>Authenticate users and secure accounts</li>
          <li>Display surveys and aggregated results</li>
          <li>Respond to support requests</li>
          <li>Improve platform functionality</li>
          <li>Prevent fraud and security threats</li>
          <li>Comply with legal obligations</li>
        </ul>
      </Section>

      <Section title="3. Legal Bases for Processing (EU/UK Users)">
        <Typography paragraph>
          Where required under GDPR and similar laws, we process personal data
          on the following legal bases:
        </Typography>
        <ul>
          <li>Performance of a contract</li>
          <li>Legitimate interests (security and improvements)</li>
          <li>Consent (where applicable)</li>
          <li>Compliance with legal obligations</li>
        </ul>
      </Section>

      <Section title="4. Survey Data and Responsibilities">
        <Typography paragraph>
          Survey creators are responsible for ensuring that their surveys comply
          with applicable laws, including data protection and consent
          requirements. Vottally acts solely as a platform provider and does not
          control or verify user-created survey content.
        </Typography>

        <Typography paragraph>
          Survey responses may be stored, processed, and displayed in aggregated
          or anonymized formats. We strongly discourage the collection of
          sensitive personal information unless legally required and properly
          disclosed.
        </Typography>
      </Section>

      <Section title="5. Cookies and Similar Technologies">
        <Typography paragraph>
          We use cookies and similar technologies to maintain secure sessions,
          remember preferences, and analyze usage patterns. You can manage
          cookies through your browser settings.
        </Typography>
      </Section>

      <Section title="6. Data Sharing and Disclosure">
        <Typography paragraph>We do not sell personal data.</Typography>

        <Typography paragraph>We may share information only:</Typography>

        <ul>
          <li>With trusted service providers that operate the platform</li>
          <li>To comply with legal obligations</li>
          <li>To protect users and the platform</li>
          <li>During a merger, acquisition, or business transfer</li>
        </ul>

        <Typography paragraph>
          We do not sell or share personal information for cross-context
          behavioral advertising.
        </Typography>
      </Section>

      <Section title="7. Data Storage and Security">
        <Typography paragraph>
          We implement reasonable administrative, technical, and organizational
          safeguards to protect personal information. However, no system can
          guarantee absolute security.
        </Typography>
      </Section>

      <Section title="8. Data Retention">
        <Typography paragraph>
          We retain personal information only as long as necessary to provide
          the Services, resolve disputes, enforce agreements, and comply with
          legal requirements. Aggregated or anonymized data may be retained for
          analytical purposes.
        </Typography>
      </Section>

      <Section title="9. International Data Transfers">
        <Typography paragraph>
          Your information may be processed and stored in countries outside your
          country of residence. Where required, we implement appropriate
          safeguards such as standard contractual clauses or equivalent legal
          mechanisms.
        </Typography>
      </Section>

      <Section title="10. Your Rights and Choices">
        <Typography paragraph>
          Depending on your jurisdiction, you may have the right to:
        </Typography>

        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Restrict or object to certain processing</li>
          <li>Withdraw consent where applicable</li>
          <li>Request data portability (EU/UK users)</li>
        </ul>

        <Typography paragraph>
          California residents may also request disclosure of collected personal
          information categories and request deletion, subject to legal
          exceptions.
        </Typography>

        <Typography paragraph>
          To exercise your rights, contact us at privacy@Vottally.com.
        </Typography>
      </Section>

      <Section title="11. Automated Decision-Making">
        <Typography paragraph>
          Vottally does not use personal data for automated decision-making that
          produces legal or similarly significant effects.
        </Typography>
      </Section>

      <Section title="12. Children’s Privacy">
        <Typography paragraph>
          Vottally is not intended for children under 13 (or the minimum legal
          age in your jurisdiction). We do not knowingly collect personal
          information from children.
        </Typography>
      </Section>

      <Section title="13. Changes to This Policy">
        <Typography paragraph>
          We may update this Privacy Policy periodically. Changes become
          effective when posted on this page. Continued use of the Services
          constitutes acceptance of the updated Policy.
        </Typography>
      </Section>

      <Section title="14. Contact Us">
        <Typography paragraph>
          If you have questions about this Privacy Policy, please contact:
        </Typography>

        <Typography sx={{ fontWeight: 600 }}>privacy@Vottally.com</Typography>
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
