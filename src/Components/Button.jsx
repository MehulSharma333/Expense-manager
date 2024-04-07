import React from "react";

const Botton = ({ className, title }) => {
  return (
    <button
      className={`flex items-center justify-center w-[100px] h-[20px] ${
        className ? className : ""
      }`}
    >
      {title}
    </button>
  );
};

export default Botton;
