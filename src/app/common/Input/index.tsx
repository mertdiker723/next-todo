
type InputTypes = {
    label?: string;
    type: HTMLInputTypeAttribute;
    customClass?: string;
    required: boolean;
}

import { HTMLInputTypeAttribute } from "react";
import "./Style.scss";

const Input = ({ label, type = "text", customClass, required }: InputTypes) => {
    return (
        <div className={`input-container${customClass ? ` ${customClass}` : ""}`}>
            {label && <label className="input-label">{label}:</label>}
            <input type={type} className="input-field" required={required} />
        </div>
    )
}

export default Input