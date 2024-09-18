import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ListPlus, ListCheck, ListRestart, LibraryBig, SlidersHorizontal } from "lucide-react";


export default function MenuMain() {
  const [showText, setShowText] = useState(window.innerHeight > 768 ? true : false);
  const navigate = useNavigate();

  const routeToRequsts = () => navigate("/requests/");
  const routeToCompletedRequests = () => navigate("/completedRequests/");
  const routeToAddDeviceType = () => navigate("/deviceTypes/");
  const routeToAddDeviceVendor = () => navigate("/deviceVendors/");
  const routeToAddDevice = () => navigate("/devices/");
  const routeToIndividuals = () => navigate("/directIndividuals/");
  const routeToDirectLegal = () => navigate("/directLegalEntities/");
  const routeToCreateRequst = () => navigate("/сreateRequest/");
  const routeToCreateRequstEdited = () => navigate("/сreateRequestEdited/");

  const toggleText = () => {
    setShowText(prev => !prev);
  };

  return (<div className="m-0">
        <Button
          variant="ghost"
          className={`flex items-center gap-2 text-wrap ${showText ? "px-5": "px-0"}`}
          onClick={toggleText}
        >
          {showText ? "Закрыть меню" : "Открыть меню"}
        </Button>
        <NavigationMenu className="mx-auto">
          <NavigationMenuList className="flex-col my-2 justify-start items-start">
            <Button variant="ghost" className="gap-2 text-wrap px-5" onClick={routeToCreateRequst}>
              <ListPlus size={16} /> {showText && 'Создать заявку'}
            </Button>
            {/* className="gap-3 text-wrap text-start" */}
            <Button variant="ghost" className="gap-2.5" onClick={routeToCreateRequstEdited}>
              <SlidersHorizontal size={14} strokeWidth={2.5} /> {showText && 'Настройки созд. заявок'} 
            </Button>
            <Button variant="ghost" className="gap-3" onClick={routeToRequsts}>
              <ListRestart size={14} strokeWidth={2.5} />
              {showText && 'Активные заявки'}
            </Button>
            <Button variant="ghost" className="gap-2" onClick={routeToCompletedRequests}>
              <ListCheck size={16} />
              {showText && 'Завершённые заявки'}
            </Button>
            <NavigationMenuItem className="pl-5 pl-5">
              <NavigationMenuTrigger className="gap-2 p-0 -mx-1 bg-slate-100">
                <LibraryBig size={16} /> {showText && 'Справочники'}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="gap-2">
                <Button
                  className="m-1.5 w-11/12"
                  variant="secondary"
                  onClick={routeToIndividuals}
                >
                  Физические лица
                </Button>
                <Button
                  className="m-1.5 w-11/12"
                  variant="secondary"
                  onClick={routeToDirectLegal}
                >
                  Юридические лица
                </Button>
                <Button
                  className="m-1.5 w-11/12"
                  variant="secondary"
                  onClick={routeToAddDeviceType}
                >
                  Типы устройств
                </Button>
                <Button
                  className="m-1.5 w-11/12"
                  variant="secondary"
                  onClick={routeToAddDeviceVendor}
                >
                  Марки устройства
                </Button>
                <Button
                  className="m-1.5 w-11/12"
                  variant="secondary"
                  onClick={routeToAddDevice}
                >
                  Устройства
                </Button>
                <Button className="m-1.5 w-11/12" variant="secondary">
                  Картриджи
                </Button>
                <Button className="m-1.5 w-11/12" variant="secondary">
                  Связи
                </Button>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
  );
}
