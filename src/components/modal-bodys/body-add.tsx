import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type BodyAddType = {
    className?: string;
    endpointForSubmit: string;
};

export default function BodyAdd({ className, endpointForSubmit }: BodyAddType) {
    if (endpointForSubmit === "crm/devices/ajax/post?action=insertDeviceType") {
        return (
            <div className={className}>
                <Label htmlFor="deviceType">Новый тип устройства</Label>
                <Input
                    id="deviceType"
                    placeholder="тип"
                />
                <Button className='mt-4 ml-auto mr-0' type="submit">Добавить</Button>
            </div>
        );
    }
    if (endpointForSubmit === "crm/devices/ajax/post?action=insertDeviceVendor") {
        return (
            <div className={className}>
                <Label htmlFor="fullName">Полное название</Label>
                <Input
                    id="fullName"
                    // placeholder="Введите полное название"
                />
                <Label className='mt-4' htmlFor="shortName">Короткое название</Label>
                <Input
                    id="shortName"
                    // placeholder="Введите короткое название"
                />
                <Button className='mt-4 ml-auto mr-0' type="submit">Добавить</Button>
            </div>
        );
    }

    return <p>{endpointForSubmit}</p>;
}
