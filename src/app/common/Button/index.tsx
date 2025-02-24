
// Styles
import "./Style.scss"

type ButtonTypes = {
    title: string;
    type: HTMLButtonElement['type'];
    customClass?: string;
    widthFull?: boolean;
    onClick?: () => void;
}

const Button = ({ title, type, widthFull, customClass = '', onClick }: ButtonTypes) => {
    return (
        <button
            className={`button-container ${widthFull ? 'btn-full-width' : ''} ${customClass}`}
            type={type}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button