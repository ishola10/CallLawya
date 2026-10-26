import { ImageResponse } from "next/og";

export const alt = "CallLawya — find verified lawyers and book legal consultations in Nigeria";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
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
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#0066FF",
              fontSize: 30,
              fontWeight: 800,
            }}
          >
            CL
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>CallLawya</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 72, height: 6, background: "#F2B84B", marginBottom: 28 }} />
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>
            Find verified lawyers. Book a consultation.
          </div>
          <div style={{ display: "flex", marginTop: 24, fontSize: 30, color: "rgba(255,255,255,0.7)", maxWidth: 900 }}>
            Legal support by call, video or chat — with Lex AI to help you prepare.
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", color: "#5A98FF", fontWeight: 700 }}>calllawya.com</div>
          <div style={{ display: "flex", padding: "14px 28px", borderRadius: 999, background: "#0066FF", fontWeight: 700 }}>
            Find a Lawyer
          </div>
        </div>
      </div>
    ),
    size,
  );
}
