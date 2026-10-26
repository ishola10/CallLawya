import Link from "next/link";
import { DotIcon, MapPinIcon, StarIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import { formatNaira } from "@/lib/utils";
import type { LawyerSummary } from "@/types/lawyer";
import BookButton from "./BookButton";
import LawyerAvatar from "./LawyerAvatar";

export function LawyerRating({ lawyer, className }: { lawyer: LawyerSummary; className?: string }) {
  if (lawyer.rating === null) return null;
  return (
    <span className={className}>
      <strong>{lawyer.rating.toFixed(1)}</strong> <Icon icon={StarIcon} className="fill-current text-gold" />{" "}
      <span className="text-slate-400">({lawyer.reviewCount})</span>
    </span>
  );
}

export function LawyerFee({ fee }: { fee: number | null }) {
  if (fee === null) return <span className="text-sm text-slate-500">Fee on request</span>;
  return (
    <strong>
      {formatNaira(fee)} <span className="text-xs font-normal text-slate-400">/ session</span>
    </strong>
  );
}

export default function LawyerCard({ lawyer }: { lawyer: LawyerSummary }) {
  const [primary, ...others] = lawyer.expertiseAreas;

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_38px_rgba(10,37,64,.14)]">
      <div className="relative">
        <LawyerAvatar
          src={lawyer.avatar}
          name={lawyer.name}
          initials={lawyer.initials}
          className="aspect-square w-full"
          initialsClassName="text-6xl"
          sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 100vw"
        />
        {others.length > 0 && (
          <div className="absolute inset-x-4 bottom-4 translate-y-2 rounded bg-black/85 p-3 text-xs text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            Also: {others.join(" · ")}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          {primary && <span className="text-[10px] font-bold uppercase text-brand">{primary}</span>}
          {lawyer.isAvailable && (
            <span className="ml-auto shrink-0 whitespace-nowrap rounded-full bg-green-50 px-2.5 py-0.5 text-[10px] font-bold text-green-700">
              <Icon icon={DotIcon} className="mr-1 text-[7px] text-green-500" /> AVAILABLE
            </span>
          )}
        </div>
        <h3 className="mt-1 font-serif text-2xl font-bold">{lawyer.name}</h3>
        {lawyer.location && (
          <p className="mt-1 text-sm text-slate-500">
            <Icon icon={MapPinIcon} className="mr-1.5 text-slate-400" />
            {lawyer.location}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-sm">
          <LawyerRating lawyer={lawyer} />
          <span className="ml-auto">
            <LawyerFee fee={lawyer.fee} />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <BookButton className="press rounded-md bg-brand py-3 text-center font-bold text-white hover:bg-brand-hover">
            Book
          </BookButton>
          <Link
            href={`/lawyers/${lawyer.id}`}
            className="press rounded-md border border-slate-300 py-3 text-center font-bold hover:border-brand hover:text-brand"
          >
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}
