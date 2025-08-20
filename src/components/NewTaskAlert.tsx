import { useState, useEffect } from "react";

type NewTaskAlertProps = {
  message: string;
  duration?: number;
};

const NewTaskAlert = ({ message, duration = 3000 }: NewTaskAlertProps) => {
  const [isVisible, setIsVisible] = useState(false); // controla visibilidade da notificação
  const [currentMessage, setCurrentMessage] = useState(""); // define qual será a mensagem atual

  useEffect(() => {
    if (message) {
      // se há prop possui mensagem
      setCurrentMessage(message); // atribui a mensagem da prop para o hook de mensagem atual
      setIsVisible(true); // define que está visivel

      const timer = setTimeout(() => {
        setIsVisible(false); // muda pra invisivel depois de certa duração
        setCurrentMessage(""); // limpa  mensagem depois de certa duração
      }, duration);

      return ()=> clearTimeout(timer)
    }
  }, [message, duration]); // executa a função sempre que as props são atualizadas

  return isVisible ? <div>{currentMessage}</div> : null; // controla se a mensagem será exibida ou não
};

export default NewTaskAlert;
