type columnType = Array<{
    accessorKey: string;
    header: string;
    size?: number;
}>;
export default function generateColumns(exampleColumn: object, exceptions: Array<string>): columnType;
export {};
