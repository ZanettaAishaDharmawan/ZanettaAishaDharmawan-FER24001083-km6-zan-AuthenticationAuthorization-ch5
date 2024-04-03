import React, { useEffect } from "react";

function ErrorModal({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1500);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <h1 className="text-xl text-red-500 font-bold">OOPS THERE IS SOMETHING WRONG! </h1>
        <p className="text-red-500">{message}</p>
      </div>
    </div>
  );
}

export default ErrorModal;
