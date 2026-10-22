"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Background from "@/components/Background";
import Mascot from "@/components/Mascot";
import Logo from "@/components/LogoUpright";

import AssignmentToolbar, {
  type SortOption,
  type FilterOption,
} from "@/components/assignment/toolbar";

import AssignmentCard from "@/components/assignment/assignmentcard";
import { dummyAssignments } from "@/data/assignment";

const parseAssignmentDate = (dateString: string): number => {
  const normalizedDate = dateString
    .replace(
      /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday),\s*/i,
      ""
    )
    .replace(
      /(\d{1,2})\.(\d{2})\s*(AM|PM)/i,
      "$1:$2 $3"
    );

  return new Date(normalizedDate).getTime();
};

export default function AssignmentPage() {
  const router = useRouter();

  const [sortBy, setSortBy] =
    useState<SortOption>("due-soonest");
  const [filterBy, setFilterBy] =
    useState<FilterOption>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const statusMap: Partial<Record<FilterOption, string>> = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    submitted: "Submitted",
  };

  const courseMap: Partial<Record<FilterOption, string>> = {
    "pelatihan-ganjil": "Pelatihan Ganjil",
    "pelatihan-genap": "Pelatihan Genap",
    bootcamp: "Bootcamp",
    "teti-programming-week": "Teti Programming Week",
  };

  const sortedAssignments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = dummyAssignments.filter((assignment) => {
      const selectedStatus = statusMap[filterBy];
      const selectedCourse = courseMap[filterBy];

      const matchesStatus =
        !selectedStatus ||
        assignment.status === selectedStatus;

      const matchesCourse =
        !selectedCourse ||
        assignment.course
          .toLowerCase()
          .includes(selectedCourse.toLowerCase());

      const matchesSearch =
        assignment.title.toLowerCase().includes(query) ||
        assignment.course.toLowerCase().includes(query);

      return (
        matchesStatus &&
        matchesCourse &&
        matchesSearch
      );
    });

    return [...filtered].sort((a, b) => {
      if (
        sortBy === "due-soonest" ||
        sortBy === "due-latest"
      ) {
        const dateA = parseAssignmentDate(a.dueDate);
        const dateB = parseAssignmentDate(b.dueDate);

        if (
          !Number.isFinite(dateA) ||
          !Number.isFinite(dateB)
        ) {
          return 0;
        }

        return sortBy === "due-soonest"
          ? dateA - dateB
          : dateB - dateA;
      }

      if (sortBy === "recently-added") {
        return Number(b.id) - Number(a.id);
      }

      return 0;
    });
  }, [sortBy, filterBy, searchQuery]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#1e0339] text-white">
      <Background />

      <div className="relative z-30 mx-auto w-full max-w-6xl px-6 py-10">
        <header className="mb-8 flex h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md">
          <Logo className="block h-auto w-[122px] max-w-full" />
        </header>

        <section className="mb-8 flex items-center justify-center gap-5">
          <div className="h-24 w-24 shrink-0 sm:h-28 sm:w-28">
            <Mascot
              pose="happy"
              className="!h-full !w-full"
            />
          </div>

          <h1 className="text-center text-2xl font-bold tracking-wide sm:text-3xl md:text-4xl">
            YOUR ASSIGNMENTS
          </h1>
        </section>

        <div className="relative z-30">
          <AssignmentToolbar
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
      </div>

      <section className="relative z-0 mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 pb-10">
        {sortedAssignments.length > 0 ? (
          sortedAssignments.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onClick={(selectedAssignment) => {
                router.push(
                  `/assignment/${selectedAssignment.id}`
                );
              }}
            />
          ))
        ) : (
          <div className="rounded-2xl border border-white/15 bg-white/[0.07] px-6 py-12 text-center backdrop-blur-md">
            <h2 className="text-lg font-semibold">
              No assignments found
            </h2>

            <p className="mt-2 text-sm text-white/60">
              Try changing your search or filter settings.
            </p>

            <button
              type="button"
              onClick={() => {
                setFilterBy("all");
                setSearchQuery("");
              }}
              className="mt-5 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-sm transition hover:bg-white/15"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
