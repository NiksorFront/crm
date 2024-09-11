import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import Inpt from "./elements/inpt";
import InptBig from "./elements/inptBig";
import CombBox from "./elements/combBox";
import BtnSubmit from "./elements/btnSubmit";
import BtnPdf from "./elements/btnPdf";

import { Button } from "./ui/button";
import { useStore } from "@/utils/store";

export default function ElementsLibraryDrawer({className, tabName, rws, clms, children }: {className: string, tabName: string, rws: number, clms: number, children: React.ReactNode }) {
  const {settings, newElement } = useStore();

  const handleDoubleClick = (componentName: string, title: string, placeholder: string = '',
                                             //Текущие количество элементов в массиве
                             index: number = Object.keys(settings.tabs![tabName].elements!).length) => {

    const date = new Date();
    const milliseconds = date.getTime().toString();
    const elementName = "element" + milliseconds;
    // console.log(elementName, `${componentName}-${index}`, { col: colums + 1, row: rows + 1 })
    const elementData = {
      id: `${componentName}-${index}`,
      pos: { col: clms + 1, row: rws + 1},
      title: title,
      placeholder: placeholder,
    };

    newElement(tabName, elementName, elementData);
  };

  return (
    <Drawer>
      <DrawerTrigger className={`${className} absolute bottom-0 left-0 m-10 text-wrap w-32 px-4 py-2 bg-gray-800 text-gray-200 font-medium text-s leading-tight rounded-lg shadow-sm hover:bg-gray-700 hover:shadow-md focus:bg-gray-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-md transition duration-150 ease-in-out`}>
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Выберите элемент</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="flex flex-wrap flex-row gap-10 justify-center items-center">
          <div className="w-80" onDoubleClick={() => handleDoubleClick('inpt', 'ввод')} > 
            <Inpt title="ввод" />
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('inptBig', 'ввод побольше')} > 
            <InptBig title="ввод побольше"/>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('combBox', 'список')}  > 
            <CombBox title="список" valuesOrURLRequestValues={["строка 1", "строка 2", "строка 3"]}/>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('btnSubmit', 'кнопка')} > 
            <BtnSubmit variant={"outline"} submitUrl="" error="" tabWithInfo="">кнопка</BtnSubmit>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('btnPdf', 'скачать pdf')}> 
            <BtnPdf variant={"outline"} pdfGenerateCode={() => console.log("генерация")}>скачать pdf</BtnPdf>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

{/* 
<Button className="w-80" disabled={true}>элемент</Button> */}
            
            {/* <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose> */}