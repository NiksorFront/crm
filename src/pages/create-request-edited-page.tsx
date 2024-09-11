import {useStore} from "../utils/store";
import {useState} from "react";
import {Button} from "../components/ui/button";
import { TabType } from "../utils/store";
import TabContentWithDragble from "./tab-content-for-edited-page";
import ElementsLibraryDrawer from "../components/elements-library-drawer";
import { X } from "lucide-react"; // Импорт иконки крестика

import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function CreateRequestEditedPage(){
    const { settings, newActiveTab, updateTitle, addNewTab, removeTab, updateTabTitle, updateTabColumns, updateElement } = useStore();
    const [isEditingTitle, setIsEditingTitle] = useState(false); // состояние для режима редактирования заголовка
    const [tempTitle, setTempTitle] = useState(settings.title); // временное значение заголовка

    const [customMaxRows, setCustomMaxRows] = useState<{ [key: string]: number }>({}); // Хранит maxRow для каждого таба

  
    // Состояние для отслеживания редактируемого таба и его заголовка
    const [editingTab, setEditingTab] = useState<string | null>(null);
    const [newTitle, setNewTitle] = useState<string>("");

    const switchTab = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLElement; // Приводим e.target к HTMLElement
        const id = target.id.split("#")[1];
        id && newActiveTab(id);
    }

    // Функция для завершения редактирования и сохранения заголовка
    const handleSaveTitle = () => {
        setIsEditingTitle(false);
        updateTitle(tempTitle);
    };


    // Сохранить новый заголовок
    const handleTabTitleSave = (tab: string) => {
        updateTabTitle(tab, newTitle); // Сохранить новый заголовок через updateTabTitle
        setEditingTab(null); // Выйти из режима редактирования
    };

    const handleRemoveTab = (tabName: string) => {
        removeTab(tabName);
      };


    // Функция для изменения количества столбцов
    const changeColumns = (tabName: string, delta: number) => {
        const currentColumns = settings.tabs![tabName].columns;
        const newColumns = Math.max(1, currentColumns! + delta); // Не допускаем значения меньше 1
        updateTabColumns(tabName, newColumns);
    };

    // Функция для изменения количества строк
    const changeMaxRows = (tabName: string, delta: number) => {
        setCustomMaxRows(prev => {
            const currentMaxRow = prev[tabName] || 0;
            const newMaxRow = Math.max(0, currentMaxRow + delta); // Не допускаем значения меньше 0
            return { ...prev, [tabName]: newMaxRow };
        });
    };

    return(<>
        <h1 className="text-2xl font-semibold mx-10 my-4">{"Настройки меню создания заявок"}</h1>
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-wrap"> 
                {/* Проверка на режим редактирования */}
                {isEditingTitle ? (
                <input
                    type="text"
                    value={tempTitle}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTempTitle(e.target.value)}  //Сохранения нового заголовка
                    onBlur={handleSaveTitle} // Сохраняем заголовок при потере фокуса
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => (e.key === "Enter") && handleSaveTitle()} // Сохраняем заголовок при нажатии Enter
                    className="text-2xl mx-10 my-4 w-full border border-gray-300 p-2 rounded"
                    autoFocus
                />
                ) : (
                <h1
                    className="text-2xl mx-10 my-4 w-full"
                    onDoubleClick={() => setIsEditingTitle(true)} // Включаем режим редактирования при двойном клике
                >
                    {settings.title}
                </h1>
                )}
                <div className="flex flex-wrap w-full ml-10 mr-auto">
                    <div className="">
                    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
                        {settings.tabs && Object.keys(settings.tabs).map((tab, id) => (
                            <li className="mr-2" key={tab}>
                                {editingTab === tab ? (
                                    // Режим редактирования
                                    <input
                                        type="text"
                                        value={newTitle}
                                        onChange={(e) => setNewTitle(e.target.value)}
                                        onBlur={() => handleTabTitleSave(tab)} // Сохранение заголовка при потере фокуса
                                        onKeyDown={(e) => (e.key === 'Enter') && handleTabTitleSave(tab)} // Сохранение заголовка при нажатии Enter
                                        
                                        className="border-solid border-2 border-gray-300 rounded px-2 py-2"
                                        autoFocus
                                    />
                                ) : (
                                    // Обычный заголовок вкладки с двойным кликом для редактирования
                                    <Button
                                        id={`#${tab}`}
                                        variant="secondary"
                                        onClick={switchTab}
                                        onDoubleClick={() => {setEditingTab(tab); setNewTitle(settings.tabs![tab].title);}} // Двойной клик для редактирования
                                        className={`relative border-solid border-y-2 border-gray-300 ${settings.tabs![tab].activeTab && "bg-green-100"} hover:text-gray-600 hover:border-gray-600`}
                                    >
                                        {settings.tabs![tab].title}
                                        <X size={16} className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700 bg-slate-200 border-2 rounded" onClick={() => handleRemoveTab(tab)} />
                                    </Button>

                                )}
                            </li>
                        ))}
                        <li className="mr-2" key={"new_tab"}>
                            <Button
                                id="new_tab"
                                variant="secondary"
                                className={`border-solid border-y-2 border-gray-300 hover:text-gray-600 hover:border-gray-600`}
                                onClick={() => addNewTab()}
                            >
                                +
                            </Button>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="p-4 my-2 mx-10 w-full bg-white rounded-lg shadow ">
                    { 
                        settings.tabs && Object.keys(settings.tabs).map(tab => {

                        const tabInfo: TabType = settings.tabs![tab];

                        let widthColumn = `${1 / Number(tabInfo.columns)}`.substring(2); //Высчитваем столько процентов ширины нам надо
                        widthColumn.length === 1 ? widthColumn += "0" : widthColumn = widthColumn.substring(0, 2);

                        // Находим максимальное значение строки (pos.row) среди элементов
                        const maxRow = tabInfo.elements
                                       ? Math.max(...Object.keys(tabInfo.elements).map(key => parseInt(tabInfo.elements[key].pos.row) || 0))
                                       : 0;
                        //И записываем его, если оно ещё не сохранено
                        if(customMaxRows[tab] === undefined){
                            changeMaxRows(tab, maxRow)
                        }


                        return <>
                                <ElementsLibraryDrawer className={`${tabInfo.activeTab ? "" : "hidden"}`} tabName={`${tab}`} rws={customMaxRows[tab]} clms={tabInfo.columns ? tabInfo.columns : 1}>
                                    Библиотека элементов
                                </ElementsLibraryDrawer>
                                {/* Отображение информации о количестве столбцов и строк с кнопками */}
                                <div className={`col-span-full text-gray-600 font-medium flex pb-4 items-center gap-4 ${tabInfo.activeTab ? "" : "hidden"}`}>
                                    {/* Количество столбцов */}
                                    <div className="flex items-center gap-2">
                                        <p>Cтолбцов: </p>
                                        <Button className="p-1 h-4" variant={"ghost"} onClick={() => changeColumns(tab, -1)}>-</Button>
                                        <span>{`${tabInfo.columns}`}</span>
                                        <Button className="p-1 h-4" variant={"ghost"} onClick={() => changeColumns(tab, 1)}>+</Button>
                                    </div>
                                    {/* Число строк */}
                                    <div className="flex items-center gap-2">
                                        <p>Cтрок: </p>
                                        <Button className="p-1 h-4" variant={"ghost"} onClick={() => changeMaxRows(tab, -1)}>-</Button>
                                        <span>{`${customMaxRows[tab]}`}</span>
                                        <Button className="p-1 h-4" variant={"ghost"} onClick={() => changeMaxRows(tab, 1)}>+</Button>
                                    </div>
                                </div>
                                
                                {/* Содержимое таба */}
                                <div key={`${tab}`} id={`${tab}`} className={`grid gap-4 ${tabInfo.activeTab ? "" : "hidden"}`} 
                                            style={{gridTemplateColumns: `repeat(${tabInfo.columns}, minmax(0, ${widthColumn}%)`, gridTemplateRows: `repeat(${customMaxRows[tab]}, auto)`}} >
                                        <TabContentWithDragble tab={tabInfo} tabName={`${tab}`} rows={customMaxRows[tab]} colums={tabInfo.columns ? tabInfo.columns : 1}/>
                                </div>
                            </>})
                    }
                </div>
            </div>
        </DndProvider>
    </>)
}