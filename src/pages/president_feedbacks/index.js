import Image from "next/image";
import { Geist } from "next/font/google";
import { useRouter } from "next/router";
import { ChevronLeftIcon, FileIcon } from "@/components/ui/site-icons";
import slides from "./content.json";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const FILE_PATH = "/files/president_feedbacks.pptx";

const mergePunctuation = (items = []) => {
  const out = [];
  for (const item of items) {
    const value = String(item || "").trim();
    if (!value) continue;

    if (
      [".", ",", ";", ":", "!", "?", '"', "'"].includes(value) &&
      out.length > 0
    ) {
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

const getRenderableImages = (images = [], slideNo) => {
  if (!images?.length) return [];

  // Filter extracted decorative logo image that looks visually noisy in converted layout
  const filtered = images.filter((src) => {
    if (/slide-01-rId2\.|slide-02-rId3\./.test(src)) {
      return false;
    }
    return true;
  });

  if (!filtered.length) return [];
  if (filtered.length > 8) return [];
  if (filtered.length > 4) return filtered.slice(0, 4);
  return filtered;
};

export default function PresidentFeedbacksPage() {
  const router = useRouter();

  return (
    <div
      className={`${geistSans.className} min-h-screen bg-linear-to-b from-slate-100 via-sky-50/50 to-slate-100 text-slate-900`}
    >
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center gap-2 rounded-lg border border-sky-200 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-sky-50"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Ortga
          </button>

          <a
            href={FILE_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
          >
            <FileIcon className="h-5 w-5" />
            PPTX yuklab olish
          </a>
        </div>

        <div className="space-y-6">
          {slides.map((slide) => {
            const paragraphs = toReadableParagraphs(slide.texts);
            const renderImages = getRenderableImages(slide.images, slide.slide);
            const isImageOnlySlide =
              renderImages.length === 1 && paragraphs.length === 0;
            const rawTitle = String(slide.title || "").trim();
            const displayTitle = /^slide\s*\d+$/i.test(rawTitle)
              ? ""
              : rawTitle;

            return (
              <section
                key={slide.slide}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(2,32,71,0.07)]"
              >
                <div className="h-2 bg-blue-600" />

                <div className="relative overflow-hidden bg-[#ececec] px-5 py-5 md:px-8 md:py-7">
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-linear-to-l from-lime-500/85 to-transparent" />
                  <div className="pointer-events-none absolute -left-8 -top-10 h-52 w-32 rotate-12 bg-lime-500/85" />

                  {isImageOnlySlide ? (
                    <div className="relative z-10">
                      <div className="overflow-hidden rounded-2xl border border-slate-300/80 bg-white shadow-sm">
                        <Image
                          src={renderImages[0]}
                          alt={`${displayTitle || "Taqdimot rasmi"} — rasm`}
                          width={1800}
                          height={1000}
                          className="h-auto w-full object-contain"
                        />
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`relative z-10 grid gap-4 ${renderImages.length > 0 ? "lg:grid-cols-[1.3fr_1fr]" : "grid-cols-1"}`}
                    >
                      <div className="space-y-3">
                        {paragraphs.length > 0 ? (
                          <div className="rounded-2xl border-l-4 border-blue-500 bg-slate-100/80 px-5 py-4 shadow-sm">
                            <div className="space-y-3 text-[17px] leading-8 text-[#1e3559] md:text-[18px]">
                              {paragraphs.map((text, textIndex) => (
                                <p key={`${slide.slide}-text-${textIndex}`}>
                                  {text}
                                </p>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-slate-500">
                            Matn topilmadi.
                          </p>
                        )}

                        <p className="text-xl font-semibold text-slate-500">
                          2026 yil, Toshkent sh.
                        </p>
                      </div>

                      {renderImages.length > 0 && (
                        <div
                          className={`grid gap-3 ${renderImages.length === 1 ? "grid-cols-1" : "sm:grid-cols-2 lg:grid-cols-1"}`}
                        >
                          {renderImages.map((src, imageIndex) => (
                            <div
                              key={`${slide.slide}-img-${imageIndex}`}
                              className="overflow-hidden rounded-xl border border-slate-300/80 bg-white shadow-sm"
                            >
                              <Image
                                src={src}
                                alt={`${displayTitle || "Taqdimot rasmi"} — rasm ${imageIndex + 1}`}
                                width={1200}
                                height={700}
                                className="h-auto w-full object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
}
