import { HTMLInputTypeAttribute } from "react";

type InputTypes = {
    label?: string;
    type: HTMLInputTypeAttribute;
    name: string;
    customClass?: string;
    required: boolean;
}

import "./Style.scss";

const Input = ({ label, type = "text", name, customClass, required }: InputTypes) => {
    return (
        <div className={`input-container${customClass ? ` ${customClass}` : ""}`}>
            {label && <label className="input-label">{label}:</label>}
            <input type={type} name={name} className="input-field" required={required} />
        </div>
    )
}

export default Input