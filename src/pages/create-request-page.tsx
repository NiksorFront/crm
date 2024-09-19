import { useStore, TabType, ElementType,} from "@/utils/store";
import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import Inpt from "@/components/elements/inpt";
import InptBig from "@/components/elements/inptBig";
import CombBox from "@/components/elements/combBox";
import BtnSubmit from "@/components/elements/btnSubmit";
import BtnPdf from "@/components/elements/btnPdf";
import BtnNext from "@/components/elements/btnNext";
import TwoTab from "@/components/elements/twoTab";

import BtnSearchInModal from "../components/elements/btnSearchInModal.tsx";

export function Element({element, tabName}: {element: ElementType, tabName: string}){
  const [typeElem, id] = element.id.split("-")

  const elementPosition = {gridRow: `${element.pos.row}`, gridColumn: `${element.pos.col}`};

  switch(typeElem){
    case "inpt":
      return <Inpt title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} dependsOn={element.dependsOn} style={elementPosition}/>
    case "inptBig":
      return <InptBig title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} style={elementPosition}/>
    case "combBox": 
      return <CombBox title={element.title} id={id} placeholder={element.placeholder} valuesOrURLRequestValues={element.valuesOrURLRequestValues} disabled={element.disabled} dependsOn={element.dependsOn} style={elementPosition}/>
    case "btnSubmit":
      return <BtnSubmit variant={"secondary"} id={id} style={elementPosition} acceptedValues={element.acceptedValues} submitUrl={element.submitUrl!} tabWithInfo={tabName}>{element.title}</BtnSubmit>
    case "btnNext":
      return <BtnNext variant={"secondary"} id={id} style={elementPosition} currentTab={tabName}>{element.title}</BtnNext>
    case "btnPdf":
      return <BtnPdf variant={"outline"} id={id} pdfGenerateCode={() => console.log("скачено")} disabled={element.disabled} style={elementPosition}>{element.title}</BtnPdf>
    case "twoTab":
      return <TwoTab title={element.title} titleOne={element.titles?.split('-')[0]} titleTwo={element.titles?.split('-')[1]} elementsTabOne={element.elementsTabOne} elementsTabTwo={element.elementsTabTwo} style={elementPosition}></TwoTab>
    case "btnSearchInModal":
      return <BtnSearchInModal title={element.title} id={id} endpointForRequest={element.endpointForRequestDataTable} forAdd={element.forAddinDataTable} disabled={element.disabled} style={elementPosition}/>
    }
  //По этим typeElem и id надо найти элементы в базе элементов
  return <p key={id}>{`${typeElem} ${id}`}</p>
}


function TabContent({tab, tabName}: {tab: TabType, tabName:string}){
  //@ts-ignore
  return tab.elements && Object.keys(tab.elements).map((element, ind) => <Element key={`${element.id}${ind}`} element={tab.elements[element]} tabName={tabName}/> )
}

export default function CreateRequestPage() {
  const { settings, newActiveTab, getSettingsFromServer } = useStore();
  const [errorText, setErrorText] = useState("");

  useEffect(() => {
    getSettingsFromServer()
  }, [])


  const switchTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement; // Приводим e.target к HTMLElement
    const id = target.id.split("#")[1];
    if(id){
      // console.log("Переключение кайф")
      newActiveTab(id);
    }
    else{
      // const currentText = target.textContent;
      target.textContent = "Ошибка";
      setErrorText("");
      //Сделать тест красным надо будет
      // setTimeout(() =>{
      //   e.target.textContent = currentText;
      // }, 5000);
    }
  }

  return (
    <div className="flex flex-wrap"> 
      <h1 className="text-2xl mx-10 my-8 w-full">{settings.title}</h1>
      <div className="flex flex-wrap w-full ml-10 mr-auto">
        <div className="">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
            {settings.tabs && Object.keys(settings.tabs).map(tab => 
              <li className="mr-2" key={tab}>
                <Button id={`#${tab}`} disabled={settings.tabs![tab].dsbldTab} variant="secondary" onClick={switchTab} className={`${settings.tabs![tab].activeTab && "bg-green-100"} rounded-t-xl rounded-b-none rounded-br-none hover:text-gray-600 hover:border-gray-600`}>
                  {errorText ? errorText : settings.tabs![tab].title}
                </Button>
              </li>)}
          </ul>
        </div>
      </div>
      <div className="p-4 mx-10 w-full bg-white rounded-lg shadow ">
          { 
            settings.tabs && Object.keys(settings.tabs).map(tab => {
              //@ts-ignore
              const tabInfo: TabType = settings.tabs[tab];

              let widthColumn = `${1 / Number(tabInfo.columns)}`.substring(2); //Высчитваем столько процентов ширины нам надо
              widthColumn.length === 1 ? widthColumn += "0" : widthColumn = widthColumn.substring(0, 2);

              return <div key={`${tab}`} id={`${tab}`} className={`grid gap-4 ${tabInfo.activeTab ? "" : "hidden"}`} 
                          style={{gridTemplateColumns: `repeat(${tabInfo.columns}, minmax(0, ${widthColumn}%)`}} >
                      <TabContent tab={tabInfo} tabName={`${tab}`}/>
                    </div>}
            )
          }
      </div>
    </div>
  );
}