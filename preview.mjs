import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, resolve, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const directory = fileURLToPath(new URL('dist', import.meta.url))
const base = '/' + (process.env.PREVIEW_BASE || '').replace(/^\/+|\/+$/g, '')
const prefix = base === '/' ? base : base + '/'
const port = Number(process.env.PORT || 4173)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.xml': 'application/xml; charset=utf-8',
}

await stat(resolve(directory, 'index.html'))
createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost')
    const pathname = decodeURIComponent(url.pathname)
    if (!pathname.startsWith(prefix)) throw new Error('Page outside preview path')
    let target = resolve(directory, pathname.slice(prefix.length))
    if (target !== directory && !target.startsWith(directory + sep)) throw new Error('Page outside site')
    if ((await stat(target)).isDirectory()) {
      if (!pathname.endsWith('/')) {
        response.writeHead(308, { Location: url.pathname + '/' + url.search }).end()
        return
      }
      target = resolve(target, 'index.html')
    }
    const content = await readFile(target)
    response.writeHead(200, { 'Content-Type': types[extname(target)] || 'application/octet-stream' })
    response.end(request.method === 'HEAD' ? undefined : content)
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Page not found')
  }
}).listen(port, '127.0.0.1', () => console.log('Local: http://127.0.0.1:' + port + prefix))
