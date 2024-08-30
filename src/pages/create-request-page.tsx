import { useStore, TabType, ElementType } from "@/utils/store";
import "./create-request-pages.css";
import { Button } from "@/components/ui/button";
import Inpt from "@/components/elements/inpt";
import InptBig from "@/components/elements/inptBig";
import CombBox from "@/components/elements/combBox";
import BtnSubmit from "@/components/elements/btnSubmit";
import BtnPdf from "@/components/elements/btnPdf";

function Element({element, tabName}: {element: ElementType, tabName: string}){
  const [typeElem, id] = element.id.split("-")

  const elementPosition = {gridRow: `${element.pos.row}`, gridColumn: `${element.pos.col}`};

  switch(typeElem){
    case "inpt":
      return <Inpt title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} style={elementPosition}/>
    case "inptBig":
      return <InptBig title={element.title} id={id} placeholder={element.placeholder} disabled={element.disabled} style={elementPosition}/>
    case "combBox": 
      return <CombBox title={element.title} id={id} placeholder={element.placeholder} urlToGetRows={element.urlRequestValues} disabled={element.disabled} style={elementPosition}/>
    case "btnSubmit":
      return <BtnSubmit variant={"secondary"} id={id} style={elementPosition} acceptedValues={element.acceptedValues} submitUrl={element.submitUrl} tabWithInfo={tabName}>{element.title}</BtnSubmit>
    case "btnPdf":
      return <BtnPdf variant={"outline"} id={id} pdfGenerateCode={() => console.log("скачено")} disabled={element.disabled} style={elementPosition}>{element.title}</BtnPdf>
  }
  //По этим typeElem и id надо найти элементы в базе элементов
  return <p key={id}>{`${typeElem} ${id}`}</p>
}


function TabContent({tab, tabName}: {tab: TabType, tabName:string}){
  //@ts-ignore
  return tab.elements && Object.keys(tab.elements).map(element => <Element element={tab.elements[element]} tabName={tabName}/> )
}

export default function CreateRequestPage() {
  const { settings } = useStore();

  return (
    <div className="flex flex-wrap"> 
      <h1 className="text-2xl mx-10 my-8 w-full">{settings.title}</h1>
      <div className="flex flex-wrap w-full ml-10 mr-auto">
        <div className="">
          <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500">
            {settings.tabs && Object.keys(settings.tabs).map(tab => 
              <li className="mr-2" key={tab}>
                <Button id={`#${tab}`} disabled={settings.tabs[tab].dsbldTab} variant="secondary" className="border-solid border-y-2 border-gray-300 hover:text-gray-600 hover:border-gray-600">
                  {settings.tabs[tab].title}
                </Button>
              </li>)}
          </ul>
        </div>
      </div>
      <div className="p-4 my-2 mx-10 w-full bg-white rounded-lg shadow ">
          { 
            settings.tabs && Object.keys(settings.tabs).map(tab => {
              //@ts-ignore
              const tabInfo: TabType = settings.tabs[tab];

              //В идеале сделать тоже самое для строк

              let widthColumn = `${1 / Number(tabInfo.columns)}`.substring(2); //Высчитваем столько процентов ширины нам надо
              widthColumn.length === 1 ? widthColumn += "0" : widthColumn = widthColumn.substring(0, 2);

              console.log(widthColumn, 1 % Number(tabInfo.columns));
              return <div id={`${tab}`} className={`grid  gap-4`} 
                          style={{gridTemplateColumns: `repeat(${tabInfo.columns}, minmax(0, ${widthColumn}%)`,}} >
                      <TabContent tab={tabInfo} tabName={`${tab}`}/>
                    </div>}
            )
          }
      </div>
    </div>
  );
}
