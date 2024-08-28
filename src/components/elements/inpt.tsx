import { Input } from "../ui/input";
import { Label } from "../ui/label";

type typeInpt = {
  className?: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  id?: string;
  style: {}
};

export default function Inpt({
  className,
  title,
  placeholder = "",
  disabled,
  type,
  id,
  style,
}: typeInpt) {
    console.log(style);
  return (
    <div id={id} className="flex flex-col gap-2" style={style}>
      <Label htmlFor={`${id}_input`}>{title}</Label>
      <Input
        id={`${id}_input`}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
      ></Input>
    </div>
  );
}
