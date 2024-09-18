type BodyAddType = {
    className?: string;
    forSubmit: {
        endpoint: string;
        action: string;
    };
    onClose: () => void;
};
export default function BodyAdd({ className, forSubmit, onClose }: BodyAddType): import("react/jsx-runtime").JSX.Element;
export {};
