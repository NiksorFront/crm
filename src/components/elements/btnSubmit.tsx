import { Button } from "../ui/button";

type typeBtnSubmit = {
    className?: string;
    children?: string;
    disabled?: boolean;
    // type?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    id?: string;
    style?: {};
  };

export default function BtnSubmit({className, children, disabled, variant, id, style}: typeBtnSubmit){

    return <Button id={id} className={className} disabled={disabled} variant={variant} type="submit" style={style}>
        {children}
    </Button>
}