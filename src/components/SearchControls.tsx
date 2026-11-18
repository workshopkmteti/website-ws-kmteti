"use client";

export type SortKey = "due" | "title";

export type SearchState = {
  query: string;
  filter: string;
  sort: SortKey;
};

export const PILL_CLASS =
  "flex min-w-0 cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-[#c6c6c6] bg-gradient-to-b from-[#2a4580] via-[#172b59] to-[#0c1836] px-4 py-2 font-[family-name:var(--font-quicksand)] text-xs font-bold tracking-[0.02em] text-[#e6edf4] shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 sm:px-5 sm:text-sm";

function SortIcon() {
  return (
    <svg viewBox="0 0 15 13.5" fill="none" className="size-[15px] shrink-0" aria-hidden>
      <path
        d="M6.75 9.75L3.75 12.75L0.75 9.75M3.75 12.75V0.75M8.25 3.75L11.25 0.75L14.25 3.75M11.25 0.75V12.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 16.498 15.7503" fill="none" className="h-[15px] w-4 shrink-0" aria-hidden>
      <path
        d="M6.74973 13.5C6.74967 13.6394 6.78844 13.776 6.8617 13.8946C6.93496 14.0131 7.03981 14.109 7.16448 14.1713L8.66448 14.9213C8.77885 14.9784 8.90594 15.0054 9.03366 14.9996C9.16139 14.9938 9.28552 14.9555 9.39425 14.8882C9.50299 14.8209 9.59273 14.727 9.65495 14.6153C9.71716 14.5036 9.74979 14.3779 9.74973 14.25V9C9.7499 8.62829 9.88808 8.26988 10.1375 7.99425L15.5547 2.0025C15.6518 1.89492 15.7157 1.76151 15.7386 1.61841C15.7614 1.47531 15.7424 1.32865 15.6837 1.19616C15.6249 1.06366 15.5291 0.951086 15.4077 0.872073C15.2864 0.79306 15.1447 0.750693 15 0.75H1.49973C1.35502 0.750693 1.21333 0.79306 1.09199 0.872073C0.970645 0.951086 0.874799 1.06366 0.816069 1.19616C0.757338 1.32865 0.73833 1.47531 0.761207 1.61841C0.784084 1.76151 0.847882 1.89492 0.944977 2.0025L6.36298 7.99425C6.61238 8.26988 6.75056 8.62829 6.75073 9L6.74973 13.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 18 18" fill="none" className="size-[18px] shrink-0" aria-hidden>
      <path
        d="M15.75 15.75L12.495 12.495M14.25 8.25C14.25 11.5637 11.5637 14.25 8.25 14.25C4.93629 14.25 2.25 11.5637 2.25 8.25C2.25 4.93629 4.93629 2.25 8.25 2.25C11.5637 2.25 14.25 4.93629 14.25 8.25Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SELECT_CLASS = "bg-transparent focus:outline-none [&>option]:bg-[#18022c]";

export default function SearchControls({
  state,
  onChange,
  filterOptions,
  sortOptions,
}: {
  state: SearchState;
  onChange: (state: SearchState) => void;
  filterOptions: string[];
  sortOptions: { value: SortKey; label: string }[];
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3">
      <label className={PILL_CLASS}>
        Sort By
        <select
          aria-label="Sort By"
          value={state.sort}
          onChange={(event) => onChange({ ...state, sort: event.target.value as SortKey })}
          className={SELECT_CLASS}
        >
          {sortOptions.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <SortIcon />
      </label>
      <label className={PILL_CLASS}>
        Filter
        <select
          aria-label="Filter"
          value={state.filter}
          onChange={(event) => onChange({ ...state, filter: event.target.value })}
          className={SELECT_CLASS}
        >
          <option value="All">All</option>
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <FilterIcon />
      </label>
      <label className={`${PILL_CLASS} w-full max-w-[410px] cursor-text`}>
        <input
          type="search"
          placeholder="Search"
          value={state.query}
          onChange={(event) => onChange({ ...state, query: event.target.value })}
          className="min-w-0 flex-1 bg-transparent text-center placeholder:text-[#e6edf4] focus:outline-none"
        />
        <SearchIcon />
      </label>
    </div>
  );
}
