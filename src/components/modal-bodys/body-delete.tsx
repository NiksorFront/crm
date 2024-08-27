import { useState } from "react";
import { Button } from "../ui/button";
import { deleteId } from "../../utils/api";

type bodyDeleteType = { className?: string, endpointForDelete: string, id: string }

export default function BodyDelete({ className = "", endpointForDelete, id }: bodyDeleteType) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const deleteType = () => {
        setLoading(true);
        setError(null);

        deleteId(endpointForDelete, id)
            .then(() => {
                setSuccess(true);
                setTimeout(() => {
                    // Закрыть модальное окно через 5 секунд
                    closeModal();
                }, 5000);
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
        return <div>Удаление успешно</div>;
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
