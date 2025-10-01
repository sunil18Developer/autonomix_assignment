export interface Task {
  id: string;
  title: string;
  description: string;
  owner: string;
  priority: "Low" | "Medium" | "High" | "P0";
  due: string | null;
  status: "Pending" | "In Progress" | "Completed" | "To Do" | "Blocked";
  createdAt: number;
}
