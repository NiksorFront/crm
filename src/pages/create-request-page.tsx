import { useStore, TabType, ElementType } from "@/utils/store";
import "./create-request-pages.css";
import { Button } from "@/components/ui/button";

function Element({element}: {element: ElementType}){
  const [typeElem, id] = element.id.split("-")
  //По этим typeElem и id надо найти элементы в базе элементов
  return <p key={id}>{`${typeElem} ${id}`}</p>
}


function TabContent({tab}: {tab: TabType}){
  return tab.elements && Object.keys(tab.elements).map(element => <Element element={tab.elements[element]}/> )
}

export default function CreateRequestPage() {
  const { settings } = useStore();

  console.log(settings.tabs);

  return (
    <div className="flex flex-wrap"> 
      <h1 className="text-2xl m-10 w-full">{settings.title}</h1>
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
            settings.tabs && Object.keys(settings.tabs).map(tab => <TabContent tab={settings.tabs[tab]}/>)
          }
      </div>
    </div>
  );
}
