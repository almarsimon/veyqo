import Link from "next/link";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { getPublicSurveys } from "@/lib/server/surveys/list";

export default async function SurveysPage() {
  const surveys = await getPublicSurveys();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Stack spacing={3}>
        {/* Header */}
        <Box>
          <Typography variant="h4" fontWeight={800}>
            Public Surveys
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore and participate in published surveys.
          </Typography>
        </Box>

        <Divider />

        {/* Empty State */}
        {surveys.length === 0 && (
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" fontWeight={700}>
                No public surveys yet
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check back soon.
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Survey List */}
        {surveys.length > 0 && (
          <Stack spacing={2}>
            {surveys.map((survey) => (
              <Card key={survey.id} variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      flexWrap="wrap"
                      gap={2}
                    >
                      {/* FIXED LINK PATTERN */}
                      <Link
                        href={`/surveys/${survey.id}`}
                        style={{
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={800}
                          sx={{
                            "&:hover": {
                              textDecoration: "underline",
                            },
                          }}
                        >
                          {survey.title}
                        </Typography>
                      </Link>

                      {/* <Chip size="small" label="Public" /> */}
                    </Stack>

                    <Typography variant="caption" color="text.secondary">
                      Created:{" "}
                      {new Date(survey.created_at).toLocaleDateString()}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
