import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { Button } from "@nextui-org/button"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "@nextui-org/input"
import { QDocDocument } from "@/types/models"
import "../styles/EditModal.scss"
import { ValidationState } from "@react-types/shared/src/inputs"
import dynamic from "next/dynamic"

const CustomEditor = dynamic(() => import("./CustomEditor"), { ssr: false })

export default function AddEditModal({ docItem, isOpen = false, onClose, onEditDone, onAddDone }) {
    const [validation, setValidation] = useState({ name: "valid" as ValidationState, code: "valid" as ValidationState })
    const [editingItem, setEditingItem] = useState({ name: "", code: "" } as QDocDocument)
    const [isLoading, setLoading] = React.useState(true)

    useEffect(() => {
        isOpen && setLoading(false)
        isOpen && setEditingItem(docItem)
    }, [isOpen, docItem])

    const onSalvaInternal = () => {
        setValidation((prev) => ({ ...prev, name: editingItem.name ? "valid" : "invalid" }))
        setValidation((prev) => ({ ...prev, code: editingItem.code ? "valid" : "invalid" }))
        if (!editingItem.name || !editingItem.code) return

        setLoading(true)
        const newDoc = { ...docItem, ...editingItem }

        if (docItem._id) {
            axios.put(`/api/items?id=${docItem._id}`, newDoc).then(() => onEditDone(newDoc))
        } else {
            axios.post(`/api/items`, newDoc).then((res) => onAddDone({ ...newDoc, _id: res.data.insertedId }))
        }
    }

    const onChange = (field: string) => (value) => {
        setValidation((prev) => ({ ...prev, [field]: { state: "valid", msg: "" } }))
        setEditingItem((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <Modal size={"5xl"} backdrop={"blur"} isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">{docItem?._id ? "Modifica documento" : "Aggiungi documento"}</ModalHeader>
                    <ModalBody>
                        <div className={"flex w-full flex-nowrap gap-2"}>
                            <Input size={"sm"} validationState={validation.name} errorMessage={validation.name === "invalid" && "Inserire un titolo"} color={"primary"} type="text" label="Titolo" variant="bordered" onValueChange={onChange("name")} value={editingItem?.name} className="max-w-full" />
                            <Input size={"sm"} validationState={validation.code} errorMessage={validation.code === "invalid" && "Inserire un codice"} color={"primary"} type="text" label="Codice" variant="bordered" onValueChange={onChange("code")} value={editingItem?.code} className="max-w-full" />
                        </div>

                        <CustomEditor value={editingItem.html} onChange={(html: string) => setEditingItem((prev) => ({ ...prev, html }))} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={onClose} variant={"ghost"}>
                            Chiudi
                        </Button>
                        <Button color="danger" onPress={onSalvaInternal} variant={"solid"} isLoading={isLoading}>
                            Salva
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
