"use client";

import React, { useState } from "react";
import { Box, Button, TextField, IconButton, Typography, Container } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeMode } from "@/app/theme-registry";
import { Task } from "@/types";
import { v4 as uuidv4 } from "uuid";
import TaskList from "@/container/pages/home/components/task-list";
import mockTasks from "@/data";

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

    setTasks(newTasks);
    setTranscript("");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
        <IconButton color="inherit" onClick={toggleMode}>
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Box>

      <Typography variant="h4" fontWeight={700} gutterBottom textAlign="center">
        Meeting Task Generator
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2, mb: 4 }}>
        <TextField
          label="Enter Meeting Transcript"
          multiline
          rows={6}
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" size="large" sx={{ alignSelf: "flex-end" }}>
          Generate Tasks
        </Button>
      </Box>

      {tasks.length > 0 && <TaskList initialTasks={tasks} />}
    </Container>
  );
}
