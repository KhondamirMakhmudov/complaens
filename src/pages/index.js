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
} from "@/components/ui/site-icons";
import {
  TrendingUp,
  Shield,
  Zap,
  AlertCircle,
  Users,
  Target,
  CheckCircle2,
  Award,
} from "lucide-react";

// Add styles for animations
const animationStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(43, 123, 255, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(43, 123, 255, 0.5);
    }
  }

  @keyframes carouselIn {
    0% {
      opacity: 0;
      transform: translateY(18px) scale(0.985);
      filter: blur(6px);
    }
    65% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes carouselContentIn {
    0% {
      opacity: 0;
      transform: translateY(14px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out forwards;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .animate-scale-in {
    animation: scaleIn 0.8s ease-out forwards;
  }

  .animate-glow {
    animation: glow 3s ease-in-out infinite;
  }

  .animate-carousel-in {
    animation: carouselIn 560ms cubic-bezier(0.22, 0.61, 0.36, 1) both;
  }

  .animate-carousel-in > * {
    animation: carouselContentIn 620ms ease-out both;
    animation-delay: 80ms;
  }

  .glass-effect {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-effect-dark {
    background: rgba(15, 44, 89, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const corruptionStats = [
  {
    icon: TrendingUp,
    stat: "$2.6T",
    label: "Yillik global zarar",
    description: "Dunyo iqtisodiyotiga yetkazadigan korrupsiyaning zayali",
  },
  {
    icon: Shield,
    stat: "100%",
    label: "Keng ko'lamli nazorat",
    description: "Barcha qatlamlarni jalb qilish va oldini olish",
  },
  {
    icon: Zap,
    stat: "24/7",
    label: "Anonim kanallar",
    description: "Xabar berish va murojaat qilish imkoniyati",
  },
  {
    icon: Award,
    stat: "419-QON",
    label: "Huquqiy baza",
    description: "O'zbekiston Respublikasi korrupsiyaga qarshi kurashish",
  },
];

const presidentInsights = [
  {
    quote:
      "Korrupsiya bilan hech qachon maqsadimizga erisha olmayiz. Korrupsiyaga qarshi kurashishda aholining barcha qatlamlari, eng yaxshi mutahassislar jalb qilinmas ekan, jamiyatimizning barcha a'zolari, ta'bir joiz bo'lsa 'halollik vaksinasi' bilan emlanmas ekan, o'z oldimizga qo'ygan yuqsak maqsadlariga erisha olmayiz. Biz korrupsiyaning oqibatlari bilan kurashishdan uning barvoqt oldini olishga o'tishimiz kerak.",
    source: "O'zbekiston Respublikasi Prezidenti",
    emphasis: "Halollik va oldini olish",
    image: "/files/president_feedbacks-assets/anti_corruption.jpg",
  },
  {
    quote:
      "O'zbekiston Respublikasining asosiy maqsadi - shaffoflik, adolatlilik va xalqga xizmat qilishdir. Korrupsiyaga qarshi kurash - bu bizning davlatiy siyosatimizning eng muhim yo'nalishi.",
    source: "O'zbekiston Respublikasi Prezidenti",
    emphasis: "Shaffoflik va adolatlilik",
    image: "/files/president_image.jpg",
  },
  {
    quote:
      "Korrupsiyani oldini olish va uni mahalliy darajada to'xtatish - bu davlat idoralari va jamiyatning birgalikdagi mas'uliytasidir. Javobgarlik va etikat asosida ishlash - bu bizning yo'nalishimiz.",
    source: "O'zbekiston Respublikasi Davlat Siyosati",
    emphasis: "Mas'uliyat va etikat",
    image: "/files/president_image.jpg",
  },
  {
    quote:
      "Xalqaro standartlarga amal qilgan holda, korrupsiyaga qarshi kuchli turish, monitoring tizimlarini yaratish va fuqaro jamiyatining roli - davlatning taraqqiyotining asos bo'ladi.",
    source: "O'zbekiston Respublikasi Islohotlar Dasturi",
    emphasis: "Xalqaro standartlar",
    image: "/files/president_image.jpg",
  },
];

const reformsMilestones = [
  {
    year: "2023-2025",
    title: "Yangi qonunlar",
    description:
      "Korrupsiyaga qarshi kurashish bo'yicha yangi qonunlar qabul qilindi, huquqiy bazani mustahkamladi.",
  },
  {
    year: "2025",
    title: "Elektron xizmatlari",
    description:
      "Elektron davlat xizmatlari joriy etilishi orqali shaffoflik oshirildi.",
  },
  {
    year: "2025",
    title: "Qaynar chiziq",
    description:
      'Korrupsiyaga qarshi "qaynar chiziq" faol, fuqarolar anonim murojaat qilishlari mumkin.',
  },
];

const menuItems = [
  {
    label: "Anonim so'rovnoma",
    href: "https://docs.google.com/forms/d/e/1FAIpQLScG0ic3AVqEWmb1RyHKENR4_YuzlPcTcpjUmvf-Z46AmLNj7A/viewform",
    kind: "external",
  },
  {
    label: "Korrupsiyaga qarshi kurashish kuni",
    href: "/anti-curroption-day",
    kind: "internal",
  },
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
];

const presidentFeedbackSlides = [
  {
    slide: 1,
    title: "Prezident Farmoni",
    description:
      "O'zbekiston Respublikasi Prezidentining 26.12.2025 yildag 'Davlat xaridlari tizimida raqobat muhiti va shaffoflikni ta'minlash bo'yicha navbatdagi chora-tadbirlar to'g'risida' gi PF-259-son FARMONI, 2026 yil, Tashkent sh.",
    image: "/files/president_feedbacks-assets/slide-01-rId3.png",
  },
  {
    slide: 2,
    title: "Davlat va jamiyatning shaffof ishlashi",
    description:
      "Davlat xaridlari tizimida raqobat muhiti va shaffoflikni ta'minlash",
    image: "/files/president_feedbacks-assets/slide-02-rId3.png",
  },
  {
    slide: 3,
    title: "Elektron davlat xizmatlari",
    description: "Qonunchilikni yanada takomillash va shaffoflikni oshirish",
    image: "/files/president_feedbacks-assets/slide-03-rId2.png",
  },
];

const antiCorruptionDaySlides = [
  {
    slide: 1,
    title: "9-dekabr: Xalqaro korrupsiyaga qarshi kurashish kuni",
    description:
      "Har yili 9-dekabr kuni butun dunyo bo'ylab Xalqaro korrupsiyaga qarshi kurashish kuni nishonlanadi. Bu kun korrupsiyaning jamiyatga yetkazadigan zarariga qarshi kurashish va aholining xabardorligini oshirishga bag'ishlangan.",
    image: "/files/corruption-1.png",
    timeline: [
      {
        number: 1,
        title: "BMT Bosh Assambleyasining qarori",
        description:
          "2003-yilda Birlashgan Millatlar Tashkiloti Bosh Assambleyasi 9-dekabrni Xalqaro korrupsiyaga qarshi kurashish kuni deb e'lon qildi.",
      },
      {
        number: 2,
        title: "Konvensiyaning qabul qilinishi",
        description:
          "Bu kun BMTning korrupsiyaga qarshi konvensiyasi qabul qilinganligini xalqaro miqyosda nishonlashga bag'ishlangan.",
      },
      {
        number: 3,
        title: "Asosiy maqsadlar",
        description:
          "Korrupsiyaga qarshi kurashda xalqaro hamkorlikni kuchaytrish va jamoatchilkini ushbu illatning salbiy oqibatlari haqida xabardor qilish.",
      },
    ],
    footer:
      "Bu sana barcha davlatlarni korrupsiyaga qarshi kurashishda birlashishga va shaffolikni ta'minlashga chaqiradi.",
  },
];

const internalDocuments = {
  title:
    '"ISSIQLIK ELEKTR STANTSIYALARI" AJ DA KORRUPSIYAGA QARSHI KURASHISH BOYICHA QABUL QILINGAN ICHKI MEYORIY HUJJATLAR',
  subtitle:
    "Ushbu siyosatning tamoyillari va talablari barcha hodimlar uchun, ularning egallad turgan lavozimidan qat'iy nazar, majburiy.",
  items: [
    '"IES" AJning korrupsiyaga qarshi siyosati',
    "Odob-ahlok kodeksi",
    "Manfaatlar toqnashuvini boshqarish boyicha Nizom",
    "Kontragentlarni tekshirishga oid Yoriqnoma",
    "Korrupsiyaviy havo-hatalarni aniqlash va baholash Usuluiyoti",
    "Hodimlarning korrupsiyaviy hatti-harakatlari va odob-ahlok qoidalarini buzish holatlari ustidan xizmat tekshiruvalari otkizish boyicha Reglament",
    "Aloqa kanallari orqali korrupsiyaviy hatti-harakatlari tughrisida kelib tushgan habarlarni qabul qilish va kurib chiqish Reglamenti",
    "Hodimlarning etika va korrupsiyaga qarshi kurashish sohasida uqitishni tashkil qilish boyicha Yoriqnoma",
    "Jamiyatga isha qabul qilinayotgan nomzodlarni tekshirish boyicha Yoriqnoma",
    "Korrupsiyaviy havo-hatalarni aniqlash va baholash Usuluiyoti",
  ],
};

const corruptionLawDefinitions = {
  image: "/files/president_image.jpg",
  sections: [
    {
      title: "Korrupsiya",
      text: "shaxsning oz mansab yoki xizmat mavqeidan shaxsiy manfaatlarini yohud ozga shaxslarning manfaatlarini kozlab moddiy yoki nomoddiy naf olish maqsadida qonunga khilof ravishda foydalanishi, khuddi shuningdek bunday nafni qonunga khilof ravishda taqdim etish.",
    },
    {
      title: "Korrupsiyaga oid huquqbuzarlik",
      text: "korrupsiya alomarlariga ega bolgan, sodir etilganligi uchun qonunchlikda javobgarlik nazarda tutilgan qilmish.",
    },
    {
      title: "Manfaatlar toqnashuvi",
      text: "shaxsiy (bevosita yoki bilvosita) manfaatdorlik shaxsning mansab yoki xizmat majburiyatlarini lozim darajada bajarishing taosir korsataytgan yohud taosir korsatishi mumkin bolgan hamda shaxsiy manfaatdorlik bilan fuqaroaning, tashkilotlarning, jamiyatning yoki davlatning huquqlari va qonuniy manfaatlari ortasida qarama-qarshliq yuzaga kelaytgan yoki yuzaga kelishi mumkin bolgan vaziyat.",
    },
  ],
};

export default function Home() {
  const audioRef = useRef(null);
  const videoRef = useRef(null);
  const gestureHandlerRef = useRef(null);
  const containerRef = useRef(null);

  const [stage, setStage] = useState("loading");
  const [progress, setProgress] = useState(0);
  const [isIntroVisible, setIsIntroVisible] = useState(true);
  const [isIntroClosing, setIsIntroClosing] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentDisplayMode, setCurrentDisplayMode] = useState(4); // 0=stats, 1=insights, 2=corruption, 3=president, 4=internal-docs, 5=law-definitions, 6=anti-corruption-day
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [currentPresidentSlide, setCurrentPresidentSlide] = useState(0);
  const [currentAntiCorruptionSlide, setCurrentAntiCorruptionSlide] =
    useState(0);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const styleEl = document.createElement("style");
      styleEl.textContent = animationStyles;
      document.head.appendChild(styleEl);
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("hymnPlayed")) {
      queueMicrotask(() => {
        setIsIntroVisible(false);
        setStage("done");
        if (!sessionStorage.getItem("videoPlayed")) {
          setIsVideoPlaying(true);
        }
      });
      return;
    }

    const audio = new Audio("/music/hymn.m4a");
    audio.volume = 1;
    audioRef.current = audio;

    const handleEnded = () => {
      sessionStorage.setItem("hymnPlayed", "true");
      setProgress(100);
      setStage("done");
      setIsVideoPlaying(true);
    };

    const handleTimeUpdate = () => {
      if (!audio.duration || Number.isNaN(audio.duration)) {
        return;
      }
      const currentProgress = Math.min(
        100,
        Math.round((audio.currentTime / audio.duration) * 100),
      );
      setProgress(currentProgress);
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
    setIsIntroClosing(true);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    sessionStorage.setItem("hymnPlayed", "true");
    setStage("done");
    setTimeout(() => {
      setIsIntroVisible(false);
      setIsVideoPlaying(true);
    }, 400);
  };

  const handleVideoEnd = () => {
    sessionStorage.setItem("videoPlayed", "true");
    setIsVideoPlaying(false);
  };

  const handleBackButton = () => {
    setIsVideoPlaying(false);
  };

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handlePrevInsight = () => {
    setCurrentInsightIndex(
      (prev) =>
        (prev - 1 + presidentInsights.length) % presidentInsights.length,
    );
  };

  const handleNextInsight = () => {
    setCurrentInsightIndex((prev) => (prev + 1) % presidentInsights.length);
  };

  const isWordFile = (href = "") => /\.docx?$/i.test(href);
  const isPdfFile = (href = "") => /\.pdf$/i.test(href);

  const getAbsoluteFileUrl = (href = "") => {
    if (typeof window === "undefined") return href;
    return new URL(href, window.location.origin).toString();
  };

  const handleMenuFileOpen = (event, item) => {
    if (!item?.href || item.kind !== "file") return;

    if (isWordFile(item.href)) {
      event.preventDefault();
      const absoluteUrl = getAbsoluteFileUrl(item.href);

      try {
        window.open(`ms-word:ofe|u|${absoluteUrl}`, "_self");
      } catch {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }
      return;
    }

    if (isPdfFile(item.href)) {
      event.preventDefault();
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPresidentSlide(
        (prev) => (prev + 1) % presidentFeedbackSlides.length,
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, []);

  // Master auto-advance timer: cycle through display modes every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDisplayMode((prev) => (prev + 1) % 7);
      // Also rotate through sub-carousels
      setCurrentInsightIndex((prev) => (prev + 1) % presidentInsights.length);
      setCurrentStatIndex((prev) => (prev + 1) % corruptionStats.length);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${geistSans.className} h-screen w-screen bg-linear-to-b from-slate-900 via-blue-900 to-slate-900 text-white overflow-hidden flex flex-col`}
    >
      <style>{animationStyles}</style>

      {/* Video player overlay */}
      {isVideoPlaying && (
        <div className="fixed left-0 right-0 top-0 bottom-0 z-50 flex flex-col items-center justify-center bg-linear-to-b from-slate-900/95 via-blue-900/95 to-slate-900/95 w-full h-full backdrop-blur-md">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            controls
            autoPlay
            onEnded={handleVideoEnd}
          >
            <source src="/videos/president.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button
            onClick={handleBackButton}
            className="absolute top-4 left-4 z-60 flex items-center gap-2 bg-linear-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg transition border border-blue-300/30"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Ortga
          </button>
        </div>
      )}

      {/* Main content - Always fits in viewport */}
      <div className="flex-1 flex flex-col relative">
        {/* Header Section with IES Logo and Company Info */}
        <div className="flex-none bg-linear-to-r from-blue-900/50 to-slate-900/50 backdrop-blur-md border-b border-cyan-400/20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Logo and Company Info */}
            <div className="flex items-center gap-2 flex-1">
              <div className="shrink-0">
                <Image
                  src="/icons/ies_brand.svg"
                  alt="Issiqlik Elektr Stansiyalari AJ"
                  width={60}
                  height={60}
                  className="h-12 w-auto"
                  priority
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-lg md:text-xl font-bold text-white">
                  Issiqlik Elektr Stansiyalari AJ
                </h1>

                <p className="text-sm text-white/80 truncate">
                  Korrupsiyaga qarshi kurashish va komplaens boshqarmasi
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top: Larger Hero Section */}
        <div
          className={`flex-none relative flex items-center justify-center px-4 ${currentDisplayMode === 5 ? "h-16" : "h-24"}`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-2 right-4 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"></div>
            <div
              className="absolute -bottom-2 left-4 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          <div className="relative z-10 text-center">
            <h2
              className={`font-black bg-linear-to-r from-blue-300 via-white to-blue-200 bg-clip-text text-transparent ${currentDisplayMode === 5 ? "text-lg md:text-xl" : "text-xl md:text-2xl"}`}
            >
              Korrupsiyaga qarshi kurashish
            </h2>
          </div>
        </div>

        {/* Middle: Auto-rotating carousel section - 60% of remaining space */}
        <div className="flex-1 flex items-center justify-center px-3 py-2 relative overflow-hidden">
          {currentDisplayMode === 0 && (
            <div className="w-full h-full flex items-center justify-center animate-carousel-in px-3">
              <div className="w-full max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">
                  Korrupsiyaga qarshi kurashda asosiy raqamlar
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {corruptionStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    const gradients = [
                      "bg-linear-to-br from-blue-600 to-cyan-500",
                      "bg-linear-to-br from-purple-600 to-pink-500",
                      "bg-linear-to-br from-emerald-600 to-teal-500",
                      "bg-linear-to-br from-orange-600 to-rose-500",
                    ];
                    return (
                      <div
                        key={index}
                        className={`${gradients[index]} rounded-2xl p-4 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-white/20 backdrop-blur-sm`}
                      >
                        <div className="flex justify-center mb-2">
                          <IconComponent
                            className="w-12 h-12 text-white drop-shadow-lg"
                            strokeWidth={1.5}
                          />
                        </div>
                        <div className="text-3xl font-bold text-white mb-1 drop-shadow-md">
                          {stat.stat}
                        </div>
                        <div className="text-sm font-bold text-white drop-shadow-sm">
                          {stat.label}
                        </div>
                        <p className="text-xs text-white/90">
                          {stat.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {currentDisplayMode === 1 && (
            <div className="w-full h-full flex items-center justify-center animate-carousel-in px-3">
              <div className="w-full max-w-5xl grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-800 shadow-2xl">
                    {presidentInsights[currentInsightIndex].image && (
                      <Image
                        src={presidentInsights[currentInsightIndex].image}
                        alt="President"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="glass-effect-dark rounded-2xl p-4 backdrop-blur-xl">
                    <blockquote className="relative">
                      <p className="text-sm md:text-base leading-tight mb-3 italic font-light text-blue-100">
                        &quot;{presidentInsights[currentInsightIndex].quote}
                        &quot;
                      </p>
                      <div className="text-right">
                        <div className="font-bold text-sm text-blue-300">
                          {presidentInsights[currentInsightIndex].source}
                        </div>
                      </div>
                    </blockquote>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    {presidentInsights.map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-full transition ${currentInsightIndex === index ? "bg-blue-400 w-6 h-3" : "bg-white/30 w-3 h-3"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentDisplayMode === 2 && (
            <div className="w-full h-full flex items-center justify-center animate-carousel-in px-3">
              <div className="w-full max-w-5xl grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-800 shadow-2xl">
                    {presidentFeedbackSlides[currentPresidentSlide].image && (
                      <Image
                        src={
                          presidentFeedbackSlides[currentPresidentSlide].image
                        }
                        alt="Slide"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Prezidentning Qarorları
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-300">
                    {presidentFeedbackSlides[currentPresidentSlide].title}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-tight mb-3">
                    {presidentFeedbackSlides[currentPresidentSlide].description}
                  </p>
                  <div className="flex justify-start gap-2 mt-2">
                    {presidentFeedbackSlides.map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-full transition ${currentPresidentSlide === index ? "bg-blue-400 w-5 h-3" : "bg-white/30 w-3 h-3"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentDisplayMode === 3 && (
            <div className="w-full h-full flex items-center justify-center animate-carousel-in px-3">
              <div className="w-full max-w-5xl grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-800 shadow-2xl">
                    {presidentFeedbackSlides[currentPresidentSlide].image && (
                      <Image
                        src={
                          presidentFeedbackSlides[currentPresidentSlide].image
                        }
                        alt="Slide"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    Prezidentning Qarorları
                  </h2>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-blue-300">
                    {presidentFeedbackSlides[currentPresidentSlide].title}
                  </h3>
                  <p className="text-sm md:text-base text-white/80 leading-tight mb-3">
                    {presidentFeedbackSlides[currentPresidentSlide].description}
                  </p>
                  <div className="flex justify-start gap-2 mt-2">
                    {presidentFeedbackSlides.map((_, index) => (
                      <div
                        key={index}
                        className={`rounded-full transition ${currentPresidentSlide === index ? "bg-blue-400 w-5 h-3" : "bg-white/30 w-3 h-3"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentDisplayMode === 4 && (
            <div className="w-full h-full flex items-center justify-center animate-carousel-in px-3">
              <section className="w-full max-w-7xl overflow-hidden rounded-2xl border border-cyan-300/25 bg-linear-to-r from-slate-950/95 via-blue-950/95 to-slate-900/95 text-slate-100 shadow-2xl">
                <div className="border-b border-cyan-300/20 bg-linear-to-r from-slate-950 via-slate-900 to-black px-4 py-2 md:px-6">
                  <h2 className="text-balance text-lg font-bold leading-tight text-white md:text-xl">
                    {internalDocuments.title}
                  </h2>
                </div>

                <div className="bg-[linear-gradient(130deg,rgba(2,8,23,0.6)_0%,rgba(15,23,42,0.55)_45%,rgba(30,64,175,0.25)_100%)] px-4 py-3 md:px-6 md:py-4">
                  <p className="mb-3 rounded-lg border border-cyan-300/30 bg-white/8 px-2 py-2 text-sm font-semibold leading-5 text-cyan-100 md:text-base md:leading-6">
                    {internalDocuments.subtitle}
                  </p>

                  <div className="grid gap-2 md:grid-cols-2 md:gap-3">
                    {[
                      internalDocuments.items.slice(
                        0,
                        Math.ceil(internalDocuments.items.length / 2),
                      ),
                      internalDocuments.items.slice(
                        Math.ceil(internalDocuments.items.length / 2),
                      ),
                    ].map((columnItems, columnIndex) => (
                      <ul
                        key={`docs-column-${columnIndex}`}
                        className="space-y-2"
                      >
                        {columnItems.map((item, itemIndex) => {
                          const iconPool = [
                            ShieldIcon,
                            BookOpenIcon,
                            FileIcon,
                            MegaphoneIcon,
                          ];
                          const IconComponent =
                            iconPool[
                              (itemIndex + columnIndex * 2) % iconPool.length
                            ];

                          return (
                            <li
                              key={`doc-item-${columnIndex}-${itemIndex}`}
                              className="flex items-start gap-2"
                            >
                              <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/25 bg-blue-600/90 text-white md:h-10 md:w-10">
                                <IconComponent className="h-4 w-4 md:h-5 md:w-5" />
                              </span>
                              <p className="text-sm leading-5 text-slate-100 md:text-sm md:leading-6">
                                {item}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {currentDisplayMode === 5 && (
            <div className="w-full h-full flex items-center justify-center animate-carousel-in px-3">
              <section className="w-full max-w-7xl overflow-hidden rounded-2xl border border-slate-200/20 bg-linear-to-r from-slate-950/95 via-blue-950/95 to-slate-900/95 shadow-2xl">
                <div className="grid h-full gap-2 p-2 md:grid-cols-[26%_74%] md:p-3">
                  <div className="relative min-h-48 overflow-hidden rounded-2xl border border-cyan-300/25 bg-slate-900/60">
                    <Image
                      src={corruptionLawDefinitions.image}
                      alt="Коррупцияга қарши курашиш тўғрисидаги қонун"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative rounded-2xl border-x-4 border-orange-500/90 px-2 py-2 md:px-3 md:py-2">
                    <div className="space-y-1 md:space-y-2">
                      {corruptionLawDefinitions.sections.map((section, idx) => (
                        <article
                          key={`law-def-${idx}`}
                          className="grid gap-1 md:grid-cols-[40px_1fr] md:gap-2"
                        >
                          <div className="hidden items-start justify-center md:flex">
                            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/70 bg-white/8 text-white md:h-9 md:w-9">
                              <FileIcon className="h-4 w-4 md:h-5 md:w-5" />
                            </span>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold leading-tight text-orange-500 md:text-base">
                              {section.title}
                            </h3>
                            <p className="mt-0.5 text-xs leading-4 text-slate-100 md:text-sm md:leading-5">
                              {section.text}
                            </p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {currentDisplayMode === 6 && (
            <div className="w-full h-full flex items-center justify-center animate-carousel-in px-3">
              <div className="w-full max-w-5xl grid grid-cols-2 gap-4">
                <div className="flex items-center justify-center">
                  <div className="relative w-full h-64 rounded-2xl overflow-hidden bg-slate-800 shadow-2xl">
                    {antiCorruptionDaySlides[currentAntiCorruptionSlide]
                      .image && (
                      <Image
                        src={
                          antiCorruptionDaySlides[currentAntiCorruptionSlide]
                            .image
                        }
                        alt="9-dekabr"
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {antiCorruptionDaySlides[currentAntiCorruptionSlide].title}
                  </h2>
                  <p className="text-sm md:text-base text-white/80 leading-tight mb-3">
                    {
                      antiCorruptionDaySlides[currentAntiCorruptionSlide]
                        .description
                    }
                  </p>
                  <div className="text-xs md:text-sm space-y-2 mb-3">
                    <h3 className="text-green-400 font-bold">
                      9-dekabrning tarixi va maqsadi
                    </h3>
                    {antiCorruptionDaySlides[
                      currentAntiCorruptionSlide
                    ].timeline.map((item, idx) => (
                      <div
                        key={`timeline-${idx}`}
                        className="flex gap-2 text-xs md:text-sm"
                      >
                        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white font-bold">
                          {item.number}
                        </span>
                        <div>
                          <p className="font-bold text-white">{item.title}</p>
                          <p className="text-white/70 text-xs">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-white/60 italic">
                    {antiCorruptionDaySlides[currentAntiCorruptionSlide].footer}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom: Info bar */}
        <div
          className={`flex-none relative flex items-center justify-center px-4 border-t border-white/10 bg-linear-to-r from-blue-900/30 via-transparent to-blue-900/30 ${currentDisplayMode === 5 ? "h-10" : "h-12"}`}
        >
          <div
            className={`text-center text-white/80 font-medium ${currentDisplayMode === 5 ? "text-xs" : "text-xs md:text-sm"}`}
          >
            <p>
              &quot;Issiqlik Elektr Stansiyalari AJ&quot; — Shaffoflik, Halollik
              va Javobgarlikni Kuchaytirish Platformasi
            </p>
          </div>
        </div>
      </div>

      {/* Hymn Intro Overlay */}
      {isIntroVisible && (
        <div className="pointer-events-none fixed left-0 right-0 top-3 z-50 flex justify-center px-3">
          <div
            className={`pointer-events-auto relative w-full max-w-330 overflow-hidden rounded-3xl border bg-linear-to-r from-blue-900/40 via-slate-900/40 to-blue-900/40 backdrop-blur-xl px-4 shadow-2xl transition-all duration-400 ease-out ${
              isIntroClosing
                ? "max-h-0 -translate-y-3 border-transparent py-0 opacity-0"
                : "max-h-52 translate-y-0 border-cyan-400/40 py-3 opacity-100"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-start gap-3">
                <Image
                  src="/icons/uzbekistan-flag.svg"
                  alt="Flag of Uzbekistan"
                  width={96}
                  height={64}
                  priority
                  className="h-auto shrink-0 rounded-xl border border-white/30 shadow-sm"
                />

                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h2 className="text-lg font-extrabold leading-tight tracking-tight text-white md:text-xl">
                      O&apos;zbekiston Respublikasi
                    </h2>
                    <span className="rounded-full border border-emerald-300/50 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-200 backdrop-blur">
                      Davlat madhiyasi
                    </span>
                  </div>

                  <p className="mt-0.5 text-sm font-medium text-white/70">
                    Davlat madhiyasi ijro etilmoqda
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Button
                  onClick={handleSkip}
                  className="min-h-10 rounded-xl border border-cyan-300/40 bg-linear-to-r from-cyan-500/20 to-blue-500/20 px-4 text-sm font-semibold text-white shadow-sm hover:from-cyan-500/30 hover:to-blue-500/30 backdrop-blur transition"
                >
                  O&apos;tkazib yuborish
                </Button>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-1.5 w-full bg-white/10">
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  background:
                    "linear-gradient(90deg, #0ea5e9, #06b6d4, #10b981)",
                  transition: "width 180ms linear",
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
