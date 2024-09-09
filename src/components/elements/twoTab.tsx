import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {ElementType} from "../../utils/store";
import { Element } from "@/pages/create-request-page";
import { Label } from "../ui/label";


type typeTwoTab = {
     title?: string,
     titleOne?: string,
     elementsTabOne?:Record<string, ElementType >, 
     titleTwo?: string, 
     elementsTabTwo?: Record<string, ElementType >,
     style?: {}
}

export default function TwoTab({title, titleOne="", elementsTabOne, titleTwo="", elementsTabTwo, style}: typeTwoTab){

    //bg-gray-50 rounded-lg
    //Сделать тут grid'ы и также через style
    return <div style={style}>
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
                    </div>
                    })}
                {/* <Element element={contentTabOne} tabName={titleOne}/> */}
            </TabsContent>
            <TabsContent value="tab2" className="grid gap-4 grid-cols-1	grid-rows-1 m-0">
                {elementsTabTwo && Object.keys(elementsTabTwo).map((element, index) => {
                    return <div>
                        <Element key={index} element={elementsTabTwo[element]} tabName={titleOne}/>
                    </div>
                    })}
                {/* <Element element={contentTabTwo} tabName={titleTwo}/> */}
            </TabsContent>
        </Tabs>
  </div>
  
}