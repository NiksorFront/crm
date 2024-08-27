type typeTablePage = {
    title: string;
    endpoint: string;
    exceptions?: Array<string>;
    endpointForAdd?: string;
    endpointForEdit?: string;
    endpointForResetPassword?: string;
    endpointForDelete?: string;
};
export default function TablePage({ title, endpoint, exceptions, endpointForAdd, endpointForEdit, endpointForResetPassword, endpointForDelete }: typeTablePage): import("react/jsx-runtime").JSX.Element;
export {};
