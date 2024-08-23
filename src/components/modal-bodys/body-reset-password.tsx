import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";

export default function BodyResetPassword({ className = "" }: { className?: string }) {
    //const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ newPassword?: string; confirmPassword?: string }>({});

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        const validationErrors: { newPassword?: string; confirmPassword?: string } = {};

        // Проверка на минимальную длину пароля
        if (newPassword.length < 3) {
            validationErrors.newPassword = "Пароль должен содержать не менее 3х символов.";
        }

        // Проверка на совпадение паролей
        if (newPassword !== confirmPassword) {
            validationErrors.confirmPassword = "Пароли не совпадают.";
        }

        // Если есть ошибки, установить их в состояние
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Если ошибок нет, можно отправить форму
            // Логика для смены пароля
            console.log("Пароль успешно сменен!");
        }
    };

    return (
        <form className={className} onSubmit={handleSubmit}>
            {/* <div className="mb-4">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div> */}
            <div className="mb-4 w-full">
                <Label htmlFor="new-password">Новый пароль</Label>
                <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, newPassword: undefined }));
                    }}
                    required
                />
                {errors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>
                )}
            </div>
            <div className="mb-4 w-full">
                <Label htmlFor="confirm-password">Повторите пароль</Label>
                <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                    }}
                    required
                />
                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
            </div>
            <Button className="mt-5 ml-auto mr-0" type="submit">
                Сменить пароль
            </Button>
        </form>
    );
}
