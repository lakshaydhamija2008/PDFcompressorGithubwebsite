import { cp, mkdir, rm, writeFile } from 'node:fs/promises'
import { build } from 'esbuild'

const project = new URL('./', import.meta.url)
const dist = new URL('dist/', project)
const renderer = new URL('.build/site.mjs', project)
const base = process.env.SITE_URL?.trim()
const siteUrl = base ? new URL(base.replace(/\/+$/, '') + '/') : undefined
if (siteUrl && (siteUrl.protocol !== 'https:' || siteUrl.search || siteUrl.hash)) {
  throw new Error('SITE_URL must be an HTTPS site URL without a query or fragment.')
}

await build({
  absWorkingDir: import.meta.dirname,
  entryPoints: ['src/site.jsx'],
  outfile: '.build/site.mjs',
  bundle: true,
  packages: 'external',
  format: 'esm',
  platform: 'node',
  jsx: 'automatic',
})

const { renderPages } = await import(renderer.href)
const pages = renderPages(siteUrl)

await mkdir(dist, { recursive: true })
await cp(new URL('public/', project), dist, { recursive: true })
await writeFile(new URL('.nojekyll', dist), '')

for (const { path, html } of pages) {
  const directory = new URL(path, dist)
  await mkdir(directory, { recursive: true })
  await writeFile(new URL('index.html', directory), html)
}

if (siteUrl) {
  const escapeXml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  const urls = pages.map(({ path }) => '  <url><loc>' + escapeXml(new URL(path, siteUrl).href) + '</loc></url>')
  await writeFile(new URL('sitemap.xml', dist), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n'))
} else {
  await rm(new URL('sitemap.xml', dist), { force: true })
}

console.log('Built ' + pages.length + ' pages in dist/.')
