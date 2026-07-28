"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AccountShell, { PRIMARY_BUTTON_CLASS } from "@/components/AccountShell";
import SearchControls, { type SearchState } from "@/components/SearchControls";

const COURSES = [
  "TETI Programming Week - CTF",
  "TETI Programming Week - Innovation",
  "Bootcamp - Artificial Intelligence",
  "Pelatihan Genap - STM32",
  "Pelatihan Genap - Web Development II",
];

const CATEGORIES = [...new Set(COURSES.map((course) => course.split(" - ")[0]))];

const SORT_OPTIONS = [{ value: "title" as const, label: "Title" }];

const ROW_BACKGROUND =
  "radial-gradient(60% 580% at 38% 0%, rgba(94,55,134,0.25) 0%, rgba(66,30,104,0.25) 50%, rgba(52,17,89,0.25) 75%, rgba(38,4,74,0.25) 100%)";

export default function CourseRegistrationPage() {
  const [search, setSearch] = useState<SearchState>({ query: "", filter: "All", sort: "title" });

  const visible = useMemo(() => {
    const needle = search.query.trim().toLowerCase();
    return COURSES.filter(
      (course) =>
        (search.filter === "All" || course.startsWith(search.filter)) &&
        course.toLowerCase().includes(needle),
    ).sort((a, b) => a.localeCompare(b));
  }, [search]);

  return (
    <AccountShell
      userName="JOHN DOE!"
      tagline="Lorem ipsum dolor sit amet"
      title="CHOOSE THE COURSE/COMPETITION"
      back={{ href: "/competition", label: "Back to competitions" }}
    >
      <form className="mt-8 flex flex-col items-center gap-8 lg:mt-12">
        <SearchControls
          state={search}
          onChange={setSearch}
          filterOptions={CATEGORIES}
          sortOptions={SORT_OPTIONS}
        />

        <ul className="flex w-full flex-col gap-5 lg:gap-[70px]">
          {visible.map((course) => (
            <li key={course}>
              <label
                className="flex cursor-pointer items-center justify-between gap-4 rounded-3xl border-2 border-[#c6c6c6] px-5 py-5 shadow-[0_0_72px_24px_rgba(49,5,95,0.5)] lg:h-[167px] lg:border-4 lg:px-11"
                style={{ background: ROW_BACKGROUND }}
              >
                <span className="text-lg font-semibold text-[#e6edf4] sm:text-2xl lg:text-[49px]">
                  {course}
                </span>
                <input
                  type="checkbox"
                  name="courses"
                  value={course}
                  className="size-12 shrink-0 cursor-pointer appearance-none rounded-[20px] bg-white checked:border-8 checked:border-white checked:bg-[#5e3786] lg:size-[78px] lg:checked:border-[14px]"
                />
              </label>
            </li>
          ))}
          {visible.length === 0 && (
            <li className="py-16 text-center text-xl text-[#e6edf4]">No courses found.</li>
          )}
        </ul>

        <Link
          href="/register/payment"
          className={`${PRIMARY_BUTTON_CLASS} w-full max-w-md text-xl sm:w-auto sm:text-3xl lg:h-[97px] lg:w-[597px] lg:text-[61px]`}
        >
          SUBMIT
        </Link>
      </form>
    </AccountShell>
  );
}
