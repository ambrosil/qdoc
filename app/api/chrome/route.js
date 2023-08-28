import * as fs from 'fs'

export async function GET(req) {
	const data = fs.readFileSync('./app/api/chrome/chromium.br')
	return new Response(data, { headers: { 'Content-type': `application/octet-stream` } })
}
