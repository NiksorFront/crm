import generateColumns from "./generate-columns.tsx";
import { DataTable } from "./data-table.tsx";
import { gettingData } from "../../utils/api.ts";
import { useQuery } from "react-query";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button.tsx";
import { DialogTrigger } from "@/components/ui/dialog.tsx";
import Modal from "@/components/modal.tsx";

// asunc
type typeTablePage = { title: string; endpoint: string, exceptions?: Array<string>, endpointForAdd?: string};

export default function TablePage({title, endpoint, exceptions=[], endpointForAdd=""}: typeTablePage ) {
  const { isLoading, error, data } = useQuery(["dataTable", endpoint], () =>
    gettingData(endpoint)
      .then((res) => res)
      .catch((err) => err),
  );

  // useEffect(() => {
  //   console.log(data);
  // }, [endpoint]);

  isLoading && <p className="text-3xl text-gray-900 dark:text-white">Загрузка</p>;

  error && <p className="text-3xl text-red-600">Ошибка получения данных</p>;

  return (
    <div className="container mx-auto py-10">
      <div className="py-4 flex justify-between">
        <h1 className="text-2xl text-left m-0">{title}</h1>
        {endpointForAdd !== "" && <Modal openingButton={<Button variant="secondary" className="gap-2"><Plus/>Добавить</Button>}
                                         endpointForSubmit={endpointForAdd}/> }
        {/* <Button variant="secondary" className="gap-2"><Plus/>Добавить</Button> */}
        {/* <DialogTrigger>Open</DialogTrigger> */}
      </div>
      {data && <DataTable columns={generateColumns(data[0], exceptions)} data={data}/>}
      {/* <DataTable columns={columns} data={getData()} /> */}
      
    </div>
  );
}
