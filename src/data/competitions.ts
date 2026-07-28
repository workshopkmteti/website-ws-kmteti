export type CompetitionStatus = "Ongoing" | "Registered" | "Upcoming" | "Closed";

export type Competition = {
  id: string;
  title: string;
  event: string;
  dueAt: string;
  status: CompetitionStatus;
  cta?: { label: string; href: string };
  about: string;
  guidebookUrl: string;
};

export const COMPETITION_STATUSES: CompetitionStatus[] = [
  "Ongoing",
  "Registered",
  "Upcoming",
  "Closed",
];

const ABOUT_PLACEHOLDER =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a condimentum orci. Praesent faucibus posuere tortor a cursus. Mauris semper neque quis sem vestibulum, nec pretium orci tempor. Duis pellentesque erat ac elementum congue. Phasellus consectetur nisi a velit viverra, sed feugiat sapien egestas. Nulla nec congue lacus, ut euismod nunc.";

// Any PDF URL renders in the browser's built-in viewer — swap this for a
// Supabase Storage URL once the bucket exists.
const GUIDEBOOK_PLACEHOLDER = "/guidebooks/placeholder.pdf";

export const COMPETITIONS: Competition[] = [
  {
    id: "ctf",
    title: "Competition Title",
    event: "TETI Programming Week",
    dueAt: "2026-02-19T22:00:00+07:00",
    status: "Ongoing",
    cta: { label: "REGISTER", href: "/register/courses" },
    about: ABOUT_PLACEHOLDER,
    guidebookUrl: GUIDEBOOK_PLACEHOLDER,
  },
  {
    id: "innovation",
    title: "Competition Title",
    event: "TETI Programming Week",
    dueAt: "2026-02-26T22:00:00+07:00",
    status: "Registered",
    cta: { label: "GO TO COMPETITION", href: "/competition/innovation" },
    about: ABOUT_PLACEHOLDER,
    guidebookUrl: GUIDEBOOK_PLACEHOLDER,
  },
  {
    id: "ai-bootcamp",
    title: "Competition Title",
    event: "TETI Programming Week",
    dueAt: "2026-03-05T22:00:00+07:00",
    status: "Upcoming",
    about: ABOUT_PLACEHOLDER,
    guidebookUrl: GUIDEBOOK_PLACEHOLDER,
  },
  {
    id: "stm32",
    title: "Competition Title",
    event: "TETI Programming Week",
    dueAt: "2026-03-12T22:00:00+07:00",
    status: "Upcoming",
    about: ABOUT_PLACEHOLDER,
    guidebookUrl: GUIDEBOOK_PLACEHOLDER,
  },
  {
    id: "web-dev",
    title: "Competition Title",
    event: "TETI Programming Week",
    dueAt: "2026-01-15T22:00:00+07:00",
    status: "Closed",
    about: ABOUT_PLACEHOLDER,
    guidebookUrl: GUIDEBOOK_PLACEHOLDER,
  },
];

// Plain PDF URLs pass through untouched; only Google Drive needs the rewrite.
export function guidebookPreviewUrl(url: string) {
  return url.replace(/\/(view|edit)(\?[^#]*)?(#.*)?$/, "/preview");
}

export function findCompetition(id: string) {
  return COMPETITIONS.find((competition) => competition.id === id);
}

const DUE_FORMAT = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
  timeZone: "Asia/Jakarta",
});

export function formatDue(dueAt: string) {
  const parts = Object.fromEntries(
    DUE_FORMAT.formatToParts(new Date(dueAt)).map((part) => [part.type, part.value]),
  );
  return `${parts.weekday}, ${parts.day} ${parts.month} ${parts.year}, ${parts.hour}.${parts.minute} ${parts.dayPeriod.toUpperCase()}`;
}

export function timeRemaining(dueAt: string, now = Date.now()) {
  const millisecondsLeft = new Date(dueAt).getTime() - now;
  if (millisecondsLeft <= 0) return "Closed";

  const hoursLeft = Math.floor(millisecondsLeft / 3_600_000);
  return `${Math.floor(hoursLeft / 24)} days ${hoursLeft % 24} hours remaining`;
}

export function searchCompetitions({
  query,
  status,
  sort,
}: {
  query: string;
  status: string;
  sort: "due" | "title";
}) {
  const needle = query.trim().toLowerCase();

  return COMPETITIONS.filter(
    (competition) =>
      (status === "All" || competition.status === status) &&
      `${competition.title} ${competition.event}`.toLowerCase().includes(needle),
  ).sort((a, b) =>
    sort === "title" ? a.title.localeCompare(b.title) : a.dueAt.localeCompare(b.dueAt),
  );
}
