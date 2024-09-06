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
  };

export default function BtnSubmit({className, children, disabled, variant, id, style, submitUrl, acceptedValues=[], tabWithInfo}: typeBtnSubmit){
    const [errorText, setErrorText] = useState("");
    const { settings, newTabinfo } = useStore();

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
            newTabinfo(tabWithInfo, {...settings.tabs![tabWithInfo],
                                    activeTab: true,
                                    dsbldTab: false,
                                    elements: newElements
                                    });

        }else{
            setErrorText("К кнопке не привязан ни один элемент для отправки");
            setTimeout(() => setErrorText(""), 5000);
        }

        // sendingInfoFromButton(submitUrl, data);
    }

    return <>
        <Button id={id} className={`${className} ${errorText && "text-red-400"}`} disabled={disabled} variant={variant} type="submit" style={style} onClick={submit}>
            {errorText ? errorText : children}
        </Button>
    </>
}

 //Напиши код внутри submit, который будет перебирать все acceptedValues, каждый делать ключом со значением взятым из полей найденых в currentTab с таким же id, а потом добавлять это в data
 //Найди радительскую node с тегом tabWithInfo. И из каждого id, что совпадает с названием ключа 

 /*let nextTab = tabWithInfo; //храниться имя следующего ключа,
            let switchNextTab = false; //Указываем нужно ли переключаться на следующий таб или нет.

            Object.keys(settings.tabs).forEach((tab, index, tabsArray) => {
                if (tab === tabWithInfo) {
                    if (index < tabsArray.length - 1) {
                        nextTab = tabsArray[index + 1];
                        switchNextTab = true;
                    } else {
                        nextTab = tabWithInfo;
                        switchNextTab = false;
                    }
                }
            });

            // Теперь в переменной `nextTab` будет храниться имя следующего ключа,
            // а `switchNextTab` будет указывать, нужно ли переключаться на следующий таб или нет.


            console.log('Next tab key:', nextTab);
            console.log('Switch to next tab:', switchNextTab);*/