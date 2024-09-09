import {TabType, ElementType, useStore} from "../utils/store";
import {Element} from "../pages/create-request-page";
import {useDrag, useDrop} from "react-dnd";

type typeDragble = {element: ElementType, tabName: string, onMoveElement: (draggedElementId: string, targetElementId: string) => void}


function DragbleElement({element, tabName, onMoveElement}: typeDragble){
    const [{isDragging}, refDrag] = useDrag({
        type: "Element",
        item: {id: element.id},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{isHover},isDrop] = useDrop({
        accept: "Element",
        collect: monitor => ({isHover: monitor.isOver()}),
        drop: (draggedItem) => {
            // console.log(draggedItem.id, element.id)
            if (draggedItem.id !== element.id) {
                onMoveElement(draggedItem.id, element.id);
            }
        }
    })

    return  <div id="123" ref={node => refDrag(isDrop(node))} className={`w-full rounded-lg ${isHover ? "bg-teal-100" : ""} ${isDragging ? "opacity-30" : ""}`} style={{gridColumn: element.pos.col, gridRow: element.pos.row}}>
                <Element element={element} tabName={tabName}/>
            </div>
}

export default function TabContentWithDragble({tab, tabName}: {tab: TabType, tabName:string}){
    const {updateElement} = useStore();

    // Функция для перемещения элементов
    const moveElement = (draggedElementId: string, targetElementId: string) => {

        let draggedElement: ElementType = {id: "1", pos: {row: 0, col: 0}};
        let targetElement: ElementType =  {id: "1", pos: {row: 0, col: 0}};

        Object.keys(tab.elements!).forEach(element_name => {
            if(tab.elements![element_name].id === draggedElementId){
                draggedElement = tab.elements![element_name]
            }
            if(tab.elements![element_name].id === targetElementId){
                targetElement = tab.elements![element_name]
            }
        })

        // Меняем позиции элементов
        updateElement(tabName, draggedElementId, { pos: targetElement.pos });
        updateElement(tabName, targetElementId, { pos: draggedElement.pos });
    };
    //@ts-ignore
    return (<>
        {/* <div ref={isDrop} style={{border: `${isHover ? "4px solid pink" : "2px solid"}`}}>

        </div> */}
        
        {tab.elements && Object.keys(tab.elements).map((element, ind) => <DragbleElement key={`_${ind}`} element={tab.elements![element]} tabName={tabName} onMoveElement={moveElement}/> )}
    </>)
}