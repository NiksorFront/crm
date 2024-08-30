import { Button } from "../ui/button";
import {sendingInfoFromButton} from "../../utils/api";

type typeBtnSubmit = {
    className?: string;
    children?: string;
    disabled?: boolean;
    // type?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    id?: string;
    style?: {};
    submitUrl?: string;
    acceptedValues?: Array<string>;
    tabWithInfo?: string;
  };

export default function BtnSubmit({className, children, disabled, variant, id, style, submitUrl, acceptedValues, tabWithInfo}: typeBtnSubmit){
    const submit = () => {
        const currentTab = document.getElementById(`${tabWithInfo}`);
        let data = {}
    
        acceptedValues.forEach(value => {
            value = value.split("-")[1];
            const element = currentTab!.querySelector(`#${value}`);
            if (element) {
                data[value] = element.value;
            }
        });
        console.log(data);

        // sendingInfoFromButton(submitUrl, data);
    }

    return <Button id={id} className={className} disabled={disabled} variant={variant} type="submit" style={style} onClick={submit}>
        {children}
    </Button>
}

 //Напиши код внутри submit, который будет перебирать все acceptedValues, каждый делать ключом со значением взятым из полей найденых в currentTab с таким же id, а потом добавлять это в data
 //Найди радительскую node с тегом tabWithInfo. И из каждого id, что совпадает с названием ключа 

//  //
//         // Перебираем acceptedValues и добавляем их в data с пустыми значениями
//         if (acceptedValues && Array.isArray(acceptedValues)) {
//             acceptedValues.forEach(value => {
//                 //@ts-ignore
//                 data[value.split("-")[1]] = "";
//             });
//         }
//         console.log(acceptedValues, data);
//         console.log(tabWithInfo);
//         //надо дать tab'у id'шник 