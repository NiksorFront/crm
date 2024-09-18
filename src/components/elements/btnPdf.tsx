import { Button } from "../ui/button";

type typeBtnSubmit = {
    className?: string;
    children?: string;
    disabled?: boolean;
    // type?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    id?: string;
    pdfGenerateCode: () => void;
    style?: {};
    edited?: boolean;
  };

export default function BtnPdf({className, children="скачать pdf", disabled, variant, id, pdfGenerateCode, style, edited=false}: typeBtnSubmit){
    console.log(edited)
    return <Button id={id} className={`w-full bg-orange-50 ${className}`} disabled={disabled} variant={variant} type="button" onClick={pdfGenerateCode} style={style}>
        {children}
    </Button>
}