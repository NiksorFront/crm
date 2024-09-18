type typeTablePage = {
    title: string;
    endpoint: string;
    exceptions?: Array<string>;
    forAdd?: {
        endpoint: string;
        action: string;
    };
    forEdit?: {
        endpoint: string;
        action: string;
    };
    forResetPassword?: {
        endpoint: string;
        action: string;
    };
    forDelete?: {
        endpoint: string;
        action: string;
    };
    closeButton?: React.ReactNode;
};
export default function TablePage({ title, endpoint, exceptions, forAdd, forEdit, forResetPassword, forDelete, closeButton }: typeTablePage): import("react/jsx-runtime").JSX.Element;
export {};
