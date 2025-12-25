import React from "react";
import "./Button.css";

export default function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
