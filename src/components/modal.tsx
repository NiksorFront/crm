// @ts-nocheck
import { useRef } from "react"
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
import TablePage from "@/pages/table-page/table-page.tsx";

type modalType = {children:React.ReactNode, 
    title?: string, type: string, 
    endpointForSubmit?: string, 
    endpointForRequest?: string, 
    id?: number | string,
    className?: string,
    classNameTriger?: string,
    disabledTriger?: boolean,
    styleTriger?: {}
};


const classNamebaseButton = "inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
export default function Modal({children, title="", type, endpointForSubmit, endpointForRequest, id, className, classNameTriger=classNamebaseButton, disabledTriger, styleTriger}: modalType){
    const refi = useRef(null);

    return(<Dialog>
        <DialogTrigger ref={refi} className={classNameTriger} disabled={disabledTriger} style={styleTriger}>
            {children}
        </DialogTrigger>
        <DialogContent className={`${className}`}>
            <DialogHeader>
                <DialogTitle className="text-2xl text-left m-0">{title}</DialogTitle>
                <DialogDescription >
                    {type === "delete" ? <BodyDelete className="w-full mt-5" endpointForDelete={endpointForSubmit} id={id}/> : 
                    type === "resetPassword" ? <BodyResetPassword className="w-full mt-10 flex flex-wrap flex-end"/> :
                    type === "add" ? <BodyAdd endpointForSubmit={endpointForSubmit} onClose={()=>{console.log("закрытие")}} className="flex flex-wrap gap-1 mt-5"/> :
                    type === "table" ? <TablePage endpoint={endpointForRequest} /> :
                    <p>{endpointForSubmit}</p>}
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>)
}