import { notFound } from "next/navigation";

// Article detail page is hidden for now.
export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  void params;
  notFound();
}
