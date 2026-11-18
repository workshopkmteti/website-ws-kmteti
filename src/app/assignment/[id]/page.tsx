
"use client";

import { useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Background from "@/components/Background";
import Logo from "@/components/LogoUpright";
import { dummyAssignments } from "@/data/assignment";
import Mascot from "@/components/Mascot";

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M4 16v4h16v-4" />
    </svg>
  );
}

function StatusRow({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 py-2.5 ${
        last ? "" : "border-b border-white/10"
      }`}
    >
      <span className="text-sm text-[#A99AB8] sm:text-base">
        {label}
      </span>
      <span className="text-right text-sm text-[#E0D7E8] sm:text-base">
        {value}
      </span>
    </div>
  );
}

export default function AssignmentDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const assignment = dummyAssignments.find(
    (item) => item.id === Number(params.id)
  );

  if (!assignment) {
    return (
      <main className="relative flex min-h-screen items-center justify-center bg-[#17022C] px-5 text-white">
        <Background />
        <div className="relative z-10 text-center">
          <h1 className="text-2xl font-bold">Assignment not found</h1>
          <button
            onClick={() => router.push("/assignment")}
            className="mt-4 rounded-xl border border-[#5E3786] px-5 py-2 text-sm transition hover:bg-white/10"
          >
            Back to Assignments
          </button>
        </div>
      </main>
    );
  }

  const handleSubmit = () => {
    if (!selectedFile) {
      setSubmissionMessage("Please select a file before submitting.");
      return;
    }

    setSubmissionMessage(
      "File selected. Connect a backend to complete the submission."
    );
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#17022C] text-white">
      <Background />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 py-6 sm:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex h-14 items-center justify-center rounded-2xl border border-[#C6C6C6]/30 bg-[#2A3559]/40 px-5 backdrop-blur-md">
          <Logo className="h-auto w-[112px] max-w-full" />
        </header>

        {/* Back button */}
        <button
          onClick={() => router.push("/assignment")}
          className="mb-7 flex items-center gap-2 text-sm text-[#A99AB8] transition hover:text-white sm:text-base"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
            <path d="M9 12h12" />
          </svg>
          Back to Assignments
        </button>

        {/* Assignment title and grade */}
        <section className="mb-8 mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-5 sm:grid-cols-[minmax(0,1fr)_190px] sm:gap-7">
          <div className="min-w-0 sm:pl-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-[44px]">
              {assignment.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {/* Opened at */}
              <div className="w-fit max-w-full rounded-2xl border border-[#5E3786] bg-gradient-to-r from-[#17022C] to-[#2A3559] px-4 py-2 shadow-[0_4px_10px_rgba(0,0,0,0.18)]">
                <p className="text-xs leading-4 text-[#A99AB8] sm:text-sm">
                  Opened at
                </p>
                <p className="text-sm leading-5 text-[#E0D7E8] sm:text-base">
                  {assignment.openedAt}
                </p>
              </div>

              {/* Due date */}
              <div className="w-fit max-w-full rounded-2xl border border-[#5E3786] bg-gradient-to-r from-[#17022C] to-[#2A3559] px-5 py-2 shadow-[0_4px_10px_rgba(0,0,0,0.25)]">
                <p className="text-xs leading-4 text-[#A99AB8] sm:text-sm">
                  Due date
                </p>
                <p className="text-sm leading-5 text-[#E0D7E8] sm:text-base">
                  {assignment.dueDate}
                </p>
              </div>
            </div>
          </div>

          {/* Grade */}
          <div className="flex min-h-[145px] w-full flex-col items-center justify-center rounded-[26px] border border-[#5E3786] bg-gradient-to-b from-[#17022C] to-[#2A3559] px-5 py-5 shadow-[0_4px_10px_rgba(0,0,0,0.18)] sm:min-h-[160px]">
            <p className="text-sm tracking-[0.2em] text-[#D8D0E0] sm:text-base">
              GRADE
            </p>
            <p className="mt-1 text-5xl font-bold leading-none text-white">
              {assignment.grade || "XX"}
            </p>
          </div>
        </section>

        {/* Main content */}
<section className="relative mx-auto w-full max-w-[1200px] rounded-[24px] border border-[#C6C6C6]/70 bg-gradient-to-br from-[#17022C]/90 via-[#241637]/95 to-[#2A3559]/95 p-4 shadow-[0_4px_10px_rgba(0,0,0,0.18)] sm:p-6 lg:p-7">

        {/* Mascot */}
        <div className="absolute left-[68%] top-0 z-20 h-24 w-24 -translate-x-1/2 -translate-y-1/2 sm:h-68 sm:w-68">
        <Mascot pose="happy" className="!h-full !w-full" />
                  </div>
    
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8">
            {/* Left column */}
            <div className="min-w-0">
              {/* Instructions */}
              <section>
                <h2 className="mb-3 text-xl font-semibold sm:text-2xl">
                  Assignment Instructions
                </h2>

                <div className="rounded-2xl border border-[#5E3786] bg-[#17022C]/60 px-4 py-3 sm:px-5">
                  <p className="text-sm leading-6 text-[#D0C4D9] sm:text-base">
                    {assignment.instruction}
                  </p>
                </div>
              </section>

              {/* Assignment file */}
              <section className="mt-5">
                <h3 className="mb-2 text-base font-medium text-white sm:text-lg">
                  Assignment File
                </h3>

                {assignment.attachmentUrl ? (
                  <a
                    href={assignment.attachmentUrl}
                    download
                    className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#5E3786] bg-[#17022C]/50 px-4 py-2 text-sm text-[#E0D7E8] transition hover:bg-[#5E3786]/25"
                  >
                    <DownloadIcon />
                    Download File
                  </a>
                ) : (
                  <div className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#5E3786]/70 bg-[#17022C]/40 px-4 py-2 text-sm text-[#8F7E9E]">
                    <DownloadIcon />
                    Assignment File Not Available
                  </div>
                )}
              </section>

              {/* Submit work */}
              <section className="mt-6">
                <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
                  Submit Your Work
                </h2>

                <p className="mb-4 text-sm text-[#A99AB8] sm:text-base">
                  Select your completed assignment file below.
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setSelectedFile(file);
                    setSubmissionMessage("");
                  }}
                />

                {/* Upload area */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    const file = event.dataTransfer.files?.[0] ?? null;
                    if (file) {
                      setSelectedFile(file);
                      setSubmissionMessage("");
                    }
                  }}
                  className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-2xl border border-[#C6C6C6]/70 bg-gradient-to-r from-[#C6B4CE] to-[#5E3786] px-5 py-6 text-center text-white transition hover:brightness-105 sm:min-h-[170px]"
                >
                  <UploadIcon />

                  {selectedFile ? (
                    <>
                      <span className="mt-3 max-w-full break-all text-sm font-medium sm:text-base">
                        {selectedFile.name}
                      </span>
                      <span className="mt-1 text-xs text-white/75">
                        Click to choose another file
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="mt-3 text-sm font-medium sm:text-base">
                        Upload and drag your work here
                      </span>
                      <span className="mt-1 text-xs text-white/70 sm:text-sm">
                        or click to browse your files
                      </span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!selectedFile}
                  className="mt-4 rounded-xl border border-[#5E3786] bg-[#2A3559]/65 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5E3786]/40 disabled:cursor-not-allowed disabled:border-[#5E3786]/50 disabled:bg-[#2A3559]/35 disabled:text-[#A99AB8] sm:text-base"
                >
                  Submit Your Work
                </button>

                {submissionMessage && (
                  <p className="mt-3 text-sm text-[#D0C4D9]" role="status">
                    {submissionMessage}
                  </p>
                )}
              </section>

              {/* Submission status — centered under Submit Your Work */}
              <section className="mt-8">
                <h2 className="mb-3 text-center text-xl font-semibold sm:text-2xl">
                  Submission Status
                </h2>

                <div className="mx-auto w-full max-w-[460px] rounded-2xl border border-[#C6C6C6]/60 bg-gradient-to-br from-[#17022C]/85 to-[#2A3559]/75 px-4 py-2 shadow-[0_4px_10px_rgba(0,0,0,0.18)] sm:px-5">
                  <StatusRow
                    label="Submission status"
                    value={assignment.submissionStatus}
                  />
                  <StatusRow
                    label="Grade status"
                    value={assignment.gradeStatus}
                  />
                  <StatusRow
                    label="Last modified"
                    value={assignment.lastModified}
                  />
                  <StatusRow
                    label="Time remaining"
                    value={assignment.timeRemaining}
                    last
                  />
                </div>
              </section>
              {/* Right column: Feedback */}
<section className="min-w-0">
  <h2 className="mb-3 text-center text-xl font-semibold sm:text-2xl">
    Feedback
  </h2>

  <div className="mx-auto w-full max-w-[460px] rounded-2xl border border-[#C6C6C6]/60 bg-gradient-to-br from-[#17022C]/85 to-[#2A3559]/75 px-4 py-2 shadow-[0_4px_10px_rgba(0,0,0,0.18)] sm:px-5">
    <StatusRow
      label="Grade on"
      value={assignment.feedback.gradeOn}
    />
    <StatusRow
      label="Grade by"
      value={assignment.feedback.gradeBy}
      last
    />
  </div>
</section>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
