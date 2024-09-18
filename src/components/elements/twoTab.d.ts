import { ElementType } from "../../utils/store";
type typeTwoTab = {
    title?: string;
    titleOne?: string;
    elementsTabOne?: Record<string, ElementType>;
    titleTwo?: string;
    elementsTabTwo?: Record<string, ElementType>;
    style?: {};
};
export default function TwoTab({ title, titleOne, elementsTabOne, titleTwo, elementsTabTwo, style }: typeTwoTab): import("react/jsx-runtime").JSX.Element;
export {};
