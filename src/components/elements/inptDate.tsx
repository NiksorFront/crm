import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar"; // Убедитесь, что путь правильный
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover"; // Убедитесь, что эти компоненты доступны

type TypeInput = {
  className?: string;
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  id?: string;
  style?: React.CSSProperties;
  value?: string | number;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы начинаются с 0
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

export default function InptDate({
  className,
  title,
  placeholder = "01.01.2024",
  disabled,
  id,
  style,
  value,
}: TypeInput) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>(
    value ? String(value) : ""
  );

  const handleDateSelect = (date: Date) => {
    const formatted = formatDate(date);
    setInputValue(formatted);
    setIsOpen(false);
  };

  const togglePopover = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // Если необходимо, можно добавить дополнительную валидацию здесь
  };

  return (
    <div className={`flex flex-col ${title && "gap-2"}`} style={style}>
      {title && <Label htmlFor={id}>{title}</Label>}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              id={id}
              className={className}
              placeholder={placeholder}
              disabled={disabled}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={togglePopover}
              aria-label="Выбрать дату"
            >
              <CalendarIcon size={20} />
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <Calendar
            mode="single"
            selected={inputValue ? new Date(inputValue) : undefined}
            onSelect={(date) => {
              if (date) {
                handleDateSelect(date);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
