"use client";
import React, { useEffect, useState } from "react";
import { Task } from "@/types";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";
import TaskCard from "@/components/task-card";
import api from "@/config/api-config";
import { endPoints } from "@/config/api-config/end-points";

const TaskHistoryPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get<{ tasks: Task[] }>(endPoints.getTasks);
        const mappedTasks: Task[] = res.data.tasks.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          owner: t.owner,
          priority: t.priority as "Low" | "Medium" | "High",
          status: t.status,
          due: t.due ? t.due : null,
          createdAt: Number(t.createdAt),
        }));
        setTasks(mappedTasks);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task History
      </Typography>
      {tasks.length === 0 ? (
        <Alert severity="info">No tasks found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {tasks.map((task) => (
            <Grid key={task.id}>
              <TaskCard task={task} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default TaskHistoryPage;
