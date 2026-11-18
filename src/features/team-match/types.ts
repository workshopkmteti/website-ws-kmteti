export type PageMode = "create_join" | "your_team";

export interface Team {
  name: string;
  code: string;
  leader: string;
  members: string[];
}

export interface AvailableTeam {
  name: string;
  code: string;
  membersCount: number;
  maxMembers: number;
}
