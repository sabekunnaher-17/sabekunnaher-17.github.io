import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { destinations, routePath } from './src/content.ts'

const site = 'https://sabekunnaher-17.github.io'
const attr = (text: string) => text.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')

export default defineConfig({
  base: '/',
  plugins: [react(), {
    name: 'pages-directory-entries',
    async closeBundle() {
      const template = await readFile('dist/index.html', 'utf8')
      for (const page of destinations) {
        const path = routePath(page.slug)
        const directory = `dist${path}`
        const html = template.replace(/<title>.*?<\/title>/, `<title>${attr(page.title)}</title>`)
          .replace(/(<link rel="canonical" href=")[^"]*/, `$1${site}${path}`)
          .replace(/(<meta property="og:url" content=")[^"]*/, `$1${site}${path}`)
          .replace(/(<meta (?:property="og:title"|name="twitter:title") content=")[^"]*/g, `$1${attr(page.title)}`)
          .replace(/(<meta (?:name="description"|property="og:description"|name="twitter:description") content=")[^"]*/g, `$1${attr(page.description)}`)
        await mkdir(directory, { recursive: true })
        await writeFile(`${directory}index.html`, html)
      }
      await writeFile('dist/404.html', template.replace(/<title>.*?<\/title>/, '<title>Page not found — Sabekunnaher Antora</title>').replace('</head>', '<meta name="robots" content="noindex" /></head>'))
      await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${destinations.map(page => `<url><loc>${site}${routePath(page.slug)}</loc></url>`).join('')}</urlset>\n`)
      console.log('Created eight GitHub Pages route entries and sitemap.')
    },
  }],
})
