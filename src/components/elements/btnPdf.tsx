import { Button } from "../ui/button";
import acceptanceAct from "../pdf-generators/acceptance-act";
import completedWorksAct from "../pdf-generators/completed-works-act";
import {useState} from "react";

type typeBtnSubmit = {
    className?: string;
    children?: string;
    disabled?: boolean;
    // type?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined
    id?: string;
    namePdf?: string;
    style?: {};
    tabWithInfo: string;
    edited?: boolean; //надо для того, чтобы во время редактирования не нажималась кнопка
  };

export default function BtnPdf({className, children="скачать pdf", disabled, variant, id, namePdf, style, tabWithInfo, edited=false}: typeBtnSubmit){
    const [error, setError] = useState<string | null>(null); // Состояние для ошибки

    const generPdf = () => {
        // Проверка, указано ли имя PDF
        if (!namePdf) {
            setError("pdf'ка не задана");
            setTimeout(() => setError(""), 2500);
            return;
        }

        // Попытка генерации PDF
        const result = generatePdf(namePdf);
        if (typeof result === "string" && result === "Нет такой pdf") {
            setError(result);
        } else {
            setError(null); // Сбрасываем ошибку, если генерация успешна
        }
    };

    return <Button id={id} className={`w-full bg-orange-50 ${className}`} disabled={disabled} variant={variant} type="button" onClick={() => !edited && generPdf()} style={style}>
        {error ? <span className="text-red-500">{error}</span> : children}
    </Button>
}

function generatePdf(namePdf?: string){
    //Тут ещё нужен код перебора tabName
    switch(namePdf){
        case("acceptanceAct"):
            acceptanceAct();
            break;
        case("completedWorksAct"):
            completedWorksAct();
            break;
        default:
            return "Нет такой pdf";
    }
}