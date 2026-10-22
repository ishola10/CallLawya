import type { Metadata } from "next";
import { LawyerDirectory } from "./components";

export const metadata: Metadata = {
  title: "Lawyers Directory",
  description: "Search verified lawyers across Africa by expertise, country, availability, language and budget.",
};

export default function LawyersPage() {
  return <LawyerDirectory />;
}
