import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

type typeInpt = {
    className?: string;
    title?: string;
    placeholder?: string;
    disabled?: boolean;
    style?: {};
    id?: string;
  };

export default function InptBig({
    className,
    title,
    placeholder = "",
    disabled,
    style,
    id,
  }: typeInpt) {
    return (
      <div className="flex flex-col gap-2 max-h-96" style={style}>
        <Label htmlFor={`${id}`}>{title}</Label>
        <Textarea
          id={id}
          className={className}
          placeholder={placeholder}
          disabled={disabled}
        ></Textarea>
      </div>
    );
  }
