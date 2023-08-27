import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal"
import { Button } from "@nextui-org/button"
import React, { useEffect } from "react"
import { Spinner } from "@nextui-org/spinner"

export default function PreviewModal({ docItem, isOpen = false, onClose = () => {} }) {
    const [isLoading, setLoading] = React.useState(true)

    useEffect(() => {
        docItem && setLoading(true)
    }, [docItem])

    const onLoadingComplete = () => {
        setLoading(false)
    }

    return (
        <Modal size={"5xl"} backdrop={"blur"} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <>
                    <ModalHeader>Preview &apos;{docItem?.name}&apos;</ModalHeader>
                    <ModalBody>
                        {isLoading && <Spinner label={"Caricamento..."} />}
                        <iframe onLoad={onLoadingComplete} style={{ display: isLoading ? "none" : "block" }} height={window.innerHeight * 0.75} src={`/api/pdf?id=${docItem?._id}`}></iframe>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={onClose} variant={"ghost"}>
                            Chiudi
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    )
}
