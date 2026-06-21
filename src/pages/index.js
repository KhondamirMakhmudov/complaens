import Image from "next/image";
import { Geist } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Shield, Zap, Award } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-40px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.92); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  .animate-fade-in { animation: fadeIn 0.8s ease-out; }
  .animate-slide-up { animation: slideUp 0.7s ease-out; }
  .animate-slide-down { animation: slideDown 0.7s ease-out; }
  .animate-slide-left { animation: slideLeft 0.7s ease-out; }
  .animate-slide-right { animation: slideRight 0.7s ease-out; }
  .animate-scale-in { animation: scaleIn 0.7s ease-out; }

  * {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
`;

const corruptionStats = [
  {
    icon: TrendingUp,
    stat: "$2.6T",
    label: "Yillik global zarar",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Shield,
    stat: "100%",
    label: "Keng ko'lamli nazorat",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Zap,
    stat: "24/7",
    label: "Anonim kanallar",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    stat: "419-SON",
    label: "Huquqiy baza",
    color: "from-green-500 to-emerald-500",
  },
];

const presidentInsights = [
  {
    quote:
      "Korrupsiya bilan hech qachon maqsadimizga erisha olmayiz. Korrupsiyaga qarshi kurashishda aholining barcha qatlamlari jalb qilinmas ekan, jamiyatimizning barcha a'zolari 'halollik vaksinasi' bilan emlanmas ekan, o'z oldimizga qo'ygan yuqsak maqsadlariga erisha olmayiz.",
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
      "Xalqaro standartlarga amal qilgan holda, korrupsiyaga qarshi kuchli turish, monitoring tizimlarini yaratish va fuqaro jamiyatining roli - davlatning taraqqiyotining asos bo'ladi.",
    source: "Islohot Dasturi",
    emphasis: "Xalqaro standartlar",
    image: "/files/president_image.jpg",
  },
];

const managerFeedback = {
  title: "Boshqaruv Rahbarining Xabari",
  manager: "B.I.Jurayev, Boshqaruv raisi",
  company: '"Issiqlik Elektr Stantsiyalari" AJ',
  quote:
    "Barchamizga ma'lumki, hozirgi zamon milliy va xalqaro huquqida salbiy illatlardan biri bu korrupsiyadir. Korrupsiyaning oldini olish va unga qarshi kurashish, davlat qurilishining barcha sohalarida korrupsiyogen omillarga chek qo'yishga qaratilgan islohotlar izchil amalga oshirilmoqda.",
  contact: "Komplayens bo'limi: +99855 5101509 | +99899 1109950",
  image: "/images/manager_image.jpg",
};

const internalDocuments = [
  '"IES" AJning korrupsiyaga qarshi siyosati',
  "Odob-axloq kodeksi",
  "Manfaatlar to'qnashuvini boshqarish bo'yicha nizom",
  "Kontragentlarni tekshirishga oid yo'riqnoma",
  "Korrupsiyaviy xavf-xatarlarni aniqlash va baholash uslubiyoti",
  "Xodimlarning korrupsiyaviy hatti-harakatlari va odob-axloq qoidalarini buzish holatlari ustidan xizmat tekshiruvlari o'tkazish bo'yicha reglament",
  "Aloqa kanallari orqali korrupsiyaviy hatti-harakatlar to'g'risida kelib tushgan xabarlarni qabul qilish va ko'rib chiqish reglamenti",
  "Xodimlarning etika va korrupsiyaga qarshi kurashish sohasida o'qitishni tashkil qilish bo'yicha yo'riqnoma",
  "Jamiyatga ishga qabul qilinayotgan nomzodlarni tekshirish bo'yicha yo'riqnoma",
];

const antiCorruptionDay = {
  title: "9-dekabr: Xalqaro Korrupsiyaga Qarshi Kurashish Kuni",
  description:
    "Butun dunyo bo'ylab har yili 9-dekabr kuni nishonlanadi. Bu kun korrupsiya va uning jamiyatga yetkazadigan zarariga qarshi kurashish uchun bag'ishlangan.",
  image: "/files/corruption-1.png",
  timeline: [
    {
      year: "2003",
      event: "BMT Bosh Assambleyasining qarori",
      detail:
        "9-dekabr Xalqaro korrupsiyaga qarshi kurashish kuni deb e'lon qilindi",
    },
    {
      year: "2025",
      event: "Yangi elektron xizmatlari",
      detail:
        "Elektron davlat xizmatlari joriy etilishi orqali shaffoflik oshirildi",
    },
    {
      year: "2025",
      event: "Qaynar chiziq faoliyati",
      detail: "Fuqarolar anonim murojaat qilishlar uchun telefon qaynar chiziq",
    },
  ],
};

export default function Home() {
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const [currentSection, setCurrentSection] = useState(1);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);
  const [isHymnPlaying, setIsHymnPlaying] = useState(true);
  const [displayDateTime, setDisplayDateTime] = useState({
    date: "",
    time: "",
  });

  // Sections: 1=stats, 2=insights, 3=internal-docs, 4=anti-corruption-day, 5=manager-feedback
  const totalSections = 5;

  useEffect(() => {
    const styleEl = document.createElement("style");
    styleEl.textContent = animationStyles;
    document.head.appendChild(styleEl);
  }, []);

  // Play national anthem on mount
  useEffect(() => {
    const playAnthem = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.src = "/music/hymn.m4a";
          await audioRef.current.play();
          const handleEnded = () => setIsHymnPlaying(false);
          audioRef.current.addEventListener("ended", handleEnded);
        } catch (err) {
          console.log("Anthem playback note:", err.message);
          setIsHymnPlaying(false);
        }
      }
    };
    playAnthem();
  }, []);

  // Auto-advance sections every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSection((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  // Keep the header clock client-only so server and client HTML match.
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setDisplayDateTime({
        date: new Intl.DateTimeFormat("uz-UZ", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(now),
        time: new Intl.DateTimeFormat("uz-UZ", {
          hour: "2-digit",
          minute: "2-digit",
        }).format(now),
      });
    };

    updateClock();
    const timer = setInterval(updateClock, 60000);
    return () => clearInterval(timer);
  }, []);

  // Rotate stats within stats section
  useEffect(() => {
    if (currentSection === 1) {
      const timer = setInterval(() => {
        setCurrentStatIndex((prev) => (prev + 1) % corruptionStats.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [currentSection]);

  // Rotate insights within insights section
  useEffect(() => {
    if (currentSection === 2) {
      const timer = setInterval(() => {
        setCurrentInsightIndex((prev) => (prev + 1) % presidentInsights.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentSection]);

  return (
    <div
      ref={containerRef}
      className={`w-screen h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden flex flex-col ${geistSans.className}`}
    >
      <audio ref={audioRef} />

      {isHymnPlaying && (
        <div className="relative z-50 w-full bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-900 border-b border-blue-400/40 px-8 py-3 flex items-center justify-between animate-slide-down">
          <div className="flex items-center gap-4">
            <Image
              src="/icons/uzbekistan-flag.svg"
              alt="O'zbekiston bayrog'i"
              width={36}
              height={22}
              className="rounded shadow"
            />
            <div>
              <p className="text-white font-semibold text-sm">
                O'zbekiston Respublikasi Davlat Madhiyasi
              </p>
              <p className="text-blue-300 text-xs">Ijro etilmoqda...</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-blue-400 rounded-full animate-pulse" />
            <span className="w-1.5 h-6 bg-white rounded-full animate-pulse delay-75" />
            <span className="w-1.5 h-3 bg-blue-400 rounded-full animate-pulse delay-150" />
            <span className="w-1.5 h-5 bg-white rounded-full animate-pulse delay-75" />
            <span className="w-1.5 h-2 bg-blue-300 rounded-full animate-pulse" />
          </div>
        </div>
      )}

      {/* Header: Logo & Title */}
      <header className="flex items-center justify-between px-8 py-6 bg-black/40 backdrop-blur-md border-b border-blue-500/20">
        <div className="flex items-center gap-4">
          <Image
            src="/icons/ies_brand.svg"
            alt="Brand"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">
              "Issiqlik Elektr Stantsiyalari" AJ
            </h1>
            <p className="text-sm text-blue-300">
              Korrupsiyaga Qarshi Kurashish
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-white/60 min-h-[1.25rem]">
            {displayDateTime.date}
          </p>
          <p className="text-lg font-semibold text-blue-300 min-h-[1.75rem]">
            {displayDateTime.time}
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex items-center justify-center px-8 py-8">
        {/* Section 1: Statistics */}
        {currentSection === 1 && (
          <div className="w-full h-full animate-scale-in">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-4xl font-bold text-white mb-12 animate-slide-down">
                Korrupsiyaning Global Ta'siri
              </h2>
              <div className="grid grid-cols-2 gap-8 w-full max-w-5xl">
                {corruptionStats.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = idx === currentStatIndex;
                  return (
                    <div
                      key={idx}
                      className={`relative transform transition-all duration-500 ${
                        isActive
                          ? "scale-110 opacity-100"
                          : "scale-90 opacity-60"
                      }`}
                    >
                      <div
                        className={`bg-gradient-to-br ${item.color} rounded-3xl p-12 text-white shadow-2xl backdrop-blur-sm h-56 flex flex-col justify-center items-center text-center`}
                      >
                        <Icon className="w-16 h-16 mb-6 opacity-80" />
                        <p className="text-6xl font-bold mb-4">{item.stat}</p>
                        <p className="text-xl font-semibold">{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Section 2: Presidential Insights */}
        {currentSection === 2 && (
          <div className="w-full h-full animate-scale-in">
            <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto">
              <div className="relative w-full grid grid-cols-3 gap-6">
                <div className="col-span-1 flex items-center justify-center">
                  <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-slate-800 shadow-2xl">
                    {presidentInsights[currentInsightIndex].image && (
                      <Image
                        src={presidentInsights[currentInsightIndex].image}
                        alt="President"
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                </div>
                <div className="col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 shadow-2xl flex flex-col justify-between backdrop-blur-sm border border-blue-400/30">
                  <div>
                    <p className="text-xl font-light italic text-white leading-relaxed mb-8">
                      "{presidentInsights[currentInsightIndex].quote}"
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-8 border-t border-white/20">
                    <div>
                      <p className="font-semibold text-white">
                        {presidentInsights[currentInsightIndex].source}
                      </p>
                      <p className="text-sm text-blue-200">
                        {presidentInsights[currentInsightIndex].emphasis}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      {presidentInsights.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-2 rounded-full transition-all ${
                            idx === currentInsightIndex
                              ? "w-8 bg-white"
                              : "w-2 bg-white/40"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: Internal Documents */}
        {currentSection === 3 && (
          <div className="w-full h-full animate-scale-in">
            <div className="flex flex-col justify-center h-full max-w-7xl mx-auto">
              <div className="rounded-[28px] overflow-hidden border border-cyan-500/20 bg-gradient-to-br from-slate-950/95 via-slate-950/90 to-blue-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                <div className="bg-black/45 px-8 py-6 border-b border-white/10">
                  <h2 className="text-[2rem] leading-tight font-bold uppercase text-white max-w-5xl animate-slide-down">
                    "Issiqlik Elektr Stantsiyalari" AJ da korrupsiyaga qarshi kurashish bo'yicha qabul qilingan ichki me'yoriy hujjatlar
                  </h2>
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-6 rounded-2xl border border-cyan-400/30 bg-white/10 px-6 py-4 backdrop-blur-sm">
                    <p className="text-lg font-semibold leading-relaxed text-cyan-50/95">
                      Ushbu siyosatning tamoyillari va talablari barcha xodimlar uchun, ularning egallab turgan lavozimidan qat'i nazar, majburiy.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                    {internalDocuments.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 rounded-2xl px-1 py-1"
                      >
                        <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-300/30 bg-blue-500/25 text-sm font-bold text-white shadow-[0_8px_30px_rgba(59,130,246,0.25)]">
                          {idx + 1}
                        </span>
                        <p className="text-[1.02rem] leading-relaxed text-white/90">
                          {doc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 4: Anti-Corruption Day */}
        {currentSection === 4 && (
          <div className="w-full h-full animate-scale-in">
            <div className="flex flex-col items-center justify-center h-full max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-4 animate-slide-down text-center">
                {antiCorruptionDay.title}
              </h2>
              <p className="text-lg text-green-200 mb-12 text-center max-w-3xl">
                {antiCorruptionDay.description}
              </p>
              <div className="grid grid-cols-4 gap-6 w-full items-center">
                <div className="col-span-1 flex items-center justify-center">
                  <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-slate-800 shadow-2xl">
                    {antiCorruptionDay.image && (
                      <Image
                        src={antiCorruptionDay.image}
                        alt="9-dekabr"
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-6">
                  {antiCorruptionDay.timeline.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl p-8 backdrop-blur-sm border border-green-400/30"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="text-4xl font-bold text-white/30 mb-4">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">
                        {item.event}
                      </h3>
                      <p className="text-green-100 text-sm leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 5: Manager Feedback */}
        {currentSection === 5 && (
          <div className="w-full h-full animate-scale-in">
            <div className="flex flex-col items-center justify-center h-full max-w-6xl mx-auto">
              <p className="text-xl md:text-2xl text-white font-semibold mb-2 text-center">
                {managerFeedback.manager}
              </p>
              <p className="text-blue-200/90 mb-10 text-center">
                {managerFeedback.company}
              </p>

              <div className="grid grid-cols-3 gap-8 w-full items-stretch">
                <div className="col-span-1 flex items-center justify-center">
                  <div className="relative w-full h-80 rounded-[28px] overflow-hidden bg-slate-900 shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-slate-950/25 z-10" />
                    {managerFeedback.image && (
                      <Image
                        src={managerFeedback.image}
                        alt="Manager"
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                  </div>
                </div>
                <div className="col-span-2 rounded-[28px] p-10 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md border border-white/10 bg-gradient-to-br from-slate-900/80 via-blue-950/80 to-slate-900/90 flex flex-col justify-between">
                  <blockquote className="text-lg md:text-xl font-light italic text-blue-50 leading-relaxed mb-10">
                    “{managerFeedback.quote}”
                  </blockquote>
                  <div className="pt-8 border-t border-white/10">
                    <p className="text-base md:text-lg font-semibold text-white mb-3">
                      Murojaat uchun:
                    </p>
                    <p className="text-blue-100 text-base md:text-lg">
                      {managerFeedback.contact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer: Section Indicator & Navigation */}
      <footer className="bg-black/40 backdrop-blur-md border-t border-blue-500/20 px-8 py-5 flex items-center justify-center">
        <div className="flex gap-2">
          {Array.from({ length: totalSections }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSection(idx + 1)}
              className={`h-3 rounded-full transition-all ${
                idx + 1 === currentSection
                  ? "w-8 bg-blue-500"
                  : "w-3 bg-blue-500/40 hover:bg-blue-500/60"
              }`}
              aria-label={`Go to section ${idx + 1}`}
            />
          ))}
        </div>
      </footer>
    </div>
  );
}
