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
      <div id={id} className="flex flex-col gap-2 max-h-96" style={style}>
        <Label htmlFor="email">{title}</Label>
        <Textarea
          className={className}
          placeholder={placeholder}
          disabled={disabled}
        ></Textarea>
      </div>
    );
  }
