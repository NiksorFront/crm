import {Element} from "../pages/create-request-page";
import {TabType, ElementType, useStore} from "../utils/store";
import {useDrag, useDrop} from "react-dnd";

type typeDragble = {
    element: ElementType, 
    tabName: string, 
    onMoveElement: (draggedElementId: string, targetElementId: string) => void
}

function DragbleElement({element, tabName, onMoveElement}: typeDragble){
    const [{isDragging}, refDrag] = useDrag({
        type: "Element",
        item: {id: element.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{isHover}, isDrop] = useDrop({
        accept: "Element",
        collect: monitor => ({isHover: monitor.isOver()}),
         //@ts-ignore
         drop: (draggedItem) => (draggedItem.id !== element.id) && onMoveElement(draggedItem.id, element.id)
    });

    return (
        <div
            ref={node => refDrag(isDrop(node))}
            className={`w-full rounded-lg ${isHover ? "bg-teal-100" : ""} ${isDragging ? "opacity-30" : ""}`}
            style={{
                gridColumn: element.pos.col,
                gridRow: element.pos.row
            }}
        >
            <Element element={element} tabName={tabName}/>
        </div>
    );
}

type typeEmptyGridCell = {
    pos: {row: number, col: number},
    onMoveElement: (draggedElementId: string, pos: {row: number, col: number}) => void
}

function EmptyGridCell({pos, onMoveElement}: typeEmptyGridCell){
    const [{isDragging}, refDrag] = useDrag({
        type: "Element",
        item: {id: "empty"},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{isHover}, isDrop] = useDrop({
        accept: "Element",
        collect: monitor => ({isHover: monitor.isOver()}),
        //@ts-ignore
        drop: (draggedItem) => (draggedItem.id !== "empty") && onMoveElement(draggedItem.id, pos)
    });

    return (
        <div
            ref={node => refDrag(isDrop(node))}
            className={`w-full min-h-16 h-full rounded-lg ${isHover ? "bg-teal-100" : ""} ${isDragging ? "opacity-30" : ""}`}
            style={{
                gridColumn: pos.col,
                gridRow: pos.row,
                // border: "2px solid black",
            }}
        >
        </div>
    );
}

export default function TabContentWithDragble({tab, tabName, rows, colums}: {tab: TabType, tabName: string, rows: number, colums: number}) {
    const {updateElement} = useStore();
    
    // Функция для перемещения двух элементов местами
    const changeElement = (draggedElementId: string, targetElementId: string) => {
        let draggedElement: ElementType = {id: "1", pos: {row: 0, col: 0}};
        let targetElement: ElementType = {id: "1", pos: {row: 0, col: 0}};
        
        Object.keys(tab.elements!).forEach(element_name => {
            if (tab.elements![element_name].id === draggedElementId) {
                draggedElement = tab.elements![element_name];
            }
            if (tab.elements![element_name].id === targetElementId) {
                targetElement = tab.elements![element_name];
            }
        });

        // Меняем позиции элементов
        updateElement(tabName, draggedElementId, { pos: targetElement.pos });
        updateElement(tabName, targetElementId, { pos: draggedElement.pos });
    };

    //Функция для перемещения элемента в пустую клетку
    const moveElement = (draggedElementId: string, pos: {row: number, col: number}) =>{
        let draggedElement: ElementType = {id: "1", pos: {row: 0, col: 0}};
        Object.keys(tab.elements!).forEach(element_name => {
            if (tab.elements![element_name].id === draggedElementId) {
                draggedElement = tab.elements![element_name];
            }
        });

        updateElement(tabName, draggedElementId, { pos: pos });
        // console.log(draggedElementId, pos)
    }


    // Создаем массив всех ячеек сетки, которые уже заняты
    const occupiedCells = new Set<string>();
    
    Object.values(tab.elements!).forEach(element => {
        const [startRow, endRow] = element.pos.row.toString().split('/').map(Number);
        const col = element.pos.col;
        for (let row = startRow; row <= (endRow || startRow); row++) {
            occupiedCells.add(`${row}-${col}`);
        }
    });

    const gridCells = [];
    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= colums; col++) {
            const cellKey = `${row}-${col}`;
            if (!occupiedCells.has(cellKey)) {
                gridCells.push(
                    <EmptyGridCell key={cellKey} pos={{row, col}} onMoveElement={moveElement}/>
                );
            }
        }
    }

    return (
        <>
            {tab.elements && Object.keys(tab.elements).map((element, ind) => (
                <DragbleElement
                    key={`_${ind}`}
                    element={tab.elements![element]}
                    tabName={tabName}
                    onMoveElement={changeElement}
                />
            ))}
            {gridCells}
        </>
    );
}
