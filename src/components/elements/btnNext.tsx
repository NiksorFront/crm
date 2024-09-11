import { Button } from "../ui/button";
import {useStore} from "../../utils/store";

type typeBtnNext = {
    className?: string;
    children?: string;
    disabled?: boolean;
    // type?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    id?: string;
    style?: {};
    currentTab: string;
    // nextTabName: string; Если чё можно и через эту кнопку сделать переход
  };

export default function BtnNext({className, children, disabled, variant, id, style, currentTab}: typeBtnNext){
    const {settings, newTabContent} = useStore();

    let nextTab = currentTab; //храниться имя следующего ключа,
    let switchNextTab = false; //Указываем нужно ли переключаться на следующий таб или нет.

    //@ts-ignore
    Object.keys(settings.tabs).forEach((tab, index, tabsArray) => {
        if (tab === currentTab) {
            if (index < tabsArray.length - 1) {
                    nextTab = tabsArray[index + 1];
                    switchNextTab = true;
            } else {
                    nextTab = currentTab;
                    switchNextTab = false;
            }
        }
    });

    const swchNxtTab = () => {
        newTabContent(currentTab, {...settings.tabs![currentTab],
                                activeTab: false,
                                dsbldTab: false,
        })

        newTabContent(nextTab, {...settings.tabs![nextTab],
            activeTab: true,
            dsbldTab: false,
        })

        //Напиздеть про валидацию. и что тимур мне сделал нужный GET запрос.
    }

    return <Button id={id} className={`w-full ${className}`} disabled={disabled || !switchNextTab} variant={variant} type="submit" style={style} onClick={swchNxtTab}>
            {children}
    </Button>
}