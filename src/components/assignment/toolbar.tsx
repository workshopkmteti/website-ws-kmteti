
"use client";

import { useState } from "react";

export type SortOption =
  | "due-soonest"
  | "due-latest"
  | "recently-added";

export type FilterOption =
  | "all"
  | "not-started"
  | "in-progress"
  | "submitted"
  | "pelatihan-ganjil"
  | "pelatihan-genap"
  | "bootcamp"
  | "teti-programming-week";

type AssignmentToolbarProps = {
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  filterBy: FilterOption;
  onFilterChange: (value: FilterOption) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Due Soonest", value: "due-soonest" },
  { label: "Due Latest", value: "due-latest" },
  { label: "Recently Added", value: "recently-added" },
];

const statusOptions: { label: string; value: FilterOption }[] = [
  { label: "Not Started", value: "not-started" },
  { label: "In Progress", value: "in-progress" },
  { label: "Submitted", value: "submitted" },
];

const courseOptions: { label: string; value: FilterOption }[] = [
  { label: "Pelatihan Ganjil", value: "pelatihan-ganjil" },
  { label: "Pelatihan Genap", value: "pelatihan-genap" },
  { label: "Bootcamp", value: "bootcamp" },
  { label: "TETI Programming Week", value: "teti-programming-week" },
];

const controlClass =
  "flex h-[46px] w-full items-center justify-between rounded-2xl border border-transparent px-4 text-left text-sm text-white/90 shadow-[0_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-xl transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300";

const controlStyle = {
  background:
    "linear-gradient(#17022C, #17022C) padding-box, linear-gradient(110deg, #C6C6C6, #5E3786) border-box",
};

const menuClass =
  "absolute left-0 top-full z-50 mt-2 w-full min-w-[220px] overflow-hidden rounded-2xl border border-white/20 bg-[#17022C] p-2 shadow-[0_4px_10px_rgba(0,0,0,0.25)]";

const optionClass =
  "w-full rounded-lg px-3 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={`ml-2 h-4 w-4 shrink-0 transition-transform ${
        open ? "rotate-180" : ""
      }`}
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  );
}

function SortIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M8 5v14m0 0-4-4m4 4 4-4M16 19V5m0 0-4 4m4-4 4 4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <path
        d="M4 5h16l-6.5 7.5V19l-3 1v-7.5L4 5Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-4 w-4 shrink-0"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

export default function AssignmentToolbar({
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: AssignmentToolbarProps) {
  const [sortOpen, setSortOpen] = useState(false);
  const [sortTouched, setSortTouched] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterLevel, setFilterLevel] = useState<"root" | "status" | "course">(
    "root",
  );

  const selectedSort =
    sortOptions.find((option) => option.value === sortBy)?.label ??
    "Due Soonest";

  const selectedFilter =
    filterBy === "all"
      ? null
      : [...statusOptions, ...courseOptions].find(
          (option) => option.value === filterBy,
        );

  function closeFilter() {
    setFilterOpen(false);
    setFilterLevel("root");
  }

  function selectFilter(value: FilterOption) {
    onFilterChange(value);
    closeFilter();
  }

  return (
    <div className="relative z-20 mx-auto mb-8 grid w-full max-w-5xl grid-cols-1 items-center gap-3 sm:grid-cols-[280px_220px_minmax(0,1fr)] sm:gap-4">
      {/* Sort */}
      <div className="relative min-w-0">
        <button
          type="button"
          aria-expanded={sortOpen}
          aria-haspopup="listbox"
          className={controlClass}
          style={controlStyle}
          onClick={() => {
            setSortOpen((open) => !open);
            closeFilter();
          }}
        >
          <span className="flex min-w-0 items-center gap-2">
            {!sortTouched ? (
              <>
                <span>Sort by</span>
                <SortIcon />
              </>
            ) : (
              <span className="truncate">{selectedSort}</span>
            )}
          </span>
          <Chevron open={sortOpen} />
        </button>

        {sortOpen && (
          <div
            role="listbox"
            aria-label="Sort assignments"
            className={menuClass}
          >
            {sortOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={sortBy === option.value}
                className={`${optionClass} ${
                  sortBy === option.value ? "bg-white/10" : ""
                }`}
                onClick={() => {
                  onSortChange(option.value);
                  setSortTouched(true);
                  setSortOpen(false);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter */}
      <div className="relative min-w-0">
        <button
          type="button"
          aria-expanded={filterOpen}
          aria-haspopup="menu"
          className={controlClass}
          style={controlStyle}
          onClick={() => {
            setFilterOpen((open) => !open);
            setFilterLevel("root");
            setSortOpen(false);
          }}
        >
          <span className="flex min-w-0 items-center gap-2">
            {selectedFilter ? (
              <span className="truncate">{selectedFilter.label}</span>
            ) : (
              <>
                <span>Filter</span>
                <FilterIcon />
              </>
            )}
          </span>
          <Chevron open={filterOpen} />
        </button>

        {filterOpen && (
          <div
            role="menu"
            aria-label="Assignment filters"
            className={menuClass}
          >
            {filterLevel === "root" && (
              <>
                <button
                  type="button"
                  role="menuitem"
                  className={optionClass}
                  onClick={() => setFilterLevel("status")}
                >
                  Filter by Status
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className={optionClass}
                  onClick={() => setFilterLevel("course")}
                >
                  Filter by Course
                </button>

                {filterBy !== "all" && (
                  <button
                    type="button"
                    role="menuitem"
                    className={`${optionClass} mt-1 border-t border-white/10 text-white/60`}
                    onClick={() => selectFilter("all")}
                  >
                    Clear Filter
                  </button>
                )}
              </>
            )}

            {filterLevel === "status" && (
              <>
                <button
                  type="button"
                  role="menuitem"
                  className={`${optionClass} mb-1 border-b border-white/10 text-white/55`}
                  onClick={() => setFilterLevel("root")}
                >
                  Back
                </button>

                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitem"
                    aria-current={
                      filterBy === option.value ? "true" : undefined
                    }
                    className={`${optionClass} ${
                      filterBy === option.value ? "bg-white/10" : ""
                    }`}
                    onClick={() => selectFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </>
            )}

            {filterLevel === "course" && (
              <>
                <button
                  type="button"
                  role="menuitem"
                  className={`${optionClass} mb-1 border-b border-white/10 text-white/55`}
                  onClick={() => setFilterLevel("root")}
                >
                  Back
                </button>

                {courseOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    role="menuitem"
                    aria-current={
                      filterBy === option.value ? "true" : undefined
                    }
                    className={`${optionClass} ${
                      filterBy === option.value ? "bg-white/10" : ""
                    }`}
                    onClick={() => selectFilter(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Search */}
      <label className="relative block min-w-0">
        <span className="sr-only">Search assignments</span>

        {!searchQuery && (
          <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-white/60">
            <SearchIcon />
          </span>
        )}

        <input
          type="search"
          placeholder="Search Assignments"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          className={`h-[46px] w-full rounded-2xl border border-transparent pr-4 text-sm text-white/90 shadow-[0_4px_10px_rgba(0,0,0,0.25)] backdrop-blur-xl outline-none transition placeholder:text-white/55 focus-visible:ring-2 focus-visible:ring-purple-300 ${
            searchQuery ? "pl-4" : "pl-11"
          }`}
          style={controlStyle}
        />
      </label>
    </div>
  );
}
