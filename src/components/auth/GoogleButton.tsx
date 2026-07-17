export default function GoogleButton() {
  return (
    <button
      type="button"
      className="relative flex h-13 items-center justify-center gap-3 overflow-hidden rounded-3xl border border-[#ebe6f0]/25 bg-[#ebe6f0]/5 px-8 font-sans text-base font-bold tracking-[0.02em] text-[#e6edf4] transition-transform hover:scale-[1.02] hover:bg-[#ebe6f0]/10 active:scale-[0.98]"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path
          fill="#4285F4"
          d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3.01h3.88c2.27-2.09 3.54-5.17 3.54-8.66z"
        />
        <path
          fill="#34A853"
          d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3.01c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.92H1.3v3.1C3.26 21.3 7.31 24 12 24z"
        />
        <path fill="#FBBC05" d="M5.31 14.32A7.2 7.2 0 0 1 4.93 12c0-.8.14-1.58.38-2.32V6.58H1.3A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.3 5.42l4.01-3.1z" />
        <path
          fill="#EA4335"
          d="M12 4.75c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.94 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.3 6.58l4.01 3.1c.94-2.82 3.58-4.93 6.69-4.93z"
        />
      </svg>
      <span className="text-sm font-medium">Masuk dengan Google</span>
    </button>
  );
}
