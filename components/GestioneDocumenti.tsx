"use client"

import axios from "axios"
import React, { useEffect, useState } from "react"
import { QDocDocument } from "@/types/models"
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table"
import { Tooltip } from "@nextui-org/tooltip"
import { DeleteIcon, EditIcon, EyeIcon } from "@/components/Icons"
import { Chip } from "@nextui-org/chip"
import PreviewModal from "@/components/PreviewModal"
import AddEditModal from "@/components/AddEditModal"
import { Pagination } from "@nextui-org/pagination"
import ConfirmModal from "@/components/ConfirmModal"
import { Spinner } from "@nextui-org/spinner"
import { Button } from "@nextui-org/button"

const columns = [
    { name: "NOME", uid: "name" },
    { name: "CODICE", uid: "code" },
    { name: "AZIONI", uid: "actions" }
]

export default function GestioneDocumenti() {
    const [loadingState, setLoadingState] = React.useState(null)
    const [page, setPage] = React.useState(1)
    const [total, setTotal] = React.useState(0)
    const [modalData, setModalData] = useState({ openConfirmModal: false, openPreviewModal: false, openEditModal: false, docItem: null })
    const [docs, setDocs] = useState([] as QDocDocument[])

    const rowsPerPage = 10
    const pages = docs.length === 0 ? 1 : Math.ceil(docs.length / rowsPerPage)

    useEffect(() => {
        setLoadingState("loading")
        axios.get("/api/items").then((res) => {
            setDocs(res.data)
            setLoadingState(null)
        })
    }, [])

    const onNewDocumento = () => {
        setModalData((prev) => ({ ...prev, openEditModal: true, docItem: { name: "", code: "", html: "" } }))
    }

    const onEditDone = (newDoc: QDocDocument) => {
        setModalData((prev) => ({ ...prev, openEditModal: false }))
        setDocs((prev) => {
            return prev.map((doc) => {
                if (doc._id === newDoc._id) {
                    return { ...doc, ...newDoc }
                }

                return doc
            })
        })
    }

    const onDeleteDone = () => {
        setModalData((prev) => ({ ...prev, openConfirmModal: false }))
        setDocs((prev) => prev.filter((doc) => doc._id !== modalData.docItem._id))
    }

    const onAddDone = (newDoc: QDocDocument) => {
        setModalData((prev) => ({ ...prev, openEditModal: false }))
        setDocs((prev) => [...prev, newDoc])
    }

    const onModalClose = () => {
        setModalData({ openConfirmModal: false, openEditModal: false, openPreviewModal: false, docItem: null })
    }

    const onDelete = (item) => () => {
        setModalData((prev) => ({ ...prev, openConfirmModal: true, docItem: item }))
    }

    const onPreview = (item) => () => {
        setModalData((prev) => ({ ...prev, openPreviewModal: true, docItem: item }))
    }

    const onEdit = (item) => () => {
        setModalData((prev) => ({ ...prev, openEditModal: true, docItem: item }))
    }

    const renderCell = (item, columnKey) => {
        const cellValue = item[columnKey]

        switch (columnKey) {
            case "name":
                return item.name
            case "code":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-sm capitalize">
                            <Chip>{item.code}</Chip>
                        </p>
                    </div>
                )
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-3">
                        <Tooltip content="Preview" placement={"bottom"}>
                            <span className="cursor-pointer text-lg text-default-400 active:opacity-50" onClick={onPreview(item)}>
                                <EyeIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Modifica documento" placement={"bottom"}>
                            <span className="cursor-pointer text-lg text-default-400 active:opacity-50" onClick={onEdit(item)}>
                                <EditIcon />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Cancella documento" placement={"bottom"}>
                            <span className="cursor-pointer text-lg text-danger active:opacity-50" onClick={onDelete(item)}>
                                <DeleteIcon />
                            </span>
                        </Tooltip>
                    </div>
                )
            default:
                return cellValue
        }
    }

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage
        const end = start + rowsPerPage
        return docs.slice(start, end)
    }, [page, docs])

    return (
        <>
            <PreviewModal isOpen={modalData.openPreviewModal} onClose={onModalClose} docItem={modalData.docItem} />
            <AddEditModal isOpen={modalData.openEditModal} onClose={onModalClose} docItem={modalData.docItem} onEditDone={onEditDone} onAddDone={onAddDone} />
            <ConfirmModal isOpen={modalData.openConfirmModal} onClose={onModalClose} onDeleteDone={onDeleteDone} docItem={modalData.docItem} />

            <div className={"w-100 mb-3 flex justify-end"}>
                <Button color={"danger"} variant="ghost" onClick={onNewDocumento}>
                    Crea nuovo
                </Button>
            </div>

            <Table
                classNames={{ table: loadingState === "loading" ? "min-h-[220px]" : "" }}
                isStriped
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination isCompact showControls showShadow color="primary" page={page} total={pages} onChange={(page) => setPage(page)} />
                    </div>
                }
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn className={column.uid === "actions" ? "text-center" : "text-left"} key={column.uid}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody loadingContent={<Spinner label={"Caricamento..."} />} loadingState={loadingState}>
                    {items.map((item) => (
                        <TableRow key={item._id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}
