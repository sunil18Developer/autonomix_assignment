import React from "react";
import { Task } from "@/types";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TaskCardProps {
  task: Task;
  onUpdateStatus?: (status: Task["status"]) => void;
  onDelete?: () => void;
}

const statusColor = (status: Task["status"]) => {
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

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onUpdateStatus,
  onDelete,
}) => {
  return (
    <Card
      sx={{
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
          <Chip
            label={task.status}
            size="small"
            color={statusColor(task.status)}
          />
        </Box>
        <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
          {onUpdateStatus && (
            <Select
              value={task.status}
              size="small"
              onChange={(e) => onUpdateStatus(e.target.value as Task["status"])}
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          )}
          {onDelete && (
            <IconButton size="small" color="error" onClick={onDelete}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
