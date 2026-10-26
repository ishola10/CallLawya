import { ImageResponse } from "next/og";
import { getLawyer } from "@/services/lawyers";

export const alt = "Verified lawyer profile on CallLawya";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function LawyerOpenGraphImage({ params }: { params: Promise<{ id: string }> }) {
  const lawyer = await getLawyer((await params).id).catch(() => null);
  const name = lawyer?.name ?? "Verified lawyer";
  const practice = lawyer?.expertiseAreas.slice(0, 3).join(" · ") || "Legal services";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#07111F",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#0066FF",
              fontSize: 26,
            }}
          >
            CL
          </div>
          CallLawya
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 48 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 200,
              height: 200,
              borderRadius: 40,
              background: "#0066FF",
              fontSize: 84,
              fontWeight: 800,
            }}
          >
            {lawyer?.initials ?? "CL"}
          </div>
          <div style={{ display: "flex", flexDirection: "column", maxWidth: 780 }}>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700, color: "#5A98FF", letterSpacing: 3 }}>
              VERIFIED LAWYER
            </div>
            <div style={{ display: "flex", marginTop: 12, fontSize: 68, fontWeight: 800, lineHeight: 1.05 }}>{name}</div>
            <div style={{ display: "flex", marginTop: 16, fontSize: 30, color: "rgba(255,255,255,0.7)" }}>{practice}</div>
            {lawyer?.location && (
              <div style={{ display: "flex", marginTop: 10, fontSize: 28, color: "rgba(255,255,255,0.55)" }}>
                {lawyer.location}
              </div>
            )}
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "#F2B84B" }}>
          Book a consultation on CallLawya
        </div>
      </div>
    ),
    size,
  );
}
