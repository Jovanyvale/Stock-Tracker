import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
// ---- Configuración desde argumentos ----
const args = Object.fromEntries(
    process.argv.slice(2).map((a) => {
        const [k, v] = a.replace(/^--/, "").split("=");
        return [k, v ?? true];
    })
);

const DIR = path.resolve(args.dir || "src/assets/img");
const FORMAT = args.format === "avif" ? "avif" : "webp";
const QUALITY = Number(args.quality) || 80;
const MAX_WIDTH = args["max-width"] ? Number(args["max-width"]) : null;
const DELETE_ORIGINALS = Boolean(args["delete-originals"]);
const INPUT_EXT = new Set([".png", ".jpg", ".jpeg"]);

// ---- Utilidades ----
async function* walk(dir) {
    for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) yield* walk(full);
        else yield full;
    }
}

const kb = (bytes) => (bytes / 1024).toFixed(1) + " KB";

async function convert(file) {
    const out = file.replace(/\.[^.]+$/, `.${FORMAT}`);
    const originalSize = (await fs.stat(file)).size;

    let img = sharp(file).rotate(); // respeta la orientación EXIF
    if (MAX_WIDTH) img = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });

    img =
        FORMAT === "avif"
            ? img.avif({ quality: QUALITY })
            : img.webp({ quality: QUALITY, effort: 5 });

    const buffer = await img.toBuffer();

    // Si no se reduce el peso, no vale la pena conservar el nuevo archivo
    if (buffer.length >= originalSize) {
        console.log(`= ${path.relative(DIR, file)} (sin mejora, se omite)`);
        return { before: originalSize, after: originalSize };
    }

    await fs.writeFile(out, buffer);
    if (DELETE_ORIGINALS) await fs.unlink(file);

    console.log(
        `✓ ${path.relative(DIR, file)} → ${path.basename(out)}  ` +
        `${kb(originalSize)} → ${kb(buffer.length)} ` +
        `(-${(100 - (buffer.length / originalSize) * 100).toFixed(0)}%)`
    );
    return { before: originalSize, after: buffer.length };
}

// ---- Main ----
(async () => {
    try {
        await fs.access(DIR);
    } catch {
        console.error(`No existe la carpeta: ${DIR}`);
        process.exit(1);
    }

    console.log(`Procesando ${DIR} → ${FORMAT.toUpperCase()} (calidad ${QUALITY})\n`);

    let before = 0;
    let after = 0;
    let count = 0;

    for await (const file of walk(DIR)) {
        if (!INPUT_EXT.has(path.extname(file).toLowerCase())) continue;
        try {
            const r = await convert(file);
            before += r.before;
            after += r.after;
            count++;
        } catch (err) {
            console.error(`✗ Error en ${file}: ${err.message}`);
        }
    }

    console.log(
        `\n${count} imágenes procesadas. ${kb(before)} → ${kb(after)} ` +
        `(ahorro: ${kb(before - after)})`
    );
    if (!DELETE_ORIGINALS) {
        console.log("Los originales se conservaron. Usa --delete-originals para borrarlos.");
    }
})();