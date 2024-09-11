import generateColumns from "./generate-columns.tsx";
import { DataTable } from "./data-table.tsx";
import { gettingData } from "../../utils/api.ts";
import { useQuery } from "react-query";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button.tsx";
import Modal from "@/components/modal.tsx";

// asunc
type typeTablePage = { title: string; endpoint: string, exceptions?: Array<string>, 
  forAdd?: {endpoint: string, action: string},
  forEdit?: {endpoint: string, action: string},
  forResetPassword?: {endpoint: string, action: string},
  forDelete?: {endpoint: string, action: string},};

const typicalFor = {endpoint: "", action: ""}
export default function TablePage({title, endpoint, exceptions=[], forAdd=typicalFor, forEdit=typicalFor, forResetPassword=typicalFor, forDelete=typicalFor}: typeTablePage ) {
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
    
    if (forEdit.endpoint || forResetPassword.endpoint || forDelete.endpoint){
      exampleColumns.actionBtns = "actionBtns";  //Добавляем столбец для Кнопок
      data.forEach((row: {}) => Object.assign(row, {actionBtns: []})); //Добавляем массив, куда будут записываться какие кнопки надо отобразить
    
      type rowType = {actionBtns: [{}]};
      forEdit.endpoint && data.forEach((row: rowType) => row.actionBtns.push({edit: forEdit}));
      forResetPassword.endpoint && data.forEach((row: rowType) => row.actionBtns.push({resetPassword: forResetPassword}));
      forDelete.endpoint && data.forEach((row: rowType) => row.actionBtns.push({delete: forDelete}));
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
        {forAdd.endpoint !== "" && <Modal title="Добавление" type="add" forSubmit={forAdd}>
                                            <Plus size={16}/>Добавить
                                  </Modal> }
        {/* <Button variant="secondary" className="gap-2"><Plus/>Добавить</Button> */}
      </div>
      {data && <DataTable columns={generateColumns(exampleColumns, exceptions)} data={data}/>}
    </div>
  );
}
