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

export default function AntiCurroptionDayPage() {
  const router = useRouter();

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
            Korrupsiyaga qarshi kurashish kuni materiallari
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
