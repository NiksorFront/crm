import { useEffect, useRef } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "./ui/dialog"
import BodyDelete from "./modal-bodys/body-delete.tsx";
import BodyResetPassword from "./modal-bodys/body-reset-password.tsx";
import BodyAdd from "./modal-bodys/body-add.tsx";

type modalType = {children:React.ReactNode, title: string, type: string, endpointForSubmit: string, id?: number | string};



export default function Modal({children, title, type, endpointForSubmit, id}: modalType){
    const refi = useRef(null);

    return(<Dialog>
        <DialogTrigger ref={refi} >
            {children}
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>
                    {type === "delete" ? <BodyDelete className="w-full mt-5" endpointForDelete={endpointForSubmit} id={id}/> : 
                    type === "resetPassword" ? <BodyResetPassword className="w-full mt-10 flex flex-wrap flex-end"/> :
                    type === "add" ? <BodyAdd endpointForSubmit={endpointForSubmit} onClose={()=>{console.log("закрытие")}} className="flex flex-wrap gap-1 mt-5"/> :
                    <p>{endpointForSubmit}</p>}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>)
}