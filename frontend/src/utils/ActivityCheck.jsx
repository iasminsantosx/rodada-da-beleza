import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const TIMEOUT_DURATION = 4 * 60 * 60 * 1000; // 4 horas em milissegundos

const InactivityChecker = () => {
  const lastActivityTime = localStorage.getItem('lastActivityTime');
  const history = useHistory();

  useEffect(() => {
    let timeoutId;

    const handleUserActivity = () => {
      localStorage.setItem('lastActivityTime', Date.now().toString());
    };

    const checkInactivity = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - parseInt(lastActivityTime, 10);

      if (elapsedTime >= TIMEOUT_DURATION) {
        // Redirecionar o usuário para a tela de login ou / após 4 horas de inatividade
        history.push('/login'); // ou history.push('/');
      } else {
        // Verificar novamente após um intervalo de tempo
        timeoutId = setTimeout(checkInactivity, TIMEOUT_DURATION - elapsedTime);
      }
    };

    // Verificar a inatividade apenas se houver uma hora de última atividade válida
    if (lastActivityTime) {
      checkInactivity();
    }

    // Adicionar ouvinte de evento para rastrear a atividade do usuário
    document.addEventListener('mousemove', handleUserActivity);
    document.addEventListener('keydown', handleUserActivity);

    // Limpar o timeout ao desmontar o componente
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousemove', handleUserActivity);
      document.removeEventListener('keydown', handleUserActivity);
    };
  }, [history, lastActivityTime]);

  return null;
};

export default InactivityChecker;