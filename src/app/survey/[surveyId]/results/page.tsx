"use client";
import { Box, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import SidebarAd from "@/components/SidebarAd";

const sampleBarData = [
  { name: "Reading", count: 12 },
  { name: "Gaming", count: 8 },
  { name: "Sports", count: 5 },
];

const samplePieData = [
  { name: "Male", value: 10 },
  { name: "Female", value: 12 },
  { name: "Other", value: 3 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

export default function SurveyResultsPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <Box sx={{ flex: 3, py: 4 }}>
        <Box
          role="region"
          aria-label="Survey results"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            px: 2,
          }}
        >
          <Typography variant="h4" gutterBottom>
            Survey Results
          </Typography>
          <Typography variant="h6" gutterBottom>
            Hobbies
          </Typography>
          <BarChart width={500} height={300} data={sampleBarData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Gender Distribution
          </Typography>
          <PieChart width={400} height={300}>
            <Pie
              data={samplePieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {samplePieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </Box>
      </Box>
      <Box sx={{ flex: 1, py: 4 }}>
        <SidebarAd>asdfadsf</SidebarAd>
      </Box>
    </Box>
  );
}
