import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {ElementType} from "../../utils/store";
import { Element } from "@/pages/create-request-page";
import { useRef} from "react";
import { Label } from "../ui/label";
import {useTableRow} from "../../utils/store";
import { useEffect } from "react";


type typeTwoTab = {
     title?: string,
     titleOne?: string,
     elementsTabOne?:Record<string, ElementType >, 
     titleTwo?: string, 
     elementsTabTwo?: Record<string, ElementType >,
     style?: {}
}

export default function TwoTab({title, titleOne="", elementsTabOne, titleTwo="", elementsTabTwo, style}: typeTwoTab){
    const ref = useRef(null);
    const {row} = useTableRow();

    useEffect(() => {
        if (ref.current && row) {
            // Для каждого ключа в объекте row
            Object.keys(row).forEach((key) => {//@ts-ignore
                const element: HTMLInputElement = ref.current.querySelector(`#${key}`);
                if (element) {
                    // Проверяем, является ли элемент полем ввода (input/textarea)
                    if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                        element.value = row[key]; // Устанавливаем значение в поле
                    } else {
                        element.textContent = row[key]; // Иначе устанавливаем как текстовое содержимое
                    }
                }
            });
        }}, [row])

    //Сделать тут grid'ы и также через style
    return <div style={style} ref={ref}>
        <Label>{title}</Label>
        <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="w-full h-fit mb-3.5">
                <TabsTrigger className="w-1/2 text-wrap" value="tab1">{titleOne}</TabsTrigger>
                <TabsTrigger className="w-1/2 text-wrap" value="tab2">{titleTwo}</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="grid gap-4 grid-cols-1	grid-rows-1 m-0">
                {elementsTabOne && Object.keys(elementsTabOne).map((element, index) => {
                    return <div>
                        <Element key={index} element={elementsTabOne[element]} tabName={titleOne}/>
                        {/* <EditedElemnet key={index} element={elementsTabOne[element]} tabName={titleOne} showBindings={true}/> */}
                    </div>
                    })}
                {/* <Element element={contentTabOne} tabName={titleOne}/> */}
            </TabsContent>
            <TabsContent value="tab2" className="grid gap-4 grid-cols-1	grid-rows-1 m-0">
                {elementsTabTwo && Object.keys(elementsTabTwo).map((element, index) => {
                    return <div>
                        <Element key={index} element={elementsTabTwo[element]} tabName={titleOne}/>
                        {/* <EditedElemnet key={index} element={elementsTabTwo[element]} tabName={titleOne} showBindings={true}/> */}
                    </div>
                    })}
                {/* <Element element={contentTabTwo} tabName={titleTwo}/> */}
            </TabsContent>
        </Tabs>
  </div>
  
}