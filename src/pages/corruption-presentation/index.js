import Image from "next/image";
import { Geist } from "next/font/google";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@/components/ui/site-icons";
import slides from "./content.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const mergePunctuation = (items = []) => {
  const out = [];
  for (const item of items) {
    const value = String(item || "").trim();
    if (!value) continue;

    if ([".", ",", ";", ":", "!", "?"].includes(value) && out.length > 0) {
      out[out.length - 1] = `${out[out.length - 1]}${value}`;
      continue;
    }

    out.push(value);
  }

  return out;
};

const toReadableParagraphs = (texts = []) => {
  const cleaned = mergePunctuation(texts);
  if (cleaned.length === 0) {
    return [];
  }

  const shortLineCount = cleaned.filter(
    (t) => t.split(/\s+/).filter(Boolean).length <= 3,
  ).length;
  const mostlyFragmented = shortLineCount / cleaned.length >= 0.35;

  if (!mostlyFragmented) {
    return cleaned;
  }

  const combined = cleaned
    .join(" ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim();

  const sentences = combined.split(/(?<=[.!?])\s+/).filter(Boolean);
  if (sentences.length <= 2) {
    return [combined];
  }

  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += 2) {
    paragraphs.push(sentences.slice(i, i + 2).join(" "));
  }

  return paragraphs;
};

const getRenderableImages = (images = []) => {
  if (!images?.length) return [];
  if (images.length > 8) return [];
  if (images.length > 4) return images.slice(0, 2);
  return images;
};

