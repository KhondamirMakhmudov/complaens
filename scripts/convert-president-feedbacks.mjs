import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";

const root = process.cwd();
const pptxPath = path.join(root, "public", "files", "president_feedbacks.pptx");
const outputJsonPath = path.join(
  root,
  "src",
  "pages",
  "president_feedbacks",
  "content.json",
);
const outputAssetsDir = path.join(
  root,
  "public",
  "files",
  "president_feedbacks-assets",
);

const decodeXml = (text = "") =>
  text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#xA;/g, " ")
    .replace(/&#10;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getSlideNumber = (slidePath) => {
  const m = slidePath.match(/slide(\d+)\.xml$/);
  return m ? Number(m[1]) : 0;
};

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const exists = async (p) => {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
};

const run = async () => {
  if (!(await exists(pptxPath))) {
    throw new Error(`PPTX file not found: ${pptxPath}`);
  }

  await ensureDir(outputAssetsDir);
  await ensureDir(path.dirname(outputJsonPath));

  const pptxBuffer = await fs.readFile(pptxPath);
  const zip = await JSZip.loadAsync(pptxBuffer);

  const slidePaths = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => getSlideNumber(a) - getSlideNumber(b));

  const slides = [];

  for (const slidePath of slidePaths) {
    const slideNo = getSlideNumber(slidePath);
    const slideXml = await zip.file(slidePath).async("string");

    const textMatches = [...slideXml.matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)];
    const texts = textMatches.map((m) => decodeXml(m[1])).filter(Boolean);

    const title = texts[0] || `Slide ${slideNo}`;

    const embedIds = new Set(
      [...slideXml.matchAll(/r:embed="(rId\d+)"/g)].map((m) => m[1]),
    );

    const relPath = `ppt/slides/_rels/slide${slideNo}.xml.rels`;
    const images = [];

    if (zip.file(relPath) && embedIds.size > 0) {
      const relXml = await zip.file(relPath).async("string");
      const relMatches = [
        ...relXml.matchAll(
          /<Relationship[^>]*Id="([^"]+)"[^>]*Target="([^"]+)"[^>]*\/>/g,
        ),
      ];

      for (const [, relId, target] of relMatches) {
        if (!embedIds.has(relId)) continue;
        if (!/\.\.?\/media\//.test(target)) continue;

        const mediaName = target.split("/").pop();
        const mediaZipPath = `ppt/media/${mediaName}`;
        const mediaFile = zip.file(mediaZipPath);
        if (!mediaFile) continue;

        const ext = path.extname(mediaName) || ".png";
        const outputName = `slide-${String(slideNo).padStart(2, "0")}-${relId}${ext}`;
        const outputDiskPath = path.join(outputAssetsDir, outputName);
        const publicPath = `/files/president_feedbacks-assets/${outputName}`;

        const fileBuffer = await mediaFile.async("nodebuffer");
        await fs.writeFile(outputDiskPath, fileBuffer);
        images.push(publicPath);
      }
    }

    slides.push({
      slide: slideNo,
      title,
      texts,
      images,
    });
  }

  await fs.writeFile(
    outputJsonPath,
    `${JSON.stringify(slides, null, 2)}\n`,
    "utf8",
  );

  console.log(`Converted ${slides.length} slides.`);
  console.log(`JSON: ${outputJsonPath}`);
  console.log(`Assets: ${outputAssetsDir}`);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
