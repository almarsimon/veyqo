"use client";
import React from "react";
import { Box } from "@mui/material";

export default function SidebarAd({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        p: 2,
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        backgroundColor: "#f9f9f9",
      }}
    >
      {children}
    </Box>
  );
}
