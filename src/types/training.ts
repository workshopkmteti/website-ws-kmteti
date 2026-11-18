export type TrainingStatus = "ongoing" | "upcoming" | "completed";

export interface Training {
  id: string;
  title: string;
  category: string;
  status: TrainingStatus;
  date: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  title: string;
  category: string;
  date: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
