
export type AssignmentStatus =
  | "Not Started"
  | "In Progress"
  | "Submitted";

export type Assignment = {
  id: number;
  title: string;
  course: string;
  openedAt: string;
  dueDate: string;
  grade: string;
  instruction: string;
  attachmentUrl: string | null;
  status: AssignmentStatus;
  submissionStatus: string;
  gradeStatus: string;
  lastModified: string;
  timeRemaining: string;
  feedback: {
    gradeOn: string;
    gradeBy: string;
  };
};

export const dummyAssignments: Assignment[] = [
  {
    id: 1,
    title: "Image Processing",
    course: "Pelatihan Genap - Image Processing",
    openedAt: "Thursday, 12 February 2026, 10.00 PM",
    dueDate: "Thursday, 19 February 2026, 10.00 PM",
    grade: "XX",
    instruction:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a condimentum orci. Praesent faucibus posuere tortor a cursus. Mauris semper neque quis sem vestibulum, nec pretium orci tempor. Duis pellentesque erat ac elementum congue. Phasellus consectetur nisi a velit viverra, sed feugiat sapien egestas. Nulla nec congue lacus, ut euismod nunc",
    attachmentUrl: null,
    status: "Not Started",
    submissionStatus: "Not submitted",
    gradeStatus: "Not graded",
    lastModified: "Not modified yet",
    timeRemaining: "Deadline passed",
    feedback: {
      gradeOn: "Unknown",
      gradeBy: "Not graded",
    },
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    course: "Pelatihan Ganjil - Programming",
    openedAt: "Monday, 16 February 2026, 10.00 PM",
    dueDate: "Monday, 23 February 2026, 11.59 PM",
    grade: "XX",
    instruction:
      "Solve the programming problems and submit your solution in the required format.",
    attachmentUrl: null,
    status: "In Progress",
    submissionStatus: "Not submitted",
    gradeStatus: "Not graded",
    lastModified: "Not modified yet",
    timeRemaining: "Deadline passed",
    feedback: {
      gradeOn: "Unknown",
      gradeBy: "Not graded",
    },
  },
  {
    id: 3,
    title: "Database Design",
    course: "Bootcamp - Database",
    openedAt: "Friday, 20 February 2026, 08.00 PM",
    dueDate: "Friday, 27 February 2026, 08.00 PM",
    grade: "XX",
    instruction:
      "Design a database schema and explain the relationships between the entities.",
    attachmentUrl: null,
    status: "Submitted",
    submissionStatus: "Submitted",
    gradeStatus: "Not graded",
    lastModified: "Not modified yet",
    timeRemaining: "Deadline passed",
    feedback: {
      gradeOn: "Unknown",
      gradeBy: "Not graded",
    },
  },
];
