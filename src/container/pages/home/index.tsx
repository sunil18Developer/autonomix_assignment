"use client";

import React, { useState } from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "@/app/theme-registry";

export default function HomePage() {
  const [transcript, setTranscript] = useState("");
  const { mode, toggleMode } = useThemeMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Transcript submitted:", transcript);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 600,
        mx: "auto",
        mt: 5,
        gap: 2,
      }}
    >
      {/* Theme Toggle */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton color="inherit" onClick={toggleMode}>
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Box>

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Enter Meeting Transcript"
          multiline
          rows={6}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          variant="outlined"
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ alignSelf: "flex-start" }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
