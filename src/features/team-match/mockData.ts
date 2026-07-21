import { type Team } from "./types";

export const INITIAL_MOCK_TEAMS: Record<string, Team> = {
  "XXX999": {
    name: "CYBER SECURITY TEAM",
    code: "XXX999",
    leader: "Alice Cooper",
    members: ["Bob Smith", "Charlie Brown"], // 3/3 members (Full)
  },
  "XXX888": {
    name: "AI RESEARCH TEAM",
    code: "XXX888",
    leader: "David Miller",
    members: ["Emma Watson"], // 2/3 members
  },
  "XXX990": {
    name: "WEB DEV TEAM",
    code: "XXX990",
    leader: "Frank Sinatra",
    members: [], // 1/3 members
  },
  "YYY998": {
    name: "ROBOTICS TEAM",
    code: "YYY998",
    leader: "Grace Hopper",
    members: ["Henry Cavill"], // 2/3 members
  },
  "YYY888": {
    name: "GAME DEV TEAM",
    code: "YYY888",
    leader: "Ian McKellen",
    members: ["Jack Ryan", "Karen Gillan"], // 3/3 members (Full)
  },
  "KMT999": {
    name: "KMTETI SPECIAL TEAM",
    code: "KMT999",
    leader: "Vania Carmia",
    members: ["Vania Carmia 1"], // 2/3 members (joinable in test)
  },
};
