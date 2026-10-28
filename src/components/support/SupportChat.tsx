"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { BotIcon, MessageCircleMoreIcon, SendIcon, XIcon } from "@/assets/icons";
import { Icon } from "@/components/common";
import { cn } from "@/lib/utils";
import {
  SUGGESTED_TOPIC_IDS,
  findReply,
  supportLinks,
  topicById,
  type ChatLink,
  type ChatTopic,
} from "./knowledge";

type Message = { id: number; from: "bot" | "user"; text: string; links?: ChatLink[] };
/** What the visitor can do next, shown under the latest bot message. */
type Prompt = "suggestions" | "feedback" | "not-answered" | "not-understood" | null;

const GREETING =
  "Hi, I'm the CallLawya assistant. I can answer common questions about finding a lawyer, consultations, payments and the app. I can't give legal advice on your case, but I can point you to a verified lawyer who can.";
const TYPING_DELAY_MS = 450;

const SUGGESTIONS = SUGGESTED_TOPIC_IDS.map(topicById).filter((topic): topic is ChatTopic => Boolean(topic));

function ChatLinkButton({ link }: { link: ChatLink }) {
  const className =
    "inline-flex items-center rounded-full border border-brand/30 bg-white px-3 py-1.5 text-xs font-semibold text-brand hover:border-brand hover:bg-brand-mist";
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={className}>
        {link.label}
      </Link>
    );
  }
  return (
    <a
      href={link.href}
      className={className}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
    </a>
  );
}

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ id: 0, from: "bot", text: GREETING }]);
  const [prompt, setPrompt] = useState<Prompt>("suggestions");
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const asked = useRef<string[]>([]);
  const nextId = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, prompt]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const push = (from: Message["from"], text: string, links?: ChatLink[]) =>
    setMessages((current) => [...current, { id: nextId.current++, from, text, links }]);

  const botSay = (replies: { text: string; links?: ChatLink[] }[], next: Prompt) => {
    setPrompt(null);
    setTyping(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      replies.forEach((reply) => push("bot", reply.text, reply.links));
      setTyping(false);
      setPrompt(next);
    }, TYPING_DELAY_MS);
  };

  const ask = (text: string, topic?: ChatTopic) => {
    const question = text.trim();
    if (!question || typing) return;
    push("user", question);
    asked.current.push(question);

    const reply = topic ? ({ kind: "topic", topic } as const) : findReply(question);
    if (reply.kind === "topic" && reply.topic.id === "contact") {
      botSay([{ text: reply.topic.answer, links: supportLinks(asked.current) }], "suggestions");
    } else if (reply.kind === "topic") {
      botSay([{ text: reply.topic.answer, links: reply.topic.links }, { text: "Did that answer your question?" }], "feedback");
    } else if (reply.kind === "greeting") {
      botSay([{ text: "Hello! What can I help you with today?" }], "suggestions");
    } else if (reply.kind === "thanks") {
      botSay([{ text: "You're welcome! Is there anything else I can help with?" }], "suggestions");
    } else {
      botSay(
        [{ text: "I'm not sure I understood that. Could you rephrase it, or choose one of the topics below?" }],
        "not-understood",
      );
    }
  };

  const answered = () => {
    push("user", "Yes, that helped");
    botSay([{ text: "Glad I could help! Is there anything else you'd like to know?" }], "suggestions");
  };

  const notAnswered = () => {
    push("user", "No, I still need help");
    botSay(
      [{ text: "Sorry about that. You can try asking in a different way, or I can connect you with our support team." }],
      "not-answered",
    );
  };

  const contactSupport = () => {
    push("user", "Contact the support team");
    botSay(
      [{ text: "Here's how to reach our support team. We reply within 24 hours.", links: supportLinks(asked.current) }],
      "suggestions",
    );
  };

  const askSomethingElse = () => {
    push("user", "I'll ask something else");
    botSay([{ text: "Sure. What would you like to know?" }], "suggestions");
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    ask(draft);
    setDraft("");
  };

  const chip =
    "rounded-full border border-slate-200 bg-white px-3 py-1.5 text-left text-xs font-semibold text-navy transition hover:border-brand hover:text-brand";

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-label="CallLawya assistant"
          className="fixed inset-x-3 bottom-24 z-50 flex h-[min(560px,calc(100dvh-8rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_rgba(10,37,64,.25)] sm:inset-x-auto sm:right-7 sm:w-[380px]"
        >
          <header className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand">
              <Icon icon={BotIcon} className="text-lg" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold">CallLawya Assistant</p>
              <p className="text-xs text-white/60">Answers about CallLawya, not legal advice</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10"
            >
              <Icon icon={XIcon} />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-paper px-4 py-5" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={cn("flex", message.from === "user" && "justify-end")}>
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6",
                    message.from === "user"
                      ? "rounded-br-sm bg-brand text-white"
                      : "rounded-bl-sm border border-slate-200 bg-white text-slate-700",
                  )}
                >
                  <p>{message.text}</p>
                  {message.links && message.links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.links.map((link) => (
                        <ChatLinkButton key={link.href} link={link} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {typing && (
              <div className="flex" aria-label="Assistant is typing">
                <div className="flex gap-1 rounded-2xl rounded-bl-sm border border-slate-200 bg-white px-4 py-4">
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {prompt === "feedback" && (
              <div className="flex flex-wrap gap-2 pl-1">
                <button type="button" onClick={answered} className={chip}>
                  Yes, that helped
                </button>
                <button type="button" onClick={notAnswered} className={chip}>
                  No, I still need help
                </button>
              </div>
            )}

            {prompt === "not-answered" && (
              <div className="flex flex-wrap gap-2 pl-1">
                <button
                  type="button"
                  onClick={contactSupport}
                  className="rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-hover"
                >
                  Contact support
                </button>
                <button type="button" onClick={askSomethingElse} className={chip}>
                  Ask something else
                </button>
              </div>
            )}

            {(prompt === "suggestions" || prompt === "not-understood") && (
              <div className="flex flex-wrap gap-2 pl-1">
                {SUGGESTIONS.map((topic) => (
                  <button key={topic.id} type="button" onClick={() => ask(topic.question, topic)} className={chip}>
                    {topic.question}
                  </button>
                ))}
                {prompt === "not-understood" && (
                  <button
                    type="button"
                    onClick={contactSupport}
                    className="rounded-full bg-brand px-3 py-1.5 text-xs font-bold text-white hover:bg-brand-hover"
                  >
                    Talk to the support team
                  </button>
                )}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white p-3">
            <label htmlFor="support-chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="support-chat-input"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={300}
              placeholder="Type your question…"
              autoComplete="off"
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-paper px-4 py-2.5 text-sm outline-none focus:border-brand"
            />
            <button
              type="submit"
              disabled={!draft.trim() || typing}
              aria-label="Send question"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-hover disabled:opacity-50"
            >
              <Icon icon={SendIcon} />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="fixed bottom-7 right-7 z-40 rounded-full bg-brand px-6 py-4 font-bold text-white shadow-xl hover:bg-brand-hover"
      >
        <Icon icon={open ? XIcon : MessageCircleMoreIcon} className="mr-2" />
        {open ? "Close chat" : "Chat with support"}
      </button>
    </>
  );
}
