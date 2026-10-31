"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CircleCheckIcon,
  ImagePlusIcon,
  InfoIcon,
  PenLineIcon,
  SendIcon,
  TrashIcon,
  XIcon,
} from "@/assets/icons";
import { ArticleBody } from "@/components/articles";
import { Icon } from "@/components/common";
import { ROUTES } from "@/constants";
import { compressImage } from "@/lib/articles/image";
import { ArticleStorageFullError, blobToDataUrl, saveArticle } from "@/lib/articles/store";
import { cn } from "@/lib/utils";
import { ARTICLE_CATEGORIES, COVER_TYPES, MAX_COVER_BYTES, articleSchema, normalizeScn, parseTags } from "@/lib/validations";
import type { ArticleValues } from "@/lib/validations";
import type { Article } from "@/types/article";

const DRAFT_KEY = "calllawya:article-draft";

const EMPTY_ARTICLE = {
  title: "",
  authorName: "",
  authorScn: "",
  authorRole: "",
  excerpt: "",
  body: "",
  tags: "",
  confirmed: false,
};

const COVER_REQUIRED = "Add a cover image for your article.";

const STEPS = [
  { id: "write", label: "Write" },
  { id: "preview", label: "Preview" },
  { id: "published", label: "Post" },
] as const;

type Step = (typeof STEPS)[number]["id"];

