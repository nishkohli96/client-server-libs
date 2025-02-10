/**
 * A dedicated hook to connect to websocket server.
 *
 * Similarly, a dedicated function can be created to connect or
 * disconnect from the server using -
 *
 * socket.connect(); or socket.disconnect();
 */
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { socket } from 'socket';

export default function useSocketConnection() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      toast.success('Socket connection established with the server');
    }

    function onDisconnect() {
      setIsConnected(false);
      toast.error('Socket connection disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return { isConnected };
}
