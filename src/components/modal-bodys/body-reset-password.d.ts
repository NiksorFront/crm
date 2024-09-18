type BodyResetPasswordType = {
    className?: string;
    forReset: {
        endpoint: string;
        action: string;
    };
};
export default function BodyResetPassword({ className, forReset }: BodyResetPasswordType): import("react/jsx-runtime").JSX.Element;
export {};
