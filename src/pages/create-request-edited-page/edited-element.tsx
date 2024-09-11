import {ElementType} from "../../utils/store";
import Inpt from "@/components/elements/inpt";
import InptBig from "@/components/elements/inptBig";
import CombBox from "@/components/elements/combBox";
import BtnSubmit from "@/components/elements/btnSubmit";
import BtnPdf from "@/components/elements/btnPdf";
import BtnNext from "@/components/elements/btnNext";
import TwoTab from "@/components/elements/twoTab";
import BtnSearchInModal from "@/components/elements/btnSearchInModal.tsx";

export default function EditedElemnet({element, tabName, showBindings}: {element: ElementType, tabName: string, showBindings: boolean}){
    const [typeElem, id] = element.id.split("-")

    const elementPosition = {gridRow: element.pos.row, gridColumn: element.pos.col, position: 'relative'}; 

    const bindingsLabel = showBindings ? (
        <span className="absolute top-0 right-0 text-black text-sm z-10 px-2" >
            {id}
        </span>
    ) : null;
  
    switch(typeElem){
      case "inpt":
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <Inpt title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} dependsOn={element.dependsOn}/>
          </div>
        );
      case "inptBig":
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <InptBig title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled}/>
          </div>
        );
      case "combBox": 
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <CombBox title={element.title} id={id} placeholder={element.placeholder} valuesOrURLRequestValues={element.valuesOrURLRequestValues} disabled={element.disabled} dependsOn={element.dependsOn} tabWithInfo={tabName}/>
          </div>
        );
      case "btnSubmit":
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <BtnSubmit variant={"secondary"} id={id} acceptedValues={element.acceptedValues} submitUrl={element.submitUrl!} tabWithInfo={tabName}>
              {element.title}
            </BtnSubmit>
          </div>
        );
      case "btnNext":
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <BtnNext variant={"secondary"} id={id} currentTab={tabName}>
              {element.title}
            </BtnNext>
          </div>
        );
      case "btnPdf":
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <BtnPdf variant={"outline"} id={id} pdfGenerateCode={() => console.log("скачено")} disabled={element.disabled}>
              {element.title}
            </BtnPdf>
          </div>
        );
      case "twoTab":
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <TwoTab title={element.title} titleOne={element.titles?.split('-')[0]} titleTwo={element.titles?.split('-')[1]} elementsTabOne={element.elementsTabOne} elementsTabTwo={element.elementsTabTwo}/>
          </div>
        );
      case "btnSearchInModal":
        return (
          <div style={elementPosition}>
            {bindingsLabel}
            <BtnSearchInModal title={element.title} id={id} endpointForRequest={element.endpointForRequestDataTable} disabled={element.disabled}/>
          </div>
        );
    }
    // По этим typeElem и id надо найти элементы в базе элементов
    return (
      <div style={elementPosition}>
        {bindingsLabel}
        <p key={id}>{`${typeElem} ${id}`}</p>
      </div>
    );
  }
