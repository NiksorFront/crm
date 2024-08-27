import {
    Drawer,
    // DrawerClose,
    DrawerContent,
    // DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer";
import { Button } from "./ui/button";
  
export default function ElementsLibraryDrawer({children}: {children: React.ReactNode}){
    return(
    <Drawer>
        <DrawerTrigger className="absolute bottom-0 left-0 m-10 text-wrap w-32 px-4 py-2 bg-gray-800 text-gray-200 font-medium text-s leading-tight rounded-lg shadow-sm hover:bg-gray-700 hover:shadow-md focus:bg-gray-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-gray-600 active:shadow-md transition duration-150 ease-in-out">{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Выберите элемент</DrawerTitle>
            {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
          </DrawerHeader>
          <DrawerFooter className="flex flex-wrap flex-row gap-10 justify-center">
            <Button className="w-80">выбор марки</Button>
            <Button className="w-80">элемент</Button>
            <Button className="w-80">описание</Button>
            <Button className="w-80">кнопка</Button>
            <Button className="w-80">отправка</Button>
            <Button className="w-80">ввод почты</Button>
            <Button className="w-80">выбор типа</Button>
            <Button className="w-80">ввод телефона</Button>
            <Button className="w-80">ввод ещё чего-то</Button>
            <Button className="w-80">элемент</Button>
            
            {/* <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose> */}
          </DrawerFooter>
        </DrawerContent>
    </Drawer>
    )
}