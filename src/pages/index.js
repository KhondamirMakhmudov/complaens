import Image from "next/image";
import { Geist } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BookOpenIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
  FileIcon,
  MegaphoneIcon,
  ShieldIcon,
  VolumeIcon,
} from "@/components/ui/site-icons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const menuItems = [
  {
    label: "Anonim so'rovnoma",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScG0ic3AVqEWmb1RyHKENR4_YuzlPcTcpjUmvf-Z46AmLNj7A/viewform",
    kind: "external",
  },
  { label: "Savodxonlik testi", kind: "soon" },
  {
    label: "O'zbekiston Respublikasi davlat ramzlari",
    href: "/files/davlat_ramzlari.pdf",
    kind: "file",
  },
  {
    label: "Sohaga oid me'yoriy hujjatlar",
    href: "/files/meyoriy_hujjatlar.docx",
    kind: "file",
  },
  {
    label: "Sohaga oid asosiy terminlar",
    href: "/files/asosiy_terminlar.docx",
    kind: "file",
  },
  { label: "O'quv seminar materiallari" },
  { label: "Korxona madaniyati" },
  { label: "Faoliyat ekrani" },
  { label: "Ogohlik davr talabi" },
  { label: "Aloqa kanallari" },
];

const infoSlides = [
  {
    icon: ShieldIcon,
    title: "Firibgarlik uchun javobgarlik",
    description:
      "Platforma xodimlar va fuqarolar uchun ochiq, shaffof hamda xavfsiz muhit yaratadi. Korrupsiya va firibgarlik holatlari bo'yicha xabar berish, savodxonlikni oshirish va qonunchilikni o'rganish uchun yagona markaz.",
    points: [
      "50x gacha jarima",
      "Ishonchni suiiste'mol qilish taqiqlanadi",
      "Raqamli iz qoldirish monitoringi",
    ],
  },
  {
    icon: MegaphoneIcon,
    title: "Xabar berish tizimi",
    description:
      "Anonim va ochiq murojaatlar uchun yagona kanallar ishlaydi. Har bir murojaat ro'yxatga olinadi, nazorat qilinadi va mas'ullar tomonidan ko'rib chiqiladi.",
    points: [
      "Anonim murojaat imkoniyati",
      "24/7 qabul va monitoring",
      "Natijalar bo'yicha qayta aloqa",
    ],
  },
  {
    icon: BookOpenIcon,
    title: "Bilim va profilaktika",
    description:
      "Xodimlar uchun testlar, me'yoriy hujjatlar va asosiy terminlar jamlangan. Maqsad — ogohlikni oshirish va huquqiy savodxonlikni mustahkamlash.",
    points: [
      "Savodxonlik testi",
      "Me'yoriy hujjatlar bazasi",
      "O'quv materiallari",
    ],
  },
];

