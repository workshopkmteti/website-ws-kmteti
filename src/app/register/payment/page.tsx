import AccountShell, { PRIMARY_BUTTON_CLASS } from "@/components/AccountShell";

export default function PaymentPage() {
  return (
    <AccountShell
      userName="JOHN DOE!"
      tagline="Lorem ipsum dolor sit amet"
      title="PAYMENT"
      back={{ href: "/register/courses", label: "Back to course selection" }}
    >
      <form className="mt-8 flex flex-col items-center gap-10 lg:mt-12">
        <div
          aria-hidden
          className="aspect-square w-full max-w-[1022px] rounded-[20px] bg-[#d9d9d9]"
        />

        <div className="w-full max-w-[1022px] overflow-hidden rounded-[20px] bg-[#d9d9d9]">
          <p
            className={`${PRIMARY_BUTTON_CLASS} rounded-none text-lg sm:text-2xl lg:text-[39px]`}
          >
            UPLOAD THE PROOFING PAYMENT
          </p>
          <div className="p-[30px] pt-[22px]">
            <div className="relative flex h-[180px] flex-col items-center justify-center rounded-[20px] border border-[#c3c3c3] bg-[#d9d9d9] lg:h-[225px]">
              <span aria-hidden className="text-5xl leading-none text-[rgba(1,29,62,0.36)] lg:text-[76px]">
                +
              </span>
              <span className="mt-4 text-center text-sm text-[rgba(1,29,62,0.36)] lg:text-xl">
                Upload or drag the proof here
              </span>
              {/* ponytail: accept only narrows the picker — the 1 MB cap must also be enforced in the Server Action */}
              <input
                type="file"
                name="proof"
                accept="image/*"
                aria-label="Upload or drag the proof here"
                className="absolute inset-0 cursor-pointer opacity-0"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`${PRIMARY_BUTTON_CLASS} w-full max-w-md text-xl sm:w-auto sm:text-3xl lg:h-[97px] lg:w-[597px] lg:text-[61px]`}
        >
          SUBMIT
        </button>
      </form>
    </AccountShell>
  );
}
