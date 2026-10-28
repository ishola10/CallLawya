"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CircleCheckIcon, SendIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import { SUPPORT_ISSUES, supportRequestSchema } from "@/lib/validations";
import type { SupportRequestValues } from "@/lib/validations";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-semibold text-[#D92D20]">{message}</p>;
}

export default function SupportForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SupportRequestValues>({ resolver: zodResolver(supportRequestSchema) });

  const onSubmit = async (values: SupportRequestValues) => {
    setSendError(null);
    setSentTo(null);
    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: trapRef.current?.value ?? "" }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setSendError(result?.error ?? "We couldn't send your request. Please try again.");
        return;
      }
      setSentTo(values.email);
      reset();
    } catch {
      setSendError("We couldn't reach CallLawya. Check your connection and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-7 space-y-5">
      {sentTo && (
        <div className="rounded-md border border-green-200 bg-green-50 p-5" role="status">
          <p className="font-bold text-green-800">
            <Icon icon={CircleCheckIcon} className="mr-2" />
            Thanks! Your support request has been received.
          </p>
          <p className="mt-1 text-sm text-green-800/80">We&apos;ll get back to you at {sentTo} within 24 hours.</p>
        </div>
      )}
      {sendError && (
        <p className="rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-[#D92D20]" role="alert">
          {sendError}
        </p>
      )}
      <input
        ref={trapRef}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-bold">Full name</span>
          <input
            className="field"
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          <FieldError message={errors.fullName?.message} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-bold">Email address</span>
          <input
            type="email"
            className="field"
            placeholder="you@example.com"
            autoComplete="email"
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm font-bold">Issue type</span>
        <select className="field" aria-invalid={!!errors.issue} {...register("issue")}>
          <option value="">Select an issue type</option>
          {SUPPORT_ISSUES.map((issue) => (
            <option key={issue}>{issue}</option>
          ))}
        </select>
        <FieldError message={errors.issue?.message} />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-bold">Describe your issue</span>
        <textarea
          className="field h-36 resize-y"
          placeholder="Tell us what happened. For billing issues, include your transaction details."
          aria-invalid={!!errors.description}
          {...register("description")}
        />
        <FieldError message={errors.description?.message} />
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="press inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand py-4 text-lg font-bold text-white hover:bg-brand-hover disabled:opacity-60"
      >
        <Icon icon={SendIcon} /> {isSubmitting ? "Sending…" : "Send Request"}
      </button>
    </form>
  );
}
