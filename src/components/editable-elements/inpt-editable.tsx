import Inpt from "../elements/inpt";
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
    bindingsLabel: React.ReactNode,
}

export default function InptEditable({element, tabName, style, xDeletions, bindingsLabel }: TypeEditable){
    const [typeElem, id] = element.id.split("-");
    const [isEditing, setIsEditing] = useState(false);
    const { updateElement} = useStore();
    
    const [title, setTitle] = useState(element.title);
    const [placeholder, setPlaceholder] = useState(element.placeholder);
    const [editedId, setEditedId] = useState(id);

    const handleBlur = () => {
        const newId = `${typeElem}-${editedId}`;
        updateElement(tabName, element.id, { title, placeholder, id: newId });
        setIsEditing(false); // Закрываем режим редактирования после изменения всех полей
    };
    
    return <div style={style} onDoubleClick={() => setIsEditing(true)}>
    {isEditing ? (
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
    ) : (<>
        {bindingsLabel}
        {xDeletions}
        <Inpt title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} dependsOn={element.dependsOn} /></>
    )}
</div>
}
