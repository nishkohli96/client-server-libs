// 'use client';

import { useEffect } from 'react';
import io from 'socket.io-client';

export default function useSocketConnection() {
  const socket = io('http://localhost:5000');

  //   useEffect(() => {
  socket.on('connect', () => {
    console.log(`Connected to socket-server with Id ${socket.id}`);
  });
  socket.on('disconnect', () => {
    console.log('Disconnected from server');
  });

  //     return () => {
  //       /* Clean up event listeners */
  //       socket.off('connect');
  //       socket.off('disconnect');
  //     };
  //   }, []);

  return socket;
}
