import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { useState } from "react";
import { useStore } from "../../utils/store";
import Text from "../elements/text";
import { ElementType } from "../../utils/store";


type TypeEditable = {
    element: ElementType;
    tabName: string;
    style?: {};
    xDeletions: React.ReactNode;
};

export default function TextEditable({ element, tabName, style, xDeletions }: TypeEditable) {
    const [typeElem, id] = element.id.split("-");
    const [isEditing, setIsEditing] = useState(false);
    const [tempTitle, setTempTitle] = useState(element.title);
    const [tempFontSize, setTempFontSize] = useState(element.fontSize);
    const [tempTextAlign, setTempTextAlign] = useState(element.align);
    const { updateElement } = useStore();

    const handleSave = () => {
        updateElement(tabName, element.id, {
            title: tempTitle,
            fontSize: tempFontSize,
            align: tempTextAlign,
        });
        console.log(tempFontSize);
        setIsEditing(false); // Завершаем режим редактирования после сохранения
    };

    return (
        <div style={style} className="relative w-full" onDoubleClick={() => setIsEditing(true)}>
            {xDeletions}
            <Text title={tempTitle!} id={id} fntSize={tempFontSize} textAlign={tempTextAlign} />
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
                    {/* Слайдер для изменения размера шрифта */}
                    <div className="flex items-center justify-between mb-2">
                        <span>Размер {tempFontSize}px</span>
                        <Slider
                            value={[parseInt(tempFontSize)]}
                            min={10}
                            max={100}
                            onValueChange={(val) => setTempFontSize(val[0].toString())}
                            className="w-2/3"
                        />
                    </div>
                    {/* Кнопки для изменения выравнивания текста */}
                    <div className="flex justify-between">
                        <Button
                            variant={tempTextAlign === "лево" ? "primary" : "secondary"}
                            onClick={() => setTempTextAlign("лево")}
                        >
                            Лево
                        </Button>
                        <Button
                            variant={tempTextAlign === "центр" ? "primary" : "secondary"}
                            onClick={() => setTempTextAlign("центр")}
                        >
                            Центр
                        </Button>
                        <Button
                            variant={tempTextAlign === "право" ? "primary" : "secondary"}
                            onClick={() => setTempTextAlign("право")}
                        >
                            Право
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}