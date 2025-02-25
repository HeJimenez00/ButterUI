import { useState, useRef } from "react";
import gsap from "gsap";

const BtnCopy = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [copyTimeout, setCopyTimeout] = useState(null);
  const buttonRef = useRef(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      gsap.fromTo(
        buttonRef.current,
        {
          scale: 0.8,
        },
        {
          scale: 1,
          duration: 0.8,
          ease: "elastic.out(0.8, 0.5)",
        },
      );

      clearTimeout(copyTimeout);
      setCopyTimeout(setTimeout(() => setIsCopied(false), 2000));
    } catch (error) {
      console.error("Error al copiar:", error);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleCopy}
      className={`btn p-[5px] text-body rounded-lg bg-y-400/10 text-y-400 transition-shadow inset-ring-y-400 ${isCopied ? "inset-ring-2" : "inset-ring-0"}`}
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
