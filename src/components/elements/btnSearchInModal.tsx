import Modal from "../modal"

type typeBtnSearchInModal = {
    title?: string, 
    id: string,
    endpointForRequest?: string,
    disabled?: boolean,
    style?: {},
}

export default function BtnSearchInModal({title, id, endpointForRequest, disabled, style}: typeBtnSearchInModal){
    return <Modal type="table" className="max-w-[80vw]" endpointForRequest={endpointForRequest} disabledTriger={disabled} styleTriger={style}>
            <h1 id={id} className="pt-5"></h1>
            {title}
        </Modal>
}