type typeBtnNext = {
    className?: string;
    children?: string;
    disabled?: boolean;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
    id?: string;
    style?: {};
    currentTab: string;
};
export default function BtnNext({ className, children, disabled, variant, id, style, currentTab }: typeBtnNext): import("react/jsx-runtime").JSX.Element;
export {};
