import { Element } from "../create-request-page";
import {ElementType} from "../../utils/store";
import Inpt from "@/components/elements/inpt";
import InptBig from "@/components/elements/inptBig";
import CombBox from "@/components/elements/combBox";
import BtnSubmit from "@/components/elements/btnSubmit";
import BtnPdf from "@/components/elements/btnPdf";
import BtnNext from "@/components/elements/btnNext";
import TwoTab from "@/components/elements/twoTab";
import BtnSearchInModal from "@/components/elements/btnSearchInModal.tsx";

export default function EditedElemnet({element, tabName}: {element: ElementType, tabName: string}){
    const [typeElem, id] = element.id.split("-")

    const elementPosition = {gridRow: `${element.pos.row}`, gridColumn: `${element.pos.col}`};
    // const testPos = {gridRow: `1/5`, gridColumn: `${element.pos.col}`};
    // console.log(element);
  
    switch(typeElem){
      case "inpt":
        return <Inpt title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} dependsOn={element.dependsOn} style={elementPosition}/>
      case "inptBig":
        return <InptBig title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} style={elementPosition}/>
      case "combBox": 
        return <CombBox title={element.title} id={id} placeholder={element.placeholder} valuesOrURLRequestValues={element.valuesOrURLRequestValues} disabled={element.disabled} dependsOn={element.dependsOn} tabWithInfo={tabName} style={elementPosition}/>
      case "btnSubmit":
        return <BtnSubmit variant={"secondary"} id={id} style={elementPosition} acceptedValues={element.acceptedValues} submitUrl={element.submitUrl!} tabWithInfo={tabName}>{element.title}</BtnSubmit>
      case "btnNext":
        return <BtnNext variant={"secondary"} id={id} style={elementPosition} currentTab={tabName}>{element.title}</BtnNext>
      case "btnPdf":
        return <BtnPdf variant={"outline"} id={id} pdfGenerateCode={() => console.log("скачено")} disabled={element.disabled} style={elementPosition}>{element.title}</BtnPdf>
      case "twoTab":
        return <TwoTab title={element.title} titleOne={element.titles?.split('-')[0]} titleTwo={element.titles?.split('-')[1]} elementsTabOne={element.elementsTabOne} elementsTabTwo={element.elementsTabTwo} style={elementPosition}></TwoTab>
      case "btnSearchInModal":
        return <BtnSearchInModal title={element.title} id={id} endpointForRequest={element.endpointForRequestDataTable} disabled={element.disabled} style={elementPosition}/>
      }
    //По этим typeElem и id надо найти элементы в базе элементов
    return <p key={id}>{`${typeElem} ${id}`}</p>
  }
  