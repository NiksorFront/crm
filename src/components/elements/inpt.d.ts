type typeInpt = {
    className?: string;
    title?: string;
    placeholder?: string;
    disabled?: boolean;
    type?: string;
    id?: string;
    style?: {};
    dependsOn?: string | boolean;
    value?: string | number;
};
export default function Inpt({ className, title, placeholder, disabled, type, id, style, dependsOn, value }: typeInpt): import("react/jsx-runtime").JSX.Element;
export {};