export default function CorruptionPresentationPage() {
  const router = useRouter();

  const renderContactSlide = (slide) => {
    return (
      <section
        key={slide.slide}
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(2,32,71,0.07)]"
      >
        {/* Dark header with website */}
        <div className="bg-linear-to-r from-slate-900 to-slate-800 px-6 py-8 text-white md:px-10">
          <h2 className="text-4xl font-black md:text-5xl">{slide.title}</h2>
        </div>

        {/* Contact cards grid */}
        <div className="space-y-6 bg-white px-6 py-10 md:px-10">
          {/* Main contact header */}
          <div className="border-l-4 border-orange-500 bg-linear-to-r from-orange-50 to-orange-100/30 px-5 py-4">
            <p className="text-lg font-bold text-slate-900">
              ҚОИДАБУЗАРЛИКЛАР ҲАҚИДА МАЪЛУМ ҚИЛИШ
            </p>
          </div>

          {/* Contact items grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Email */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:border-orange-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition-transform group-hover:scale-110">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Email
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900 wrap-break-word">
                    stopcorruption@tpp.uz
                  </p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:border-blue-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-transform group-hover:scale-110">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Phone (Online)
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    55-510-15-09
                  </p>
                </div>
              </div>
            </div>

            {/* Phone Mobile */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:border-purple-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 transition-transform group-hover:scale-110">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Mobile
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    99897-109-00-30
                  </p>
                </div>
              </div>
            </div>

            {/* Telegram */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:border-cyan-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-100 text-cyan-600 transition-transform group-hover:scale-110">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Telegram
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900 wrap-break-word">
                    @stopcorruptiontpp_bot
                  </p>
                </div>
              </div>
            </div>

            {/* Website */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:border-emerald-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-transform group-hover:scale-110">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Website
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    www.tpp.uz
                  </p>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-lg hover:border-indigo-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-transform group-hover:scale-110">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 20l4-16m2 16l4-16M6 9h12M6 5h12"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase text-slate-500">
                    Hashtag
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    #ies.uzbekistan
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom banner */}
          <div className="relative overflow-hidden rounded-xl bg-linear-to-r from-blue-600 to-blue-700 px-6 py-6 text-white">
            <div className="relative z-10">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
                Bog'lanish uchun
              </p>
              <p className="mt-2 text-lg font-bold">
                Barcha yo'llar ochiq. Biz siz bilan bog'lanishni kutib turamiz!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  };
  return (
    <div
      className={`${geistSans.className} min-h-screen bg-linear-to-b from-slate-100 via-sky-50/50 to-slate-100 text-slate-900`}
    >
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-6">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-4 py-2 font-semibold text-slate-700 hover:bg-sky-50 transition"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Ortga
          </button>
        </div>

        <header className="mb-7 rounded-3xl border border-sky-100 bg-white/95 p-5 shadow-[0_12px_40px_rgba(2,32,71,0.08)] backdrop-blur-sm md:p-8">
          <h1 className="text-balance bg-linear-to-r from-blue-700 to-blue-500 bg-clip-text text-2xl font-black text-transparent md:text-4xl">
            Korrupsiya taqdimoti materiallari
          </h1>
        </header>

        <div className="space-y-6">
          {slides.map((slide) => {
            const paragraphs = toReadableParagraphs(slide.texts);
            const renderImages = getRenderableImages(slide.images);
            const isLogoMode =
              paragraphs.length <= 1 &&
              renderImages.length > 0 &&
              renderImages.length <= 3;
            const isCoverSlide = slide.slide === 1;

            if (isCoverSlide) {
              const emblemSrc = renderImages[0];
              const logoSrc = renderImages[1];

              return (
                <section
                  key={slide.slide}
                  className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_10px_30px_rgba(2,32,71,0.07)]"
                >
                  <div className="bg-linear-to-b from-white to-slate-50 px-6 py-8 text-center md:px-10 md:py-10">
                    {emblemSrc && (
                      <Image
                        src={emblemSrc}
                        alt="O'zbekiston gerbi"
                        width={120}
                        height={120}
                        className="mx-auto h-24 w-24 object-contain md:h-28 md:w-28"
                      />
                    )}

                    <p className="mt-4 text-lg font-semibold text-slate-700 md:text-3xl">
                      “ИССИҚЛИК ЭЛЕКТР СТАНЦИЯЛАРИ” АЖ
                    </p>

                    <h2 className="mx-auto mt-6 max-w-4xl text-balance text-3xl font-black uppercase tracking-tight text-slate-900 md:text-5xl">
                      КОРРУПЦИЯГА ҚАРШИ КУРАШИШ ВА УНИНГ ҲУҚУҚИЙ АСОСЛАРИ
                    </h2>

                    {logoSrc && (
                      <Image
                        src={logoSrc}
                        alt="IES logotipi"
                        width={230}
                        height={120}
                        className="mx-auto mt-6 h-24 w-auto object-contain md:h-28"
                      />
                    )}

                    <p className="mt-4 text-xl font-bold text-slate-700">
                      Тошкент-2025 й.
                    </p>
                  </div>
                </section>
              );
            }

            // Contact/Info slide layout (slide 7)
            if (slide.slide === 7) {
              return renderContactSlide(slide);
            }

            // Content slide layout with emblem, orange bar, and structured sections
            const emblemImage = renderImages[0];

            return (
              <section
                key={slide.slide}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(2,32,71,0.07)]"
              >
                {/* Orange accent bar at top */}
                <div className="h-2 bg-orange-500"></div>

                {/* Header with title */}
                <div className="border-b border-slate-100 bg-white px-6 py-5 md:px-8">
                  <h2 className="text-balance text-2xl font-black text-slate-900 md:text-3xl">
                    {slide.title}
                  </h2>
                </div>

                {/* Two-column layout: emblem on left, content on right */}
                <div className="flex flex-col md:flex-row">
                  {/* Left column: Emblem */}
                  {emblemImage && (
                    <div className="flex items-center justify-center border-r border-slate-100 bg-slate-50/50 px-6 py-8 md:w-1/3 md:py-10">
                      <Image
                        src={emblemImage}
                        alt="O'zbekiston gerbi"
                        width={200}
                        height={200}
                        className="h-48 w-48 object-contain md:h-56 md:w-56"
                      />
                    </div>
                  )}

                  {/* Right column: Content with orange accent bars */}
                  <div
                    className={`space-y-6 px-6 py-8 md:py-10 ${emblemImage ? "md:w-2/3" : "w-full"}`}
                  >
                    {/* Text content with orange left border accent */}
                    {paragraphs?.length > 0 && (
                      <div className="border-l-4 border-orange-500 bg-orange-50/30 px-5 py-4">
                        <div className="space-y-3 text-[15px] leading-7 text-slate-700 md:text-base">
                          {paragraphs.map((text, textIndex) => (
                            <p key={`${slide.slide}-text-${textIndex}`}>
                              {text}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Images with orange accent */}
                    {renderImages.length > 0 && emblemImage && (
                      <div className="border-l-4 border-orange-500 bg-orange-50/30 px-5 py-4">
                        <div className="grid gap-3 sm:grid-cols-2">
                          {renderImages.slice(1).map((src, imageIndex) => (
                            <div
                              key={`${slide.slide}-img-${imageIndex}`}
                              className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                            >
                              <Image
                                src={src}
                                alt={`${slide.title} — rasm ${imageIndex + 1}`}
                                width={600}
                                height={400}
                                className="h-auto w-full object-contain p-3"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {slide.images?.length > renderImages.length && (
                      <p className="text-sm text-slate-500">
                        Ayrim bezakli rasmlar avtomatik yashirildi.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
