import React, { useState } from "react";
import { Task } from "@/types";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Box, Card, Typography } from "@mui/material";
import TaskBoardColumns from "../task-board-columns";
import TaskFilters from "../task-filter";

interface Props {
  initialTasks: Task[];
}

const COLORS = ["#FF8042", "#0088FE", "#00C49F"];

const TaskBoard: React.FC<Props> = ({ initialTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleUpdateStatus = (id: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const priorityData = ["Low", "Medium", "High"].map((p) => ({
    priority: p,
    count: tasks.filter((task) => task.priority === p).length,
  }));

  const PRIORITY_COLORS: Record<Task["priority"], string> = {
    High: "#f44336",
    Medium: "#ff9800",
    Low: "#2196f3",
  };

  const handleUpdatePriority = (id: string, newPriority: Task["priority"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, priority: newPriority } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const chartData = [
    {
      name: "Pending",
      value: tasks.filter((t) => t.status === "Pending").length,
    },
    {
      name: "In Progress",
      value: tasks.filter((t) => t.status === "InProgress").length,
    },
    {
      name: "Completed",
      value: tasks.filter((t) => t.status === "Completed").length,
    },
  ];

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    keyword: "",
    sortBy: "createdAt",
  });

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const filteredTasks = tasks
    .filter((t) => (filters.status ? t.status === filters.status : true))
    .filter((t) => (filters.priority ? t.priority === filters.priority : true))
    .filter((t) =>
      filters.keyword
        ? t.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
          t.description.toLowerCase().includes(filters.keyword.toLowerCase())
        : true
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "priority": {
          const order = { High: 3, Medium: 2, Low: 1 };
          return order[b.priority] - order[a.priority];
        }
        case "status": {
          const statusOrder = { Completed: 3, "In Progress": 2, Pending: 1 };
          return (
            statusOrder[b.status as keyof typeof statusOrder] -
            statusOrder[a.status as keyof typeof statusOrder]
          );
        }
        case "createdAt":
        default:
          return (b.createdAt || 0) - (a.createdAt || 0);
      }
    });

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
        <TaskFilters
          statusFilter={filters.status}
          priorityFilter={filters.priority}
          keyword={filters.keyword}
          sortBy={filters.sortBy}
          onChange={handleFilterChange}
        />
        <TaskBoardColumns
          tasks={filteredTasks}
          onUpdateStatus={handleUpdateStatus}
          onUpdatePriority={handleUpdatePriority}
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
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        <Card sx={{ p: 2, mt: 3 }}>
          <Typography variant="h6" mb={2}>
            Tasks by Priority
          </Typography>
          <Box sx={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={priorityData}>
                <XAxis dataKey="priority" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count">
                  {priorityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PRIORITY_COLORS[entry.priority as Task["priority"]]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Box>
        </Card>
      </Box>
    </Box>
  );
};

export default TaskBoard;
