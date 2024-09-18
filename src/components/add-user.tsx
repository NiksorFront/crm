import { useState } from 'react';
import { Input } from './ui/input'; // Подключаем поля input из библиотеки shadcn/ui
import { sendingInfo } from "../utils/api";
import {useCostil} from "../utils/store";

type typeAddUser = {
  className?: string;
  forSubmit: { endpoint: string; action: string };
};

export default function AddUser({ className, forSubmit }: typeAddUser) {
  const [showInputs, setShowInputs] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ fullName: false, contact: false });
  const [buttonText, setButtonText] = useState('Добавить');
  const [statusColor, setStatusColor] = useState('text-gray-700');
  const {updating} = useCostil();

  const validate = () => {
    const fullNameError = fullName.trim() === '';
    const contactError = email.trim() === '' && phone.trim() === '';
    setErrors({ fullName: fullNameError, contact: contactError });
    return !fullNameError && !contactError;
  };

  const handleSubmit = () => {

    if (!validate()) return;

    sendingInfo(forSubmit.endpoint, {action: forSubmit.action, full_name: fullName, email, phone})
      .then(() => {
        setShowInputs(false);
        setButtonText('Успешно');
        setStatusColor('text-green-600');
        updating(); //Обновляем таблицу с данными
        setEmail("");
        setPhone("");
        setFullName("");
        setTimeout(() => {
            setButtonText("Добавить");
            setStatusColor('text-gray-700')
        }, 3000); // Возвращаем исходное состояние кнопки через 3 секунды
      })
      .catch(() => {
        setButtonText('Ошибка запроса');
        setStatusColor('text-red-600');
      });
  };

  return (
    <div className="max-w-screen-lg flex relative flex-row gap-2 justify-between mb-4">
        {showInputs && <>
            <h3 className="absolute -top-8 left-1 font-medium text-lg">Добавление физ. лица</h3>
            <div className='w-2/5'>
                <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="ФИО"
                    className={`${errors.fullName ? 'border-red-500' : ''} mb-1`}
                />
                {errors.fullName && (
                    <span className="text-red-500 text-sm">ФИО обязательно</span>
                )}
            </div>
            <div className='grid grid-cols-2 gap-2'>
            <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={`${errors.contact ? 'border-red-500' : ''}`}
            />
            <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
                className={`${errors.contact ? 'border-red-500' : ''}`}
            />
            {errors.contact && 
                <span className="text-red-500 text-sm col-span-2">
                Нужен хотя бы один контакт
                </span>
            }
            </div>
        </>}
        <button
            className={`max-h-10 inline-flex gap-2 items-center px-4 py-2 text-sm font-medium ${statusColor} bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed ${className}`}
            onClick={() => {showInputs ? handleSubmit() : setShowInputs(true)}}
        >
            {buttonText}
        </button>
    </div>
  );
}
