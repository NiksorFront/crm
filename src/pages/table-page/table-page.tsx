import { Payment, columns } from "./columns.tsx";
import generateColumns from "./generate-columns.tsx";
import { DataTable } from "./data-table.tsx";
import { gettingData } from "../../utils/api.ts";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button.tsx";

// asunc
type typeTablePage = { title: string; endpoint: string, exceptions: Array<string>};
// prettier-ignore
export default function TablePage({title, endpoint, exceptions=[]}: typeTablePage ) {
  const { isLoading, error, data } = useQuery(["dataTable", endpoint], () =>
    gettingData(endpoint)
      .then((res) => res)
      .catch((err) => err),
  );

  // useEffect(() => {
  //   console.log(data);
  // }, [endpoint]);

  isLoading && (
    <p className="text-3xl text-gray-900 dark:text-white">Загрузка</p>
  );

  error && <p className="text-3xl text-red-600">Ошибка получения данных</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="py-4 flex justify-between">
        <h1 className="text-2xl text-left m-0">{title}</h1>
        <Button variant="secondary" className="gap-2"><Plus/>Добавить</Button>
      </div>
      {data && <DataTable columns={generateColumns(data[0], exceptions)} data={data}/>}
      {/* <DataTable columns={columns} data={getData()} /> */}
    </div>
  );
}
