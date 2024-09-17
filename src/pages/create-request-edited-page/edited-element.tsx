import { useState } from "react";
import { ElementType } from "../../utils/store";
import Inpt from "@/components/elements/inpt";
import InptBig from "@/components/elements/inptBig";
import CombBox from "@/components/elements/combBox";
import BtnSubmit from "@/components/elements/btnSubmit";
import BtnPdf from "@/components/elements/btnPdf";
import BtnNext from "@/components/elements/btnNext";
import TwoTab from "@/components/elements/twoTab";
import BtnSearchInModal from "@/components/elements/btnSearchInModal.tsx";
import {useStore} from "../../utils/store";
import { Input } from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export default function EditedElemnet({element, tabName, showBindings}: {element: ElementType, tabName: string, showBindings: boolean}){
    const [typeElem, id] = element.id.split("-");
    const { updateElement } = useStore();

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(element.title);
    const [placeholder, setPlaceholder] = useState(element.placeholder);
    const [editedId, setEditedId] = useState(id);
    const [acceptedValues, setAcceptedValues] = useState(element.acceptedValues || []);
    const [submitUrl, setSubmitUrl] = useState(element.submitUrl || { url: "", action: "" });

    const elementPosition = { gridRow: element.pos.row, gridColumn: element.pos.col, position: 'relative' };

    const handleBlur = () => {
        const newId = `${typeElem}-${editedId}`;
        updateElement(tabName, element.id, { title, placeholder, id: newId });
        setIsEditing(false); // Закрываем режим редактирования после изменения всех полей
    };

    const bindingsLabel = showBindings && (
        <span className="absolute top-0 right-0 text-black text-sm z-10 px-2" >
            {id}
        </span>
    );

    const editInput = () => (
        <div className="w-full flex flex-wrap justify-between" autoFocus>
            <div style={{width: "31%"}}> 
                <Label className="text-gray-400" htmlFor={"title"}>Заголовок</Label>
                <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => (e.key === 'Enter') && handleBlur()} // Сохранение заголовка при нажатии Enter
                    // placeholder="Title"
                />
            </div>
            <div style={{width: "31%"}}> 
                <Label className="text-gray-400"  htmlFor={"placeholder"}>Заполнитель</Label>
                <Input
                    id="placeholder"
                    type="text"
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => (e.key === 'Enter') && handleBlur()} // Сохранение заголовка при нажатии Enter
                    // placeholder="Placeholder"
                />
            </div>
            <div style={{width: "31%"}}>
                <Label className="text-gray-400"  htmlFor={"id"}>id</Label>
                <Input
                    id="id"
                    type="text"
                    value={editedId}
                    onChange={(e) => setEditedId(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => (e.key === 'Enter') && handleBlur()} // Сохранение заголовка при нажатии Enter
                    // placeholder="id"
                />
            </div>
        </div>
    );

    const handleBlurBtn = () => {
        updateElement(tabName, element.id, { title, acceptedValues, submitUrl });
        setIsEditing(false); // Закрываем режим редактирования после изменения всех полей
    }

    const editBtn = () => (
        <div className="w-full flex flex-wrap justify-between" autoFocus>
            <div className="1/5">
                <Label className="text-gray-400" htmlFor={"text"}>Текст кнопки</Label>
                <Input
                    type="text"
                    id="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleBlurBtn}
                    onKeyDown={(e) => (e.key === 'Enter') && handleBlurBtn()}
                    className="mb-2"
                />
            </div>
            <div style={{width: "52%"}}>
                <Label className="text-gray-400" htmlFor={"url"}>URL для отправки</Label>
                <Input
                    type="text"
                    id="url"
                    value={submitUrl.url}
                    onChange={(e) => setSubmitUrl({ ...submitUrl, url: e.target.value })}
                    onBlur={handleBlurBtn}
                    onKeyDown={(e) => (e.key === 'Enter') && handleBlurBtn()}
                    placeholder="ссылка"
                    className="mb-2"
                />
            </div>
            <div className="1/5">
                <Label className="text-gray-400" htmlFor={"action"}>action</Label>
                <Input
                    type="text"
                    id={"action"}
                    value={submitUrl.action}
                    onChange={(e) => setSubmitUrl({ ...submitUrl, action: e.target.value })}
                    onBlur={handleBlurBtn}
                    onKeyDown={(e) => (e.key === 'Enter') && handleBlurBtn()}
                    placeholder="событие"
                    className="mb-2"
                />
            </div>
            <div className="w-full">
                <Label className="text-gray-400" htmlFor={"accepted values"}>Принимаемые значения</Label>
                <Input
                    type="text"
                    id="accepted values"
                    value={acceptedValues.join(", ")}
                    onChange={(e) => setAcceptedValues(e.target.value.split(", "))}
                    onBlur={handleBlurBtn}
                    onKeyDown={(e) => (e.key === 'Enter') && handleBlurBtn()}
                    placeholder="Значения"
                    className="mb-2"
                />
            </div>
        </div>
    )


    switch (typeElem) {
        case "inpt":
            return (
                //@ts-ignore
                <div style={elementPosition} onDoubleClick={() => setIsEditing(true)}>
                    {isEditing ? (
                        editInput()
                    ) : (<>
                        {bindingsLabel}
                        <Inpt title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} dependsOn={element.dependsOn} /></>
                    )}
                </div>
            );
        case "inptBig":
            return (
                //@ts-ignore
                <div style={elementPosition} onDoubleClick={() => setIsEditing(true)}>
                    {isEditing ? (
                        editInput()
                    ) : (<>
                        {bindingsLabel}
                        <InptBig title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} />
                        </>
                    )}
                </div>
            );
        case "combBox":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    <CombBox title={element.title} id={id} placeholder={element.placeholder} valuesOrURLRequestValues={element.valuesOrURLRequestValues} disabled={element.disabled} dependsOn={element.dependsOn}/>
                </div>
            );
        case "btnSubmit":
            return (
                //@ts-ignore
                <div style={elementPosition} className="flex flex-wrap w-full" onDoubleClick={() => setIsEditing(true)}>
                    {isEditing ? (
                        editBtn()
                    ) : (<>
                        {showBindings && <span className="pb-1 w-fit ml-auto mr-0 text-black text-right text-sm z-10" >
                            {element.acceptedValues?.join(" ")}
                        </span>}
                        <BtnSubmit variant={"secondary"} id={id} acceptedValues={element.acceptedValues} submitUrl={element.submitUrl!} tabWithInfo={tabName} edited={true}>
                            {element.title}
                        </BtnSubmit>
                    </>)}
                </div>
            );
        case "btnNext":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    <BtnNext variant={"secondary"} id={id} currentTab={tabName}>
                        {element.title}
                    </BtnNext>
                </div>
            );
        case "btnPdf":
            return (
                //@ts-ignore
                <div style={elementPosition} className="flex flex-wrap w-full">
                    {showBindings && <span className="pb-1 w-fit ml-auto mr-0 text-black text-right text-sm z-10" >
                        {element.acceptedValues?.join(" ")}
                    </span>}
                    <BtnPdf variant={"outline"} id={id} pdfGenerateCode={() => console.log("скачено")} disabled={element.disabled} edited={true}>
                        {element.title}
                    </BtnPdf>
                </div>
            );
        case "twoTab":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    <TwoTab title={element.title} titleOne={element.titles?.split('-')[0]} titleTwo={element.titles?.split('-')[1]} elementsTabOne={element.elementsTabOne} elementsTabTwo={element.elementsTabTwo} />
                </div>
            );
        case "btnSearchInModal":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    <BtnSearchInModal title={element.title} id={id} endpointForRequest={element.endpointForRequestDataTable} disabled={element.disabled} />
                </div>
            );
        default:
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    <p key={id}>{`${typeElem} ${id}`}</p>
                </div>
            );
    }
}
