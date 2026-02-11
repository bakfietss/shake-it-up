import "./Button.scss"

export default function Button({
  children,
  className = "",
  btnType = "solid",
  animation = "",
  size = "medium",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const classes = [
    "btn",
    `btn--${btnType}`,
    `btn--${size}`,
    animation && `btn--anim-${animation}`,
    disabled && "btn--disabled",
    className
  ].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
