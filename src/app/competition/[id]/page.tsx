import { notFound } from "next/navigation";
import BackLink from "@/components/BackLink";
import Background from "@/components/Background";
import Header from "@/components/Header";
import Mascot from "@/components/Mascot";
import {
  COMPETITIONS,
  findCompetition,
  guidebookPreviewUrl,
  timeRemaining,
} from "@/data/competitions";

export function generateStaticParams() {
  return COMPETITIONS.map(({ id }) => ({ id }));
}

const SURFACE_CLASS =
  "rounded-[20px] border-2 border-[#c6c6c6] bg-gradient-to-b from-[#16012b] to-[#262a50] shadow-[0_4px_10px_0_rgba(0,0,0,0.25)]";

const ACTION_CLASS = `${SURFACE_CLASS} inline-flex w-full items-center justify-center gap-2 bg-[#18022c] bg-none px-5 py-3 font-[family-name:var(--font-quicksand)] text-base font-bold tracking-[0.001em] text-[#e6edf4] transition-colors hover:bg-[#2a0451] sm:w-fit sm:px-6 sm:text-lg lg:px-8 lg:py-3.5 lg:text-2xl`;

function SendIcon() {
  return (
    <svg viewBox="0 0 27 27" fill="none" className="size-6 shrink-0 lg:size-[27px]" aria-hidden>
      <path
        d="M12.2778 14.7209C12.0628 14.5063 11.8065 14.3374 11.5245 14.2245L2.60325 10.647C2.49673 10.6043 2.40584 10.53 2.34277 10.4341C2.27969 10.3382 2.24746 10.2253 2.2504 10.1106C2.25334 9.99582 2.29131 9.88473 2.35921 9.79219C2.4271 9.69966 2.52168 9.63011 2.63025 9.59288L24.0052 2.28037C24.1049 2.24437 24.2128 2.2375 24.3163 2.26057C24.4197 2.28363 24.5144 2.33568 24.5894 2.41062C24.6643 2.48557 24.7164 2.5803 24.7394 2.68375C24.7625 2.78719 24.7556 2.89507 24.7196 2.99475L17.4071 24.3697C17.3699 24.4783 17.3003 24.5729 17.2078 24.6408C17.1153 24.7087 17.0042 24.7467 16.8894 24.7496C16.7747 24.7525 16.6618 24.7203 16.5659 24.6572C16.47 24.5942 16.3957 24.5033 16.353 24.3967L12.7755 15.4732C12.6621 15.1914 12.4928 14.9355 12.2778 14.7209ZM12.2778 14.7209L24.5858 2.41538"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-6 shrink-0 lg:size-[27px]" aria-hidden>
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="origin-center transition-transform group-open:rotate-180"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-4 shrink-0" aria-hidden>
      <path
        d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UploadZone({ name, label }: { name: string; label: string }) {
  return (
    <div className="rounded-[20px] bg-[linear-gradient(92.58deg,#c6c6c6_0.11%,#5e3786_100%)] p-4 sm:p-[30px]">
      <div className="relative flex h-[140px] flex-col items-center justify-center rounded-[20px] border border-[#c3c3c3] bg-white/10 sm:h-[180px] lg:h-[225px]">
        <span aria-hidden className="text-4xl leading-none text-[#17022c] sm:text-5xl lg:text-[76px]">
          +
        </span>
        <span className="mt-3 px-4 text-center text-xs text-[#17022c] sm:mt-4 sm:text-sm lg:text-xl">
          {label}
        </span>
        <input
          type="file"
          name={name}
          aria-label={label}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const competition = findCompetition(id);
  if (!competition) notFound();

  const submissionStatus = [
    { label: "Submission status", value: "Not submitted" },
    { label: "Requirements status", value: "Not graded" },
    { label: "Last modified", value: "Not modified yet" },
    { label: "Time remaining", value: timeRemaining(competition.dueAt) },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <Header />

      <main className="relative mx-auto flex w-[min(1551px,94%)] flex-col gap-6 pt-24 pb-16 sm:gap-8 sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-24">
        <BackLink href="/competition" label="Back to competitions" />

        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col items-start gap-2 sm:gap-3">
            <h1 className="text-2xl font-bold text-white uppercase sm:text-4xl md:text-5xl lg:text-[64px]">
              {competition.title}
            </h1>
            <span className="rounded-2xl border border-[#c6c6c6] bg-[#18022c] px-6 py-1.5 text-sm text-[#e6edf4] shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] sm:px-8 sm:py-2 sm:text-base lg:text-xl">
              {competition.status}
            </span>
          </div>
          <div className="flex items-center gap-6">
            <Mascot pose="happy" className="hidden w-56 lg:block" />
            <a
              href="#submission-status"
              className="rounded-[30px] border-2 border-[#c6c6c6] bg-[#18022c] px-6 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#2a0451] sm:px-9 sm:py-3 sm:text-base lg:border-[3px] lg:text-xl"
            >
              Check the Result here
            </a>
          </div>
        </div>

        <section className="flex flex-col gap-6 rounded-3xl border-2 border-[#c6c6c6] bg-gradient-to-b from-[#16012b] to-[#262a50] px-4 py-6 sm:gap-8 sm:rounded-[30px] sm:px-8 sm:py-8 lg:rounded-[60px] lg:border-4 lg:px-16 lg:py-12">
          <h2 className="text-center text-xl font-bold text-white sm:text-2xl lg:text-[39px]">
            About
          </h2>

          <p
            className={`${SURFACE_CLASS} px-5 py-4 text-center font-mono text-xs leading-relaxed tracking-[0.4px] text-[#e6edf4] sm:px-8 sm:py-6 sm:text-sm lg:text-xl`}
          >
            {competition.about}
          </p>

          <details className="group">
            <summary
              className={`${ACTION_CLASS} cursor-pointer list-none [&::-webkit-details-marker]:hidden`}
            >
              Open Guidebook
              <ChevronDownIcon />
            </summary>
            <div className={`${SURFACE_CLASS} mt-4 flex flex-col gap-3 p-3 sm:p-4`}>
              <iframe
                src={guidebookPreviewUrl(competition.guidebookUrl)}
                title="Guidebook preview"
                loading="lazy"
                className="h-[55vh] w-full rounded-xl border-0 bg-[#0f0120]"
              />
              <a
                href={competition.guidebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-end text-xs text-[#e6edf4] underline underline-offset-4 hover:no-underline sm:text-sm"
              >
                Open in new tab
                <ExternalLinkIcon />
              </a>
            </div>
          </details>

          <form className="flex flex-col gap-4">
            <button type="submit" className={ACTION_CLASS}>
              Submit Requirements
              <SendIcon />
            </button>
            <UploadZone name="requirements" label="Upload and drag the requirements here" />
          </form>

          <form className="flex flex-col gap-4">
            <button type="submit" className={ACTION_CLASS}>
              Submit Your Work
              <SendIcon />
            </button>
            <UploadZone name="work" label="Upload and drag your work here" />
          </form>

          <h2
            id="submission-status"
            className="scroll-mt-28 text-xl text-white sm:text-2xl lg:text-[39px]"
          >
            Submission Status
          </h2>

          <dl
            className={`${SURFACE_CLASS} mx-auto grid w-full max-w-[698px] grid-cols-[auto_1fr] gap-x-4 gap-y-2 px-5 py-4 text-xs text-[#e6edf4] sm:gap-y-3 sm:px-8 sm:py-6 sm:text-sm lg:gap-y-[18px] lg:text-[25px]`}
          >
            {submissionStatus.map(({ label, value }) => (
              <div key={label} className="contents">
                <dt>{label} :</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
    </div>
  );
}
