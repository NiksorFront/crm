import BtnSubmit from "../elements/btnSubmit";
import {ElementType} from "../../utils/store";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useStore} from "../../utils/store";

type TypeEditable = {
    element: ElementType, 
    tabName: string,
    style?: {},
    xDeletions: React.ReactNode,
    showBindings: boolean,
}

export default function BtnSubmitEditable({element, tabName, style, xDeletions, showBindings }: TypeEditable){
    const [typeElem, id] = element.id.split("-");
    const [isEditing, setIsEditing] = useState(false);
    const { updateElement} = useStore();
    
    const [title, setTitle] = useState(element.title);
    const [acceptedValues, setAcceptedValues] = useState(element.acceptedValues || []);
    const [submitUrl, setSubmitUrl] = useState(element.submitUrl || { url: "", action: "" });


    const handleBlurBtn = () => {
        updateElement(tabName, element.id, { title, acceptedValues, submitUrl });
        setIsEditing(false); // Закрываем режим редактирования после изменения всех полей
    }
    
    return <div style={style} className="flex flex-wrap w-full" onDoubleClick={() => setIsEditing(true)}>
            {isEditing ? (
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
            ) : (<>
                {showBindings && <span className="pb-1 w-fit ml-auto mr-0 text-black text-right text-sm z-10" >
                    {element.acceptedValues?.join(" ")}
                </span>}
                {xDeletions}
                <BtnSubmit variant={"secondary"} id={id} acceptedValues={element.acceptedValues} submitUrl={element.submitUrl!} tabWithInfo={tabName} edited={true}>
                    {element.title}
                </BtnSubmit>
            </>)}
        </div>
}