const GUIDELINES = [
  "Write in plain language for people without legal training.",
  "Explain general principles. Avoid advising on a specific person's case.",
  "Use headings and bullet points to make the article easy to scan.",
  "Only use images you own or have permission to publish.",
];

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-2 text-sm font-semibold text-[#D92D20]">{message}</p>;
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export default function ArticleComposer() {
  const [step, setStep] = useState<Step>("write");
  const [cover, setCover] = useState<{ url: string; blob: Blob; name: string } | null>(null);
  const [coverError, setCoverError] = useState<string | null>(null);
  const [draftSaved, setDraftSaved] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState<string | null>(null);
  const [published, setPublished] = useState<Article | null>(null);
  const [processingCover, setProcessingCover] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const form = useForm<ArticleValues>({
    resolver: zodResolver(articleSchema),
    defaultValues: EMPTY_ARTICLE,
    mode: "onTouched",
  });
  const { register, handleSubmit, reset, watch, formState } = form;
  const { errors } = formState;
  const values = watch();

  useEffect(() => {
    const saved = window.localStorage.getItem(DRAFT_KEY);
    if (!saved) return;
    try {
      reset({ ...EMPTY_ARTICLE, ...JSON.parse(saved), confirmed: false });
    } catch {
      window.localStorage.removeItem(DRAFT_KEY);
    }
  }, [reset]);

  useEffect(() => {
    const subscription = watch((current) => {
      const { confirmed: _confirmed, ...draft } = current;
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      setDraftSaved(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!cover) return;
    return () => URL.revokeObjectURL(cover.url);
  }, [cover]);

  const words = countWords(values.body ?? "");
  const readMinutes = Math.max(1, Math.round(words / 200));
  const tags = parseTags(values.tags);

  const goTo = (next: Step) => {
    setStep(next);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCover = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!COVER_TYPES.includes(file.type)) {
      setCoverError("Upload a JPG, PNG or WebP image.");
      return;
    }
    if (file.size > MAX_COVER_BYTES) {
      setCoverError("The image must be 2 MB or smaller.");
      return;
    }
    setCoverError(null);
    setProcessingCover(true);
    compressImage(file)
      .then((blob) => setCover({ url: URL.createObjectURL(blob), blob, name: file.name }))
      .catch(() => setCoverError("We couldn't read that image. Try a different file."))
      .finally(() => setProcessingCover(false));
  };

  const clearDraft = () => {
    reset(EMPTY_ARTICLE);
    setCover(null);
    window.localStorage.removeItem(DRAFT_KEY);
    setDraftSaved(false);
  };

  const publish = async () => {
    if (!cover) {
      setCoverError(COVER_REQUIRED);
      goTo("write");
      return;
    }
    setPublishing(true);
    setPublishError(null);
    try {
      const article = saveArticle({
        title: values.title.trim(),
        category: values.category,
        authorName: values.authorName.trim(),
        authorScn: normalizeScn(values.authorScn),
        authorRole: values.authorRole?.trim() || null,
        excerpt: values.excerpt.trim(),
        body: values.body.trim(),
        tags,
        cover: await blobToDataUrl(cover.blob),
        readMinutes,
      });
      window.localStorage.removeItem(DRAFT_KEY);
      setPublished(article);
      goTo("published");
    } catch (error) {
      setPublishError(
        error instanceof ArticleStorageFullError
          ? "There isn't enough storage space in this browser. Try a smaller cover image."
          : "We couldn't post your article. Please try again.",
      );
    } finally {
      setPublishing(false);
    }
  };

  const startNew = () => {
    clearDraft();
    setPublished(null);
    goTo("write");
  };

  const stepIndex = STEPS.findIndex((item) => item.id === step);

  return (
    <div ref={topRef} className="scroll-mt-24 bg-paper">
      <section className="page-x bg-ink pb-10 pt-12 text-white">
        <Link
          href={ROUTES.articles}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white"
        >
          <Icon icon={ArrowLeftIcon} /> All articles
        </Link>
        <p className="eyebrow mt-6 text-brand-light">CallLawya Newsroom</p>
        <h1 className="mt-3 font-serif text-[40px] font-bold leading-none sm:text-5xl md:text-6xl">Post an article</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-white/65">
          Share practical legal guidance that helps people understand their rights and take the next step.
        </p>
        <ol className="mt-8 flex flex-wrap gap-3" aria-label="Progress">
          {STEPS.map((item, index) => (
            <li
              key={item.id}
              aria-current={item.id === step ? "step" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-semibold",
                index === stepIndex
                  ? "border-brand bg-brand text-white"
                  : index < stepIndex
                    ? "border-white/30 text-white"
                    : "border-white/15 text-white/45",
              )}
            >
              <span
                className={cn(
                  "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                  index < stepIndex ? "bg-gold text-black" : "bg-white/15",
                )}
              >
                {index < stepIndex ? <Icon icon={CheckIcon} /> : index + 1}
              </span>
              {item.label}
            </li>
          ))}
        </ol>
      </section>

      {step === "write" && (
        <section className="page-x section-y">
          <form
            onSubmit={handleSubmit(
              () => {
                if (!cover) {
                  setCoverError(COVER_REQUIRED);
                  return;
                }
                goTo("preview");
              },
              () => {
                if (!cover) setCoverError(COVER_REQUIRED);
              },
            )}
            noValidate
            className="grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-10"
          >
            <div className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 md:p-8">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">Title</span>
                <input
                  className="field text-lg font-semibold"
                  placeholder="e.g. Five documents to check before buying land"
                  aria-invalid={!!errors.title}
                  {...register("title")}
                />
                <FieldError message={errors.title?.message} />
              </label>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Category</span>
                  <select className="field" aria-invalid={!!errors.category} {...register("category")}>
                    <option value="">Choose a category</option>
                    {ARTICLE_CATEGORIES.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                  <FieldError message={errors.category?.message} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Tags <span className="font-normal text-slate-400">(optional)</span></span>
                  <input className="field" placeholder="tenancy, contracts, Lagos" {...register("tags")} />
                  <p className="mt-2 text-xs text-slate-500">Separate tags with commas. Up to 6.</p>
                </label>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Author name</span>
                  <input
                    className="field"
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={!!errors.authorName}
                    {...register("authorName")}
                  />
                  <FieldError message={errors.authorName?.message} />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-bold">Supreme Court Number (SCN)</span>
                  <input
                    className="field uppercase placeholder:normal-case"
                    placeholder="e.g. SCN123456"
                    autoComplete="off"
                    spellCheck={false}
                    aria-invalid={!!errors.authorScn}
                    aria-describedby="author-scn-hint"
                    {...register("authorScn")}
                  />
                  <FieldError message={errors.authorScn?.message} />
                  <p id="author-scn-hint" className="mt-2 text-xs text-slate-500">
                    Used only to verify you&apos;re a licensed lawyer. It isn&apos;t shown on your article.
                  </p>
                </label>
                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-bold">
                    Author title <span className="font-normal text-slate-400">(optional)</span>
                  </span>
                  <input className="field" placeholder="e.g. Property lawyer, Lagos" {...register("authorRole")} />
                  <FieldError message={errors.authorRole?.message} />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 flex justify-between text-sm font-bold">
                  Summary
                  <span className="font-normal text-slate-400">{(values.excerpt ?? "").length}/240</span>
                </span>
                <textarea
                  className="field h-28 resize-none"
                  placeholder="One or two sentences that tell readers what they will learn."
                  aria-invalid={!!errors.excerpt}
                  {...register("excerpt")}
                />
                <FieldError message={errors.excerpt?.message} />
              </label>

              <div>
                <span className="mb-2 block text-sm font-bold">
                  Cover image
                </span>
                {cover ? (
                  <div className="relative overflow-hidden rounded-lg border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local preview of an unsaved upload */}
                    <img src={cover.url} alt="Cover preview" className="h-56 w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setCover(null)}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
                      aria-label="Remove cover image"
                    >
                      <Icon icon={XIcon} />
                    </button>
                    <p className="truncate border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-500">{cover.name}</p>
                  </div>
                ) : (
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-paper px-6 py-10 text-center transition hover:border-brand">
                    <Icon icon={ImagePlusIcon} className="h-12 w-12 rounded-xl bg-white p-2.5 text-brand shadow-sm" />
                    <span className="mt-4 font-bold">{processingCover ? "Processing image…" : "Upload a cover image"}</span>
                    <span className="mt-1 text-sm text-slate-500">JPG, PNG or WebP, up to 2 MB</span>
                    <input type="file" accept={COVER_TYPES.join(",")} className="sr-only" onChange={handleCover} />
                  </label>
                )}
                <FieldError message={coverError ?? undefined} />
              </div>

              <label className="block">
                <span className="mb-2 flex justify-between text-sm font-bold">
                  Article
                  <span className="font-normal text-slate-400">
                    {words} words · {readMinutes} min read
                  </span>
                </span>
                <textarea
                  className="field h-[420px] resize-y font-[inherit] leading-7"
                  placeholder={"Start writing your article…\n\n## Use a heading like this\n\n- Add bullet points like this\n- One per line"}
                  aria-invalid={!!errors.body}
                  {...register("body")}
                />
                <p className="mt-2 text-xs text-slate-500">
                  Leave a blank line between paragraphs. Start a line with <code className="font-bold">##</code> for a
                  heading, or <code className="font-bold">-</code> for a bullet point.
                </p>
                <FieldError message={errors.body?.message} />
              </label>

              <label className="flex items-start gap-3 text-sm text-slate-600">
                <input type="checkbox" className="mt-1 accent-brand" {...register("confirmed")} />
                <span>
                  I confirm this article is my own work, is accurate to the best of my knowledge and provides general
                  information rather than legal advice.
                </span>
              </label>
              <FieldError message={errors.confirmed?.message} />

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={clearDraft}
                  className="inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-bold text-slate-500 hover:bg-paper hover:text-navy"
                >
                  <Icon icon={TrashIcon} /> Clear draft
                </button>
                <button
                  type="submit"
                  className="press inline-flex items-center gap-2 rounded-md bg-brand px-7 py-4 font-bold text-white hover:bg-brand-hover"
                >
                  Preview article <Icon icon={ArrowRightIcon} />
                </button>
              </div>
            </div>

            <aside className="h-fit space-y-5 lg:sticky lg:top-[105px]">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-bold tracking-widest text-slate-500">CARD PREVIEW</p>
                <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element -- local preview of an unsaved upload
                    <img src={cover.url} alt="" className="h-36 w-full object-cover" />
                  ) : (
                    <div className="flex h-36 items-end bg-navy p-4">
                      <Icon icon={PenLineIcon} strokeWidth={1.25} className="text-4xl text-brand-light" />
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-xs font-bold uppercase text-brand">{values.category || "Category"}</p>
                    <p className="mt-1 line-clamp-2 font-serif text-xl font-bold leading-snug">
                      {values.title || "Your article title"}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-500">
                      {values.excerpt || "Your summary will appear here."}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-500" aria-live="polite">
                  {draftSaved ? "Draft saved in this browser." : "Your draft is saved automatically in this browser."}
                </p>
              </div>
              <div className="rounded-xl bg-navy p-6 text-white">
                <p className="text-xs font-bold tracking-widest text-brand-light">WRITING GUIDELINES</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-white/75">
                  {GUIDELINES.map((guideline) => (
                    <li key={guideline} className="flex gap-3">
                      <Icon icon={CheckIcon} className="mt-1 text-gold" />
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </form>
        </section>
      )}

      {step === "preview" && (
        <section className="page-x section-y">
          <div className="mb-8 flex flex-col gap-4 rounded-xl border border-brand/30 bg-brand-mist p-5 md:flex-row md:items-center md:justify-between">
            <p className="flex items-center gap-3 font-semibold text-navy">
              <Icon icon={InfoIcon} className="text-xl text-brand" />
              This is how your article will appear to readers.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => goTo("write")}
                className="press inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-5 py-3 font-bold hover:border-brand hover:text-brand"
              >
                <Icon icon={ArrowLeftIcon} /> Back to editing
              </button>
              <button
                type="button"
                onClick={publish}
                disabled={publishing}
                className="press inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover disabled:opacity-60"
              >
                <Icon icon={SendIcon} /> {publishing ? "Posting…" : "Post article"}
              </button>
            </div>
          </div>
          {publishError && (
            <p className="mx-auto mb-6 max-w-3xl rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-[#D92D20]" role="alert">
              {publishError}
            </p>
          )}

          <article className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-sm md:p-12">
            <p className="text-xs font-bold tracking-widest text-brand">{values.category?.toUpperCase()}</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight md:text-5xl">{values.title}</h2>
            <p className="mt-5 text-xl leading-8 text-slate-600">{values.excerpt}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1 border-y border-slate-200 py-4 text-sm text-slate-500">
              <span className="font-bold text-navy">{values.authorName}</span>
              {values.authorRole && <span>{values.authorRole}</span>}
              <span>{longDate.format(new Date())}</span>
              <span>{readMinutes} min read</span>
            </div>
            {cover && (
              // eslint-disable-next-line @next/next/no-img-element -- local preview of an unsaved upload
              <img src={cover.url} alt="" className="mt-8 h-72 w-full rounded-lg object-cover md:h-96" />
            )}
            <div className="mt-8">
              <ArticleBody body={values.body ?? ""} />
            </div>
            {tags.length > 0 && (
              <ul className="mt-10 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag} className="rounded-full bg-paper px-3 py-1.5 text-sm font-semibold text-slate-600">
                    #{tag}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-10 flex gap-3 rounded-lg border border-slate-200 bg-paper p-4 text-sm leading-6 text-slate-600">
              <Icon icon={InfoIcon} className="mt-0.5 text-base text-brand" />
              This article provides general legal information and is not legal advice. For advice about your situation,
              speak to a qualified lawyer.
            </p>
          </article>
        </section>
      )}

      {step === "published" && (
        <section className="page-x section-y">
          <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm md:p-12">
            <Icon icon={CircleCheckIcon} className="mx-auto h-16 w-16 rounded-full bg-green-50 p-3.5 text-green-600" />
            <h2 className="mt-6 font-serif text-4xl font-bold">Article posted</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Thank you for contributing to the CallLawya Newsroom. Your article is now listed on the articles page.
            </p>
            <p className="mx-auto mt-6 flex max-w-xl gap-3 rounded-lg border border-gold/50 bg-gold/10 p-4 text-left text-sm leading-6 text-slate-700">
              <Icon icon={InfoIcon} className="mt-0.5 text-base text-gold" />
              While the articles service is being set up, posts are saved in this browser, so they won&apos;t appear on
              other devices yet.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {published && (
                <Link
                  href={`${ROUTES.articles}/${published.slug}`}
                  className="press inline-flex items-center gap-2 rounded-md bg-brand px-6 py-3 font-bold text-white hover:bg-brand-hover"
                >
                  View article <Icon icon={ArrowRightIcon} />
                </Link>
              )}
              <Link
                href={ROUTES.articles}
                className="press rounded-md border border-slate-300 px-6 py-3 font-bold hover:border-brand hover:text-brand"
              >
                All articles
              </Link>
              <button
                type="button"
                onClick={startNew}
                className="press inline-flex items-center gap-2 rounded-md border border-slate-300 px-6 py-3 font-bold hover:border-brand hover:text-brand"
              >
                <Icon icon={PenLineIcon} /> Write another
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
