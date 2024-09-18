type bodyDeleteType = {
    className?: string;
    forDelete: {
        endpoint: string;
        action: string;
    };
    id: number;
};
export default function BodyDelete({ className, forDelete, id }: bodyDeleteType): import("react/jsx-runtime").JSX.Element;
export {};
