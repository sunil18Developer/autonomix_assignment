export interface Task {
  id: string;
  title: string;
  description: string;
  owner: string;
  priority: "Low" | "Medium" | "High";
  due: string;
  status: "Pending" | "In Progress" | "Completed";
  createdAt: number;
}
