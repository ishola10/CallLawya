import { ScrollReveal, SiteFooter, SiteHeader } from "@/components/common";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-paper text-navy">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ScrollReveal />
    </div>
  );
}
