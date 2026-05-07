import fs from "node:fs/promises";
import path from "node:path";
import JSZip from "jszip";
import { XMLParser } from "fast-xml-parser";

const root = process.cwd();
const argInput = process.argv[2]?.trim();
const inputName =
  argInput && argInput.length > 0 ? argInput : "anti-curroption-day";
const slug = inputName.replace(/\.pptx$/i, "");

const pptxPath = path.join(root, "public", "files", `${slug}.pptx`);
const assetsDir = path.join(root, "public", "files", `${slug}-assets`);
const contentPath = path.join(root, "src", "pages", slug, "content.json");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const toArray = (v) => (Array.isArray(v) ? v : v ? [v] : []);

const walk = (node, fn) => {
  if (Array.isArray(node)) {
    node.forEach((n) => walk(n, fn));
    return;
  }
  if (node && typeof node === "object") {
    fn(node);
    Object.values(node).forEach((v) => walk(v, fn));
  }
};

const uniqueOrdered = (arr) => {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const k = String(item).trim();
    if (!k || seen.has(k)) continue;
    seen.add(k);
    out.push(k);
  }
  return out;
};

await fs.mkdir(assetsDir, { recursive: true });

const fileBuffer = await fs.readFile(pptxPath);
const zip = await JSZip.loadAsync(fileBuffer);

const slideXmlPaths = Object.keys(zip.files)
  .filter((p) => /^ppt\/slides\/slide\d+\.xml$/.test(p))
  .sort((a, b) => {
    const na = Number(a.match(/slide(\d+)\.xml$/)?.[1] || 0);
    const nb = Number(b.match(/slide(\d+)\.xml$/)?.[1] || 0);
    return na - nb;
  });

const slides = [];

for (const slideXmlPath of slideXmlPaths) {
  const slideNo = Number(slideXmlPath.match(/slide(\d+)\.xml$/)?.[1] || 0);
  const relPath = `ppt/slides/_rels/slide${slideNo}.xml.rels`;

  const slideXml = await zip.file(slideXmlPath).async("string");
  const slideObj = parser.parse(slideXml);

  const texts = [];
  walk(slideObj, (node) => {
    if (typeof node["a:t"] === "string") texts.push(node["a:t"]);
  });
  const cleanTexts = uniqueOrdered(texts);

  const embedIds = [];
  walk(slideObj, (node) => {
    if (typeof node["@_r:embed"] === "string") embedIds.push(node["@_r:embed"]);
  });
  const embedIdSet = new Set(embedIds);

  const relMap = new Map();
  if (zip.file(relPath)) {
    const relXml = await zip.file(relPath).async("string");
    const relObj = parser.parse(relXml);
    const rels = toArray(relObj?.Relationships?.Relationship);
    for (const rel of rels) {
      if (rel?.["@_Id"] && rel?.["@_Target"])
        relMap.set(rel["@_Id"], rel["@_Target"]);
    }
  }

  const images = [];
  let imgIndex = 0;
  for (const embedId of embedIdSet) {
    const target = relMap.get(embedId);
    if (!target) continue;

    const normalized = path.posix.normalize(
      path.posix.join("ppt/slides", target),
    );
    const zipPath = normalized.startsWith("ppt/")
      ? normalized
      : `ppt/${normalized.replace(/^\//, "")}`;
    const entry = zip.file(zipPath);
    if (!entry) continue;

    const ext = path.extname(zipPath) || ".png";
    imgIndex += 1;
    const outName = `slide-${String(slideNo).padStart(2, "0")}-${imgIndex}${ext}`;
    const outDiskPath = path.join(assetsDir, outName);
    const imgBuffer = await entry.async("nodebuffer");
    await fs.writeFile(outDiskPath, imgBuffer);
    images.push(`/files/${slug}-assets/${outName}`);
  }

  const title = cleanTexts[0] || `Slide ${slideNo}`;
  const bodyTexts = cleanTexts.length > 1 ? cleanTexts.slice(1) : cleanTexts;

  slides.push({
    slide: slideNo,
    title,
    texts: bodyTexts,
    images,
  });
}

await fs.mkdir(path.dirname(contentPath), { recursive: true });
await fs.writeFile(contentPath, JSON.stringify(slides, null, 2), "utf8");

console.log(`EXTRACTED ${slides.length} slides`);
console.log(`SLUG ${slug}`);
console.log(`WROTE ${contentPath}`);
console.log(`IMAGES ${slides.reduce((a, s) => a + s.images.length, 0)}`);
