import { useState } from "react";
import { ElementType } from "../../utils/store";
import InptEditable from "@/components/editable-elements/inpt-editable";
import InptBigEditable from "@/components/editable-elements/inptBig-editable";
import CombBox from "@/components/elements/combBox";
import BtnSubmitEditable from "@/components/editable-elements/btnSubmit-editable";
import BtnPdf from "@/components/elements/btnPdf";
import BtnNext from "@/components/elements/btnNext";
import TwoTab from "@/components/elements/twoTab";
import BtnSearchInModal from "@/components/elements/btnSearchInModal.tsx";
import TextEditable from "@/components/editable-elements/text-editable";
import ChckBoxEditable from "@/components/editable-elements/chckBox-editable";
import {useStore} from "../../utils/store";
import {X} from "lucide-react";
import InptDateEditable from "@/components/editable-elements/inptDate-editable";



export default function EditedElemnet({element, tabName, showBindings}: {element: ElementType, tabName: string, showBindings: boolean}){
    const [typeElem, id] = element.id.split("-");
    const { deleteElement } = useStore();

    const elementPosition = { gridRow: element.pos.row, gridColumn: element.pos.col, position: 'relative' };

    const bindingsLabel = showBindings && (
        <span className="absolute top-0 right-0 text-black text-sm z-10 px-2" >
            {id}
        </span>
    );

    const xDeletions = <X size={16} className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700 bg-slate-200 border-2 rounded cursor-pointer" onClick={() => deleteElement(tabName, element.id)} />



    switch (typeElem) {
        case "inpt":
            return <InptEditable element={element} tabName={tabName} style={elementPosition} xDeletions={xDeletions} bindingsLabel={bindingsLabel}/>
        case "inptBig":
            return <InptBigEditable element={element} tabName={tabName} style={elementPosition} xDeletions={xDeletions} bindingsLabel={bindingsLabel} />
        case "combBox":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    {xDeletions}
                    <CombBox title={element.title} id={id} placeholder={element.placeholder} valuesOrURLRequestValues={element.valuesOrURLRequestValues} disabled={element.disabled} dependsOn={element.dependsOn}/>
                </div>
            );
        case "btnSubmit":
            return <BtnSubmitEditable element={element} tabName={tabName} style={elementPosition} xDeletions={xDeletions} showBindings={showBindings} />
        case "btnNext":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    {xDeletions}
                    <BtnNext variant={"secondary"} id={id} currentTab={tabName}>
                        {element.title}
                    </BtnNext>
                </div>
            );
        case "btnPdf":
            return (
                //@ts-ignore
                <div style={elementPosition} className="flex flex-wrap w-full">
                    {showBindings && <span className="pb-1 w-fit ml-auto mr-0 text-black text-right text-sm z-10" >
                        {element.acceptedValues?.join(" ")}
                    </span>}
                    {xDeletions}
                    <BtnPdf variant={"outline"} id={id} pdfGenerateCode={() => console.log("скачено")} disabled={element.disabled} edited={true}>
                        {element.title}
                    </BtnPdf>
                </div>
            );
        case "twoTab":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    {xDeletions}
                    <TwoTab title={element.title} titleOne={element.titles?.split('-')[0]} titleTwo={element.titles?.split('-')[1]} elementsTabOne={element.elementsTabOne} elementsTabTwo={element.elementsTabTwo} />
                </div>
            );
        case "btnSearchInModal":
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    {xDeletions}
                    <BtnSearchInModal title={element.title} id={id} endpointForRequest={element.endpointForRequestDataTable} forAdd={element.forAddinDataTable} disabled={element.disabled} />
                </div>
            );
        case "text":
            // return <Text title={element.title} fontSize={element.fontSize} textAlign={element.textAlign}/>
            return <TextEditable element={element} tabName={tabName} style={elementPosition} xDeletions={xDeletions}/>
        case "inptDate":
            return <InptDateEditable element={element} tabName={tabName} style={elementPosition} xDeletions={xDeletions} bindingsLabel={bindingsLabel}/>
        case "chckBox":
            return <ChckBoxEditable element={element} tabName={tabName} style={elementPosition} xDeletions={xDeletions} />
        default:
            return (
                //@ts-ignore
                <div style={elementPosition}>
                    {bindingsLabel}
                    {xDeletions}
                    <p key={id}>{`${typeElem} ${id}`}</p>
                </div>
            );
    }
}



