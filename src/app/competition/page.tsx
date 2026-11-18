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
  "relative z-10 flex flex-col gap-3 rounded-3xl border-2 border-[#c6c6c6] bg-gradient-to-b from-[#16012b] to-[#262a50] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:rounded-[35px] sm:px-6 sm:py-5 lg:border-4 lg:px-[30px] lg:py-6";

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
      <div className="flex flex-col">
        <h2 className="text-xl leading-tight font-bold text-white sm:text-2xl md:text-3xl lg:text-[40px]">
          {title}
        </h2>
        <p className="text-sm leading-tight text-white sm:text-base md:text-xl lg:text-[25px]">
          Event: {event}
        </p>
        <p className="text-xs leading-tight text-white sm:text-sm md:text-base lg:text-xl">
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
        className="-mt-10 flex flex-col items-center justify-center rounded-b-[20px] border-2 border-[#c6c6c6] px-4 pt-14 pb-6 sm:-mt-16 sm:px-6 sm:pt-22 sm:pb-10 lg:-mt-20 lg:border-4 lg:pt-28 lg:pb-14"
        style={{ background: PANEL_BACKGROUND }}
      >
        <Link
          href={competition.cta.href}
          className="w-full rounded-2xl border-2 border-[#c6c6c6] bg-gradient-to-b from-[#34478d] to-[#1c0e3d] px-6 py-3 text-center text-base font-semibold text-[#e6edf4] shadow-[0_0_16px_4px_rgba(1,29,62,0.36),inset_2px_4px_4px_0_rgba(0,0,0,0.25)] transition-transform hover:scale-105 sm:w-fit sm:rounded-3xl sm:px-10 sm:text-xl lg:border-4 lg:px-12 lg:py-4 lg:text-3xl"
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
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-6 pt-4 pb-12 sm:gap-8">
        <Mascot
          pose="happy"
          className="pointer-events-none absolute top-16 -left-24 hidden w-64 lg:block"
        />

        <h1 className="text-center text-2xl font-bold text-white sm:text-4xl md:text-5xl lg:text-[56px]">
          YOUR COMPETITION, JOHN!
        </h1>

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
