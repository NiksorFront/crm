import { Button } from "../ui/button";
import {sendingInfoFromButton} from "../../utils/api";
import { useState } from "react";
import {useStore} from "../../utils/store";
import {ElementType} from "../../utils/store";

type typeBtnSubmit = {
    className?: string;
    children?: string;
    disabled?: boolean;
    // type?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    id?: string;
    style?: {};
    submitUrl: string;
    acceptedValues?: Array<string>;
    tabWithInfo: string;
    error?: string;
  };

export default function BtnSubmit({className, children, disabled, variant, id, style, submitUrl, acceptedValues=[], tabWithInfo, error="К кнопке не привязан ни один элемент для отправки"}: typeBtnSubmit){
    const [errorText, setErrorText] = useState("");
    const { settings, newTabContent } = useStore();

    const submit = () => {
        const currentTab = document.getElementById(`${tabWithInfo}`);
        let data = {};
        let newElements: Record<string, ElementType> = {};
        
        if (acceptedValues.length !== 0 && Array.isArray(acceptedValues)) {
            //Записываем все значения в data для передачи на сервер для добавления тикета в базу данных
            acceptedValues.forEach(value => {
                value = value.split("-")[1];
                const element = currentTab!.querySelector(`#${value}`);
                if (element) {//@ts-ignore
                    data[value] = element.value ? element.value : element.textContent;
                }else{
                    setErrorText(`#${value}` + "- элемент не найден");
                    setTimeout(() => setErrorText(""), 5000);
                }
            });
            console.log(data)

            // sendingInfoFromButton(submitUrl, data);
            //!!!тут отправляется запрос!!!

            //Перезаписываем элементы, сохраняя значения тех полей, что были отправлены на сервер и делаем их не редактируемыми больше(т.е. disabled).
            settings.tabs![tabWithInfo].elements && Object.keys(settings.tabs![tabWithInfo].elements).forEach(elem =>{
                if(acceptedValues.includes(settings.tabs![tabWithInfo].elements![elem].id)){
                    const value = settings.tabs![tabWithInfo].elements![elem].id.split("-")[1];
                    const element = currentTab!.querySelector(`#${value}`);
                    
                    if (element) {
                        (newElements[elem] = {...settings.tabs![tabWithInfo].elements![elem], //@ts-ignore
                        value: element.value ? element.value : element.textContent,
                        disabled: true})
                    }
                }else if(settings.tabs![tabWithInfo].elements![elem].id === `btnSubmit-${id}`){
                    newElements[elem] = {id: "btnNext-1", pos: { row: 9, col: 2 }, title: "Следующая страница",};
                }else{
                    newElements[elem] = {...settings.tabs![tabWithInfo].elements![elem], value: "", }
                }
            })
            //Записываем это в настройках(в будущем отправляем на сервер)
            newTabContent(tabWithInfo, {...settings.tabs![tabWithInfo],
                                    activeTab: true,
                                    dsbldTab: false,
                                    elements: newElements
                                    });

        }else{
            //"К кнопке не привязан ни один элемент для отправки"
            setErrorText(error);
            setTimeout(() => setErrorText(""), 5000);
        }

        // sendingInfoFromButton(submitUrl, data);
    }

    return <>
        <Button id={id} className={`w-full ${className} ${errorText && "text-red-400"}`} disabled={disabled} variant={variant} type="submit" style={style} onClick={submit}>
            {errorText ? errorText : children}
        </Button>
    </>
}

 //Напиши код внутри submit, который будет перебирать все acceptedValues, каждый делать ключом со значением взятым из полей найденых в currentTab с таким же id, а потом добавлять это в data
 //Найди радительскую node с тегом tabWithInfo. И из каждого id, что совпадает с названием ключа 
