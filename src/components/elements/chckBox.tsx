import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label";

type typeInpt = {
  className?: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  id?: string;
  style?: {};
  dependsOn?: string | boolean;
  value?: string | number;
  align?: string;
  // tabWithInfo: string;
};

export default function ChckBox({className, title, disabled, id, style, value, align}: typeInpt) {
    // console.log(align);
    const aln = align === "лево" ? "mr-auto" :
                align === "право" ? "ml-auto flex-row-reverse" : "mx-auto";

    return (
        <div className={`flex gap-2 items-center ${aln}`} style={style}>
            <Checkbox
                id={`${id}`}
                className={className}
                disabled={disabled}
                value={value}
            />
            <Label htmlFor={`${id}`}>{title}</Label>
        </div>
    );
}
