import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { getPublicSurveys } from "@/lib/server/surveys/list";

export default async function SurveysPage() {
  const surveys = await getPublicSurveys();

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Surveys
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Explore and participate in published surveys.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {surveys.length === 0 && (
        <Card variant="outlined" sx={{ maxWidth: 640 }}>
          <CardContent>
            <Typography variant="h6">No public surveys yet</Typography>
            <Typography variant="body2" color="text.secondary">
              Check back soon.
            </Typography>
          </CardContent>
        </Card>
      )}

      {surveys.length > 0 && (
        <Stack spacing={2} sx={{ maxWidth: 640 }}>
          {surveys.map((survey) => (
            <Card key={survey.id} variant="outlined">
              <CardContent>
                <Stack spacing={1.5}>
                  {/* Title + Button */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" }, // 👈 key change
                      justifyContent: "space-between",
                      alignItems: { xs: "flex-start", sm: "center" },
                      gap: 1.5,
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {survey.title}
                    </Typography>

                    <Link
                      href={`/surveys/${survey.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          textTransform: "none",
                          borderRadius: 2,
                          alignSelf: { xs: "flex-start", sm: "auto" },
                        }}
                      >
                        Open Survey
                      </Button>
                    </Link>
                  </Box>

                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(survey.created_at).toLocaleDateString()}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
