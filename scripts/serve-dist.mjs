// Serves the production build like GitHub Pages does for a project site: everything under
// the base path, directories resolve to index.html, anything missing is a 404 (no SPA fallback).
// Used by Playwright instead of `astro preview`, which can detach into the background.
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, join, normalize, relative, sep } from 'node:path';

const basePath = '/dreambig-app-portfolios/';
const root = join(import.meta.dirname, '..', 'dist');
const port = Number(process.env.PORT ?? 4321);

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

async function resolveFile(pathname) {
  if (!pathname.startsWith(basePath)) return null;
  let file = join(root, normalize(decodeURIComponent(pathname.slice(basePath.length))));
  const inside = relative(root, file);
  if (inside === '..' || inside.startsWith(`..${sep}`) || isAbsolute(inside)) return null;
  const stats = await stat(file).catch(() => null);
  if (stats?.isDirectory()) {
    if (!pathname.endsWith('/')) return { redirect: `${pathname}/` };
    file = join(file, 'index.html');
  }
  return (await stat(file).catch(() => null))?.isFile() ? { file } : null;
}

createServer(async (req, res) => {
  const { pathname } = new URL(req.url ?? '/', 'http://localhost');
  const found = await resolveFile(pathname).catch(() => null);
  if (!found) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Not found');
    return;
  }
  if (found.redirect) {
    res.writeHead(301, { location: found.redirect }).end();
    return;
  }
  res.writeHead(200, {
    'content-type': contentTypes[extname(found.file)] ?? 'application/octet-stream',
  });
  createReadStream(found.file)
    .on('error', () => res.destroy())
    .pipe(res);
}).listen(port, '127.0.0.1', () => {
  console.log(`Serving dist/ at http://127.0.0.1:${port}${basePath}`);
});
