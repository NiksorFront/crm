import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendingInfo } from "../../utils/api";

type BodyAddType = {
    className?: string;
    endpointForSubmit: string;
    onClose: () => void;  // Assuming you have a function to close the modal
};

export default function BodyAdd({ className, endpointForSubmit, onClose }: BodyAddType) {
    const refBtn = useRef(null);
    const ref = useRef(null);
    const ref2 = useRef(null);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const sendingType = async () => {
        setIsSubmitting(true);
        setErrorMessage("");
        try {
            //@ts-ignore
            await sendingInfo(endpointForSubmit, { display_name: "ref.current.value" });
            setSubmitSuccess(true);
            setTimeout(() => onClose(), 5000);
        } catch (error) {
            setErrorMessage("Ошибка добавления!");
        } finally {
            setIsSubmitting(false);
        }
    };

    const sendingVendor = async () => {
        setIsSubmitting(true);
        setErrorMessage("");
        try {
            //@ts-ignore
            await sendingInfo(endpointForSubmit, { name: ref.current.value, short_name: ref2.current.value });
            setSubmitSuccess(true);
            setTimeout(() => onClose(), 5000);
        } catch (error) {
            setErrorMessage("Ошибка добавления!");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return <p className="text-green-600">Добавлено</p>;
    }

    if (endpointForSubmit === "crm/devices/ajax/post?action=insertDeviceType") {
        return (
            <div className={className}>
                <Label htmlFor="deviceType">Новый тип устройства</Label>
                <Input
                    id="deviceType"
                    placeholder="тип"
                    ref={ref}
                    disabled={isSubmitting}
                />
                {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
                <Button
                    ref={refBtn}
                    className='mt-4 ml-auto mr-0'
                    type="submit"
                    onClick={sendingType}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Отправка..." : "Добавить"}
                </Button>
            </div>
        );
    }

    if (endpointForSubmit === "crm/devices/ajax/post?action=insertDeviceVendor") {
        return (
            <div className={className}>
                <Label htmlFor="fullName">Полное название</Label>
                <Input
                    id="fullName"
                    ref={ref}
                    disabled={isSubmitting}
                />
                <Label className='mt-4' htmlFor="shortName">Короткое название</Label>
                <Input
                    id="shortName"
                    ref={ref2}
                    disabled={isSubmitting}
                />
                {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
                <Button
                    ref={refBtn}
                    className='mt-4 ml-auto mr-0'
                    type="submit"
                    onClick={sendingVendor}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Отправка..." : "Добавить"}
                </Button>
            </div>
        );
    }

    return <p>{endpointForSubmit}</p>;
}
