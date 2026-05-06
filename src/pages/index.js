import Image from "next/image";
import { Geist } from "next/font/google";
import { useEffect, useRef, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const menuItems = [
  "Anonim so'rovnoma",
  "Savodxonlik testi",
  "O'zbekiston Respublikasi davlat ramzlari",
  "Sohaga oid me'yoriy hujjatlar",
  "Sohaga oid asosiy terminlar",
  "O'quv seminar materiallari",
  "Korxona madaniyati",
  "Faoliyat ekrani",
  "Ogohlik davr talabi",
  "Aloqa kanallari",
];

export default function Home() {
  const audioRef = useRef(null);
  const gestureHandlerRef = useRef(null);
  const [stage, setStage] = useState("loading");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem("hymnPlayed")) {
      queueMicrotask(() => setStage("done"));
      return;
    }

    const audio = new Audio("/music/hymn.m4a");
    audio.volume = 1;
    audioRef.current = audio;

    const handleEnded = () => {
      sessionStorage.setItem("hymnPlayed", "true");
      setProgress(100);
      setStage("done");
    };

    const handleTimeUpdate = () => {
      if (!audio.duration || Number.isNaN(audio.duration)) {
        return;
      }
      setProgress(Math.min(100, Math.round((audio.currentTime / audio.duration) * 100)));
    };

    const bindGestureFallback = () => {
      setStage("idle");
      const startOnGesture = () => {
        audio.play().then(() => setStage("playing"));
        window.removeEventListener("mousemove", startOnGesture);
        window.removeEventListener("keydown", startOnGesture);
        window.removeEventListener("scroll", startOnGesture);
        window.removeEventListener("click", startOnGesture);
        window.removeEventListener("touchstart", startOnGesture);
      };
      gestureHandlerRef.current = startOnGesture;
      window.addEventListener("mousemove", startOnGesture, { once: true });
      window.addEventListener("keydown", startOnGesture, { once: true });
      window.addEventListener("scroll", startOnGesture, { once: true });
      window.addEventListener("click", startOnGesture, { once: true });
      window.addEventListener("touchstart", startOnGesture, { once: true });
    };

    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    audio
      .play()
      .then(() => setStage("playing"))
      .catch(() => bindGestureFallback());

    return () => {
      if (gestureHandlerRef.current) {
        window.removeEventListener("mousemove", gestureHandlerRef.current);
        window.removeEventListener("keydown", gestureHandlerRef.current);
        window.removeEventListener("scroll", gestureHandlerRef.current);
        window.removeEventListener("click", gestureHandlerRef.current);
        window.removeEventListener("touchstart", gestureHandlerRef.current);
      }
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleSkip = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    sessionStorage.setItem("hymnPlayed", "true");
    setStage("done");
  };

  const showIntroOverlay = stage !== "done";

  return (
    <div className={`${geistSans.className} min-h-screen bg-[#f3f7fb] text-[#0f2c59]`}>
      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "24px 20px 40px",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: 24 }}>
          <h1
            style={{
              margin: 0,
              color: "#0a2ad6",
              fontStyle: "italic",
              fontWeight: 800,
              lineHeight: 1.2,
              fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
              textDecoration: "underline",
            }}
          >
            Korrupsiyaga qarshi kurashish bo&apos;yicha
            <br />
            “Sirdaryo IES” platformasi
          </h1>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 20,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "linear-gradient(135deg, #ffffff, #eaf4ff)",
              border: "1px solid #cddff3",
              borderRadius: 18,
              padding: 22,
              boxShadow: "0 8px 24px rgba(8, 38, 88, 0.08)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>🛡️</span>
              <h2 style={{ margin: 0, fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)" }}>
                Firibgarlik uchun javobgarlik
              </h2>
            </div>
            <p style={{ margin: "0 0 16px", color: "#264f84", lineHeight: 1.6 }}>
              Platforma xodimlar va fuqarolar uchun ochiq, shaffof hamda xavfsiz muhit yaratadi.
              Korrupsiya va firibgarlik holatlari bo&apos;yicha xabar berish, savodxonlikni oshirish va
              qonunchilikni o&apos;rganish uchun yagona markaz.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 10,
              }}
            >
              {[
                "50x gacha jarima",
                "Ishonchni suiiste'mol qilish taqiqlanadi",
                "Raqamli iz qoldirish monitoringi",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    borderRadius: 10,
                    background: "#0f5fab",
                    color: "#fff",
                    fontSize: "0.9rem",
                    padding: "10px 12px",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
        </div>

          <aside
            style={{
              background: "#ffffff",
              border: "1px solid #d7e5f5",
              borderRadius: 18,
              padding: 18,
              boxShadow: "0 8px 24px rgba(8, 38, 88, 0.08)",
            }}
          >
            <h3 style={{ marginTop: 0, marginBottom: 12, color: "#0a2ad6", fontSize: "1.3rem" }}>
              Bo&apos;limlar
            </h3>
            <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 10 }}>
              {menuItems.map((item) => (
                <li key={item} style={{ fontSize: "1.05rem", fontWeight: 700, lineHeight: 1.3 }}>
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </section>
      </main>

      {showIntroOverlay && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(4, 34, 13, 0.55)",
            backdropFilter: "blur(2px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            padding: 20,
          }}
        >
          <div
            style={{
              width: "min(640px, 96vw)",
              background: "linear-gradient(180deg, rgba(18,93,45,0.95), rgba(12,66,31,0.96))",
              border: "1px solid rgba(255,255,255,0.22)",
              color: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 22px 60px rgba(0,0,0,0.38)",
              padding: 24,
              textAlign: "center",
            }}
          >
            <Image
              src="/icons/uzbekistan-flag.svg"
              alt="Flag of Uzbekistan"
              width={210}
              height={140}
              priority
              style={{ margin: "0 auto 14px", height: "auto" }}
            />
            <h2 style={{ margin: "0 0 8px", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              O&apos;zbekiston Respublikasi
            </h2>
            <p style={{ margin: "0 0 12px", opacity: 0.9, fontSize: "1.02rem" }}>
              Davlat madhiyasi ijro etilmoqda
            </p>

            {stage === "idle" && (
              <p style={{ margin: "0 0 12px", fontWeight: 700 }}>🔊 Ovozni boshlash uchun bir marta bosing</p>
            )}

            <div
              style={{
                width: "100%",
                height: 8,
                borderRadius: 999,
                background: "rgba(255,255,255,0.2)",
                overflow: "hidden",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #2b7bff, #f6f7f8, #2fa84a)",
                  transition: "width 180ms linear",
                }}
              />
            </div>

            <button
              onClick={handleSkip}
              style={{
                border: "1px solid rgba(255,255,255,0.35)",
                background: "rgba(255,255,255,0.08)",
                color: "#fff",
                borderRadius: 10,
                padding: "10px 16px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              O&apos;tkazib yuborish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
