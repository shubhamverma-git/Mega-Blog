// this component is used to learn forwardRef hook. The forwardRef hooks allows React users to pass refs to child components.
// The ref can be created and referenced with useRef or createRef and then passed in a parent component.
// Using forwardRef instead of useRef is useful when a ref needs to be accessed in a parent component.

import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded-lg bg-white tet-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${className}`}
        ref={ref}
        {...props} // isse ye hoga ki agar humne koi property parrent component mein nahi rakhi to jaha hum ye use karenge vaha khud ye extra property props ke through chali jaengi
        id={id}
      />
    </div>
  );
});

export default Input;
