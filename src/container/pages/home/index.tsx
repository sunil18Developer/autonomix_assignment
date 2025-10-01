"use client";
import React, { useState } from "react";
import { Box, Button, TextField, IconButton, Typography } from "@mui/material";
import { Brightness4, Brightness7, History } from "@mui/icons-material";
import { useThemeMode } from "@/app/theme-registry";
import { Task } from "@/types";
// import mockTasks from "@/data";
import Link from "next/link";
import TaskBoard from "./components/task-board";
import api from "@/config/api-config";
import { endPoints } from "@/config/api-config/end-points";

export default function HomePage() {
  const [transcript, setTranscript] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const { mode, toggleMode } = useThemeMode();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    try {
      setLoading(true);
      const response = await api.post(endPoints.generateTasks, {
        transcript,
      });

      const newTasks: Task[] = response.data.tasks.map(
        (t: {
          id: unknown;
          title: unknown;
          description: unknown;
          owner: unknown;
          priority: string;
          due: unknown;
          status: string;
          createdAt: unknown;
        }) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          owner: t.owner || "Unassigned",
          priority: t.priority === "P0" ? "High" : t.priority || "Medium",
          due: t.due || "TBD",
          status:
            t.status === "To Do"
              ? "Pending"
              : t.status === "Blocked"
              ? "In Progress"
              : t.status || "Pending",
          createdAt: t.createdAt || Date.now(),
        })
      );

      setTasks((prev: Task[]) => [...prev, ...newTasks]);
      setTranscript("");
    } catch (error) {
      console.error("Error generating tasks:", error);
      alert("Failed to generate tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100%", px: 2, py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 3 }}>
        <IconButton color="inherit" onClick={toggleMode}>
          {mode === "light" ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
        <Link href="/history-tasks" passHref legacyBehavior>
          <Button variant="contained" startIcon={<History />}>
            Task History
          </Button>
        </Link>
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
          sx={{ overflow: "auto" }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          disabled={loading}
          sx={{ alignSelf: "flex-end" }}
        >
          {loading ? "Generating..." : "Generate Tasks"}
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
