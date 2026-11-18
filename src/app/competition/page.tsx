"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import DashboardShell from "@/components/DashboardShell";
import Mascot from "@/components/Mascot";
import SearchControls, { PILL_CLASS, type SearchState } from "@/components/SearchControls";
import {
  COMPETITION_STATUSES,
  formatDue,
  searchCompetitions,
  type Competition,
} from "@/data/competitions";

const SORT_OPTIONS = [
  { value: "due" as const, label: "Due date" },
  { value: "title" as const, label: "Title" },
];

const CARD_CLASS =
  "relative z-10 flex flex-col gap-3 rounded-[24px] border-2 border-[#c6c6c6]/85 bg-[linear-gradient(142deg,rgba(198,198,198,0.22)_4%,rgba(94,55,134,0.42)_90%)] px-5 py-5 shadow-[0_12px_36px_rgba(12,4,28,0.45)] backdrop-blur-md transition-colors hover:border-[#c6c6c6] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-7 sm:py-5";

const PANEL_BACKGROUND =
  "radial-gradient(72% 120% at 20.8% -15.5%, rgba(54,38,167,1) 0%, rgba(54,22,136,1) 24.62%, rgba(54,5,104,1) 49.24%, rgba(42,4,81,1) 74.62%, rgba(30,3,57,1) 100%)";

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" fill="none" className={`size-[18px] shrink-0 ${className}`} aria-hidden>
      <path
        d="M6.75 13.5L11.25 9L6.75 4.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CardBody({ title, event, dueAt, status }: Competition) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold leading-snug text-[#e6edf4] sm:text-xl">
          {title}
        </h2>
        <p className="font-[family-name:var(--font-quicksand)] text-sm font-medium text-[#e6edf4]/85">
          Event: {event}
        </p>
        <p className="font-mono text-xs text-[#e6edf4]/70">
          Due: {formatDue(dueAt)}
        </p>
      </div>
      <span className={`${PILL_CLASS} self-start sm:self-center`}>
        {status}
        <ChevronRightIcon className="transition-transform group-open:rotate-90" />
      </span>
    </>
  );
}

function CompetitionRow(competition: Competition) {
  if (!competition.cta) {
    return (
      <article className={CARD_CLASS}>
        <CardBody {...competition} />
      </article>
    );
  }

  return (
    <details className="group">
      <summary
        className={`${CARD_CLASS} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
      >
        <CardBody {...competition} />
      </summary>
      <div
        className="-mt-4 flex flex-col items-center justify-center rounded-b-[20px] border-2 border-t-0 border-[#c6c6c6]/85 px-6 pt-8 pb-6"
        style={{ background: PANEL_BACKGROUND }}
      >
        <Link
          href={competition.cta.href}
          className="w-full rounded-[14px] border-[1.5px] border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-7 py-2.5 text-center font-[family-name:var(--font-montserrat)] text-sm font-semibold tracking-wide text-[#e6edf4] shadow-[0_0_16px_4px_rgba(1,29,62,0.36),inset_2px_4px_4px_0_rgba(0,0,0,0.25)] transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] sm:w-fit"
        >
          {competition.cta.label}
        </Link>
      </div>
    </details>
  );
}

export default function CompetitionPage() {
  const [search, setSearch] = useState<SearchState>({ query: "", filter: "All", sort: "due" });
  const visible = useMemo(
    () => searchCompetitions({ query: search.query, status: search.filter, sort: search.sort }),
    [search],
  );

  return (
    <DashboardShell activeHref="/competition">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center gap-6 pt-4 pb-12 sm:gap-7">
        <div className="flex items-center justify-center gap-3">
          <Mascot
            pose="happy"
            className="pointer-events-none hidden h-16 w-20 shrink-0 sm:block"
          />
          <h1 className="text-center font-[family-name:var(--font-montserrat)] text-2xl font-bold tracking-wide text-[#e6edf4] uppercase sm:text-3xl">
            YOUR COMPETITION, JOHN!
          </h1>
        </div>

        <SearchControls
          state={search}
          onChange={setSearch}
          filterOptions={COMPETITION_STATUSES}
          sortOptions={SORT_OPTIONS}
        />

        <div className="flex w-full flex-col gap-4 sm:gap-5">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((competition) => (
              <motion.div
                key={competition.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                whileHover={{ scale: 1.01 }}
              >
                <CompetitionRow {...competition} />
              </motion.div>
            ))}
          </AnimatePresence>
          {visible.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-16 text-center text-xl text-white"
            >
              No competitions found.
            </motion.p>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
