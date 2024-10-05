import {ElementType} from "../../utils/store";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {useStore} from "../../utils/store";
import BtnPdf from "../elements/btnPdf";

type TypeEditable = {
    element: ElementType, 
    tabName: string,
    style?: {},
    xDeletions: React.ReactNode,
    showBindings: boolean,
}

export default function BtnPdfEditable({element, tabName, style, xDeletions, showBindings }: TypeEditable){
    const [typeElem, id] = element.id.split("-");
    const [isEditing, setIsEditing] = useState(false);
    const { updateElement } = useStore();
    const [title, setTitle] = useState(element.title);
    const [acceptedValues, setAcceptedValues] = useState(element.acceptedValues || []);
    const [namePdf, setNamePdf] = useState(element.namePdf || "");

    const handleBlurBtn = () => {
        updateElement(tabName, element.id, { title, acceptedValues, namePdf: namePdf });
        setIsEditing(false); // Закрываем режим редактирования после изменения всех полей
    }

    const handleSelectPdf = (selectedPdf: string) => {
        setNamePdf(selectedPdf);
    }
    
    return (
        <div style={style} className="flex flex-wrap w-full" onDoubleClick={() => setIsEditing(true)}>
            {showBindings && (
                <span className="pb-1 w-fit ml-auto mr-0 text-black text-right text-sm z-10">
                    {element.acceptedValues?.join(" ")}
                </span>
            )}
            {xDeletions}
            <BtnPdf variant={"secondary"} id={id} namePdf={namePdf} tabWithInfo={tabName} edited={true}>
                {title}
            </BtnPdf>
            {isEditing && (
                <div className="absolute top-full left-0 bg-white p-4 shadow-md rounded-md w-full z-10">
                    <div>
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
                    <div className="w-full">
                        <h4 className="text-gray-400">Pdf</h4>
                        <ul className="flex w-full gap-2">
                            <li
                                className={`cursor-pointer p-2 w-1/3 rounded-lg border ${namePdf === "completedWorksAct" ? 'bg-blue-100' : 'bg-white'} text-sm`}
                                onClick={() => handleSelectPdf("completedWorksAct")}
                                onBlur={handleBlurBtn}
                            >
                                Акт выполненных работ
                            </li>
                            <li
                                className={`cursor-pointer p-2 w-1/3 rounded-lg border ${namePdf === "acceptanceAct" ? 'bg-blue-100' : 'bg-white'} text-sm`}
                                onClick={() => handleSelectPdf("acceptanceAct")}
                                onBlur={handleBlurBtn}
                            >
                                Акт приёмки
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
