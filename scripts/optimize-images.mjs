/*
 * Gera versões web (redimensionadas + comprimidas, webp e jpg) de tudo em
 * public/images/sections/<pasta>/*.{jpg,jpeg}, e escreve um manifest com as
 * dimensões originais (pra width/height explícitos e evitar layout shift).
 *
 * Roda uma vez, offline — não faz parte do build do Vite (public/ não é
 * processado por ele). Reexecute manualmente sempre que novas fotos entrarem.
 *
 * Uso: node scripts/optimize-images.mjs
 */
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SECTIONS_DIR = path.join(ROOT, 'public/images/sections');
const OUT_DIR = path.join(SECTIONS_DIR, 'optimized');

const WIDTHS = [480, 800, 1200, 1600, 2000];
const WEBP_QUALITY = 72;
const JPG_QUALITY = 78;

function slugify(filename) {
  return path
    .basename(filename, path.extname(filename))
    .toLowerCase()
    .replace(/\.jpg$/i, '') // cobre o caso IMG_0749.JPG.jpeg
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function processFile(folder, file) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg'].includes(ext)) return null;

  const slug = slugify(file);
  const inputPath = path.join(SECTIONS_DIR, folder, file);
  const outDir = path.join(OUT_DIR, folder);
  await mkdir(outDir, { recursive: true });

  const image = sharp(inputPath).rotate(); // aplica orientação EXIF
  const meta = await image.metadata();
  const { width: origW, height: origH } = meta;

  const widths = WIDTHS.filter((w) => w <= origW);
  if (widths.length === 0 || widths[widths.length - 1] !== origW) {
    if (origW <= WIDTHS[WIDTHS.length - 1]) widths.push(origW);
  }

  const generated = [];
  for (const w of widths) {
    const webpName = `${slug}-w${w}.webp`;
    const jpgName = `${slug}-w${w}.jpg`;
    await image.clone().resize({ width: w }).webp({ quality: WEBP_QUALITY }).toFile(path.join(outDir, webpName));
    await image.clone().resize({ width: w }).jpeg({ quality: JPG_QUALITY, mozjpeg: true }).toFile(path.join(outDir, jpgName));
    generated.push(w);
  }

  return {
    folder,
    file,
    slug,
    width: origW,
    height: origH,
    aspectRatio: +(origW / origH).toFixed(4),
    widths: generated,
    webp: (w) => `/images/sections/optimized/${folder}/${slug}-w${w}.webp`,
    jpg: (w) => `/images/sections/optimized/${folder}/${slug}-w${w}.jpg`,
  };
}

async function main() {
  const entries = await readdir(SECTIONS_DIR, { withFileTypes: true });
  const folders = entries.filter((e) => e.isDirectory() && e.name !== 'optimized').map((e) => e.name);

  const manifest = {};
  let skippedRaw = 0;

  for (const folder of folders) {
    const files = await readdir(path.join(SECTIONS_DIR, folder));
    manifest[folder] = [];
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.cr3') {
        skippedRaw++;
        console.log(`  ignorado (RAW não suportado): ${folder}/${file}`);
        continue;
      }
      const result = await processFile(folder, file);
      if (!result) continue;
      manifest[folder].push({
        file: result.file,
        slug: result.slug,
        width: result.width,
        height: result.height,
        aspectRatio: result.aspectRatio,
        widths: result.widths,
      });
      console.log(`  ok: ${folder}/${file} -> ${result.slug} (${result.widths.join(', ')}w)`);
    }
  }

  await writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nManifest escrito em public/images/sections/optimized/manifest.json`);
  console.log(`${skippedRaw} arquivo(s) .CR3 ignorado(s) (RAW, precisa exportar em JPG antes).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
