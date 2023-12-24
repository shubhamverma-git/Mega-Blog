import React from "react";

function Button({
  btnName,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${className} ${textColor} ${type} ${bgColor}`}
      {...props}
    >
      {btnName}
    </button>
  );
}

export default Button;
