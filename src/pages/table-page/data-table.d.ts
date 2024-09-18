import { ColumnDef } from "@tanstack/react-table";
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    closeButton?: React.ReactNode;
}
export declare function DataTable<TData, TValue>({ columns, data, closeButton }: DataTableProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
