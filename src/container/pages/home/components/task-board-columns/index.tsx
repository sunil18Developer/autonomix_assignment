import React from "react";
import { Task } from "@/types";
import { Box, Typography } from "@mui/material";
import TaskCard from "@/components/task-card";

interface Props {
  tasks: Task[];
  onUpdateStatus: (id: string, status: Task["status"]) => void;
  onDelete: (id: string) => void;
}

const STATUSES: Task["status"][] = ["Pending", "In Progress", "Completed"];

const TaskBoardColumns: React.FC<Props> = ({
  tasks,
  onUpdateStatus,
  onDelete,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        width: "100%",
        overflowX: "auto",
      }}
    >
      {STATUSES.map((status) => (
        <Box
          key={status}
          sx={{
            flex: 1,
            backgroundColor: "#f5f5f5",
            borderRadius: 2,
            p: 2,
            minHeight: 400,
            display: "flex",
            flexDirection: "column",
            maxWidth: 400,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
            textAlign="center"
            sx={{ textTransform: "uppercase", color: "#333" }}
          >
            {status}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexGrow: 1,
            }}
          >
            {tasks
              .filter((task) => task.status === status)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdateStatus={(newStatus) =>
                    onUpdateStatus(task.id, newStatus)
                  }
                  onDelete={() => onDelete(task.id)}
                />
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default TaskBoardColumns;
