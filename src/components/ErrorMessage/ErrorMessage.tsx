import { useEffect } from "react";
import type { ErrorMessageProps } from "../../types";

const ErrorMessage = ({
  text,
  clearMessage,
  duration = 4000,
}: ErrorMessageProps) => {
  useEffect(() => {
    if (text) {
      const timer = setTimeout(() => {
        clearMessage();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [text, clearMessage, duration]);

  return (
    <div style={{ color: "#F00" }} role="alert">
      {text}
    </div>
  );
};

export default ErrorMessage;
