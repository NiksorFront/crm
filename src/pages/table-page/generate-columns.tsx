import { ColumnDef } from "@tanstack/react-table";


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
const priorityAccessorKey = ["id", "createdAt", "phone", "creator", "inn", "name", "full_name", "directorFullName", "email", "address", "short_name", "display_type", "device", "status", "kpp",];



type columnType = Array<{ accessorKey: string; header: string }>;
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

//"id", "name", "createdAt",  "status"
//ColumnDef[]

export default function generateColumns(exampleColumn: object, exceptions: Array<string>): columnType {
  let columns: columnType = [];
  if (exampleColumn !== undefined) {
    Object.keys(exampleColumn).forEach((key) => {
        if(!exceptions.some((exception) => exception === key)){
          if(key === "status"){
            columns.push({ accessorKey: key, header: whatHeader(key),
              //@ts-ignore
              cell: ({row}) => {return <div style={whatColor(row.original.status)}>{row.original.status}</div>} 
            });
          }else if(key === "device") {
            columns.push({ accessorKey: key, header: whatHeader(key),
              //@ts-ignore
              cell: ({row}) => {
                // console.log(row.original.device)
                return <div>{`${row.original.device.type} ${row.original.device.vendor}`}</div>
              } 
            });
          }else{
            columns.push({ accessorKey: key, header: whatHeader(key) });
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