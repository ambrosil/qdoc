import { fetchByCode, fetchById } from '@/services/MongoDb'
import { pdfCss } from '@/config/css'
import { streamToJson } from '@/utils/utils'
import Mustache from 'mustache'
import puppeteer from 'puppeteer-core'

export async function GET(req: any) {
	try {
		const id = req.nextUrl.searchParams.get('id')
		const doc = await fetchById(id)
		const pdf = await printPdf(doc.html)
		return new Response(pdf, { headers: { 'Content-type': `application/pdf` } })
	} catch (e) {
		return new Response(e.stack, { status: 500, headers: { 'Content-type': `text/plain` } })
	}
}

export async function POST(req: any) {
	try {
		const json = await streamToJson(req.body)
		const doc = await fetchByCode(json.code)
		const renderedHtml = Mustache.render(doc.html, json.data)
		const pdf = await printPdf(renderedHtml)
		return new Response(pdf, { headers: { 'Content-type': `application/pdf` } })
	} catch (e) {
		return new Response(e.stack, { status: 500, headers: { 'Content-type': `text/plain` } })
	}
}

async function printPdf(html: string) {
	const browser = await puppeteer.launch({
		executablePath: process.env.CHROME_PATH,
		headless: 'new',
		ignoreHTTPSErrors: true,
		args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
	})

	const page = await browser.newPage()
	await page.setContent(
		`
                <html>
                    <head><style>${pdfCss}</style></head>
                    <body class="ck-content">${html}</body>
                </html>
            `,
		{ waitUntil: 'load' }
	)

	const margin = '10mm'
	const pdfStream = await page.pdf({
		margin: { top: margin, right: margin, bottom: margin, left: margin },
		format: 'a4',
		printBackground: true
	})

	await browser.close()
	return pdfStream
}
