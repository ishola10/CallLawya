import { ArrowLeftIcon, CameraIcon, CheckIcon, UserIcon } from "@/assets/icons";
import { Icon } from "@/components/common";

const TIPS = ["Good, even lighting", "Face centred in the frame", "No hat or sunglasses"];

/** Illustration of the in-app selfie check, styled to match the CallLawya app. */
export default function FaceVerificationScreen() {
  return (
    <div
      className="flex h-full flex-col bg-white px-5 pb-6 pt-12 text-[#1e2b40]"
      role="img"
      aria-label="CallLawya app screen asking the lawyer to take a selfie for facial verification"
    >
      <Icon icon={ArrowLeftIcon} className="text-lg" />
      <p className="mt-5 text-[19px] font-bold leading-tight text-[#2d3e56]">Verify your identity</p>
      <p className="mt-2 text-[11px] leading-[1.55] text-slate-500">
        Take a quick selfie so we can confirm it&apos;s really you. This helps keep CallLawya safe for clients.
      </p>

      <div className="relative mx-auto mt-6 aspect-[3/4] w-[68%]">
        <span className="animate-pulse-ring absolute inset-0 rounded-[50%] border-2 border-brand" aria-hidden="true" />
        <div className="absolute inset-0 overflow-hidden rounded-[50%] border-[3px] border-brand bg-gradient-to-b from-slate-100 to-slate-200">
          <Icon icon={UserIcon} strokeWidth={1.1} className="absolute bottom-0 left-1/2 h-[78%] w-[78%] -translate-x-1/2 text-slate-300" />
          <span
            className="animate-scan absolute inset-x-3 h-[2px] rounded-full bg-brand shadow-[0_0_12px_3px_rgba(0,102,255,.45)]"
            aria-hidden="true"
          />
        </div>
      </div>

      <ul className="mt-5 space-y-1.5">
        {TIPS.map((tip) => (
          <li key={tip} className="flex items-center gap-2 text-[11px] text-slate-600">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 text-[9px] text-green-600">
              <Icon icon={CheckIcon} />
            </span>
            {tip}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-center gap-2 rounded-2xl bg-[#0b1b33] py-3 text-[13px] font-semibold text-white">
        <Icon icon={CameraIcon} /> Take selfie
      </div>
    </div>
  );
}
