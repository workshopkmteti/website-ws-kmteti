"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Mascot from "./Mascot";

const COURSES = [
  "TETI Programming Week - CTF",
  "TETI Programming Week - Innovation",
  "Bootcamp - Artificial Intelligence",
  "Pelatihan Genap - STM32",
  "Pelatihan Genap - Web Development II",
  "Bootcamp - Data Science",
  "Bootcamp - Mobile Dev",
  "Pelatihan Ganjil - UI/UX Design",
  "Pelatihan Ganjil - Cybersecurity",
  "KMTETI Hackathon 2026",
];

const CATEGORIES = [
  "All",
  "Bootcamp",
  "Pelatihan Genap",
  "Pelatihan Ganjil",
  "TETI Programming Week",
  "KMTETI Hackathon",
] as const;

type SortOrder = "default" | "desc" | "asc";

export default function RegisterForm() {
  const router = useRouter();
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    const list = COURSES.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.startsWith(selectedCategory);
      const matchesQuery = !needle || course.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });

    if (sortOrder === "asc") return [...list].sort((a, b) => a.localeCompare(b));
    if (sortOrder === "desc") return [...list].sort((a, b) => b.localeCompare(a));
    return list;
  }, [searchQuery, selectedCategory, sortOrder]);

  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * itemsPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + itemsPerPage);

  const toggleCourse = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course)
        ? prev.filter((c) => c !== course)
        : [...prev, course],
    );
  };

  const cycleSort = () => {
    setSortOrder((prev) =>
      prev === "default" ? "desc" : prev === "desc" ? "asc" : "default",
    );
    setCurrentPage(1);
  };

  const cycleFilter = () => {
    const idx = CATEGORIES.indexOf(selectedCategory as (typeof CATEGORIES)[number]);
    const next = CATEGORIES[(idx + 1) % CATEGORIES.length];
    setSelectedCategory(next);
    setCurrentPage(1);
  };

  const handleSubmit = () => {
    if (selectedCourses.length === 0) return;
    const query = encodeURIComponent(selectedCourses.join(","));
    router.push(`/payment?courses=${query}`);
  };

  const sortLabel =
    sortOrder === "default" ? "Sort By" : sortOrder === "desc" ? "Sort By: Z-A" : "Sort By: A-Z";
  const filterLabel = selectedCategory === "All" ? "Filter" : `Filter: ${selectedCategory}`;

  return (
    <section className="relative mx-auto flex w-full max-w-[460px] flex-col items-center rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-10">
      <div className="pointer-events-none absolute -top-[80px] -left-[250px] z-50 hidden scale-[0.55] sm:block">
        <Mascot pose="happy" tilt={-15} />
      </div>

      <h1 className="relative z-10 mb-4 text-center text-sm font-bold tracking-[0.1em] text-white uppercase sm:text-base">
        CHOOSE THE COURSE/COMPETITION
      </h1>

      <div className="relative z-10 mb-4 flex w-full flex-wrap justify-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={cycleSort}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-[10px] text-gray-200 transition-colors hover:bg-black/50"
        >
          {sortLabel} <span className="text-[7px]">▼</span>
        </button>
        <button
          type="button"
          onClick={cycleFilter}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 text-[10px] text-gray-200 transition-colors hover:bg-black/50"
        >
          {filterLabel} <span className="text-[7px]">▼</span>
        </button>
        <button
          type="button"
          onClick={() => setShowSearch((prev) => !prev)}
          aria-expanded={showSearch}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-5 py-1.5 text-[10px] text-gray-200 transition-colors hover:bg-black/50"
        >
          Search <span>⚲</span>
        </button>
      </div>

      {showSearch && (
        <div className="relative z-10 mb-4 w-full">
          <input
            type="search"
            aria-label="Cari program"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Cari pelatihan atau kompetisi..."
            className="w-full rounded-xl border border-white/20 bg-black/30 px-4 py-2 text-xs text-white placeholder:text-gray-400 focus:border-white/50 focus:outline-none"
          />
        </div>
      )}

      <div className="relative z-10 min-h-[380px] w-full">
        {currentCourses.length === 0 ? (
          <p className="py-12 text-center font-mono text-xs text-gray-300">
            Program tidak ditemukan.
          </p>
        ) : (
          currentCourses.map((course) => (
            <button
              type="button"
              key={course}
              onClick={() => toggleCourse(course)}
              className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
            >
              <span className="text-xs font-semibold tracking-wide text-white">{course}</span>
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-white transition-colors ${
                  selectedCourses.includes(course) ? "bg-white" : "bg-transparent"
                }`}
              >
                {selectedCourses.includes(course) && (
                  <svg className="h-4 w-4 text-[#1c0f3e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
            </button>
          ))
        )}
      </div>

      <div className="relative z-10 mt-4 flex w-full items-center justify-between">
        {safePage > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p - 1)}
            className="relative z-10 flex h-12 items-center justify-center rounded-xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-6 font-mono text-[10px] font-bold tracking-wider text-[#ebe6f0] transition-transform hover:scale-105 sm:px-8"
          >
            BACK
          </button>
        ) : (
          <div className="w-[84px]" />
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={selectedCourses.length === 0}
          className={`relative z-10 flex h-10 items-center justify-center rounded-xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-8 font-mono text-xs font-bold tracking-[0.1em] text-[#ebe6f0] transition-all sm:px-10 ${
            selectedCourses.length === 0
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer shadow-[0_0_15px_rgba(30,3,57,0.5)] hover:scale-105"
          }`}
        >
          SUBMIT
        </button>

        {safePage < totalPages ? (
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="relative z-10 flex h-12 items-center justify-center rounded-xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-6 font-mono text-[10px] font-bold tracking-wider text-[#ebe6f0] transition-transform hover:scale-105 sm:px-8"
          >
            NEXT
          </button>
        ) : (
          <div className="w-[84px]" />
        )}
      </div>
    </section>
  );
}
