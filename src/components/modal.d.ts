type modalType = {
    children: React.ReactNode;
    title: string;
    type: string;
    endpointForSubmit: string;
    id?: number | string;
};
export default function Modal({ children, title, type, endpointForSubmit, id }: modalType): import("react/jsx-runtime").JSX.Element;
export {};
