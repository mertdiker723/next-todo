"use client";

import { useFormStatus } from "react-dom";

// Commons
import Button from "../Button";

const SubmitButton = ({ label }: { label: string }) => {
    const { pending } = useFormStatus();
    return (
        <Button
            title={pending ? "Loading..." : label}
            type="submit"
            widthFull
            customClass="btn-primary mt-4 mb-5"
            disabled={pending}
        />
    )
}

export default SubmitButton