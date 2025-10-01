import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

interface Props {
  statusFilter: string;
  priorityFilter: string;
  keyword: string;
  sortBy: string;
  onChange: (field: string, value: string) => void;
}

const TaskFilters: React.FC<Props> = ({
  statusFilter,
  priorityFilter,
  keyword,
  sortBy,
  onChange,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        mb: 3,
        alignItems: "center",
      }}
    >
      <TextField
        label="Search by keyword"
        variant="outlined"
        size="small"
        value={keyword}
        onChange={(e) => onChange("keyword", e.target.value)}
      />

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Status</InputLabel>
        <Select
          value={statusFilter}
          label="Status"
          onChange={(e) => onChange("status", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 150 }}>
        <InputLabel>Priority</InputLabel>
        <Select
          value={priorityFilter}
          label="Priority"
          onChange={(e) => onChange("priority", e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ minWidth: 180 }}>
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          label="Sort By"
          onChange={(e) => onChange("sortBy", e.target.value)}
        >
          <MenuItem value="createdAt">Creation Date</MenuItem>
          <MenuItem value="priority">Priority</MenuItem>
          <MenuItem value="status">Completion Status</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default TaskFilters;
