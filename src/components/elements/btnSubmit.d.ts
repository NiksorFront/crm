type typeBtnSubmit = {
    className?: string;
    children?: string;
    disabled?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    id?: string;
    style?: {};
    submitUrl: {
        url: string;
        action: string;
    };
    acceptedValues?: Array<string>;
    tabWithInfo: string;
    error?: string;
    edited?: boolean;
};
export default function BtnSubmit({ className, children, disabled, variant, id, style, submitUrl, acceptedValues, tabWithInfo, error, edited }: typeBtnSubmit): import("react/jsx-runtime").JSX.Element;
export {};
