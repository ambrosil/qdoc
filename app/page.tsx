"use client"

import React, { useEffect } from "react"
import GestioneDocumenti from "@/components/GestioneDocumenti"
import { Tab, Tabs } from "@nextui-org/tabs"
import PdfTester from "@/components/PdfTester"
import ProduzioniMassive from "@/components/ProduzioniMassive"
import axios from "axios"

export default function Home() {
    return (
        <>
            <Tabs size={"lg"}>
                <Tab key="documents" title="Gestione documenti">
                    <GestioneDocumenti />
                </Tab>

                <Tab key="tester" title="PDF Tester">
                    <PdfTester />
                </Tab>

                <Tab key="productions" title="Produzioni massive">
                    <ProduzioniMassive />
                </Tab>
            </Tabs>
        </>
    )
}
