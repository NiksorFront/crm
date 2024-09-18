type modalType = {
    children: React.ReactNode;
    title?: string;
    type: string;
    forSubmit?: {
        endpoint: string;
        action: string;
    };
    endpointForRequest?: string;
    id?: number | string;
    className?: string;
    classNameTriger?: string;
    disabledTriger?: boolean;
    styleTriger?: {};
};
export default function Modal({ children, title, type, forSubmit, endpointForRequest, id, className, classNameTriger, disabledTriger, styleTriger }: modalType): import("react/jsx-runtime").JSX.Element;
export {};
