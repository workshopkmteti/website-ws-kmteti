"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownUp, ChevronDown, Search } from "lucide-react";
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

type RegisterFormProps = {
  initialCourses?: string[];
};

export default function RegisterForm({ initialCourses }: RegisterFormProps) {
  const router = useRouter();
  const sourceCourses =
    initialCourses && initialCourses.length > 0 ? initialCourses : COURSES;
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCourses = useMemo(() => {
    const needle = searchQuery.trim().toLowerCase();
    const list = sourceCourses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.startsWith(selectedCategory);
      const matchesQuery = !needle || course.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });

    if (sortOrder === "asc") return [...list].sort((a, b) => a.localeCompare(b));
    if (sortOrder === "desc") return [...list].sort((a, b) => b.localeCompare(a));
    return list;
  }, [searchQuery, selectedCategory, sortOrder, sourceCourses]);

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
    router.push(`/course/payment?courses=${query}`);
  };

  const sortLabel =
    sortOrder === "default" ? "Sort By" : sortOrder === "desc" ? "Sort By: Z-A" : "Sort By: A-Z";
  const filterLabel = selectedCategory === "All" ? "Filter" : `Filter: ${selectedCategory}`;

  return (
    <section className="relative mx-auto flex w-full max-w-[820px] flex-col items-center rounded-[32px] border-[2.5px] border-[#c6c6c6] bg-[linear-gradient(142deg,rgba(198,198,198,0.6)_3.6%,rgba(94,55,134,0.6)_90.5%)] px-4 py-8 shadow-[0_20px_60px_rgba(12,4,28,0.55)] backdrop-blur-md sm:rounded-[40px] sm:px-10 sm:py-10">
      <div className="pointer-events-none absolute -top-6 -left-14 z-30 hidden sm:block md:-top-8 md:-left-20">
        <Mascot pose="happy" tilt={-15} className="h-32 w-40 md:h-36 md:w-44" />
      </div>

      <h1 className="relative z-10 mb-5 text-center font-[family-name:var(--font-montserrat)] text-lg font-semibold tracking-wide text-[#e6edf4] uppercase sm:text-[26px]">
        CHOOSE THE COURSE/COMPETITION
      </h1>

      <div className="relative z-10 mb-6 flex w-full max-w-[520px] flex-wrap items-center justify-center gap-2.5 sm:flex-nowrap sm:gap-3">
        <button
          type="button"
          onClick={cycleSort}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 py-1.5 font-[family-name:var(--font-quicksand)] text-xs font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition hover:brightness-110 sm:text-sm"
        >
          <span>{sortLabel}</span>
          <ArrowDownUp className="size-3.5 shrink-0" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={cycleFilter}
          className="flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 py-1.5 font-[family-name:var(--font-quicksand)] text-xs font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition hover:brightness-110 sm:text-sm"
        >
          <span>{filterLabel}</span>
          <ChevronDown className="size-3.5 shrink-0" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setShowSearch((prev) => {
              const next = !prev;
              if (next) {
                setTimeout(() => searchInputRef.current?.focus(), 0);
              }
              return next;
            });
          }}
          aria-expanded={showSearch}
          className="flex min-w-[140px] flex-1 cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-5 py-1.5 font-[family-name:var(--font-quicksand)] text-xs font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98] sm:text-sm"
        >
          <span>Search</span>
          <Search className="size-3.5 shrink-0" aria-hidden="true" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 mb-5 w-full max-w-[520px] overflow-hidden"
          >
            <input
              ref={searchInputRef}
              type="search"
              aria-label="Cari program"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Cari pelatihan atau kompetisi..."
              className="w-full rounded-[14px] border border-[#c6c6c6]/70 bg-[#12062b]/65 px-4 py-2.5 text-xs text-[#e6edf4] placeholder:text-[#e6edf4]/50 focus:border-[#e6edf4] focus:outline-none sm:text-sm"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-[380px] w-full">
        {currentCourses.length === 0 ? (
          <p className="py-12 text-center font-mono text-xs text-[#e6edf4]/80">
            Program tidak ditemukan.
          </p>
        ) : (
          currentCourses.map((course) => {
            const isSelected = selectedCourses.includes(course);
            return (
              <motion.button
                type="button"
                key={course}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.15 }}
                onClick={() => toggleCourse(course)}
                aria-pressed={isSelected}
                className={`mb-4 flex w-full cursor-pointer items-center justify-between gap-4 rounded-[18px] border-[2.5px] border-[#c6c6c6] bg-[radial-gradient(ellipse_at_top_left,rgba(94,55,134,0.45),rgba(38,4,74,0.72))] px-5 py-4 text-left shadow-[0_0_32px_8px_rgba(49,5,95,0.45)] transition-colors hover:brightness-110 sm:rounded-[20px] sm:px-7 sm:py-5 ${
                  isSelected ? "ring-2 ring-[#e6edf4]/70" : ""
                }`}
              >
                <span className="font-[family-name:var(--font-montserrat)] text-sm font-semibold leading-[1.25] text-[#e6edf4] sm:text-[20px]">
                  {course}
                </span>
                <span
                  className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] border border-black/15 bg-white shadow-sm transition-transform sm:size-10 sm:rounded-[12px] ${
                    isSelected ? "scale-105" : ""
                  }`}
                >
                  {isSelected && (
                    <motion.svg
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 450, damping: 24 }}
                      className="size-5 text-[#26044a] sm:size-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </span>
              </motion.button>
            );
          })
        )}
      </div>

      <div className="relative z-10 mt-4 flex w-full items-center justify-between gap-3">
        {safePage > 1 ? (
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p - 1)}
            className="relative z-10 flex h-10 cursor-pointer items-center justify-center rounded-[14px] border border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 font-[family-name:var(--font-montserrat)] text-xs font-semibold tracking-wider text-[#e6edf4] shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition hover:brightness-110 sm:px-6"
          >
            BACK
          </button>
        ) : (
          <div className="w-[72px] sm:w-[92px]" />
        )}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={selectedCourses.length === 0}
          className={`relative z-10 flex h-12 min-w-[180px] items-center justify-center gap-2 rounded-[16px] border-[2.5px] border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-8 font-[family-name:var(--font-montserrat)] text-lg font-semibold tracking-wider text-[#e6edf4] shadow-[0_0_16px_4px_rgba(1,29,62,0.36),inset_2px_4px_4px_rgba(0,0,0,0.25)] transition-all sm:min-w-[240px] sm:text-[24px] ${
            selectedCourses.length === 0
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]"
          }`}
        >
          <span>SUBMIT</span>
          {selectedCourses.length > 0 && (
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold">
              {selectedCourses.length}
            </span>
          )}
        </button>

        {safePage < totalPages ? (
          <button
            type="button"
            onClick={() => setCurrentPage((p) => p + 1)}
            className="relative z-10 flex h-10 cursor-pointer items-center justify-center rounded-[14px] border border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 font-[family-name:var(--font-montserrat)] text-xs font-semibold tracking-wider text-[#e6edf4] shadow-[0_4px_10px_rgba(0,0,0,0.25)] transition hover:brightness-110 sm:px-6"
          >
            NEXT
          </button>
        ) : (
          <div className="w-[72px] sm:w-[92px]" />
        )}
      </div>
    </section>
  );
}
