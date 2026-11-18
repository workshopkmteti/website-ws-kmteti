export type NavItem = {
  label: string;
  href: string;
  iconSrc: string;
  isActive?: boolean;
};

export type StatCard = {
  iconSrc: string;
  label: string;
  value: string;
  sub: string;
};

export type ScheduleEntry = {
  id: string;
  dayName: string;
  month: string;
  date: number;
  title: string;
  trainingName: string;
  timeStart: string;
  timeEnd: string;
  mode: "Online" | "Offline";
  dotColor: string;
};

export type Announcement = {
  id: string;
  iconSrc: string;
  title: string;
  date: string;
  body: string;
};
