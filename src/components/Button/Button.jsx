import "./Button.scss";

const Button = ({ type, onAdd, isFill, children, ...props }) => (
    <button type={type} onClick={onAdd} className={!isFill ? "button" : "button-secondary"} {...props}>
        {children}
    </button>
);

export const ButtonRounded = ({ type, onAdd, children, props }) => {
    return (
        <button type={type} onClick={onAdd} className="button-rounded" {...props}>
            {children}
        </button>
    );
};
export default Button;
