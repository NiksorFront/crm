import { Input } from "../ui/input";
import { Label } from "../ui/label";

type typeInpt = {
    className?: string;
    title?: string;
    placeholder?: string;
    disabled?: boolean;
    style?: {};
    id?: string;
    accept?: string;
  };

export default function InptFile({className, title, placeholder = "файл", disabled, style, id, accept}: typeInpt) {
    return (
      <div className={`flex flex-col ${title && "gap-2"}`} style={style}>
        <Label htmlFor={`${id}`}>{title}</Label>
        <Input
          id={id}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
          type={"file"}
          accept={accept}
        ></Input>
      </div>
    );
  }
