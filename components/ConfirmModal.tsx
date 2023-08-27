import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { Button } from "@nextui-org/button"
import axios from "axios"
import { useEffect, useState } from "react"

export default function ConfirmModal({ docItem, isOpen = false, onClose, onDeleteDone }) {
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        isOpen && setLoading(false)
    }, [isOpen])

    const onConfermaInternal = () => {
        setLoading(true)
        axios.delete(`/api/items?id=${docItem._id}`).then(() => onDeleteDone(docItem))
    }

    return (
        <Modal size={"xl"} backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-col gap-1">Conferma cancellazione</ModalHeader>
                    <ModalBody>
                        Sei sicuro di voler cancellare il documento &apos;{docItem?.name}&apos; ({docItem?.code})?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" variant="ghost" onPress={onClose}>
                            Chiudi
                        </Button>
                        <Button color="danger" onPress={onConfermaInternal} variant="solid" isLoading={isLoading}>
                            Conferma
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
