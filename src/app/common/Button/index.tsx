
// Styles
import "./Style.scss"

type ButtonTypes = {
    title: string;
    type: HTMLButtonElement['type'];
    disabled?: boolean;
    customClass?: string;
    widthFull?: boolean;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({ title, type, widthFull, disabled = false, customClass = '', onClick }: ButtonTypes) => {
    return (
        <button
            className={`button-container ${widthFull ? 'btn-full-width' : ''} ${customClass}`}
            type={type}
            disabled={disabled}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button