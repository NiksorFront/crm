type typeBtnSearchInModal = {
    title?: string;
    id: string;
    endpointForRequest?: string;
    disabled?: boolean;
    style?: {};
    forAdd?: {
        endpoint: string;
        action: string;
    };
};
export default function BtnSearchInModal({ title, id, endpointForRequest, forAdd, disabled, style }: typeBtnSearchInModal): import("react/jsx-runtime").JSX.Element;
export {};
