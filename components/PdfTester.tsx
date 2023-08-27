import { Textarea } from "@nextui-org/input"
import { Button } from "@nextui-org/button"
import { Spinner } from "@nextui-org/spinner"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Select, SelectItem } from "@nextui-org/select"
import { QDocDocument } from "@/types/models"
import { Card } from "@nextui-org/card"

function prettify(obj: object) {
    return JSON.stringify(obj, null, 4)
}

export default function PdfTester() {
    const defaultRequest = prettify({ code: "TEMPLATE", data: { name: "Alan", musketeers: ["Athos", "Aramis", "Porthos", "D'Artagnan"] } })
    const [request, setRequest] = React.useState(defaultRequest)
    const [pdfUrl, setPdfUrl] = React.useState("")
    const [docs, setDocs] = useState([] as QDocDocument[])
    const [isPdfLoading, setPdfLoading] = React.useState(false)
    const [isSelectLoading, setSelectLoading] = React.useState(false)

    useEffect(() => {
        setSelectLoading(true)
        axios.get("/api/items").then((res) => {
            setDocs(res.data)
            setSelectLoading(false)
        })
    }, [])

    const onSelectChange = (e: any) => {
        const code = e.target.value
        setRequest(prettify({ ...JSON.parse(request), code }))
    }

    const onLoadingComplete = () => {
        setPdfLoading(false)
    }

    const onInvia = () => {
        setPdfLoading(true)
        axios.post("/api/pdf", request, { responseType: "blob" }).then((res) => {
            const file = new Blob([res.data], { type: "application/pdf" })
            const url = URL.createObjectURL(file)
            setPdfUrl(url)
        })
    }

    return (
        <>
            <Card className={"p-4"}>
                <div className={"flex flex-col gap-2"}>
                    <Select items={docs} selectionMode={"single"} isLoading={isSelectLoading} onChange={onSelectChange} labelPlacement={"outside"} label="Documento" variant={"faded"} placeholder="Selezionare un documento" className="max-w-full">
                        {(doc) => (
                            <SelectItem startContent={<span className={"text-bold rounded-lg border-2 p-1 text-slate-500"}>{doc.code}</span>} key={doc.code} value={doc.code}>
                                {doc.name}
                            </SelectItem>
                        )}
                    </Select>

                    <Textarea minRows={1} maxRows={15} label="Request" variant="faded" labelPlacement="outside" value={request} onValueChange={setRequest} defaultValue={defaultRequest} className="max-w-full" />
                    <div className={"flex flex-nowrap justify-end"}>
                        <Button color={"primary"} variant={"ghost"} onClick={onInvia}>
                            Invia
                        </Button>
                    </div>
                </div>
            </Card>

            {(isPdfLoading || pdfUrl) && (
                <Card className={"mt-4 p-4"}>
                    {isPdfLoading && <Spinner label={"Caricamento..."} />}
                    {pdfUrl && <iframe onLoad={onLoadingComplete} style={{ display: isPdfLoading ? "none" : "block" }} width={"100%"} height={1000} src={pdfUrl}></iframe>}
                </Card>
            )}
        </>
    )
}
