import { useState } from "react";
import { Button } from "../ui/button";
import { deleteData } from "../../utils/api";
import {useCostil} from "../../utils/store";

type bodyDeleteType = { className?: string, forDelete: {endpoint: string, action: string}, id: number }

export default function BodyDelete({ className = "", forDelete, id }: bodyDeleteType) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const {updating} = useCostil();

    const deleteType = () => {
        setLoading(true);
        setError(null);

        
        deleteData(forDelete.endpoint, {action: forDelete.action, id: id})
            .then(() => {
                setSuccess(true);
                setTimeout(() => {closeModal(); updating();}, 2500);
            })
            .catch(() => {
                setError("Ошибка удаления!");
                setLoading(false);
            });
    };

    const closeModal = () => {
        // Логика закрытия модального окна
    };

    if (success) {
        return <div className="text-green-600">Удаление успешно</div>;
    }

    return (
        <div>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button
                className={className}
                variant={"destructive"}
                onClick={deleteType}
                disabled={loading}
            >
                {loading ? "Отправка..." : "Удалить"}
            </Button>
        </div>
    );
}
