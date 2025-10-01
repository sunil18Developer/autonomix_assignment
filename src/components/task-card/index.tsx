import React from "react";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";
import { Task } from "@/types";

interface TaskCardProps {
  task: Task;
}

const statusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "warning";
    default:
      return "default";
  }
};

const priorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "error";
    case "medium":
      return "warning";
    case "low":
      return "info";
    default:
      return "default";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <Card
      sx={{
        mb: 2,
        borderLeft: `6px solid ${
          task.status === "Completed"
            ? "#4caf50"
            : task.status === "In Progress"
            ? "#ff9800"
            : "#bdbdbd"
        }`,
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography variant="h6" fontWeight={600}>
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
          <Chip label={`Owner: ${task.owner}`} size="small" />
          <Chip
            label={task.priority}
            size="small"
            color={priorityColor(task.priority)}
          />
          <Chip label={task.due} size="small" />
          <Chip label={task.status} size="small" color={statusColor(task.status)} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