export default function Home() {
  const audioRef = useRef(null);
  const gestureHandlerRef = useRef(null);
  const [stage, setStage] = useState("loading");
  const [progress, setProgress] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);

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
      setProgress(
        Math.min(100, Math.round((audio.currentTime / audio.duration) * 100)),
      );
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % infoSlides.length);
    }, 5000);

    return () => clearInterval(intervalId);
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
  const currentSlide = infoSlides[activeSlide];
  const CurrentSlideIcon = currentSlide.icon;
  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + infoSlides.length) % infoSlides.length);
  };
  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % infoSlides.length);
  };

  return (
    <div
      className={`${geistSans.className} min-h-screen bg-slate-100 text-[#0f2c59]`}
    >
      <main className="mx-auto flex min-h-screen w-full max-w-330 flex-col gap-5 px-5 py-6">
        <Card className="border-sky-100 bg-linear-to-b from-white to-sky-50/70 shadow-md">
          <CardHeader className="items-center pb-4 text-center">
            <CardTitle className="text-balance bg-linear-to-r from-blue-700 to-blue-500 bg-clip-text text-3xl font-black leading-tight tracking-tight text-transparent md:text-5xl">
              Korrupsiyaga qarshi kurashish bo&apos;yicha
              <br />
              “Issiqlik Elektr Stansiyalari AJ” platformasi
            </CardTitle>
            <CardDescription className="text-sm font-medium text-sky-800 md:text-base">
              Ochiq, xavfsiz va zamonaviy axborot maydoni
            </CardDescription>
          </CardHeader>
        </Card>

        <section className="grid flex-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <Card className="border-sky-100 bg-linear-to-br from-white to-sky-50/80 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-3 text-2xl text-[#0f2c59] md:text-3xl">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                  <CurrentSlideIcon className="h-5 w-5" />
                </span>
                {currentSlide.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-base leading-7 text-[#264f84]">
                {currentSlide.description}
              </p>

              <div className="grid gap-2.5 md:grid-cols-3">
                {currentSlide.points.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-linear-to-r from-blue-700 to-blue-500 px-3 py-2.5 text-sm font-semibold leading-snug text-white shadow-md"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-sky-100 pt-3">
                <div className="flex items-center gap-2">
                  {infoSlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2.5 w-2.5 rounded-full transition ${
                        activeSlide === index ? "bg-blue-600" : "bg-sky-200 hover:bg-sky-300"
                      }`}
                      aria-label={`${index + 1}-slayd`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handlePrevSlide}
                    className="h-8 border border-sky-200 bg-white px-3 text-slate-700 hover:bg-sky-50"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                    Oldingi
                  </Button>
                  <Button
                    onClick={handleNextSlide}
                    className="h-8 border border-sky-200 bg-white px-3 text-slate-700 hover:bg-sky-50"
                  >
                    Keyingi
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-sky-100 bg-linear-to-b from-white to-sky-50/60 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl text-blue-700">
                Bo&apos;limlar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="grid gap-2.5">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-3 rounded-xl border border-sky-100 bg-linear-to-b from-white to-sky-50/80 px-3 py-2.5 text-[1rem] font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                      >
                        <span>{item.label}</span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-7 min-w-7 items-center justify-center rounded-full px-2 text-[11px] font-bold text-white ${
                            item.kind === "file"
                              ? "bg-blue-600"
                              : "bg-emerald-600"
                          }`}
                        >
                          {item.kind === "file" ? (
                            <FileIcon className="h-3.5 w-3.5" />
                          ) : (
                            <ExternalLinkIcon className="h-3.5 w-3.5" />
                          )}
                        </span>
                      </a>
                    ) : (
                      <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-[1rem] font-semibold text-slate-800">
                        <span>{item.label}</span>
                        <Badge className="border-slate-200 bg-slate-100 text-slate-500">
                          Tez kunda
                        </Badge>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      {showIntroOverlay && (
        <div className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex justify-center px-3">
          <div className="pointer-events-auto w-full max-w-160 rounded-2xl border border-white/25 bg-linear-to-b from-emerald-700/95 to-emerald-900/95 p-4 text-center text-white shadow-2xl">
            <Image
              src="/icons/uzbekistan-flag.svg"
              alt="Flag of Uzbekistan"
              width={210}
              height={140}
              priority
              className="mx-auto mb-3 h-auto"
            />
            <h2 className="mb-2 text-[clamp(1.6rem,3vw,2.2rem)] font-bold">
              O&apos;zbekiston Respublikasi
            </h2>
            <p className="mb-3 text-base opacity-90">
              Davlat madhiyasi ijro etilmoqda
            </p>

            {stage === "idle" && (
              <p className="mb-3 flex items-center justify-center gap-2 font-bold">
                <VolumeIcon className="h-4 w-4" />
                Ovozni boshlash uchun bir marta bosing
              </p>
            )}

            <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-white/25">
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #2b7bff, #f6f7f8, #2fa84a)",
                  transition: "width 180ms linear",
                }}
              />
            </div>

            <Button
              onClick={handleSkip}
              className="border border-white/35 bg-white/10 text-white hover:bg-white/20"
            >
              O&apos;tkazib yuborish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
