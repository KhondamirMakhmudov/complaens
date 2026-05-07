import Image from "next/image";
import { Geist } from "next/font/google";
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

const splitTextGroups = (texts = []) => {
  const cleaned = mergePunctuation(texts);
  const paragraphs = [];
  const keywords = [];

  for (const text of cleaned) {
    const words = text.split(/\s+/).filter(Boolean);
    const isKeywordLike = words.length <= 3 && text.length <= 30;

    if (isKeywordLike) {
      keywords.push(text);
    } else {
      paragraphs.push(text);
    }
  }

  return { paragraphs, keywords };
};

export default function AntiCurroptionDayPage() {
  return (
    <div
      className={`${geistSans.className} min-h-screen bg-linear-to-b from-slate-100 via-sky-50/50 to-slate-100 text-slate-900`}
    >
      <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <header className="mb-7 rounded-3xl border border-sky-100 bg-white/95 p-5 shadow-[0_12px_40px_rgba(2,32,71,0.08)] backdrop-blur-sm md:p-8">
          <h1 className="text-balance bg-linear-to-r from-blue-700 to-blue-500 bg-clip-text text-2xl font-black text-transparent md:text-4xl">
            Korrupsiyaga qarshi kurashish kuni materiallari
          </h1>
        </header>

        <div className="space-y-6">
          {slides.map((slide) => {
            const { paragraphs, keywords } = splitTextGroups(slide.texts);

            return (
              <section
                key={slide.slide}
                className="overflow-hidden rounded-3xl border border-sky-100 bg-white shadow-[0_10px_30px_rgba(2,32,71,0.07)]"
              >
                <div className="border-b border-slate-100 bg-linear-to-r from-slate-50 to-sky-50/60 px-5 py-4 md:px-7">
                  <h2 className="text-balance text-xl font-extrabold text-slate-900 md:text-2xl">
                    {slide.title}
                  </h2>
                </div>

                <div className="space-y-5 px-5 py-5 md:px-7 md:py-6">
                  {paragraphs?.length > 0 && (
                    <div className="space-y-3 text-[15px] leading-7 text-slate-700 md:text-base">
                      {paragraphs.map((text, textIndex) => (
                        <p key={`${slide.slide}-text-${textIndex}`}>{text}</p>
                      ))}
                    </div>
                  )}

                  {keywords?.length >= 4 && (
                    <div className="flex flex-wrap gap-2 border-t border-dashed border-slate-200 pt-4">
                      {keywords.map((word, keywordIndex) => (
                        <span
                          key={`${slide.slide}-keyword-${keywordIndex}`}
                          className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-sm font-semibold text-sky-800"
                        >
                          {word}
                        </span>
                      ))}
                    </div>
                  )}

                  {slide.images?.length > 0 && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {slide.images.map((src, imageIndex) => (
                        <div
                          key={`${slide.slide}-img-${imageIndex}`}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
                        >
                          <Image
                            src={src}
                            alt={`${slide.title} — rasm ${imageIndex + 1}`}
                            width={1200}
                            height={700}
                            className="h-auto w-full transition duration-300 hover:scale-[1.01]"
                          />
                        </div>
                      ))}
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
