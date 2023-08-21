import {NextResponse} from 'next/server'
import {MongoClient, ObjectId, ServerApiVersion} from "mongodb";

export async function GET(req) {
    const id = req.nextUrl.searchParams.get('id')
    return NextResponse.json(id ? await fetchById(id) : await fetchAllDocs())
}

export async function POST(req) {
    const content = await streamToString(req.body);
    await insertDoc(JSON.parse(content))
    return NextResponse.json({ result: "ok" })
}

async function streamToString(stream) {
    const chunks = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.from(chunk));
    }

    return Buffer.concat(chunks).toString("utf-8");
}

const uri = "mongodb+srv://luca:wjVlOhV7lzR4FY2D@qdoc.bhgwatm.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function fetchAllDocs() {
    try {
        await client.connect();
        return await client.db("qdoc").collection("docs").find({}).toArray()
    } finally {
        await client.close();
    }
}

async function fetchById(id) {
    try {
        await client.connect();
        return await client.db("qdoc").collection("docs").findOne({_id: new ObjectId(id)})
    } finally {
        await client.close();
    }
}

async function insertDoc(html) {
    try {
        await client.connect();
        return await client.db("qdoc").collection("docs").insertOne({...html, date: Date.now() })
    } finally {
        await client.close();
    }
}
