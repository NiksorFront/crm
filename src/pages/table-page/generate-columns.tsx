import {Fragment} from "react";
import { Button } from "@/components/ui/button";
import { Pencil, KeyRound, Trash2 } from "lucide-react";
import Modal from "../../components/modal";

function whatHeader(key: string): string {
  // prettier-ignore
  return key === "id" ? "номер" :
         key === "status" ? "cтатус" :
         key === "createdAt" ? "дата" :
         key === "device" ? "аппарат" :
         key === "creator" ? "клиент" :
         key === "inn" ? "ИНН" :
         key === "kpp" ? "КПП" :
         key === "name" ? "название" :
         key === "full_name" ? "имя" :
         key === "directorFullName" ? "ФИО руководителя" :
         key === "phone" ? "телефон":
         key === "email" ? "почта" :
         key === "address" ? "юридический адрес" :
         key === "short_name" ? "краткое название" :
         key === "display_type" ? "тип" :
         key === "actionBtns" ? "Действия" :
        //  key === "type" ? "тип" :
         key;
}

function whatColor(key: string): object{
  //https://snipp.ru/handbk/html-colors - название цветов брал тут
  return key === "Завершено" ? {filter: "drop-shadow(0 0 10px)"} :
         key === "Приемка" ? {filter: "drop-shadow(0 0 10px LemonChiffon)"} : 
         key === "Диагностика" ? {filter: "drop-shadow(0 0 10px Moccasin)"} :
         key === "Проценка" ? {filter: "drop-shadow(0 0 10px Khaki)"} :
         key === "Согласование" ? {filter: "drop-shadow(0 0 10px LightSalmon)"} :
         key === "Проверка оплаты" ? {filter: "drop-shadow(0 0 10px Coral)"} : //status === "Проверка" Проверка оплаты возможно неверно
         key === "Заказ запчастей" ? {filter: "drop-shadow(0 0 10px YellowGreen)"} : 
         key === "Ремонт" ? {filter: "drop-shadow(0 0 10px GreenYellow)"} : 
         key === "Подготовка документов" ? {filter: "drop-shadow(0 0 10px LawnGreen)"}  : 
         key === "Подтверждение документов" ? {filter: "drop-shadow(0 0 10px Lime)"} : {filter: "drop-shadow(0 0 10px purple)"};
}



//Это список приоритеных AccessorKey. Чем раньше стоит ключ, тем раньше мы его увидим в любой из таблиц 
const priorityAccessorKey = ["id", "createdAt", "creator", "inn", "name", "full_name", "directorFullName", "phone", "email", "address", "short_name", "display_type", "device", "status", "kpp",];



type columnType = Array<{ accessorKey: string; header: string, size?:number }>;
function sortColumnsByPriority(columns: columnType) {
  return columns.sort((a, b) => {
      const priorityA = priorityAccessorKey.indexOf(a.accessorKey);
      const priorityB = priorityAccessorKey.indexOf(b.accessorKey);

      // Если accessorKey не найден в priorityAccessorKey, перемещаем его в конец
      if (priorityA === -1) return 1;
      if (priorityB === -1) return -1;

      return priorityA - priorityB;
  });
}

type btnGroupType = {rowInfo: {original: {actionBtns:[{edit: string, resetPassword: string, delete: string}], id?: number | string}}};
function ButtonGroup({rowInfo}: btnGroupType){
    // console.log(rowInfo);

    return (
    <div className="flex gap-2"> 
      {rowInfo.original.actionBtns.map((item, i) => (
        <Fragment key={i}>
          {item.edit && <Modal title="Редактирование данных" type="edit" endpointForSubmit={item.edit} id={rowInfo.original.id}> 
                          <Pencil size={16}/>
                        </Modal>
          }
          {item.resetPassword && <Modal title="Смена пароля" type="resetPassword" endpointForSubmit={item.resetPassword}id={rowInfo.original.id}>
                                    <KeyRound size={16}/>
                                 </Modal>
          }
          {item.delete && <Modal title="Удаление" type="delete" endpointForSubmit={item.delete} id={rowInfo.original.id}>
                            <Trash2 size={16}/>
                          </Modal>
          }
        </Fragment>
      ))}
    </div>)
}

//"id", "name", "createdAt",  "status"
//ColumnDef[]

export default function generateColumns(exampleColumn: object, exceptions: Array<string>): columnType {
  let columns: columnType = [];
  if (exampleColumn !== undefined) {
    Object.keys(exampleColumn).forEach((key) => {
        if(!exceptions.some((exception) => exception === key)){
          if(key === "status"){
             //@ts-ignore
            columns.push({ accessorKey: key, header: whatHeader(key), cell: ({row}) => {return <div style={whatColor(row.original.status)}>{row.original.status}</div>} });
          }else if(key === "device") {
             //@ts-ignore
            columns.push({ accessorKey: key, header: whatHeader(key), cell: ({row}) => {return <div>{`${row.original.device.type} ${row.original.device.vendor}`}</div>} });
          }else if(key === "actionBtns") {
           columns.push({ accessorKey: key, header: whatHeader(key),
            //@ts-ignore
            cell: ({row}) => {return <ButtonGroup rowInfo={row}/> }, size: 100,     // задаёт точную ширину в пикселях 
          });
         }else{
            columns.push({ accessorKey: key, header: whatHeader(key)});
          }
        }
    });
  }

  return sortColumnsByPriority(columns);;

  // {
  //   accessorKey: "id",
  //   header: "номер",
  // },
  // {
  //   accessorKey: "createdAt",
  //   header: "создана",
  // },
  // {
  //   accessorKey: "device",
  //   header: "Устройство",
  // },
  // {
  //   accessorKey: "creator",
  //   header: "Заказчик",
  // },
  // {
  //   accessorKey: "status",
  //   header: "Статус",
  // }
}

/*
{
  "inn": "",
  "name": "",
  "directorFullName": "",
  "address": "",
  "kpp": "",
  "id": ""
}
[{accessorKey: "inn",
    header: "inn",},
  {accessorKey: "name",
    header: "name",},
  { accessorKey: "directorFullName",
    header: "directorFullName",},
  {accessorKey: "address",
    header: "address",},
  {accessorKey: "kpp",
    header: "kpp",},
  {accessorKey: "id",
    header: "id",}]*/