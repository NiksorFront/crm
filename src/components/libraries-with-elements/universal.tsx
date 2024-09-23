import { useStore } from "@/utils/store";
import Inpt from "../elements/inpt";
import InptBig from "../elements/inptBig";
import CombBox from "../elements/combBox";
import BtnSubmit from "../elements/btnSubmit";
import BtnPdf from "../elements/btnPdf";
import BtnNext from "../elements/btnNext";
import Text from "../elements/text";
import InptDate from "../elements/inptDate";
import ChckBox from "../elements/chckBox";

export default function Universal_elems({tabName, rws, clms,} : {tabName: string, rws: number, clms: number,}){
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

        componentName === 'text' ? newElement(tabName, elementName, {...elementData, fontSize: '25', align: "лево"}) :
        componentName === 'chckBox' ? newElement(tabName, elementName, {...elementData, align: "центр"})
                                    : newElement(tabName, elementName, elementData);
        };

    return(
        <div className="flex flex-wrap flex-row gap-10 justify-center items-center py-10">
          <div className="w-80" onDoubleClick={() => handleDoubleClick('inpt', 'ввод')} > 
            <Inpt title="ввод" />
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('inptBig', 'ввод побольше')} > 
            <InptBig title="ввод побольше"/>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('combBox', 'список')}  > 
            <CombBox title="список" valuesOrURLRequestValues={["строка 1", "строка 2", "строка 3"]}/>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('inptDate', 'дата', "01.01.2024")}> 
            <InptDate title="дата"/>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('btnSubmit', 'кнопка')} > 
            <BtnSubmit variant={"outline"} submitUrl={{url:"", action: ""}} error="" tabWithInfo="" edited={true}>кнопка</BtnSubmit>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('btnPdf', 'скачать pdf')}> 
            <BtnPdf variant={"outline"} pdfGenerateCode={() => console.log("генерация")}>скачать pdf</BtnPdf>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('btnNext', 'следующая страница')}> 
            <BtnNext variant={"outline"} currentTab="Согласование">следующая страница</BtnNext>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('text', 'большой текст')}> 
            <Text title="большой текст"/>
          </div>
          <div className="w-80" onDoubleClick={() => handleDoubleClick('chckBox', 'флажок выбора')}> 
            <ChckBox title="флажок выбора"/>
          </div>
        </div>
    )
}