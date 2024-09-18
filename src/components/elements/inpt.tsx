import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {useDepends} from "../../utils/store";

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
  // tabWithInfo: string;
};

export default function Inpt({className, title, placeholder = "", disabled, type, id, style, dependsOn, value}: typeInpt) {
  
  //Костыль, который срабатывает только для millage, потому что только там dependsOn вообще прописан
  if(dependsOn && !disabled){
    const {typeValue} = useDepends();
    switch (typeValue) {
      case "printer":
          disabled = true;
          value = 0;
          break;
      case "mfu":
          disabled = true;
          value = 0;
          break;
      case "cvetnoy-printer":
          disabled = true;
          value = 0;
          break;
      /*case "skaner":
          addMileage();
          break;*/
      case "mfu-cvetnoe":
          disabled = true;
          value = 0;
          break;
      /*case "kopir":
          addMileage();
          break;
      case "printer-etiketok":
          addMileage();
          break;*/
      default:
          disabled = false;
          break;
  }
  }


  return (
    <div className="flex flex-col gap-2" style={style}>
      <Label htmlFor={`${id}`}>{title}</Label>
      <Input
        id={`${id}`}
        className={className}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
        value={value}
      ></Input>
    </div>
  );
}
