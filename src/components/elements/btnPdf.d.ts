type typeBtnSubmit = {
    className?: string;
    children?: string;
    disabled?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    id?: string;
    pdfGenerateCode: () => void;
    style?: {};
    edited?: boolean;
};
export default function BtnPdf({ className, children, disabled, variant, id, pdfGenerateCode, style, edited }: typeBtnSubmit): import("react/jsx-runtime").JSX.Element;
export {};
