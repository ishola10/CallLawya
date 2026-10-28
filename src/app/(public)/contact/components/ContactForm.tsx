"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ROUTES } from "@/constants";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { CONTACT_SUBJECTS, contactFormSchema } from "@/lib/validations";
import type { ContactFormValues } from "@/lib/validations";
import { Icon } from "@/components/common";
import { ArrowRightIcon, CircleCheckIcon, MailIcon } from "@/assets/icons";

const isSubject = (value: unknown): value is ContactFormValues["subject"] =>
  CONTACT_SUBJECTS.includes(value as ContactFormValues["subject"]);

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-semibold text-[#D92D20]">{message}</p>;
}

export default function ContactForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [sendError, setSendError] = useState<string | null>(null);
  const trapRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { consent: false },
  });

  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject");
    if (isSubject(subject)) setValue("subject", subject);
  }, [setValue]);

  const onSubmit = async (values: ContactFormValues) => {
    setSendError(null);
    setSentTo(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: trapRef.current?.value ?? "" }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (!response.ok) {
        setSendError(result?.error ?? "We couldn't send your message. Please try again.");
        return;
      }
      setSentTo(values.email);
      reset();
    } catch {
      setSendError("We couldn't reach CallLawya. Check your connection and try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm md:p-10"
    >
      <div className="flex items-center justify-between border-b border-slate-200 pb-6">
        <div>
          <p className="text-xs font-bold tracking-widest text-brand">SEND A MESSAGE</p>
          <h2 className="mt-2 font-serif text-3xl font-bold md:text-4xl">How can we help?</h2>
        </div>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-mist text-brand">
          <Icon icon={MailIcon} className="text-xl" />
        </span>
      </div>

      {sentTo && (
        <div className="mt-7 rounded-md border border-brand/30 bg-brand-mist p-5" role="status">
          <p className="font-bold">
            <Icon icon={CircleCheckIcon} className="mr-2 text-brand" />
            Thanks — your message has been sent.
          </p>
          <p className="mt-1 text-sm text-slate-600">We&apos;ll reply to {sentTo} as soon as possible.</p>
        </div>
      )}
      {sendError && (
        <p className="mt-7 rounded-md border border-red-200 bg-red-50 p-4 text-sm font-semibold text-[#D92D20]" role="alert">
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

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label>
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
        <label>
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
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-bold">What can we help with?</span>
        <select className="field" aria-invalid={!!errors.subject} {...register("subject")}>
          <option value="">Select a subject</option>
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
        <FieldError message={errors.subject?.message} />
      </label>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-bold">Message</span>
        <textarea
          className="field h-40 resize-none"
          placeholder="Tell us a little more..."
          aria-invalid={!!errors.message}
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </label>
      <label className="mt-5 flex items-start gap-3 text-sm text-slate-500">
        <input type="checkbox" className="mt-1 accent-brand" {...register("consent")} />
        <span>
          I agree that CallLawya may use this information to respond to my enquiry, as described in our{" "}
          <Link href={ROUTES.privacy} className="font-semibold text-brand underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>
      <FieldError message={errors.consent?.message} />
      <button
        type="submit"
        disabled={isSubmitting}
        className="press mt-7 w-full rounded-md bg-brand py-4 text-lg font-bold text-white hover:bg-brand-hover disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Send Message"} <Icon icon={ArrowRightIcon} className="ml-2" />
      </button>
    </form>
  );
}
