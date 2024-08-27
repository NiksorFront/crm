import { Button } from "@/components/ui/button";
import ElementsLibraryDrawer from "../components/elements-library-drawer";

export default function CreateRequestEditedPage(){
    const title = "Заголовок";

    return(<>
        <h1 className="text-2xl m-10">{title}</h1>
        <ElementsLibraryDrawer>
            Библиотека элементов
        </ElementsLibraryDrawer>
        <p className="m-10">Тут будет страница редактирования</p>
    </>)
}