import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import ServiceV_elems from "./libraries-with-elements/service_v";
import Universal_elems from "./libraries-with-elements/universal";
import { Button } from "./ui/button";
import {ArrowLeft} from "lucide-react";


type typeElementsLibraryDrawer = {
  className: string;
  tabName: string;
  rws: number;
  clms: number;
  children: React.ReactNode;
}

function BackButton({setActiveTab} : {setActiveTab: any}){
  return <Button
            onClick={() => setActiveTab("choice")}
            className="absolute -top-20 -left-2 gap-2 text-sm hover:bg-gray-400"
            variant={"secondary"}
          >
            <ArrowLeft size={16} />Назад
        </Button>
}

export default function ElementsLibraryDrawer({className, tabName, rws, clms, children}: typeElementsLibraryDrawer) {
  // Определяем состояние для активного таба
  const [activeTab, setActiveTab] = useState<string>("choice");

  return (
    <Drawer>
      <DrawerTrigger
        className={`${className} absolute bottom-0 left-0 m-10 text-wrap w-32 px-4 py-2 bg-gray-800 text-gray-200 font-medium text-s leading-tight rounded-lg shadow-sm hover:bg-gray-700 hover:shadow-md focus:bg-gray-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-md transition duration-150 ease-in-out`}
      >
        {children}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">Выберите элемент</DrawerTitle>
        </DrawerHeader>

        {/* Кнопки выбора вкладок */}
        {activeTab === "choice" && <div className="flex justify-around my-4">
          <section
            id="universal"
            className={`border-2 w-64 h-64 rounded-lg cursor-pointer flex items-center justify-center hover:border-black`}
            onClick={() => setActiveTab("universal")}
          >
            <span className="text-xl font-semibold">Универсальные</span>
          </section>

          <section
            id="service-v"
            className={`border-2 w-64 h-64 rounded-lg cursor-pointer flex items-center justify-center hover:border-black`}
            onClick={() => setActiveTab("service-v")}
          >
            <span className="text-xl font-semibold">Сервис-В</span>
          </section>
        </div>}

        {/* Условный рендеринг контента на основе активного таба */}
        <div className="p-4">
          {activeTab === "universal" && (
            <div className="relative">
              <Universal_elems tabName={tabName} rws={rws} clms={clms} />
              <BackButton setActiveTab={setActiveTab}/>
            </div>
          )}
          {activeTab === "service-v" && (
            <div className="relative">
              <ServiceV_elems tabName={tabName} rws={rws} clms={clms} />
              <BackButton setActiveTab={setActiveTab}/>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
