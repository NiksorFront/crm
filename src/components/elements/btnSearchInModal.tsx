import Modal from "../modal"

type typeBtnSearchInModal = {
    title?: string, 
    id: string,
    endpointForRequest?: string,
    disabled?: boolean,
    style?: {},
    forAdd?: {endpoint: string; action: string };
}

export default function BtnSearchInModal({title, id, endpointForRequest, forAdd, disabled, style}: typeBtnSearchInModal){
    return <>
        <Modal type="table" className="max-w-[80vw]" endpointForRequest={endpointForRequest} disabledTriger={disabled} forSubmit={forAdd} styleTriger={style}>
            {title}
        </Modal>
        <input id={id} className="w-0"></input> {/*Это стыднейший костыль, но он работает. Сюда будет записываться id пользователя*/}
    </>
}