import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useStore } from "../../utils/store";
import { ElementType } from "../../utils/store";
import ChckBox from "../elements/chckBox";


type TypeEditable = {
    element: ElementType;
    tabName: string;
    style?: {};
    xDeletions: React.ReactNode;
};

export default function ChckBoxEditable({ element, tabName, style, xDeletions }: TypeEditable) {
    const [typeElem, id] = element.id.split("-");
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(element.title);
    const [tempAlign, setTempAlign] = useState(element.align);
    const { updateElement } = useStore();

    const handleSave = () => {
        console.log(tempTitle,tempAlign,);
        updateElement(tabName, element.id, {
            title: tempTitle,
            align: tempAlign,
        });
        setIsEditing(false); // Завершаем режим редактирования после сохранения
    };

    return (
        <div style={style} className="relative w-full flex justify-center" onDoubleClick={() => setIsEditing(true)}>
            {xDeletions}
            <ChckBox title={tempTitle} id={id} align={tempAlign} />
            {isEditing && (
                <div className="absolute top-full left-0 bg-white p-4 shadow-md rounded-md w-full z-10">
                    {/* Input для редактирования заголовка */}
                    <Input
                        value={tempTitle}
                        onChange={(e) => setTempTitle(e.target.value)}
                        onBlur={() => handleSave()}
                        onKeyDown={(e) => (e.key === 'Enter') && handleSave()}
                        className="mb-2"
                    />
                    {/* Кнопки для изменения выравнивания текста */}
                    <div className="flex justify-between">
                        <Button
                            variant={tempAlign === "лево" ? "primary" : "secondary"}
                            onClick={() => setTempAlign("лево")}
                        >
                            Лево
                        </Button>
                        <Button
                            variant={tempAlign === "центр" ? "primary" : "secondary"}
                            onClick={() => setTempAlign("центр")}
                        >
                            Центр
                        </Button>
                        <Button
                            variant={tempAlign === "право" ? "primary" : "secondary"}
                            onClick={() => setTempAlign("право")}
                        >
                            Право
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}