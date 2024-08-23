import { useEffect, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"

type modalType = {openingButton: React.ReactNode, endpointForSubmit: string};

export default function Modal({openingButton, endpointForSubmit}: modalType){
    const refi = useRef(null);

    return(<Dialog>
        <DialogTrigger ref={refi}>{
            openingButton
        }</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Модальное окно</DialogTitle>
                <DialogDescription>
                {endpointForSubmit}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>)
}