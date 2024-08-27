import generateColumns from "./generate-columns.tsx";
import { DataTable } from "./data-table.tsx";
import { gettingData } from "../../utils/api.ts";
import { useQuery } from "react-query";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button.tsx";
import { DialogTrigger } from "@/components/ui/dialog.tsx";
import Modal from "@/components/modal.tsx";

// asunc
type typeTablePage = { title: string; endpoint: string, exceptions?: Array<string>, endpointForAdd?: string, endpointForEdit?: string, endpointForResetPassword?: string, endpointForDelete?: string};

export default function TablePage({title, endpoint, exceptions=[], endpointForAdd="", endpointForEdit="", endpointForResetPassword="", endpointForDelete=""}: typeTablePage ) {
  const { isLoading, error, data } = useQuery(["dataTable", endpoint], () =>
    gettingData(endpoint)
      .then((res) => res)
      .catch((err) => err),
  );

  // useEffect(() => {
  //   console.log(data);
  // }, [endpoint]);
  let exampleColumns = data ? {...data[0]} : {};
  if(data){
    
    if (endpointForEdit || endpointForResetPassword || endpointForDelete){
      exampleColumns.actionBtns = "actionBtns";  //Добавляем столбец для Кнопок
      data.forEach((row: {}) => Object.assign(row, {actionBtns: []})); //Добавляем массив, куда будут записываться какие кнопки надо отобразить
    
      type rowType = {actionBtns: [{}]};
      endpointForEdit && data.forEach((row: rowType) => row.actionBtns.push({edit: endpointForEdit}));
      endpointForResetPassword && data.forEach((row: rowType) => row.actionBtns.push({resetPassword: endpointForResetPassword}));
      endpointForDelete && data.forEach((row: rowType) => row.actionBtns.push({delete: endpointForDelete}));
      //Дальнейшие enpoint'ы писать тут по аналогии с тремя строками выше. 
      //Чтобы всё заработало надо ещё в generate-columns в ButtonGroup происписть какую кнопку надо отображать и что она будет делать
    }
  }

  isLoading && <p className="text-3xl text-gray-900 dark:text-white">Загрузка</p>;

  error && <p className="text-3xl text-red-600">Ошибка получения данных</p>;
  //Поправить, что у нас Потом кнопки кнопка епта в Modal
  return (
    <div className="container mx-auto py-10">
      <div className="py-4 flex justify-between">
        <h1 className="text-2xl text-left m-0">{title}</h1>
        {endpointForAdd !== "" && <Modal title="Добавление" type="add" endpointForSubmit={endpointForAdd}>
                                          <Button variant="secondary" className="gap-2"><Plus/>Добавить</Button>
                                  </Modal> }
        {/* <Button variant="secondary" className="gap-2"><Plus/>Добавить</Button> */}
      </div>
      {data && <DataTable columns={generateColumns(exampleColumns, exceptions)} data={data}/>}
    </div>
  );
}
