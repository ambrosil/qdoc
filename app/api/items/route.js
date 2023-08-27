import { NextResponse } from "next/server"
import { deleteById, fetchAllDocs, fetchById, insertDoc, updateById } from "../../../services/MongoDb"
import { streamToJson, streamToString } from "../../../utils/utils"

export async function GET(req) {
    const id = req.nextUrl.searchParams.get("id")
    return NextResponse.json(id ? await fetchById(id) : await fetchAllDocs())
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id")
    await deleteById(id)
    return NextResponse.json({ result: "ok" })
}

export async function POST(req) {
    const content = await streamToJson(req.body)
    const result = await insertDoc(content)
    const insertedId = result.insertedId
    return NextResponse.json({ insertedId })
}

export async function PUT(req) {
    try {
        const id = req.nextUrl.searchParams.get("id")
        const content = await streamToJson(req.body)
        await updateById(id, content)
        return NextResponse.json({ result: "ok" })
    } catch (e) {
        return NextResponse.json({ result: e.stack })
    }
}
