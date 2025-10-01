import { Task } from "@/types";

const now = Date.now();

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fix Stripe payment gateway P0 blocker",
    description:
      "Investigate and resolve the race condition causing intermittent transaction failures under load.",
    owner: "David",
    priority: "High",
    due: "End of this week",
    status: "InProgress",
    createdAt: now - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "2",
    title: "Provide stable build for QA regression",
    description:
      "Deliver a stable build to Sam's team by Monday morning for full regression testing.",
    owner: "David",
    priority: "High",
    due: "Next Monday AM",
    status: "Pending",
    createdAt: now - 1000 * 60 * 60 * 24 * 5,
  },
  {
    id: "3",
    title: "Investigate Titan memory leak issue",
    description:
      "Allocate 4 hours to investigate memory leak in Titan reporting service and document findings.",
    owner: "David",
    priority: "Medium",
    due: "Next week",
    status: "Pending",
    createdAt: now - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: "4",
    title: "Review technical accuracy of blog post",
    description:
      "Review the 'How It Works' section for the Project Odyssey launch blog to ensure correct technical details.",
    owner: "David",
    priority: "Medium",
    due: "Thursday EOD",
    status: "Pending",
    createdAt: now - 1000 * 60 * 60 * 24 * 3,
  },
  {
    id: "5",
    title: "Capture high-resolution dashboard screenshots",
    description:
      "Coordinate with QA to get clean screenshots of the new analytics view once the build is stable.",
    owner: "Maria",
    priority: "High",
    due: "Next Tuesday",
    status: "Completed",
    createdAt: now - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "6",
    title: "Prepare A/B test plan for homepage headline",
    description:
      "Create a brief document outlining proposed headlines and success metrics for post-launch optimization.",
    owner: "Maria",
    priority: "Low",
    due: "Backlog",
    status: "Pending",
    createdAt: now - 1000 * 60 * 60 * 24,
  },
  {
    id: "7",
    title: "Finalize project budget allocation",
    description:
      "Approve the final budget and submit for CFO review before end of month.",
    owner: "Alex",
    priority: "High",
    due: "Friday",
    status: "Completed",
    createdAt: now - 1000 * 60 * 60 * 12,
  },
  {
    id: "8",
    title: "Optimize database queries",
    description:
      "Reduce load times by improving SQL queries for reporting tables.",
    owner: "Alex",
    priority: "Medium",
    due: "Next Wednesday",
    status: "InProgress",
    createdAt: now,
  },
];

export default mockTasks;
