"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef } from "react";
import { ArrowRightIcon, XIcon } from "@/assets/icons";
import { Icon } from "@/components/common";

export type TeamMember = {
  image: StaticImageData;
  imagePosition: string;
  name: string;
  role: string;
  credentials: string | null;
  bio: string;
};

export default function TeamMemberCard({ member }: { member: TeamMember }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <article
        tabIndex={0}
        className="group h-[400px] rounded-xl outline-none [perspective:1200px] focus-visible:ring-4 focus-visible:ring-brand/30"
      >
        <div className="relative h-full transition-transform duration-700 [transform-style:preserve-3d] group-focus-within:[transform:rotateY(180deg)] group-hover:[transform:rotateY(180deg)] motion-reduce:transition-none">
          <div className="absolute inset-0 [backface-visibility:hidden]">
            <Image
              src={member.image}
              alt={member.name}
              className={`h-80 w-full rounded-xl object-cover ${member.imagePosition}`}
              sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
              placeholder="blur"
            />
            <h3 className="mt-4 font-serif text-2xl font-bold">{member.name}</h3>
            <p className="text-sm font-bold text-brand">{member.role}</p>
          </div>
          <div className="absolute inset-0 flex flex-col rounded-xl border-t-4 border-brand bg-ink p-7 text-white [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-xs font-bold tracking-widest text-brand-light">{member.role}</p>
            <p className="mt-2 font-serif text-2xl font-bold">{member.name}</p>
            {member.credentials && <p className="mt-1 text-sm font-semibold text-white/50">{member.credentials}</p>}
            <span className="mt-4 h-[3px] w-10 shrink-0 bg-gold" />
            <p className="mt-4 line-clamp-5 leading-7 text-white/70">{member.bio}</p>
            <button
              type="button"
              onClick={() => dialogRef.current?.showModal()}
              className="mt-auto self-start pt-4 text-sm font-bold text-brand-light hover:text-white"
            >
              Read full bio <Icon icon={ArrowRightIcon} className="ml-1" />
            </button>
          </div>
        </div>
      </article>

      <dialog
        ref={dialogRef}
        aria-label={`${member.name} biography`}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        className="m-auto w-[min(640px,calc(100%-2.5rem))] rounded-2xl bg-white p-0 text-navy shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="relative p-6 sm:p-8">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close biography"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-xl text-slate-500 hover:bg-paper hover:text-navy"
          >
            <Icon icon={XIcon} />
          </button>
          <div className="flex items-center gap-5 pr-10">
            <Image
              src={member.image}
              alt=""
              className={`h-20 w-20 shrink-0 rounded-xl object-cover ${member.imagePosition}`}
              sizes="80px"
              placeholder="blur"
            />
            <div>
              <p className="text-xs font-bold tracking-widest text-brand">{member.role}</p>
              <h3 className="mt-1 font-serif text-2xl font-bold sm:text-3xl">{member.name}</h3>
              {member.credentials && <p className="mt-1 text-sm font-semibold text-slate-500">{member.credentials}</p>}
            </div>
          </div>
          <span className="mt-6 block h-[3px] w-10 bg-gold" />
          <p className="mt-6 leading-8 text-slate-600">{member.bio}</p>
        </div>
      </dialog>
    </>
  );
}
