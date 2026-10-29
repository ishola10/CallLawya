import { ArrowLeftIcon, CameraIcon, CheckIcon, UserIcon } from "@/assets/icons";
import { Icon } from "@/components/common";

const TIPS = ["Good, even lighting", "Face centred in the frame", "No hat or sunglasses"];

/** Illustration of the in-app selfie check, styled to match the CallLawya app. */
export default function FaceVerificationScreen() {
  return (
    <div
      className="flex h-full flex-col bg-white px-3.5 pb-4 pt-8 text-[#1e2b40] sm:px-5 sm:pb-6 sm:pt-12"
      role="img"
      aria-label="CallLawya app screen asking the lawyer to take a selfie for facial verification"
    >
      <Icon icon={ArrowLeftIcon} className="text-base sm:text-lg" />
      <p className="mt-3 text-[14px] font-bold leading-tight text-[#2d3e56] sm:mt-5 sm:text-[19px]">Verify your identity</p>
      <p className="mt-2 text-[9px] leading-[1.5] text-slate-500 sm:text-[11px] sm:leading-[1.55]">
        Take a quick selfie so we can confirm it&apos;s really you. This helps keep CallLawya safe for clients.
      </p>

      <div className="relative mx-auto mt-4 aspect-[3/4] w-[68%] sm:mt-6">
        <span className="animate-pulse-ring absolute inset-0 rounded-[50%] border-2 border-brand" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden rounded-[50%] border-[3px] border-brand bg-gradient-to-b from-slate-100 to-slate-200">
          <Icon icon={UserIcon} strokeWidth={1.1} className="absolute bottom-0 left-1/2 h-[78%] w-[78%] -translate-x-1/2 text-slate-300" />
          <span
            className="animate-scan absolute inset-x-3 h-[2px] rounded-full bg-brand shadow-[0_0_12px_3px_rgba(0,102,255,.45)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <ul className="mt-3 space-y-1 sm:mt-5 sm:space-y-1.5">
        {TIPS.map((tip) => (
          <li key={tip} className="flex items-center gap-1.5 text-[9px] text-slate-600 sm:gap-2 sm:text-[11px]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[9px] text-green-600">
              <Icon icon={CheckIcon} />
            </span>
            {tip}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#0b1b33] py-2 text-[11px] font-semibold text-white sm:rounded-2xl sm:py-3 sm:text-[13px]">
        <Icon icon={CameraIcon} /> Take selfie
      </div>
    </div>
  );
}
