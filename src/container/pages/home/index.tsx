"use client";
import React, { useState } from "react";
import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "@/app/theme-registry";
import { Task } from "@/types";
import { v4 as uuidv4 } from "uuid";
import mockTasks from "@/data";
import TaskBoard from "./components/task-board";

export default function HomePage() {
  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const { mode, toggleMode } = useThemeMode();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    const newTasks: Task[] = [
      {
        id: uuidv4(),
        title: "Parse Meeting Transcript",
        description: transcript,
        owner: "Team",
        priority: "High",
        due: "Today",
        status: "Pending",
      },
    ];

    setTasks((prev) => [...prev, ...newTasks]);
    setTranscript("");
  };

  return (
    <Box sx={{ width: "100%", px: 2, py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <IconButton color="inherit" onClick={toggleMode}>
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Box>

      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        Meeting Task Generator
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mb: 4,
          width: "100%",
          maxWidth: "1200px",
          mx: "auto",
        }}
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
          sx={{ alignSelf: "flex-end" }}
        >
          Generate Tasks
        </Button>
      </Box>

      {tasks.length > 0 && (
        <Box sx={{ width: "100%" }}>
          <TaskBoard initialTasks={tasks} />
        </Box>
      )}
    </Box>
  );
}
