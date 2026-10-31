import { ScrollReveal, SiteFooter, SiteHeader } from "@/components/common";
import { SupportChat } from "@/components/support";

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
      <SupportChat />
      <ScrollReveal />
    </div>
  );
}
