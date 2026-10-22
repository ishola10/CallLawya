"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { newsletterSchema } from "@/lib/validations";
import type { NewsletterValues } from "@/lib/validations";
import { Icon } from "@/components/common";
import { CircleCheckIcon } from "@/assets/icons";

export default function NewsletterForm() {
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = async ({ email }: NewsletterValues) => {
    setSubscribedEmail(email);
    reset();
  };

  if (subscribedEmail) {
    return (
      <div className="rounded bg-white p-5 text-navy" role="status">
        <p className="font-bold">
          <Icon icon={CircleCheckIcon} className="mr-2 text-brand" />
          You&apos;re subscribed.
        </p>
        <p className="mt-1 text-sm text-slate-500">The next legal briefing will arrive at {subscribedEmail}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex rounded bg-white p-2">
        <input
          type="email"
          placeholder="Your email address"
          aria-label="Email address"
          aria-invalid={!!errors.email}
          className="min-w-0 flex-1 px-4 text-navy outline-none"
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="press rounded bg-black px-6 py-3 font-bold disabled:opacity-60"
        >
          Subscribe
        </button>
      </div>
      {errors.email && <p className="mt-2 text-sm font-semibold text-white">{errors.email.message}</p>}
    </form>
  );
}
