import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  // NavigationMenuViewport,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ListPlus, ListCheck, ListRestart, LibraryBig } from "lucide-react";

export default function MenuMain() {
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

  return (
    <NavigationMenu className="clearLeft">
      <NavigationMenuList className="flex-col my-2 justify-start items-start">
        <Button variant="ghost" className="gap-2 text-wrap px-5" onClick={routeToCreateRequst}>
          <ListPlus size={16} /> Создать заявку
        </Button>
        <Button variant="ghost" className="gap-2 text-wrap" onClick={routeToCreateRequstEdited}>
          Настройки созд. заявок
        </Button>
        <Button variant="ghost" className="gap-3" onClick={routeToRequsts}>
          {/* <AlignJustify size={12} strokeWidth={3} /> */}
          <ListRestart size={14} strokeWidth={2.5}/>
          Активные заявки
        </Button>
        <Button
          variant="ghost"
          className="gap-2 "
          onClick={routeToCompletedRequests}
        >
          <ListCheck size={16} />
          Завершённые заявки
        </Button>
        <NavigationMenuItem className="px-4 pl-5">
          <NavigationMenuTrigger className="gap-2 p-0 -mx-1 bg-slate-100"><LibraryBig size={16}/>Справочники</NavigationMenuTrigger>
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
        {/* <Button variant="ghost">Настройки</Button> */}
        {/* <Button variant="ghost">Настройки создания заяков</Button> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
