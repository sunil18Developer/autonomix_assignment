import React, { useState } from "react";
import { Task } from "@/types";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { Box, Typography } from "@mui/material";
import TaskBoardColumns from "../task-board-columns";

interface Props {
  initialTasks: Task[];
}

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

const TaskBoard: React.FC<Props> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleToggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Pending" : "Completed",
            }
          : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const chartData = [
    { name: "Pending", value: tasks.filter((t) => t.status === "Pending").length },
    { name: "In Progress", value: tasks.filter((t) => t.status === "In Progress").length },
    { name: "Completed", value: tasks.filter((t) => t.status === "Completed").length },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
        width: "100%",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Tasks Board
        </Typography>
        <TaskBoardColumns
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDelete}
        />
      </Box>

      <Box sx={{ width: { xs: "100%", md: 300 }, flexShrink: 0 }}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Task Status
        </Typography>
        <PieChart width={200} height={200}>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Box>
    </Box>
  );
};

export default TaskBoard;
