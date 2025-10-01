export interface Task {
  id: string;
  title: string;
  description: string;
  owner: string;
  priority: "Low" | "Medium" | "High";
  due: string | null;
  status: "Pending" | "InProgress" | "Completed" | "ToDo" | "Blocked";
  createdAt: number;
}
