import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"

const uri = "mongodb+srv://luca:wjVlOhV7lzR4FY2D@qdoc.bhgwatm.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

async function init() {
    await client.connect()
}

init().then((r) => console.log("INIT OK"))

export async function fetchAllDocs() {
    return await client.db("qdoc").collection("docs").find({}).toArray()
}

export async function deleteById(id: string) {
    return await client
        .db("qdoc")
        .collection("docs")
        .deleteOne({ _id: new ObjectId(id) })
}

export async function fetchById(id: string) {
    return await client
        .db("qdoc")
        .collection("docs")
        .findOne({ _id: new ObjectId(id) })
}

export async function fetchByCode(code: string) {
    return await client.db("qdoc").collection("docs").findOne({ code })
}

export async function updateById(id: string, doc: any) {
    delete doc._id

    return await client
        .db("qdoc")
        .collection("docs")
        .updateOne({ _id: new ObjectId(id) }, { $set: { ...doc, updateDate: Date.now() } })
}

export async function insertDoc(doc: object) {
    return await client
        .db("qdoc")
        .collection("docs")
        .insertOne({ ...doc, insertDate: Date.now() })
}
