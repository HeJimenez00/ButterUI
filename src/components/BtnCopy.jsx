// BtnCopy.jsx
import { useState, useEffect } from "react";

const BtnCopy = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      clearTimeout(copyTimeout);
      setCopyTimeout(setTimeout(() => setIsCopied(false), 2000));
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  useEffect(() => {
    return () => clearTimeout(copyTimeout);
  }, [copyTimeout]);

  return (
    <button
      onClick={handleCopy}
      className={`btn ${!isCopied ? "text-default" : "text-blue"} p-[5px] text-body transition-all duration-200 hover:shadow-[inset_0_0_0_1.5px_var(--color-blue),0px_0px_10px_3px_oklch(69%_0.17_279_/50%)] rounded-md`}
      aria-label={isCopied ? "Código copiado" : "Copiar código al portapapeles"}
    >
      {isCopied ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-check w-5 h-5 p-[2px]"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-copy w-5 h-5 p-[2px]"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      )}
    </button>
  );
};

export default BtnCopy;
