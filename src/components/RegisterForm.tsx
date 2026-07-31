"use client";

import Mascot from './Mascot';
import { useState } from 'react';
import AuthButton from './auth/AuthButton';

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
    "KMTETI Hackathon 2026"
];

export default function RegisterForm() {
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const totalPages = Math.ceil(COURSES.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentCourses = COURSES.slice(startIndex, startIndex + itemsPerPage);

    const toggleCourse = (course: string) => {
        setSelectedCourses(prev =>
            prev.includes(course)
                ? prev.filter(c => c !== course)
                : [...prev, course]
        );
    };

    return (
        <section className="w-full max-w-[460px] mx-auto bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-10 flex flex-col items-center relative shadow-2xl">
            <div className="absolute -left-[250px] -top-[80px] scale-[0.55] z-50">
                <Mascot pose="happy" tilt={-15} />
            </div>

            <h1 className="text-sm sm:text-base font-bold tracking-[0.1em] mb-4 text-white relative z-10 text-center uppercase">
                CHOOSE THE COURSE/COMPETITION
            </h1>

            <div className="flex gap-3 mb-6 relative z-10 w-full justify-center">
                <button className="bg-black/30 px-5 py-1.5 rounded-full text-[9px] text-gray-200 flex items-center gap-2 border border-white/10 hover:bg-black/50 transition-colors">
                    Sort By <span className="text-[7px]">▼</span>
                </button>
                <button className="bg-black/30 px-5 py-1.5 rounded-full text-[9px] text-gray-200 flex items-center gap-2 border border-white/10 hover:bg-black/50 transition-colors">
                    Filter <span className="text-[7px]">▼</span>
                </button>
                <button className="bg-black/30 px-6 py-1.5 rounded-full text-[9px] text-gray-200 flex items-center gap-2 border border-white/10 hover:bg-black/50 transition-colors">
                    Search <span>⚲</span>
                </button>
            </div>

            <div className="w-full relative z-10 min-h-[380px]">
                {currentCourses.map(course => (
                    <div
                        key={course}
                        onClick={() => toggleCourse(course)}
                        className="w-full flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-4 mb-4 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                        <span className="text-xs font-semibold text-white tracking-wide">{course}</span>
                        <div className={`w-5 h-5 rounded-md border-2 border-white flex items-center justify-center transition-colors ${selectedCourses.includes(course) ? 'bg-white' : 'bg-transparent'}`}>
                            {selectedCourses.includes(course) && (
                                <svg className="w-4 h-4 text-[#1c0f3e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full flex justify-between items-center mt-4 relative z-10">
                {currentPage > 1 ? (
                    <button
                        onClick={() => setCurrentPage(p => p - 1)}
                        className="flex h-12 items-center justify-center rounded-xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-8 font-mono text-[10px] font-bold tracking-wider text-[#ebe6f0] transition-transform hover:scale-105 relative z-10"
                    >
                        BACK
                    </button>

                ) : (
                    <div className="w-[84px]"></div>
                )}

                <button
                    disabled={selectedCourses.length === 0}
                    className={`flex h-10 items-center justify-center rounded-xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-10 font-mono text-xs font-bold tracking-[0.1em] text-[#ebe6f0] transition-all relative z-10 ${selectedCourses.length === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 shadow-[0_0_15px_rgba(30,3,57,0.5)]'}`}
                >
                    SUBMIT
                </button>


                {currentPage < totalPages ? (
                    <button
                        onClick={() => setCurrentPage(p => p + 1)}
                        className="flex h-12 items-center justify-center rounded-xl border-[1.2px] border-[#ebe6f0] bg-[#1e0339] px-8 font-mono text-[10px] font-bold tracking-wider text-[#ebe6f0] transition-transform hover:scale-105 relative z-10"
                    >
                        NEXT
                    </button>
                ) : (
                    <div className="w-[84px]"></div>
                )}
            </div>
        </section>
    );
}
