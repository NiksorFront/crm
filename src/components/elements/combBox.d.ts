type typeCombBox = {
    className?: string;
    title?: string;
    placeholder?: string;
    disabled?: boolean;
    rowsToChoose?: Array<string>;
    id?: string;
    valuesOrURLRequestValues?: Array<string> | string;
    style?: {};
    dependsOn?: string | boolean;
};
export default function CombBox({ className, title, placeholder, disabled, id, valuesOrURLRequestValues, style, dependsOn }: typeCombBox): import("react/jsx-runtime").JSX.Element;
export {};
