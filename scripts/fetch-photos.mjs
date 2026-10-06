// Downloads the site photography from Wikimedia Commons, resizes it for the
// web and records author / license / source for every file.
//
//   node scripts/fetch-photos.mjs
//
// Output: public/images/norway/** + src/content/photo-credits.json
//
//   node scripts/fetch-photos.mjs story   → only files whose path contains "story"
// (IMAGE_SOURCES.md in the project root is written from the same data).

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const UA = "AroundTheWorldSite/1.0 (image attribution script)";
const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "public", "images", "norway");

/** file → Commons title, target width, place */
const photos = [
  { file: "hero/lofoten-hero.jpg", title: "File:North Of The Sun (165558753).jpeg", width: 2048, place: "Kvalvika beach, Moskenesøya, Lofoten", placeRu: "Пляж Квалвика, Москенесёйа, Лофотены" },
  { file: "hero/norway-fjords.jpg", title: "File:Nærøyfjord-cruise-view.jpg", width: 2560, place: "Nærøyfjord, Vestland", placeRu: "Нерёй-фьорд, Вестланн" },
  { file: "hero/senja-segla.jpg", title: "File:Segla in Senja, Troms og Finnmark, Norway, 2022 August.jpg", width: 2560, place: "Segla, Senja, Troms", placeRu: "Гора Сегла, остров Сенья, Тромс" },
  { file: "destinations/lofoten.jpg", title: "File:Reine in Lofoten, Norway, 2012 October.jpg", width: 1600, place: "Reine, Lofoten", placeRu: "Рейне, Лофотены" },
  { file: "destinations/trolltunga.jpg", title: "File:Trolltunga, Norway (Unsplash asct7UP3YDE).jpg", width: 1600, place: "Trolltunga, Ullensvang, Vestland", placeRu: "Троллтунга, Улленсванг, Вестланн" },
  { file: "destinations/geirangerfjord.jpg", title: "File:Fiordo de Geiranger desde Flydalsjuvet, Noruega, 2019-09-07, DD 61.jpg", width: 1600, place: "Geirangerfjord from Flydalsjuvet, Møre og Romsdal", placeRu: "Гейрангер-фьорд с площадки Флюдалсйювет, Мёре-ог-Ромсдал" },
  { file: "destinations/tromso-northern-lights.jpg", title: "File:Aurora Borealis Tromsø Norway.jpg", width: 1600, place: "Tromsø, Troms", placeRu: "Тромсё, Тромс" },
  { file: "tours/norway-fjords.jpg", title: "File:Nærøyfjord-Norway-April-2011.jpg", width: 2000, place: "Nærøyfjord, Vestland", placeRu: "Нерёй-фьорд, Вестланн" },
  { file: "tours/northern-lights.jpg", title: "File:Northern Lights - Aurora Borealis Ringvassøya Tromsø Norway.jpg", width: 900, place: "Ringvassøya, Tromsø", placeRu: "Остров Рингвассёй, Тромсё" },
  { file: "tours/lofoten-photo.jpg", title: "File:Ryten Kvalvika Lofoten tunliweb.jpg", width: 900, place: "Kvalvika beach from Ryten, Lofoten", placeRu: "Пляж Квалвика с вершины Рютен, Лофотены" },
  { file: "tours/arctic-winter.jpg", title: "File:Jiehkkevárri east face over Lyngen fjord, 2012 March.jpg", width: 900, place: "Jiehkkevárri over Lyngenfjord, Lyngen Alps", placeRu: "Йеккеварри над Люнген-фьордом, Люнгенские Альпы" },
  { file: "story-lovatnet.jpg", title: "File:Lovatnet from Hoven.jpg", width: 2400, place: "Lovatnet lake from Mt. Hoven, Loen, Vestland", placeRu: "Озеро Ловатнет с горы Ховен, Лоэн, Вестланн" },
  { file: "testimonial-kvaloya.jpg", title: "File:Mountains south of Tromsø (5741247298).jpg", width: 2400, place: "Kvaløya, south of Tromsø", placeRu: "Остров Квалёйа к югу от Тромсё" },
  { file: "cta-reine.jpg", title: "File:Houses of Reine by Gravdalsbukta, Moskenes, Nordland, Norway, 2022 June.jpg", width: 2400, place: "Reine, Lofoten (midnight sun)", placeRu: "Рейне, Лофотены (полуночное солнце)" },
];

const strip = (s = "") =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** polite fetch: Commons rate-limits bursts, so wait and retry */
async function get(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const res = await fetch(url, { headers: { "User-Agent": UA } });
    if (res.ok) return res;
    await sleep(4000 * (attempt + 1));
  }
  throw new Error(`Failed: ${url}`);
}

const filter = process.argv[2];
const creditsPath = path.join(root, "src", "content", "photo-credits.json");
let previous = [];
try {
  previous = JSON.parse(await readFile(creditsPath, "utf8"));
} catch {
  /* first run */
}

const credits = [];
for (const p of photos) {
  if (filter && !p.file.includes(filter)) {
    const kept = previous.find((c) => c.file === `public/images/norway/${p.file}`);
    if (kept) credits.push(kept);
    continue;
  }
  const api =
    "https://commons.wikimedia.org/w/api.php?" +
    new URLSearchParams({
      action: "query",
      format: "json",
      titles: p.title,
      prop: "imageinfo",
      iiprop: "url|size|extmetadata",
      iiurlwidth: String(p.width),
    });
  await sleep(1500);
  const res = await (await get(api)).json();
  const ii = Object.values(res.query.pages)[0].imageinfo[0];
  const meta = ii.extmetadata;
  const src = ii.width > p.width ? ii.thumburl : ii.url;
  const buf = Buffer.from(await (await get(src)).arrayBuffer());

  const target = path.join(out, p.file);
  await mkdir(path.dirname(target), { recursive: true });
  const info = await sharp(buf)
    .rotate()
    .resize({ width: p.width, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(target);

  credits.push({
    file: `public/images/norway/${p.file}`,
    place: p.place,
    placeRu: p.placeRu,
    author: strip(meta.Artist?.value),
    title: p.title.replace(/^File:/, ""),
    source: "Wikimedia Commons",
    url: ii.descriptionurl,
    license: meta.LicenseShortName?.value,
    licenseUrl: meta.LicenseUrl?.value ?? null,
    width: info.width,
    height: info.height,
  });
  console.log(`✓ ${p.file} ${info.width}×${info.height} ${(info.size / 1024).toFixed(0)}KB — ${meta.LicenseShortName?.value}`);
}

await writeFile(path.join(root, "src", "content", "photo-credits.json"), JSON.stringify(credits, null, 2) + "\n");
