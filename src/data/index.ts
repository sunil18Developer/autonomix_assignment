import { Task } from "@/types";

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Fix Stripe payment gateway P0 blocker",
    description:
      "Investigate and resolve the race condition causing intermittent transaction failures under load.",
    owner: "David",
    priority: "High",
    due: "End of this week",
    status: "In Progress",
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
  },
  {
    id: "5",
    title: "Capture high-resolution dashboard screenshots",
    description:
      "Coordinate with QA to get clean screenshots of the new analytics view once the build is stable.",
    owner: "Maria",
    priority: "High",
    due: "Next Tuesday",
    status: "Pending",
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
  },
];

export default mockTasks;
